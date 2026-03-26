import os

target_icons = ["Atom", "Dna", "Orbit", "Clock", "LayoutGrid"]
matches = []

for root, dirs, files in os.walk("src"):
    for file in files:
        if file.endswith((".tsx", ".ts")):
            path = os.path.join(root, file)
            try:
                with open(path, "r", encoding="utf-8") as f:
                    content = f.read()
                    found = [icon for icon in target_icons if icon in content]
                    if len(found) >= 3:
                        matches.append((path, found))
            except:
                pass

for path, found in matches:
    print(f"{path}: {found}")
