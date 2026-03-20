import os

target_icons = ['Atom', 'Dna', 'Orbit', 'Clock', 'LayoutGrid', 'Brain', 'Zap']
src_dir = 'src'

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith(('.tsx', '.ts', '.js', '.jsx')):
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    matches = [icon for icon in target_icons if icon in content]
                    if len(matches) >= 3:
                        print(f"File: {path} matches {len(matches)} icons: {', '.join(matches)}")
            except Exception:
                pass
