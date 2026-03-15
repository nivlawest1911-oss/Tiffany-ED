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
      className="bento-svg-icon"
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
      className="bento-svg-icon"
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
      className="bento-svg-icon"
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
    <div className={`bento-illustration-container ${className}`}>
      {/* Inner content area with gradient background */}
      <div
        className="bento-illustration-inner bento-illustration-inner-flex"
      >
        {agents.map((agent, index) => (
          <div
            key={index}
            className="bento-agent-card"
          >
            {/* Icon container */}
            <div className="bento-agent-icon-wrap">
              <div className="bento-agent-icon-container">
                {agent.icon}
              </div>
            </div>
            {/* Content container */}
            <div
              className={`bento-agent-content-wrap ${index === 1 ? "bento-agent-content-grow" : ""}`}
            >
              <div className="bento-agent-title">
                {agent.title}
              </div>
              <div className={`bento-agent-subtitle ${index === 1 ? "bento-agent-subtitle-truncated" : ""}`}>
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
