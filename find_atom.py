
import os

search_dir = r'c:\Users\nivla\edintel-app\src'
target = 'atom'

for root, dirs, files in os.walk(search_dir):
    for file in files:
        if file.endswith(('.tsx', '.ts', '.css', '.scss')):
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    for i, line in enumerate(f, 1):
                        if target in line.lower():
                            print(f"{path}:{i}: {line.strip()}")
            except Exception as e:
                pass
