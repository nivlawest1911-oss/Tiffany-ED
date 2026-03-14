
import os
import re

target_icons = ["Atom", "Dna", "Orbit", "Clock", "LayoutGrid"]
src_dir = r"c:\Users\nivla\edintel-app\src"

matches = []

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith((".tsx", ".ts", ".js", ".jsx")):
            file_path = os.path.join(root, file)
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()
                    found = [icon for icon in target_icons if re.search(r"\b" + icon + r"\b", content, re.IGNORECASE)]
                    if len(found) >= 2:
                        matches.append((file_path, found))
            except Exception:
                pass

matches.sort(key=lambda x: len(x[1]), reverse=True)

for path, icons in matches:
    print(f"{path}: {', '.join(icons)}")
