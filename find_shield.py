
import os
import re

def check_files():
    path = 'src/data/generators.ts'
    if not os.path.exists(path): return
    
    with open(path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    for i, line in enumerate(lines):
        # Look for Shield as a whole word, not preceded by 'as ' and not followed by 'Alert' etc.
        if re.search(r'\bShield\b', line) and 'as LucideShield' not in line and 'ShieldAlert' not in line and 'ShieldCheck' not in line:
            print(f"Match on line {i+1}: {line.strip()}")

if __name__ == "__main__":
    check_files()
