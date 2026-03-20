import os
import re

target_icons = ["atom", "dna", "orbit", "clock", "layoutgrid"]
search_dir = r"C:\Users\nivla\edintel-app\src"

results = []

for root, dirs, files in os.walk(search_dir):
    for file in files:
        if file.endswith(('.tsx', '.ts', '.js', '.jsx', '.css', '.svg', '.json')):
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read().lower()
                    matches = [icon for icon in target_icons if icon in content]
                    if len(matches) >= 3:
                        results.append((path, matches))
            except Exception:
                continue

results.sort(key=lambda x: len(x[1]), reverse=True)

for path, matches in results:
    print(f"{path}: {len(matches)} matches ({', '.join(matches)})")
