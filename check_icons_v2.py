import os
import re

def check_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    lines = content.split('\n')
    has_lucide_shield_usage = 'LucideShield' in content
    has_alias = 'Shield as LucideShield' in content
    
    if has_lucide_shield_usage and not has_alias:
        # Check if it's defined locally
        if 'const LucideShield =' not in content and 'function LucideShield' not in content:
            print(f"MISSING ALIAS: 'LucideShield' used in {path} but 'Shield as LucideShield' NOT found.")
            
    # Also check for naked Shield when alias IS present
    if has_alias:
        for i, line in enumerate(lines):
            if 'import' in line: continue
            # Look for <Shield or Shield. or icon: Shield
            if re.search(r'[^a-zA-Z]Shield[^a-zA-Z]', line) and 'ShieldAlert' not in line and 'ShieldCheck' not in line and 'as LucideShield' not in line:
                # If it's a property value like icon: Shield
                if re.search(r'icon:\s*Shield\b', line) or re.search(r'<\s*Shield\b', line):
                    print(f"NAKED SHIELD: 'Shield' used directly in {path}:{i+1} despite alias.")

def main():
    for root, dirs, files in os.walk('src'):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                check_file(os.path.join(root, file))

if __name__ == "__main__":
    main()
