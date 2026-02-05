
// Antigravity Content Script: sovereign-listener.js

window.addEventListener("message", (event) => {
    // Security: Only accept messages from your EdIntel domain
    if (event.source !== window || event.data.type !== "SOVEREIGN_EXECUTE") return;

    const { tier, targetPortal } = event.data;

    console.log(`%c [Antigravity] Sovereign Signal Received: ${tier}`, "color: #f59e0b; font-weight: bold;");

    // Protocol Logic
    if (tier === "Site Command" || tier === "Director Pack") {
        // START AUTOMATION
        // Note: 'chrome' API is only available in extension context.
        // If this script is injected as a content script, it can message the background script.
        if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
            chrome.runtime.sendMessage({
                action: "START_NAVIGATION",
                url: targetPortal
            });
        } else {
            console.warn("[Antigravity] Chrome Runtime not detected. Ensure extension is active.");
        }
    } else {
        alert("Neural Authorization Failed: This protocol requires Site Command elevation.");
    }
});

// ANTIGRAVITY KILL SIGNAL LISTENER
window.addEventListener("message", (event) => {
    if (event.source !== window) return;

    if (event.data.type === "ANTIGRAVITY_KILL_SIGNAL") {
        // 1. Tell the background script to stop all automation
        if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
            chrome.runtime.sendMessage({ action: "STOP_ALL_TASKS" }, (_response) => {
                console.log("%c [Antigravity] Process Terminated.", "color: red;");

                // 2. Visual feedback: Flash the screen red briefly to confirm the kill
                document.body.style.border = "4px solid red";
                setTimeout(() => document.body.style.border = "none", 500);
            });
        }
    }
});
