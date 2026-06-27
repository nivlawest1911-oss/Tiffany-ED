import re

with open(r"C:\Users\nivla\.gemini\antigravity\brain\1c0f09cc-df32-45a9-ab19-1fbca4819220\scratch\grok_scraped_clean.md", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "afterSignIn" in line or "logAuditEvent" in line:
        print(f"Line {i+1}: {line.strip()[:150]}")
