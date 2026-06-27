import sys

sys.stdout.reconfigure(encoding='utf-8')

with open(r"C:\Users\nivla\.gemini\antigravity\brain\1c0f09cc-df32-45a9-ab19-1fbca4819220\scratch\grok_scraped_clean.md", "r", encoding="utf-8") as f:
    text = f.read()

# Let's search for where "logSocialLoginSuccess" is defined or used
import re
matches = [m.start() for m in re.finditer("logSocialLoginSuccess", text)]
for m in matches:
    start_line = text.count('\n', 0, m)
    print(f"Match found around line {start_line + 1}:")
    lines_around = text.split('\n')[max(0, start_line-10):min(len(text.split('\n')), start_line+20)]
    for j, line in enumerate(lines_around):
        print(f"  {max(0, start_line-10) + j + 1}: {line}")
    print("-" * 50)
