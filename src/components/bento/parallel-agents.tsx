import type React from "react"

interface ParallelCodingAgentsProps {
  className?: string
}

const ParallelCodingAgents: React.FC<ParallelCodingAgentsProps> = ({ className = "" }) => {
  // Theme-based CSS variables using global theme
  

  const CheckmarkIcon = () => (
    <svg
      width="13.885"
      height="13.885"
      viewBox="0 0 14 14"
      fill="none"
      style={{ width: "13.885px", height: "13.885px" }}
    >
      <path
        d="M3.85156 7.875L6.47656 10.5L10.8516 3.5"
        stroke="var(--pca-text-primary)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        opacity="0.8"
      />
    </svg>
  )

  const RefreshIcon = () => (
    <svg
      width="13.885"
      height="13.885"
      viewBox="0 0 14 14"
      fill="none"
      style={{ width: "13.885px", height: "13.885px" }}
    >
      <path
        d="M1.75 7C1.75 4.1005 4.1005 1.75 7 1.75C9.8995 1.75 12.25 4.1005 12.25 7C12.25 9.8995 9.8995 12.25 7 12.25"
        stroke="var(--pca-text-primary)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        opacity="0.8"
      />
      <path
        d="M4.375 10.5L1.75 12.25L3.5 9.625"
        stroke="var(--pca-text-primary)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        opacity="0.8"
      />
    </svg>
  )

  const SparklesIcon = () => (
    <svg
      width="13.885"
      height="13.885"
      viewBox="0 0 14 14"
      fill="none"
      style={{ width: "13.885px", height: "13.885px" }}
    >
      <path
        d="M7 1.75L8.225 5.775L12.25 7L8.225 8.225L7 12.25L5.775 8.225L1.75 7L5.775 5.775L7 1.75Z"
        stroke="var(--pca-text-primary)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        opacity="0.8"
      />
    </svg>
  )

  const agents = [
    {
      icon: <CheckmarkIcon />,
      title: "Update buttons",
      tokens: "12k tokens",
      model: "o3",
      branch: "pointer/update-pain...",
    },
    {
      icon: <RefreshIcon />,
      title: "Fix sanity issue",
      tokens: "12k tokens",
      model: "claude-sonnet-4",
      branch: "pointer/update-pain...",
    },
    {
      icon: <SparklesIcon />,
      title: "Plan for seamless toast",
      tokens: "30k tokens",
      model: "o3",
      branch: "pointer/update-pain...",
    },
  ]

  return (
    <div
      className={`bento-illustration-container ${className}`}
      role="img"
      aria-label="Parallel coding agents working on different tasks simultaneously"
    >
      {/* Inner content area with gradient background */}
      <div
        className="bento-agent-card"
          >
            {/* Icon container */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "8.658px",
                padding: "3.247px 0 0 0",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: "17.316px",
                  height: "17.316px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                {agent.icon}
              </div>
            </div>
            {/* Content container */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                gap: "2.164px",
                padding: "0",
                flexShrink: 0,
                ...(index === 1
                  ? {
                      flexBasis: 0,
                      flexGrow: 1,
                      minHeight: "1px",
                      minWidth: "1px",
                    }
                  : {}),
              }}
            >
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: "10.823px",
                  lineHeight: "17.316px",
                  color: "var(--pca-text-primary)",
                  whiteSpace: "pre",
                  flexShrink: 0,
                }}
              >
                {agent.title}
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: "10.823px",
                  lineHeight: "17.316px",
                  color: "var(--pca-text-secondary)",
                  whiteSpace: index === 1 ? "nowrap" : "pre",
                  overflow: index === 1 ? "hidden" : "visible",
                  textOverflow: index === 1 ? "ellipsis" : "clip",
                  width: index === 1 ? "100%" : "auto",
                  minWidth: index === 1 ? "100%" : "auto",
                  flexShrink: 0,
                }}
              >
                {`${agent.tokens} • ${agent.model} • ${agent.branch}`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ParallelCodingAgents
