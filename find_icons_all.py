import os

target_icons = ["Atom", "Dna", "Orbit", "Clock", "LayoutGrid"]

def search_files(directory):
    matches = []
    for root, dirs, files in os.walk(directory):
        if "node_modules" in dirs:
            dirs.remove("node_modules")
        if ".next" in dirs:
            dirs.remove(".next")
            
        for file in files:
            if file.endswith((".tsx", ".ts", ".js", ".jsx", ".md")):
                path = os.path.join(root, file)
                try:
                    with open(path, "r", encoding="utf-8") as f:
                        content = f.read()
                        found = [icon for icon in target_icons if icon in content]
                        if len(found) >= 2:
                            matches.append((path, found))
                except Exception:
                    pass
    return matches

results = search_files("C:\\Users\\nivla\\edintel-app")
with open("C:\\Users\\nivla\\edintel-app\\icon_matches.txt", "w", encoding="utf-8") as out:
    for path, found in results:
        out.write(f"{path}: {found}\n")
