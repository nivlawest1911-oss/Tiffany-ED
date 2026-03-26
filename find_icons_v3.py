import os

def find_files_with_icons(directory, icons):
    matches = []
    for root, dirs, files in os.walk(directory):
        if 'node_modules' in root or '.next' in root:
            continue
        for file in files:
            if file.endswith(('.tsx', '.ts', '.js', '.jsx')):
                path = os.path.join(root, file)
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        content = f.read()
                        found_icons = [icon for icon in icons if icon in content]
                        if len(found_icons) >= 3:
                            matches.append((path, found_icons))
                except Exception:
                    pass
    return matches

target_icons = ["Atom", "Dna", "Orbit", "Clock", "LayoutGrid"]
matches = find_files_with_icons('C:/Users/nivla/edintel-app/src', target_icons)

for path, icons in matches:
    print(f"File: {path}")
    print(f"Icons found: {', '.join(icons)}")
    print("-" * 20)
