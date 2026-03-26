import os
import re

target_icons = ["Atom", "Dna", "Orbit", "Clock", "LayoutGrid"]
search_dir = r"C:\Users\nivla\edintel-app\src"

results = []

# Regex to find: import { ... } from 'lucide-react'
import_re = re.compile(r"import\s+\{([^}]+)\}\s+from\s+['\"]lucide-react['\"]")

for root, dirs, files in os.walk(search_dir):
    for file in files:
        if file.endswith(('.tsx', '.ts', '.js', '.jsx')):
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    match = import_re.search(content)
                    if match:
                        imported_icons = [i.strip() for i in match.group(1).split(',')]
                        found = [icon for icon in target_icons if icon in imported_icons]
                        if found:
                            results.append((path, found))
            except Exception:
                continue

results.sort(key=lambda x: len(x[1]), reverse=True)

for path, found in results:
    print(f"{path}: {', '.join(found)}")
