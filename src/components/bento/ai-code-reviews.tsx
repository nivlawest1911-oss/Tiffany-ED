import type React from "react"

const AiCodeReviews: React.FC = () => {
  

  return (
    <div className="bento-illustration-container">
      {/* Background Message Box (Blurred) */}
      <div className="bento-review-box-bg">
        <div className="border rounded-lg bg-card bento-review-inner-bg">
          <div className="bento-review-code-bg">
            <p className="bento-review-code-line">switch (type) {"{"}</p>
            <p className="bento-review-code-line"> case 'success':</p>
            <p className="bento-review-code-line"> return {"{"}</p>
            <p className="bento-review-code-line">
              {"          border: theme === 'dark' ? 'border-[rgba(34,197,94,0.4)]' : 'border-green-200',"}
            </p>
            <p className="bento-review-code-line"> icon: (</p>
            <p className="bento-review-code-line">
              {'            <svg className={\'baseIconClasses\'} fill="none" viewBox="0 0 14 14">'}
            </p>
            <p className="bento-review-code-line"> &lt;path</p>
            <p className="bento-review-code-line">
              {'                d="M3.85156 7.875L6.47656 10.5L10.8516 3.5"'}
            </p>
            <p className="bento-review-code-line">
              {'                stroke="var(--ai-primary-color)"'}
            </p>
            <p className="bento-review-code-line">
              {'                strokeLinecap="round"'}
            </p>
            <p className="bento-review-code-line">
              {'                strokeLinejoin="round"'}
            </p>
            <p className="bento-review-code-line">{'                strokeWidth="1.5"'}</p>
            <p className="bento-review-code-line"> /&gt;</p>
            <p className="bento-review-code-line"> &lt;/svg&gt;</p>
          </div>
        </div>
      </div>

      {/* Foreground Message Box (Main) */}
      <div className="bento-review-box-main">
        <div className="bg-card border border-border bento-review-inner-main">
          <div className="bento-review-highlight-overlay" />
          <div className="bento-review-highlight-primary" />
          <div className="bento-review-code-main">
            <p className="bento-review-code-line">switch (type) {"{"}</p>
            <p className="bento-review-code-line"> case 'success':</p>
            <p className="bento-review-code-line"> return {"{"}</p>
            <p className="bento-review-code-line">
              {"          border: theme === 'dark' ? 'border-[rgba(34,197,94,0.4)]' : 'border-green-200',"}
            </p>
            <p className="bento-review-code-line"> icon: (</p>
            <p className="bento-review-code-line">
              {'            <svg className={\'baseIconClasses\'} fill="none" viewBox="0 0 14 14">'}
            </p>
            <p className="bento-review-code-line"> &lt;path</p>
            <p className="bento-review-code-line">
              {'                d="M3.85156 7.875L6.47656 10.5L10.8516 3.5"'}
            </p>
            <p className="bento-review-code-line">{'                stroke="#22C55E"'}</p>
            <p className="bento-review-code-line">
              {'                strokeLinecap="round"'}
            </p>
            <p className="bento-review-code-line">
              {'                strokeLinejoin="round"'}
            </p>
            <p className="bento-review-code-line">{'                strokeWidth="1.5"'}</p>
            <p className="bento-review-code-line"> /&gt;</p>
            <p className="bento-review-code-line"> &lt;/svg&gt;</p>
          </div>
          <button className="bento-apply-button" title="Apply code changes" aria-label="Apply code changes">
            <span className="bento-apply-text">
              Apply changes
            </span>
            <span className="bento-apply-kbd">
              âŒ˜Y
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AiCodeReviews
