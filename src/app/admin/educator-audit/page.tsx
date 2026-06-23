"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  Search, 
  Download, 
  Sparkles, 
  Cpu, 
  Layers, 
  Calendar, 
  ArrowLeft, 
  RefreshCw, 
  Eye, 
  FileText,
  User as UserIcon,
  BookOpen
} from "lucide-react";
import Link from "next/link";

interface Log {
  id: string;
  teacher: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  student?: {
    id: string;
    first_name: string;
    last_name: string;
  } | null;
  interactionType: string;
  standardsAligned: string[];
  rubricCriteria?: any;
  prompt: string;
  aiResponse: string;
  modelUsed?: string | null;
  tokensUsed?: number | null;
  sessionId?: string | null;
  timestamp: string;
}

export default function EducatorAuditPage() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchLogs = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);
    try {
      const url = new URL("/api/admin/educator-audit", window.location.origin);
      if (search) {
        url.searchParams.set("search", search);
      }
      if (typeFilter !== "all") {
        url.searchParams.set("type", typeFilter);
      }
      url.searchParams.set("limit", "100");

      const response = await fetch(url.toString());
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error("Access Restricted: Administrator credentials required.");
        }
        throw new Error(`Failed to fetch logs: ${response.statusText}`);
      }

      const data = await response.json();
      setLogs(data.logs || []);
      setTotal(data.total || 0);
    } catch (err: any) {
      console.error("[Educator Audit Page] Fetch failed:", err);
      setError(err.message || "Failed to load audit logs.");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [search, typeFilter]);

  useEffect(() => {
    // Fetch logs on mount and whenever search/filter changes (with a slight debounce if typing)
    const delayDebounce = setTimeout(() => {
      fetchLogs();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [fetchLogs]);

  const exportCSV = () => {
    const csvContent = [
      ["Interaction ID", "Teacher Name", "Teacher Email", "Student Name", "Type", "Model Used", "Tokens Used", "Standards Aligned", "Timestamp", "Prompt", "AI Response"],
      ...logs.map(l => [
        l.id,
        l.teacher.name || "N/A",
        l.teacher.email || "N/A",
        l.student ? `${l.student.first_name} ${l.student.last_name}` : "N/A",
        l.interactionType,
        l.modelUsed || "gemini-1.5-pro",
        l.tokensUsed || "N/A",
        l.standardsAligned.join("; "),
        new Date(l.timestamp).toISOString(),
        l.prompt.replace(/"/g, '""'),
        l.aiResponse.replace(/"/g, '""')
      ])
    ].map(row => row.map(val => `"${String(val).replace(/\n/g, " ")}"`).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `edintel-educator-ai-audit-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getBadgeClass = (type: string) => {
    switch (type) {
      case "grading_draft":
        return "bg-purple-500/10 border-purple-500/30 text-purple-300";
      case "lesson_scaffold":
        return "bg-blue-500/10 border-blue-500/30 text-blue-300";
      case "rubric_feedback":
        return "bg-emerald-500/10 border-emerald-500/30 text-emerald-300";
      case "differentiation_planner":
        return "bg-amber-500/10 border-amber-500/30 text-amber-300";
      default:
        return "bg-white/10 border-white/20 text-white/80";
    }
  };

  const formatType = (type: string) => {
    return type.replace(/_/g, " ").toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#060A16] text-white">
      {/* Background radial glow */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/5 via-teal-500/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">
        
        {/* Navigation back */}
        <div className="mb-6">
          <Link 
            href="/board" 
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to command boardroom
          </Link>
        </div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-amber-500 text-xs font-semibold tracking-[3px] mb-2 uppercase">ADMINISTRATIVE INTEGRITY SENTINEL</div>
            <h1 className="text-5xl tracking-[-2.5px] font-semibold bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
              Educator AI Interaction Audit
            </h1>
            <p className="text-lg text-white/60 mt-2 max-w-2xl">
              Real-time standards traceability and compliance monitoring for automated lesson synthesis, grading multipliers, and differentiated curricula.
            </p>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={() => fetchLogs(true)}
              className="p-3.5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/5 transition flex items-center justify-center"
              title="Refresh Logs"
              disabled={loading || isRefreshing}
            >
              <RefreshCw className={`w-5 h-5 text-white/70 ${isRefreshing ? "animate-spin" : ""}`} />
            </button>
            <button 
              onClick={exportCSV} 
              disabled={logs.length === 0}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold flex items-center gap-2 shadow-lg shadow-teal-500/10 hover:shadow-teal-500/20 disabled:opacity-50 disabled:pointer-events-none transition duration-300"
            >
              <Download className="w-5 h-5" /> Export Audit CSV
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2 relative">
            <Search className="w-5 h-5 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              placeholder="Search by educator name, email, or curriculum standard..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-white/10 bg-white/[0.015] backdrop-blur-xl focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/40 focus:outline-none transition"
            />
          </div>
          <div>
            <select 
              value={typeFilter} 
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl border border-white/10 bg-[#0C1224] backdrop-blur-xl focus:border-amber-500/40 focus:outline-none transition text-white/80"
            >
              <option value="all">All Interaction Types</option>
              <option value="grading_draft">Grading Drafts</option>
              <option value="lesson_scaffold">Lesson Scaffolds</option>
              <option value="rubric_feedback">Rubric Feedback</option>
              <option value="differentiation_planner">Differentiated Curricula</option>
            </select>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="p-6 rounded-3xl border border-red-500/20 bg-red-500/10 text-red-300 mb-8 backdrop-blur-xl flex items-start gap-4">
            <div className="text-xl">⚠️</div>
            <div>
              <div className="font-semibold text-lg">Administrative Check Failed</div>
              <div className="text-sm mt-1">{error}</div>
            </div>
          </div>
        )}

        {/* Data Table */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.01] backdrop-blur-xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-xs font-semibold tracking-[2px] text-white/40 uppercase">
                  <th className="p-5">Educator</th>
                  <th className="p-5">Workflow Type</th>
                  <th className="p-5">Aligned Standards</th>
                  <th className="p-5">Platform Context</th>
                  <th className="p-5">Timestamp</th>
                  <th className="p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-16 text-center text-white/40">
                      <div className="flex flex-col items-center gap-3">
                        <RefreshCw className="w-8 h-8 animate-spin text-amber-500/70" />
                        <span>Decrypting secure audit registry...</span>
                      </div>
                    </td>
                  </tr>
                ) : logs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-16 text-center text-white/40">
                      <div className="flex flex-col items-center gap-3">
                        <FileText className="w-10 h-10 text-white/20" />
                        <span>No educator interactions logged matching current query criteria.</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log.id} className="hover:bg-white/[0.02] transition duration-200">
                      <td className="p-5">
                        <div className="font-semibold text-white/90">{log.teacher.name || "Unknown"}</div>
                        <div className="text-xs text-white/40 font-mono mt-0.5">{log.teacher.email}</div>
                      </td>
                      <td className="p-5">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getBadgeClass(log.interactionType)}`}>
                          {formatType(log.interactionType)}
                        </span>
                      </td>
                      <td className="p-5">
                        {log.standardsAligned.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5 max-w-xs">
                            {log.standardsAligned.slice(0, 2).map((std, i) => (
                              <span key={i} className="text-xs px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/70 font-mono">
                                {std}
                              </span>
                            ))}
                            {log.standardsAligned.length > 2 && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono">
                                +{log.standardsAligned.length - 2} more
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-white/30 italic">No Standards Attached</span>
                        )}
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-2 text-xs text-white/70">
                          <Cpu className="w-3.5 h-3.5 text-teal-400/80" />
                          <span className="font-mono">{log.modelUsed || "gemini-1.5-pro"}</span>
                        </div>
                        {log.tokensUsed && (
                          <div className="text-[10px] text-white/40 mt-1 font-mono">
                            {log.tokensUsed} tokens
                          </div>
                        )}
                      </td>
                      <td className="p-5 text-xs text-white/60 font-mono">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="p-5 text-right">
                        <button
                          onClick={() => setSelectedLog(log)}
                          className="px-4 py-2 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/10 transition text-xs font-semibold inline-flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" /> Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 bg-white/[0.01] border-t border-white/5 flex items-center justify-between text-xs text-white/40 font-mono">
            <div>TOTAL INTERACTIONS RECORDED: {total}</div>
            <div>COMPLIANCE BASELINE: FERPA/COPPA SECURE</div>
          </div>
        </div>

        {/* Detail Modal Overlay */}
        {selectedLog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-md" 
              onClick={() => setSelectedLog(null)}
            />
            
            <div className="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-[#0B0F1C] p-8 max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-xs font-semibold text-amber-500 tracking-[2px] uppercase">AUDIT REGISTRY DETAILS</div>
                  <h2 className="text-3xl tracking-[-1.5px] font-semibold mt-1">AI Interaction Analysis</h2>
                  <div className="text-xs text-white/40 font-mono mt-1">ID: {selectedLog.id}</div>
                </div>
                <button 
                  onClick={() => setSelectedLog(null)}
                  className="px-3.5 py-1.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/5 text-sm"
                >
                  Close
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6 text-sm">
                <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-4 flex gap-3 items-center">
                  <UserIcon className="w-5 h-5 text-amber-500/70" />
                  <div>
                    <div className="text-[10px] text-white/40 uppercase">EDUCATOR PROFILE</div>
                    <div className="font-semibold">{selectedLog.teacher.name}</div>
                    <div className="text-xs text-white/50 font-mono">{selectedLog.teacher.email}</div>
                  </div>
                </div>
                
                <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-4 flex gap-3 items-center">
                  <BookOpen className="w-5 h-5 text-teal-500/70" />
                  <div>
                    <div className="text-[10px] text-white/40 uppercase">WORKFLOW LEVEL</div>
                    <div className="font-semibold">{formatType(selectedLog.interactionType)}</div>
                    <div className="text-xs text-white/50 font-mono">Mode: {selectedLog.modelUsed || "gemini-1.5-pro"}</div>
                  </div>
                </div>
              </div>

              {selectedLog.standardsAligned.length > 0 && (
                <div className="mb-6">
                  <div className="text-xs text-white/40 uppercase tracking-[1px] mb-2">Standards & Competencies Mapped</div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedLog.standardsAligned.map((std, idx) => (
                      <span key={idx} className="text-xs px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono">
                        {std}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-6 flex-grow overflow-y-auto pr-2">
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-[1px] mb-2">Teacher Query Input Prompt</div>
                  <pre className="p-4 rounded-2xl bg-black/40 border border-white/5 text-xs text-white/80 font-mono whitespace-pre-wrap max-h-48 overflow-y-auto leading-relaxed">
                    {selectedLog.prompt}
                  </pre>
                </div>
                
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-[1px] mb-2">Synthesized AI Output Response</div>
                  <pre className="p-4 rounded-2xl bg-black/40 border border-white/5 text-xs text-white/80 font-mono whitespace-pre-wrap max-h-60 overflow-y-auto leading-relaxed">
                    {selectedLog.aiResponse}
                  </pre>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-4 flex items-center justify-between text-xs text-white/40 font-mono">
                <div>TIMESTAMP: {new Date(selectedLog.timestamp).toUTCString()}</div>
                <div>SESSION TOKEN: {selectedLog.sessionId || "N/A"}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
