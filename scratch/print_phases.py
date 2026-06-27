import sys

sys.stdout.reconfigure(encoding='utf-8')

with open(r"C:\Users\nivla\.gemini\antigravity\brain\1c0f09cc-df32-45a9-ab19-1fbca4819220\scratch\grok_scraped_clean.md", "r", encoding="utf-8") as f:
    lines = f.readlines()

def print_range(start_idx, end_idx):
    for idx in range(start_idx, end_idx):
        if idx < len(lines):
            print(f"{idx+1}: {lines[idx].rstrip()}")

print("--- PHASE 15 ---")
print_range(1920, 1980)
print("\n--- PHASE 23 ---")
print_range(4035, 4100)
