import os
import re

target_icons = ["Atom", "Dna", "Orbit", "Clock", "LayoutGrid"]
matches = []

# Regex to find icons in { icon1, icon2 } from 'lucide-react'
import_re = re.compile(r"import\s+\{(.*?)\}\s+from\s+['\"]lucide-react['\"]", re.DOTALL)

for root, dirs, files in os.walk("src"):
    for file in files:
        if file.endswith((".tsx", ".ts")):
            path = os.path.join(root, file)
            try:
                with open(path, "r", encoding="utf-8") as f:
                    content = f.read()
                    import_matches = import_re.findall(content)
                    for match in import_matches:
                        icons = [i.strip() for i in match.split(",")]
                        found = [i for i in icons if i in target_icons]
                        if found:
                            matches.append((path, found))
            except:
                pass

for path, found in matches:
    print(f"{path}: {found}")
