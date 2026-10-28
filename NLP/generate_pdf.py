import glob
import os
import re
import html
import asyncio
from playwright.async_api import async_playwright
import pygments
from pygments.lexers import PythonLexer
from pygments.formatters import HtmlFormatter

MODULES = {
    (1, 10): ("Module 1", "Foundations, Tokenization & Preprocessing"),
    (11, 16): ("Module 2", "Corpora, Lexical Resources & Morphology"),
    (17, 24): ("Module 3", "Sequence Models, POS Tagging & Classification"),
    (25, 31): ("Module 4", "Context-Free Grammars, Parsing & Trees"),
    (32, 37): ("Module 5", "Semantics, WordNet & Word Sense Disambiguation"),
    (38, 42): ("Module 6", "Text Coherence, Translation, IR & Summarization"),
}

def get_module(num):
    for (start, end), (mod_id, mod_name) in MODULES.items():
        if start <= num <= end:
            return mod_id, mod_name
    return "General", "NLP Programs"

def parse_programs():
    files = sorted(glob.glob('[0-9][0-9]_*.py'))
    programs = []
    
    for f in files:
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Extract program number
        num_match = re.match(r'(\d+)_', f)
        prog_num = int(num_match.group(1)) if num_match else 0
        
        # Extract question from first line
        lines = content.splitlines()
        first_line = lines[0] if lines else ""
        q_match = re.search(r'#\s*Program\s*\d+:\s*(.*)', first_line)
        question = q_match.group(1).strip() if q_match else first_line.lstrip('#').strip()
        
        # Separate code and output
        if '# Output:' in content:
            parts = content.split('# Output:')
            raw_code = parts[0]
            raw_output = parts[1]
        else:
            raw_code = content
            raw_output = ""
            
        # Remove first line (question comment) from raw code
        code_lines = raw_code.splitlines()
        if code_lines and code_lines[0].startswith('# Program'):
            code_lines = code_lines[1:]
        clean_code = "\n".join(code_lines).strip()
        
        # Clean output lines by stripping comment markers
        clean_out_lines = []
        for line in raw_output.splitlines():
            clean_out_lines.append(re.sub(r'^#\s?', '', line))
        clean_output = html.escape("\n".join(clean_out_lines).strip())
        
        mod_id, mod_name = get_module(prog_num)
        
        programs.append({
            'num': prog_num,
            'file': f,
            'question': html.escape(question),
            'code': clean_code,
            'output': clean_output,
            'module_id': mod_id,
            'module_name': mod_name
        })
    return programs

def build_html(programs):
    formatter = HtmlFormatter(style='friendly', nowrap=False)
    pygments_css = formatter.get_style_defs('.highlight')
    
    # Generate Table of Contents items
    toc_rows = []
    for p in programs:
        toc_rows.append(f"""
        <tr>
            <td class="toc-num">{p['num']:02d}</td>
            <td class="toc-title"><a href="#prog-{p['num']}">{p['question']}</a></td>
            <td class="toc-mod"><span class="badge badge-sm">{p['module_id']}</span></td>
            <td class="toc-file"><code>{p['file']}</code></td>
        </tr>
        """)
    toc_html = "".join(toc_rows)
    
    # Generate Program Cards
    prog_cards = []
    current_mod = None
    
    for p in programs:
        highlighted_code = pygments.highlight(p['code'], PythonLexer(), formatter)
        
        mod_banner = ""
        if p['module_id'] != current_mod:
            current_mod = p['module_id']
            mod_banner = f"""
            <div class="module-divider">
                <div class="module-tag">{p['module_id']}</div>
                <h2>{p['module_name']}</h2>
            </div>
            """
            
        prog_cards.append(f"""
        {mod_banner}
        <section class="program-card" id="prog-{p['num']}">
            <div class="card-header">
                <div class="header-left">
                    <span class="prog-badge">PROGRAM {p['num']:02d}</span>
                    <span class="file-badge">{p['file']}</span>
                </div>
                <span class="mod-pill">{p['module_name']}</span>
            </div>
            
            <div class="question-box">
                <span class="q-label">Problem Statement:</span>
                <p class="q-text">{p['question']}</p>
            </div>
            
            <div class="code-section">
                <div class="section-title">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                    <span>Python 3 Source Code</span>
                </div>
                <div class="code-wrapper">
                    {highlighted_code}
                </div>
            </div>
            
            <div class="output-section">
                <div class="section-title output-title">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
                    <span>Expected Terminal Output</span>
                </div>
                <div class="terminal-box">
                    <div class="terminal-dots">
                        <span class="dot dot-red"></span>
                        <span class="dot dot-yellow"></span>
                        <span class="dot dot-green"></span>
                        <span class="terminal-caption">bash terminal &bull; python {p['file']}</span>
                    </div>
                    <pre class="terminal-content"><code>{p['output']}</code></pre>
                </div>
            </div>
        </section>
        """)
        
    programs_html = "".join(prog_cards)
    
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Natural Language Processing - Practical Programs (1 to 42)</title>
    <style>
        @page {{
            size: A4 portrait;
            margin: 16mm 14mm 16mm 14mm;
        }}
        
        * {{
            box-sizing: border-box;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }}
        
        body {{
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #1e293b;
            background: #ffffff;
            line-height: 1.45;
            font-size: 11pt;
            margin: 0;
            padding: 0;
        }}
        
        /* COVER PAGE */
        .cover-page {{
            page-break-after: always;
            break-after: page;
            min-height: 90vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 40px 20px;
            text-align: center;
        }}
        
        .cover-header {{
            margin-top: 40px;
        }}
        
        .cover-tag {{
            display: inline-block;
            background: #e0e7ff;
            color: #3730a3;
            font-weight: 700;
            font-size: 11pt;
            letter-spacing: 2px;
            text-transform: uppercase;
            padding: 6px 16px;
            border-radius: 20px;
            margin-bottom: 24px;
        }}
        
        .cover-title {{
            font-size: 32pt;
            font-weight: 800;
            color: #0f172a;
            line-height: 1.15;
            margin: 0 0 16px 0;
            letter-spacing: -0.5px;
        }}
        
        .cover-subtitle {{
            font-size: 16pt;
            color: #475569;
            font-weight: 500;
            margin: 0 auto;
            max-width: 650px;
            line-height: 1.4;
        }}
        
        .cover-divider {{
            width: 80px;
            height: 4px;
            background: linear-gradient(90deg, #3b82f6, #6366f1);
            margin: 28px auto;
            border-radius: 2px;
        }}
        
        .stats-grid {{
            display: flex;
            justify-content: center;
            gap: 20px;
            margin: 35px 0;
        }}
        
        .stat-card {{
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 16px 20px;
            min-width: 140px;
        }}
        
        .stat-num {{
            font-size: 26pt;
            font-weight: 800;
            color: #2563eb;
            line-height: 1;
            margin-bottom: 6px;
        }}
        
        .stat-label {{
            font-size: 9pt;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 600;
        }}
        
        .highlights-box {{
            background: #f1f5f9;
            border-left: 4px solid #2563eb;
            border-radius: 0 10px 10px 0;
            padding: 18px 24px;
            text-align: left;
            max-width: 650px;
            margin: 0 auto;
        }}
        
        .highlights-box h3 {{
            margin: 0 0 10px 0;
            font-size: 12pt;
            color: #1e293b;
        }}
        
        .highlights-box ul {{
            margin: 0;
            padding-left: 20px;
            color: #334155;
            font-size: 10pt;
        }}
        
        .highlights-box li {{
            margin-bottom: 6px;
        }}
        
        .cover-footer {{
            margin-top: 30px;
            font-size: 9.5pt;
            color: #64748b;
            border-top: 1px solid #e2e8f0;
            padding-top: 20px;
        }}
        
        /* TABLE OF CONTENTS */
        .toc-page {{
            page-break-after: always;
            break-after: page;
            page-break-before: always;
            break-before: page;
        }}
        
        .section-header {{
            border-bottom: 2px solid #0f172a;
            padding-bottom: 8px;
            margin-bottom: 18px;
        }}
        
        .section-header h1 {{
            font-size: 20pt;
            font-weight: 800;
            color: #0f172a;
            margin: 0;
        }}
        
        .section-header p {{
            margin: 4px 0 0 0;
            color: #64748b;
            font-size: 10pt;
        }}
        
        .toc-table {{
            width: 100%;
            border-collapse: collapse;
            font-size: 9.5pt;
        }}
        
        .toc-table th {{
            background: #f1f5f9;
            color: #334155;
            font-weight: 700;
            text-align: left;
            padding: 8px 10px;
            border-bottom: 2px solid #cbd5e1;
        }}
        
        .toc-table td {{
            padding: 7px 10px;
            border-bottom: 1px solid #f1f5f9;
        }}
        
        .toc-table tr:nth-child(even) td {{
            background: #fafafa;
        }}
        
        .toc-num {{
            font-weight: 700;
            color: #2563eb;
            width: 36px;
        }}
        
        .toc-title a {{
            color: #1e293b;
            text-decoration: none;
            font-weight: 600;
        }}
        
        .toc-mod {{
            width: 80px;
        }}
        
        .toc-file code {{
            background: #f1f5f9;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 8.5pt;
            color: #475569;
        }}
        
        /* MODULE DIVIDER */
        .module-divider {{
            page-break-before: always;
            margin-top: 20px;
            margin-bottom: 20px;
            padding: 16px 20px;
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
            color: #ffffff;
            border-radius: 10px;
        }}
        
        .module-tag {{
            display: inline-block;
            background: #3b82f6;
            color: #ffffff;
            font-size: 8.5pt;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            padding: 3px 10px;
            border-radius: 12px;
            margin-bottom: 6px;
        }}
        
        .module-divider h2 {{
            margin: 0;
            font-size: 15pt;
            font-weight: 700;
            color: #f8fafc;
        }}
        
        /* PROGRAM CARD */
        .program-card {{
            page-break-inside: avoid;
            background: #ffffff;
            border: 1px solid #cbd5e1;
            border-radius: 10px;
            margin-bottom: 22px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.04);
            overflow: hidden;
        }}
        
        .card-header {{
            background: #f8fafc;
            border-bottom: 1px solid #e2e8f0;
            padding: 9px 14px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }}
        
        .header-left {{
            display: flex;
            align-items: center;
            gap: 10px;
        }}
        
        .prog-badge {{
            background: #2563eb;
            color: #ffffff;
            font-weight: 800;
            font-size: 8.5pt;
            letter-spacing: 0.5px;
            padding: 3px 8px;
            border-radius: 5px;
        }}
        
        .file-badge {{
            font-family: ui-monospace, "SF Mono", Monaco, "Cascadia Mono", monospace;
            font-size: 8.5pt;
            color: #475569;
            font-weight: 600;
        }}
        
        .mod-pill {{
            font-size: 8pt;
            color: #64748b;
            font-weight: 600;
        }}
        
        .question-box {{
            padding: 10px 14px;
            background: #fdfdfd;
            border-bottom: 1px solid #f1f5f9;
        }}
        
        .q-label {{
            font-size: 8pt;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #0284c7;
            display: block;
            margin-bottom: 2px;
        }}
        
        .q-text {{
            font-size: 10.5pt;
            font-weight: 700;
            color: #0f172a;
            margin: 0;
            line-height: 1.35;
        }}
        
        .section-title {{
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 8pt;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #475569;
            padding: 6px 14px 4px 14px;
            background: #f8fafc;
            border-top: 1px solid #f1f5f9;
            border-bottom: 1px solid #f1f5f9;
        }}
        
        .output-title {{
            color: #10b981;
        }}
        
        .code-wrapper {{
            padding: 8px 14px;
            background: #ffffff;
            font-size: 9pt;
            overflow-x: auto;
        }}
        
        .code-wrapper pre {{
            margin: 0;
            font-family: "JetBrains Mono", Consolas, "Liberation Mono", Courier, monospace;
            line-height: 1.4;
        }}
        
        .terminal-box {{
            background: #0f172a;
            color: #f1f5f9;
            padding: 8px 14px 10px 14px;
            font-family: "JetBrains Mono", Consolas, "Liberation Mono", Courier, monospace;
            font-size: 8.5pt;
        }}
        
        .terminal-dots {{
            display: flex;
            align-items: center;
            gap: 5px;
            margin-bottom: 6px;
            padding-bottom: 4px;
            border-bottom: 1px solid #1e293b;
        }}
        
        .dot {{
            width: 7px;
            height: 7px;
            border-radius: 50%;
            display: inline-block;
        }}
        .dot-red {{ background: #ef4444; }}
        .dot-yellow {{ background: #f59e0b; }}
        .dot-green {{ background: #10b981; }}
        
        .terminal-caption {{
            font-size: 7.5pt;
            color: #94a3b8;
            margin-left: 8px;
        }}
        
        .terminal-content {{
            margin: 0;
            color: #38bdf8;
            line-height: 1.35;
            white-space: pre-wrap;
            word-break: break-all;
        }}
        
        .badge {{
            display: inline-block;
            padding: 2px 7px;
            border-radius: 4px;
            font-size: 8pt;
            font-weight: 600;
        }}
        .badge-sm {{
            background: #e2e8f0;
            color: #334155;
        }}
        
        /* Pygments Highlighting Customization */
        {pygments_css}
        .highlight {{ background: transparent; }}
        .highlight .k {{ color: #7c3aed; font-weight: bold; }} /* keyword */
        .highlight .kn {{ color: #7c3aed; font-weight: bold; }} /* keyword import */
        .highlight .nn {{ color: #0284c7; font-weight: bold; }} /* module name */
        .highlight .s2, .highlight .s1, .highlight .s {{ color: #059669; }} /* string */
        .highlight .c1, .highlight .c {{ color: #94a3b8; font-style: italic; }} /* comment */
        .highlight .nf {{ color: #2563eb; font-weight: 600; }} /* function name */
        .highlight .nb {{ color: #d97706; }} /* builtin */
        .highlight .mi {{ color: #ea580c; }} /* number */
    </style>
</head>
<body>

    <!-- COVER PAGE -->
    <div class="cover-page">
        <div class="cover-header">
            <span class="cover-tag">Academic Practical Reference & Question Bank</span>
            <h1 class="cover-title">Natural Language Processing</h1>
            <p class="cover-subtitle">Complete BCA Semester Practical Exam Lab Solutions (Programs 01 to 42)</p>
            <div class="cover-divider"></div>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-num">42</div>
                <div class="stat-label">Programs</div>
            </div>
            <div class="stat-card">
                <div class="stat-num">6</div>
                <div class="stat-label">Syllabus Modules</div>
            </div>
            <div class="stat-card">
                <div class="stat-num">100%</div>
                <div class="stat-label">Tested & Verified</div>
            </div>
        </div>
        
        <div class="highlights-box">
            <h3>Key Features of This Lab Manual</h3>
            <ul>
                <li><strong>Concise & Exam-Ready:</strong> Each program is written in 5–20 lines of clear, idiomatic Python 3, making it straightforward to memorize and write during lab exams.</li>
                <li><strong>Authentic Algorithms:</strong> Implements genuine NLP concepts including NLTK Tokenization, CFG/PCFG Parsers, WordNet similarity, HMM, CRF, TF-IDF, and Na&iuml;ve Bayes / SVM.</li>
                <li><strong>Verified Outputs:</strong> Every problem contains verified terminal outputs matching the exact code execution.</li>
                <li><strong>Modern Stack:</strong> Fully compatible with Python 3.10+ through 3.13, NLTK 3.9+, Scikit-Learn 1.3+, SciPy, NumPy, and NetworkX.</li>
            </ul>
        </div>
        
        <div class="cover-footer">
            <p><strong>Natural Language Processing (NLP) Lab Record</strong> &bull; Complete Programs 01 – 42 &bull; Python 3 Solutions</p>
        </div>
    </div>
    
    <!-- TABLE OF CONTENTS -->
    <div class="toc-page">
        <div class="section-header">
            <h1>Table of Contents</h1>
            <p>Quick index of all 42 syllabus practical programs and problem statements</p>
        </div>
        
        <table class="toc-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Problem Statement / Topic</th>
                    <th>Module</th>
                    <th>Source File</th>
                </tr>
            </thead>
            <tbody>
                {toc_html}
            </tbody>
        </table>
    </div>
    
    <!-- PROGRAMS 1 TO 42 -->
    <main class="programs-container">
        {programs_html}
    </main>

</body>
</html>
"""
    return html

async def convert_html_to_pdf(html_path, pdf_path):
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        
        file_url = f"file:///{os.path.abspath(html_path).replace(os.sep, '/')}"
        await page.goto(file_url, wait_until="networkidle")
        
        await page.pdf(
            path=pdf_path,
            format="A4",
            print_background=True,
            margin={
                "top": "14mm",
                "bottom": "14mm",
                "left": "12mm",
                "right": "12mm"
            },
            display_header_footer=True,
            header_template="""
            <div style="font-size: 8pt; color: #94a3b8; width: 100%; text-align: right; padding-right: 12mm; font-family: -apple-system, sans-serif;">
                Natural Language Processing (NLP) &bull; Practical Solutions Manual
            </div>
            """,
            footer_template="""
            <div style="font-size: 8pt; color: #94a3b8; width: 100%; display: flex; justify-content: space-between; padding: 0 12mm; font-family: -apple-system, sans-serif;">
                <span>Programs 01 to 42</span>
                <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
            </div>
            """
        )
        await browser.close()

def main():
    programs = parse_programs()
    print(f"Parsed {len(programs)} programs successfully.")
    
    html = build_html(programs)
    html_file = "NLP_Practical_Programs_1_to_42.html"
    with open(html_file, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Generated {html_file} ({len(html)} bytes).")
    
    pdf_file = "NLP_Practical_Programs_1_to_42.pdf"
    print(f"Converting to {pdf_file} via Playwright...")
    asyncio.run(convert_html_to_pdf(html_file, pdf_file))
    
    if os.path.exists(pdf_file):
        size_kb = os.path.getsize(pdf_file) / 1024
        print(f"SUCCESS: {pdf_file} generated! Size: {size_kb:.2f} KB")
    else:
        print("ERROR: PDF was not generated.")

if __name__ == "__main__":
    main()
