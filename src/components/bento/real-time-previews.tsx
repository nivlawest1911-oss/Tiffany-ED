"use client"

import type React from "react"

const RealtimeCodingPreviews: React.FC = () => {
  

  return (
    <div
      className="bento-illustration-container"
      role="img"
      aria-label="Realtime Coding Previews interface showing split-screen code editor and live preview"
    >
      {/* Left Panel - Code Editor */}
      <div className="bento-panel-editor" data-name="code-editor">
        <div className="bento-editor-content">
          <div className="bento-code-text">
            {['switch (type) {', " case 'success':", ' return {', " border: theme === 'dark' ? 'border-[rgba(34,197,94,0.4)]' : 'border-green-200',", ' icon: (', ' <svg className={"baseIconClasses"} fill="none" viewBox="0 0 14 14">', ' <path', ' d="M3.85156 7.875L6.47656 10.5L10.8516 3.5"', ' stroke="var(--realtime-primary-color)"', ' strokeLinecap="round"', ' strokeLinejoin="round"', ' strokeWidth="1.5"', ' />', ' </svg>'].map((line, i) => (
              <p key={i} className="bento-code-line whitespace-pre-wrap font-normal block">{line}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Live Preview */}
      <div
        className="bento-panel-editor"
        data-name="preview-panel"
      >
        <div className="bento-preview-panel">
          {/* Download Button - Exact positioning from Figma */}
          <div className="bento-macos-button">
            <div className="bento-macos-text">
              Download for macOS
            </div>
          </div>
        </div>
      </div>

      {/* Connection Line - Exact positioning from Figma */}
      <div className="bento-connection-wrap">
        {/* This div now directly contains the SVG for the vertical line */}
        <div className="bento-connection-line">
          <svg
            width="2"
            height="285.088"
            viewBox="0 0 2 285.088"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="bento-connection-svg"
          >
            <defs>
              <linearGradient id="connectionGradient" x1="1" y1="0" x2="1" y2="285.088" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--realtime-primary-color)" stopOpacity="0" />
                <stop offset="0.5" stopColor="var(--realtime-primary-color)" />
                <stop offset="1" stopColor="var(--realtime-primary-color)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M1 0V285.088" stroke="url(#connectionGradient)" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* Live Recording Indicator */}

      {/* Sync Indicator at connection point */}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

export default RealtimeCodingPreviews
