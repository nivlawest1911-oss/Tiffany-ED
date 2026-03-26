import os

def find_icons():
    target_icons = ["Atom", "Dna", "Orbit", "Clock", "LayoutGrid"]
    root_dir = r"C:\Users\nivla\edintel-app\src"
    
    matches = []
    
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith((".tsx", ".ts", ".js", ".jsx")):
                path = os.path.join(root, file)
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        content = f.read()
                        found = [icon for icon in target_icons if icon in content]
                        if len(found) >= 2:
                            matches.append((path, found))
                except Exception as e:
                    pass
    
    matches.sort(key=lambda x: len(x[1]), reverse=True)
    
    for path, found in matches:
        print(f"{path}: {found}")

if __name__ == "__main__":
    find_icons()
