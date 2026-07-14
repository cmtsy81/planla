import os
import re
import json

workspace_dir = os.path.dirname(os.path.abspath(__file__))
docs_dir = os.path.join(workspace_dir, "docs")
output_js_path = os.path.join(workspace_dir, "src", "js", "modules_data.js")

os.makedirs(os.path.dirname(output_js_path), exist_ok=True)

def parse_yaml(yaml_text):
    meta = {}
    current_key = None
    for line in yaml_text.splitlines():
        line_strip = line.strip()
        if not line_strip:
            continue
        if line_strip.startswith("- "):
            # It's a list item
            val = line_strip[2:].strip().strip('"').strip("'")
            if current_key in meta and isinstance(meta[current_key], list):
                meta[current_key].append(val)
        elif ":" in line_strip:
            parts = line_strip.split(":", 1)
            key = parts[0].strip()
            val = parts[1].strip()
            if val == "":
                meta[key] = []
                current_key = key
            else:
                val = val.strip('"').strip("'")
                if val.isdigit():
                    val = int(val)
                meta[key] = val
                current_key = None
    return meta

def parse_inline_markdown(text):
    # Bold **text**
    text = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', text)
    # Inline code `code`
    text = re.sub(r'`(.*?)`', r'<code>\1</code>', text)
    # Markdown links [text](url)
    text = re.sub(r'\[(.*?)\]\((.*?)\)', r'<a href="\2" target="_blank">\1</a>', text)
    return text

def markdown_to_html(md):
    html = []
    in_list = False
    in_alert = False
    alert_type = ""
    alert_lines = []
    
    # Pre-split to simplify line-by-line parsing
    lines = md.splitlines()
    for line in lines:
        line_strip = line.strip()
        
        # Handle Alerts starting with > [!
        if line_strip.startswith("> [!"):
            if in_list:
                html.append("</ul>")
                in_list = False
            in_alert = True
            alert_type = line_strip.replace("> [!", "").replace("]", "").strip().lower()
            alert_lines = []
            continue
        elif in_alert and line_strip.startswith(">"):
            # Accumulate alert content line
            alert_lines.append(line_strip[1:].strip())
            continue
        elif in_alert and not line_strip.startswith(">"):
            # Alert block ended
            alert_html = markdown_to_html("\n".join(alert_lines))
            html.append(f'<div class="pt-alert pt-alert-{alert_type}">{alert_html}</div>')
            in_alert = False
            
        # Lists starting with -
        if line_strip.startswith("- "):
            if not in_list:
                html.append('<ul class="pt-list">')
                in_list = True
            item_text = parse_inline_markdown(line_strip[2:])
            html.append(f'<li>{item_text}</li>')
            continue
        else:
            if in_list:
                html.append("</ul>")
                in_list = False
                
        # Headings
        if line_strip.startswith("### "):
            html.append(f'<h3 class="pt-h3">{parse_inline_markdown(line_strip[4:])}</h3>')
        elif line_strip.startswith("## "):
            html.append(f'<h2 class="pt-h2">{parse_inline_markdown(line_strip[3:])}</h2>')
        elif line_strip.startswith("# "):
            html.append(f'<h1 class="pt-h1">{parse_inline_markdown(line_strip[2:])}</h1>')
        elif not line_strip:
            # We don't render excessive spacing
            pass
        else:
            # Paragraph
            html.append(f'<p class="pt-p">{parse_inline_markdown(line_strip)}</p>')
            
    if in_list:
        html.append("</ul>")
    if in_alert:
        alert_html = markdown_to_html("\n".join(alert_lines))
        html.append(f'<div class="pt-alert pt-alert-{alert_type}">{alert_html}</div>')
        
    return "\n".join(html)

def compile_modules():
    if not os.path.exists(docs_dir):
        print(f"Error: {docs_dir} directory does not exist.")
        return
        
    modules = []
    files = sorted([f for f in os.listdir(docs_dir) if f.endswith(".md")])
    
    for filename in files:
        filepath = os.path.join(docs_dir, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
            
        # Parse YAML frontmatter
        yaml_match = re.match(r'^---\s*\n(.*?)\n---\s*\n(.*)', content, re.DOTALL)
        if yaml_match:
            yaml_text = yaml_match.group(1)
            body_text = yaml_match.group(2)
            meta = parse_yaml(yaml_text)
            
            # Add HTML and raw MD to metadata
            meta["html"] = markdown_to_html(body_text)
            meta["markdown"] = body_text
            meta["filename"] = filename
            
            modules.append(meta)
        else:
            print(f"Warning: File {filename} does not contain valid frontmatter.")
            
    # Write to modules_data.js
    js_content = f"// Bu dosya update_modules_data.py tarafindan otomatik olusturulmustur. ELLE DEGISTIRMEYIN.\n"
    js_content += f"const PLAN_TATIL_MODULES = {json.dumps(modules, ensure_ascii=False, indent=4)};\n\n"
    js_content += "if (typeof module !== 'undefined' && module.exports) {\n"
    js_content += "    module.exports = PLAN_TATIL_MODULES;\n"
    js_content += "}\n"
    
    with open(output_js_path, "w", encoding="utf-8") as f:
        f.write(js_content)
        
    print(f"Compilation completed successfully! Output: {output_js_path}")
    print(f"Total modules compiled: {len(modules)}")

if __name__ == "__main__":
    compile_modules()
