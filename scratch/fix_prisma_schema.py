import sys
import re

def process_prisma_schema(content):
    # Regex to find models and enums
    model_regex = re.compile(r'(model|enum)\s+(\w+)\s+\{')
    
    lines = content.splitlines()
    new_lines = []
    
    i = 0
    while i < len(lines):
        line = lines[i]
        new_lines.append(line)
        
        match = model_regex.search(line)
        if match:
            # We found a model or enum. Find its closing brace.
            type_name = match.group(1)
            name = match.group(2)
            
            # Skip if it's already in the auth schema (though in our previous version none were)
            # Find the end of this block
            block_end_index = -1
            for j in range(i + 1, len(lines)):
                if lines[j].strip() == '}':
                    block_end_index = j
                    break
            
            if block_end_index != -1:
                # Check if it already has @@schema
                has_schema = False
                for j in range(i + 1, block_end_index):
                    if '@@schema' in lines[j]:
                        has_schema = True
                        break
                
                if not has_schema:
                    # Insert @@schema("public") before the closing brace
                    # We'll do this when we reach the closing brace
                    pass
        
        if line.strip() == '}' and i > 0:
            # Check the previous lines for this block
            # This is a bit naive but should work for a typical prisma file
            # We'll just look back to the nearest model/enum start
            start_index = -1
            for j in range(i - 1, -1, -1):
                if model_regex.search(lines[j]):
                    start_index = j
                    break
                if lines[j].strip() == '}': # Entered another block
                    break
            
            if start_index != -1:
                # Check if this block already has @@schema
                has_schema = False
                for j in range(start_index + 1, i):
                    if '@@schema' in lines[j]:
                        has_schema = True
                        break
                
                if not has_schema:
                    # Insert @@schema("public")
                    # Pop the '}' we just added
                    new_lines.pop()
                    new_lines.append('  @@schema("public")')
                    new_lines.append('}')
        
        i += 1
        
    return '\n'.join(new_lines)

if __name__ == "__main__":
    file_path = "prisma/schema.prisma"
    with open(file_path, "r") as f:
        content = f.read()
    
    processed = process_prisma_schema(content)
    
    with open(file_path, "w") as f:
        f.write(processed)
    print("Prisma schema updated with @@schema attributes.")
