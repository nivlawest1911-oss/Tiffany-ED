
import os

search_dir = r'c:\Users\nivla\edintel-app\src'
target_icons = ['atom', 'dna', 'orbit', 'clock', 'layoutgrid']

results = []

for root, dirs, files in os.walk(search_dir):
    for file in files:
        if file.endswith(('.tsx', '.ts', '.css', '.scss')):
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read().lower()
                    found = [icon for icon in target_icons if icon in content]
                    if len(found) >= 3:
                        results.append((path, found))
            except Exception as e:
                pass

for path, found in results:
    print(f"{path}: {found}")
