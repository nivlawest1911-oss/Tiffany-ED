import sys

sys.stdout.reconfigure(encoding='utf-8')

with open(r"C:\Users\nivla\.gemini\antigravity\brain\1c0f09cc-df32-45a9-ab19-1fbca4819220\scratch\grok_scraped_clean.md", "r", encoding="utf-8") as f:
    lines = f.readlines()

for idx in range(9800, 10320):
    if idx < len(lines):
        print(f"{idx+1}: {lines[idx].rstrip()}")
