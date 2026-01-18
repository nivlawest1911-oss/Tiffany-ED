
import os
import re

def check_files():
    src_dir = 'src'
    for root, dirs, files in os.walk(src_dir):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Rule 1: If LucideShield is used, it must be aliased in the import
                # Use a more flexible regex for the import to handle multi-line and different spacing
                has_alias = re.search(r'import\s+\{.*?\bShield\s+as\s+LucideShield\b.*?\}\s+from\s+[\'"]lucide-react[\'"]', content, re.DOTALL)
                
                # Special case: files that export generators might use LucideShield
                # If it's used as a component or in an object, it must be defined.
                
                # Check for usage of LucideShield
                if 'LucideShield' in content:
                    if not has_alias and 'const LucideShield =' not in content and 'let LucideShield =' not in content:
                        print(f"MISSING IMPORT/ALIAS: LucideShield used in {path} but 'Shield as LucideShield' not found.")
                
                # Rule 2: If Shield is aliased to LucideShield, don't use Shield directly
                if has_alias:
                    # Look for <Shield or icon: Shield or other direct usages
                    # excluding the import line itself
                    lines = content.split('\n')
                    for i, line in enumerate(lines):
                        if 'import' in line: continue
                        if re.search(r'\bShield\b', line) and 'ShieldAlert' not in line and 'ShieldCheck' not in line:
                             print(f"NAKED SHIELD: 'Shield' used directly in {path}:{i+1} despite alias.")

if __name__ == "__main__":
    check_files()
