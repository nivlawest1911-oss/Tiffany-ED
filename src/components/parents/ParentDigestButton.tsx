"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import GlassPanel from "@/components/ui/GlassPanel";
import { Copy, Mail, X } from "lucide-react";
import { toast } from "sonner";

type DigestPayload = {
  subject: string;
  markdown: string;
  html: string;
  highlights: string[];
  interventionNotes: string[];
  atHomeActions: string[];
};

type Props = {
  className?: string;
  students?: Array<{
    id?: string;
    name?: string;
    firstName?: string;
    grade?: string;
  }>;
  /** compact = icon-ish button for cards; bar = full action bar button */
  variant?: "bar" | "compact";
};

export default function ParentDigestButton({
  className = "Homeroom Literacy",
  students,
  variant = "bar",
}: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [digest, setDigest] = useState<DigestPayload | null>(null);
  const [sendHint, setSendHint] = useState<string | null>(null);
  const [canSend, setCanSend] = useState(false);

  const preview = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/parents/digest/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          className,
          students: students?.map((s) => ({
            firstName: s.firstName || s.name?.split(" ")[0] || "Student",
            grade: s.grade,
          })),
        }),
      });

      if (res.status === 401) {
        toast.error("Sign in as a teacher or admin to preview digests");
        return;
      }
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || "Preview failed");
      }

      const json = await res.json();
      setDigest(json.digest);
      setCanSend(Boolean(json.canSend));
      setSendHint(json.sendHint || null);
      setOpen(true);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Could not preview digest");
    } finally {
      setLoading(false);
    }
  };

  const copyMarkdown = async () => {
    if (!digest) return;
    try {
      await navigator.clipboard.writeText(digest.markdown);
      toast.success("Digest copied");
    } catch {
      toast.error("Clipboard unavailable");
    }
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        disabled={loading}
        onClick={() => void preview()}
        className={
          variant === "bar"
            ? "border-white/20 text-white hover:border-[#C5A46E]/40 gap-2"
            : "border-white/10 text-white/60 hover:text-[#C5A46E] gap-2 text-[10px] uppercase tracking-widest"
        }
      >
        <Mail className="h-4 w-4" />
        {loading ? "Building…" : "Preview weekly digest"}
      </Button>

      {open && digest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <GlassPanel
            hoverIntensity="none"
            className="w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col border-white/10 bg-[#0F1524]/90 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <div>
                <h2 className="text-lg font-semibold text-white">Weekly parent digest</h2>
                <p className="text-xs text-white/50 mt-0.5">{digest.subject}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-5 space-y-4 text-sm text-white/80">
              <section>
                <h3 className="text-xs uppercase tracking-wider text-white/40 mb-2">
                  Highlights
                </h3>
                <ul className="space-y-1.5">
                  {digest.highlights.map((h, i) => (
                    <li key={i} className="leading-snug">
                      • {h}
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h3 className="text-xs uppercase tracking-wider text-white/40 mb-2">
                  Intervention notes
                </h3>
                <ul className="space-y-1.5">
                  {digest.interventionNotes.map((n, i) => (
                    <li key={i} className="leading-snug">
                      • {n}
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h3 className="text-xs uppercase tracking-wider text-white/40 mb-2">
                  At-home actions
                </h3>
                <ol className="list-decimal list-inside space-y-1.5">
                  {digest.atHomeActions.map((a, i) => (
                    <li key={i} className="leading-snug">
                      {a}
                    </li>
                  ))}
                </ol>
              </section>

              <pre className="mt-2 rounded-xl border border-white/10 bg-black/30 p-4 text-xs text-white/60 whitespace-pre-wrap font-mono max-h-48 overflow-y-auto">
                {digest.markdown}
              </pre>

              {sendHint && (
                <p className="text-xs text-white/40 border-t border-white/10 pt-3">
                  {canSend ? "✓ " : "ℹ "}
                  {sendHint}
                </p>
              )}
            </div>

            <div className="flex gap-3 p-5 border-t border-white/10">
              <Button
                variant="outline"
                className="flex-1 border-white/20 gap-2"
                onClick={() => void copyMarkdown()}
              >
                <Copy className="h-4 w-4" /> Copy markdown
              </Button>
              <Button
                className="flex-1 bg-[#C5A46E] text-[#0A0F1C] hover:bg-[#A67C52]"
                onClick={() => setOpen(false)}
              >
                Done
              </Button>
            </div>
          </GlassPanel>
        </div>
      )}
    </>
  );
}
