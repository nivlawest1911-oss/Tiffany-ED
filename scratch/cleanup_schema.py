import os

file_path = r'c:\Users\nivla\edintel-app\prisma\schema.prisma'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = [line for line in lines if '@@schema' not in line]

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print(f"Successfully removed @@schema from {len(lines) - len(new_lines)} lines.")
