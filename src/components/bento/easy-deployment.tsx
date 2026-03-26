import type React from "react"

interface DeploymentEasyProps {
  /** Width of component – number (px) or any CSS size value */
  width?: number | string
  /** Height of component – number (px) or any CSS size value */
  height?: number | string
  /** Extra Tailwind / CSS classes for root element */
  className?: string
}

const DeploymentEasy: React.FC<DeploymentEasyProps> = ({ className = "" }) => {
  /* ------------------------------------------------------------
   * Theme-based design tokens using global CSS variables
   * ---------------------------------------------------------- */

  /* ------------------------------------------------------------
   * Console log output (static for demo) – can be replaced via props
   * ---------------------------------------------------------- */
  const logLines = [
    "[16:37:25.637] Running build in Washington, D.C., USA (East) – iad1",
    "[16:37:25.638] Build machine configuration: 2 cores, 8 GB",
    "[16:37:25.653] Retrieving list of deployment files...",
    "[16:37:25.741] Previous build caches not available",
    "[16:37:25.979] Downloading 84 deployment files...",
    '[16:37:29.945] Running "vercel build"',
    "[16:37:30.561] Vercel CLI 44.5.0",
    '[16:37:30.880] Running "install" command: `bun install`...',
    "[16:37:30.914] bun install v1.2.19 (aad3abea)",
    "[16:37:30.940] Resolving dependencies",
    "[16:37:34.436] Resolved, downloaded and extracted [1116]",
    '[16:37:34.436] warn: incorrect peer dependency "react@19.1.0"',
    "[16:37:37.265] Saved lockfile",
    "[16:37:39.076] Next.js anonymous telemetry notice",
    "[16:37:39.137] ▲ Next.js 15.2.4",
    "[16:37:41.439] ✓ Compiled successfully",
    "[16:37:53.979] ✓ Generated static pages",
    "[16:38:00.585] ○ (Static) prerendered as static content",
    "[16:38:01.099] Build Completed in /vercel/output [30s]",
    "🚀 Deployment complete – Easy!",
  ]

  return (
    <div
      className={`bento-illustration-container flex items-center justify-center p-4 ${className}`}
    >
      {/* -------------------------------------------------------- */}
      {/* Console / Terminal panel                                */}
      {/* -------------------------------------------------------- */}
      <div className="bento-console-panel">
        {/* Inner translucent panel – replicates subtle overlay */}
        <div className="bento-console-inner" />

        {/* Log text */}
        <div className="bento-console-text">
          {logLines.map((line, index) => (
            <p key={index} className="m-0">
              {line}
            </p>
          ))}
        </div>

        {/* Inner border overlay */}
        <div className="bento-overlay-border" />
      </div>

      {/* -------------------------------------------------------- */}
      {/* Call-to-action button                                   */}
      {/* -------------------------------------------------------- */}
      <button className="bento-deploy-button">
        🚀 Deploy on Vercel
      </button>
    </div>
  )
}

export default DeploymentEasy
