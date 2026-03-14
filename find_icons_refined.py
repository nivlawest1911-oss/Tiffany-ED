
import os
import re

search_dir = r'c:\Users\nivla\edintel-app\src\components'
target_icons = ['Atom', 'Dna', 'Orbit', 'Clock', 'LayoutGrid']

results = []

for root, dirs, files in os.walk(search_dir):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                found = [icon for icon in target_icons if icon in content]
                if len(found) >= 3:
                    results.append((path, found))

for path, found in results:
    print(f"{path}: {found}")
