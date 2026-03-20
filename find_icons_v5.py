import os
import re

target_icons = ["Atom", "Dna", "Orbit", "Clock", "LayoutGrid"]
matches = {}

for root, dirs, files in os.walk("src"):
    for file in files:
        if file.endswith((".tsx", ".ts")):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
                found = []
                for icon in target_icons:
                    if icon in content:
                        found.append(icon)
                if len(found) >= 2:
                    matches[path] = found

for path, found in sorted(matches.items(), key=lambda x: len(x[1]), reverse=True):
    print(f"{path}: {', '.join(found)}")
