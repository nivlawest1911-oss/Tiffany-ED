import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

with open(r"C:\Users\nivla\.gemini\antigravity\brain\1c0f09cc-df32-45a9-ab19-1fbca4819220\scratch\grok_scraped_clean.md", "r", encoding="utf-8") as f:
    text = f.read()

# Let's search for lines starting with Markdown headers and see if they contain "Phase" or similar milestones
matches = re.finditer(r'^(#+)\s*(.*Phase.*|.*Hardening.*|.*Step.*|.*Task.*|.*Promoting.*)', text, re.IGNORECASE | re.MULTILINE)
for m in matches:
    start_line = text.count('\n', 0, m.start())
    print(f"Line {start_line+1}: {m.group(0)}")
