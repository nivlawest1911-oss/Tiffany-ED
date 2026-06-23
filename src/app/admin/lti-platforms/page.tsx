"use client";

import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Plus, 
  Layers, 
  Cpu, 
  Settings, 
  CheckCircle, 
  XCircle, 
  ShieldCheck, 
  Info,
  ExternalLink,
  RefreshCw,
  Trash2
} from "lucide-react";
import Link from "next/link";

interface Platform {
  id: string;
  issuer: string;
  clientId: string;
  deploymentId?: string | null;
  platformName?: string | null;
  jwksUrl: string;
  authTokenUrl: string;
  authLoginUrl: string;
  registeredAt: string;
  isActive: boolean;
}

export default function LtiPlatformsAdminPage() {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [platformName, setPlatformName] = useState("");
  const [issuer, setIssuer] = useState("");
  const [clientId, setClientId] = useState("");
  const [deploymentId, setDeploymentId] = useState("");
  const [jwksUrl, setJwksUrl] = useState("");
  const [authLoginUrl, setAuthLoginUrl] = useState("");
  const [authTokenUrl, setAuthTokenUrl] = useState("");

  const [formSubmitting, setFormSubmitting] = useState(false);

  const fetchPlatforms = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/lti/register");
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          throw new Error("Access Restricted: Admin credentials required.");
        }
        throw new Error("Failed to load platform registry.");
      }
      const data = await res.json();
      setPlatforms(data.platforms || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load platforms.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlatforms();
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/lti/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platformName,
          issuer,
          clientId,
          deploymentId: deploymentId || undefined,
          jwksUrl,
          authLoginUrl,
          authTokenUrl,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to register platform configuration.");
      }

      setSuccessMessage("Platform registration successfully synchronized!");
      
      // Reset form
      setPlatformName("");
      setIssuer("");
      setClientId("");
      setDeploymentId("");
      setJwksUrl("");
      setAuthLoginUrl("");
      setAuthTokenUrl("");
      setShowAddForm(false);
      
      // Refresh list
      await fetchPlatforms();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to register platform.");
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060A16] text-white">
      {/* Background radial glow */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-500/5 via-amber-500/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">
        
        {/* Navigation back */}
        <div className="mb-6 flex justify-between items-center">
          <Link 
            href="/board" 
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to boardroom
          </Link>
          
          <Link 
            href="/admin/educator-audit" 
            className="text-xs px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 transition"
          >
            Go to Educator AI Audit
          </Link>
        </div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-teal-400 text-xs font-semibold tracking-[3px] mb-2 uppercase">LTI ADVANTAGE SSO LAYER</div>
            <h1 className="text-5xl tracking-[-2.5px] font-semibold bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
              LTI 1.3 Platform Registry
            </h1>
            <p className="text-lg text-white/60 mt-2 max-w-2xl">
              Register and connect external Learning Management Systems (LMS) including Canvas, Clever, and Google Classroom.
            </p>
          </div>
          
          <div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-semibold flex items-center gap-2 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 transition duration-300"
            >
              <Plus className="w-5 h-5" /> {showAddForm ? "View Active Connections" : "Register LTI Platform"}
            </button>
          </div>
        </div>

        {/* Notifications */}
        {successMessage && (
          <div className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-300 mb-8 backdrop-blur-xl flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <div>{successMessage}</div>
          </div>
        )}
        {error && (
          <div className="p-5 rounded-2xl border border-red-500/20 bg-red-500/10 text-red-300 mb-8 backdrop-blur-xl flex items-center gap-3">
            <XCircle className="w-5 h-5 text-red-400" />
            <div>{error}</div>
          </div>
        )}

        {showAddForm ? (
          /* Add Platform Form */
          <div className="max-w-3xl mx-auto rounded-3xl border border-white/10 bg-white/[0.01] p-8 backdrop-blur-xl shadow-2xl">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Settings className="w-6 h-6 text-amber-500" /> Platform Registration Form
            </h2>
            
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-white/50 tracking-[1px] uppercase mb-2">Platform Name</label>
                  <input 
                    required
                    placeholder="e.g. Mobile County Canvas Production"
                    value={platformName}
                    onChange={(e) => setPlatformName(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-black/40 focus:border-amber-500/40 focus:outline-none transition text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/50 tracking-[1px] uppercase mb-2">Client ID (Audience)</label>
                  <input 
                    required
                    placeholder="LTI Client ID provided by LMS"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-black/40 focus:border-amber-500/40 focus:outline-none transition text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/50 tracking-[1px] uppercase mb-2">LMS Platform Issuer (iss)</label>
                <input 
                  required
                  placeholder="e.g. https://canvas.instructure.com or https://clever.com"
                  value={issuer}
                  onChange={(e) => setIssuer(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-black/40 focus:border-amber-500/40 focus:outline-none transition text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/50 tracking-[1px] uppercase mb-2">LMS Public JWKS Endpoint URL</label>
                <input 
                  required
                  placeholder="e.g. https://canvas.instructure.com/api/lti/security/jwks"
                  value={jwksUrl}
                  onChange={(e) => setJwksUrl(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-black/40 focus:border-amber-500/40 focus:outline-none transition text-sm font-mono"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-white/50 tracking-[1px] uppercase mb-2">OIDC Authorization Redirect URL</label>
                  <input 
                    required
                    placeholder="e.g. https://canvas.instructure.com/api/lti/authorize_redirect"
                    value={authLoginUrl}
                    onChange={(e) => setAuthLoginUrl(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-black/40 focus:border-amber-500/40 focus:outline-none transition text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/50 tracking-[1px] uppercase mb-2">OAuth2 Access Token Endpoint</label>
                  <input 
                    required
                    placeholder="e.g. https://canvas.instructure.com/login/oauth2/token"
                    value={authTokenUrl}
                    onChange={(e) => setAuthTokenUrl(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-black/40 focus:border-amber-500/40 focus:outline-none transition text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/50 tracking-[1px] uppercase mb-2">LTI Deployment ID (Optional)</label>
                <input 
                  placeholder="LTI deployment_id (optional)"
                  value={deploymentId}
                  onChange={(e) => setDeploymentId(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-black/40 focus:border-amber-500/40 focus:outline-none transition text-sm font-mono"
                />
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs text-amber-300 leading-relaxed flex gap-3">
                <Info className="w-5 h-5 shrink-0" />
                <div>
                  <strong>IT Integration Checklist:</strong> To complete the LTI handshake, copy EdIntel's public JWKS Keystore URL: 
                  <span className="block font-mono bg-black/40 p-2 rounded border border-white/5 mt-1 select-all">
                    {window.location.origin}/.well-known/jwks.json
                  </span>
                  Paste this value inside your Canvas Developer Key or Clever developer portal.
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-3.5 rounded-2xl border border-white/10 hover:bg-white/5 text-sm font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold flex items-center gap-2 shadow-lg disabled:opacity-50 transition"
                >
                  {formSubmitting ? "Synchronizing..." : "Activate SSO Connection"}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Platforms list */
          <div className="grid gap-6">
            {loading ? (
              <div className="p-20 text-center rounded-3xl border border-white/10 bg-white/[0.01]">
                <RefreshCw className="w-8 h-8 animate-spin text-amber-500 mx-auto mb-3" />
                <span className="text-white/40">Querying LTI platform keystores...</span>
              </div>
            ) : platforms.length === 0 ? (
              <div className="p-20 text-center rounded-3xl border border-white/10 bg-white/[0.01] flex flex-col items-center">
                <ShieldCheck className="w-12 h-12 text-white/20 mb-4" />
                <h3 className="text-xl font-semibold mb-1">No Active LTI Integrations</h3>
                <p className="text-sm text-white/50 max-w-sm mb-6">
                  EdIntel Sovereign operates as a standalone system. Register a district Canvas or Clever instance to enable Single Sign-On (SSO).
                </p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="px-5 py-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-sm font-semibold transition"
                >
                  Register Canvas Key
                </button>
              </div>
            ) : (
              platforms.map((plat) => (
                <div 
                  key={plat.id} 
                  className="rounded-3xl border border-white/10 bg-white/[0.01] p-6 backdrop-blur-xl hover:border-white/20 transition duration-300"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-2xl font-semibold">{plat.platformName || "LMS Platform"}</h3>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold tracking-[1px] uppercase">
                          ACTIVE SSO
                        </span>
                      </div>
                      <div className="text-xs text-white/40 font-mono mt-1">Platform ID: {plat.id}</div>
                    </div>
                    <div className="text-right text-xs text-white/40 font-mono">
                      Connected: {new Date(plat.registeredAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 text-sm">
                    <div className="space-y-3 font-mono">
                      <div>
                        <span className="text-white/40 block text-xs tracking-[1px] uppercase mb-0.5">Platform Issuer (iss)</span>
                        <span className="text-white/80 text-xs break-all">{plat.issuer}</span>
                      </div>
                      <div>
                        <span className="text-white/40 block text-xs tracking-[1px] uppercase mb-0.5">Client ID</span>
                        <span className="text-white/80 text-xs break-all">{plat.clientId}</span>
                      </div>
                      {plat.deploymentId && (
                        <div>
                          <span className="text-white/40 block text-xs tracking-[1px] uppercase mb-0.5">Deployment ID</span>
                          <span className="text-white/80 text-xs break-all">{plat.deploymentId}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3 font-mono">
                      <div>
                        <span className="text-white/40 block text-xs tracking-[1px] uppercase mb-0.5">JWKS Endpoint URL</span>
                        <span className="text-white/80 text-xs break-all truncate block" title={plat.jwksUrl}>{plat.jwksUrl}</span>
                      </div>
                      <div>
                        <span className="text-white/40 block text-xs tracking-[1px] uppercase mb-0.5">Authorization URL</span>
                        <span className="text-white/80 text-xs break-all truncate block" title={plat.authLoginUrl}>{plat.authLoginUrl}</span>
                      </div>
                      <div>
                        <span className="text-white/40 block text-xs tracking-[1px] uppercase mb-0.5">Access Token URL</span>
                        <span className="text-white/80 text-xs break-all truncate block" title={plat.authTokenUrl}>{plat.authTokenUrl}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
