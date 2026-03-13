import type React from "react"

const AiCodeReviews: React.FC = () => {
  

  return (
    <div
      className="bento-illustration-container"
      role="img"
      aria-label="AI Code Reviews interface showing code suggestions with apply buttons"
    >
      {/* Background Message Box (Blurred) */}
      <div className="bento-review-box-bg">
        <div
          className="border rounded-lg bg-card"
          style={{
            padding: "7.355px 8.826px",
            height: "100%",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              fontFamily: "'Geist Mono', 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
              fontSize: "9.562px",
              lineHeight: "14.711px",
              letterSpacing: "-0.2942px",
              color: "hsl(var(--muted-foreground))",
              width: "100%",
              maxWidth: "320px",
              margin: 0,
            }}
          >
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}>switch (type) {"{"}</p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}> case 'success':</p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}> return {"{"}</p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}>
              {"          border: theme === 'dark' ? 'border-[rgba(34,197,94,0.4)]' : 'border-green-200',"}
            </p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}> icon: (</p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}>
              {'            <svg className={\'baseIconClasses\'} fill="none" viewBox="0 0 14 14">'}
            </p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}> &lt;path</p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}>
              {'                d="M3.85156 7.875L6.47656 10.5L10.8516 3.5"'}
            </p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}>
              {'                stroke="var(--ai-primary-color)"'}
            </p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}>
              {'                strokeLinecap="round"'}
            </p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}>
              {'                strokeLinejoin="round"'}
            </p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}>{'                strokeWidth="1.5"'}</p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}> /&gt;</p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}> &lt;/svg&gt;</p>
          </div>
        </div>
      </div>

      {/* Foreground Message Box (Main) */}
      <div className="bento-review-box-main">
        <div
          className="bg-card border border-border"
          style={{
            padding: "9.488px",
            height: "100%",
            boxSizing: "border-box",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              width: "100%",
              top: "47.67px",
              height: "33.118px",
              background: "hsl(var(--foreground) / 0.08)",
              zIndex: 1,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              width: "100%",
              top: "80.791px",
              height: "45.465px",
              background: "var(--ai-highlight-primary)",
              zIndex: 1,
            }}
          />
          <div
            style={{
              fontFamily: "'Geist Mono', 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
              fontSize: "10.279px",
              lineHeight: "15.814px",
              letterSpacing: "-0.3163px",
              color: "var(--ai-text-color)",
              width: "100%",
              maxWidth: "320px",
              position: "relative",
              zIndex: 2,
              margin: 0,
            }}
          >
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}>switch (type) {"{"}</p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}> case 'success':</p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}> return {"{"}</p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}>
              {"          border: theme === 'dark' ? 'border-[rgba(34,197,94,0.4)]' : 'border-green-200',"}
            </p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}> icon: (</p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}>
              {'            <svg className={\'baseIconClasses\'} fill="none" viewBox="0 0 14 14">'}
            </p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}> &lt;path</p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}>
              {'                d="M3.85156 7.875L6.47656 10.5L10.8516 3.5"'}
            </p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}>{'                stroke="#22C55E"'}</p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}>
              {'                strokeLinecap="round"'}
            </p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}>
              {'                strokeLinejoin="round"'}
            </p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}>{'                strokeWidth="1.5"'}</p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}> /&gt;</p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}> &lt;/svg&gt;</p>
          </div>
          <button className="bento-apply-button">
            <span
              style={{
                fontFamily: "'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontWeight: 500,
              }}
            >
              Apply changes
            </span>
            <span
              style={{
                fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
                fontWeight: 500,
              }}
            >
              ⌘Y
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AiCodeReviews
