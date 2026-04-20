import os

src_dir = r'c:\Users\nivla\edintel-app\src'

for root, dirs, files in os.walk(src_dir):
    # Skip the generated directory itself to avoid circular references or unnecessary edits
    if 'generated' in root:
        continue
        
    for file in files:
        if file.endswith(('.ts', '.tsx')):
            file_path = os.path.join(root, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Replace @prisma/client with @/generated/prisma
            # Handling both single and double quotes
            new_content = content.replace("'@prisma/client'", "'@/generated/prisma'")
            new_content = new_content.replace('"@prisma/client"', '"@/generated/prisma"')
            
            if content != new_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated imports in {file_path}")
