import os
import subprocess
import time

edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
proto_dir = os.path.abspath(r"design\wireframes\prototype")
shots_dir = os.path.abspath(r"design\wireframes\screenshots")
os.makedirs(shots_dir, exist_ok=True)

configs = [
    # (output_name, source_file, shift_y, width, height, description)
    ("corporate-home-top.png", "corporate-home.html", 0, 1440, 900, "Corporate Homepage — Top (Hero & Nav)"),
    ("corporate-home-middle.png", "corporate-home.html", -1400, 1440, 900, "Corporate Homepage — Middle (Pillars & Services)"),
    ("corporate-home-bottom.png", "corporate-home.html", -3200, 1440, 900, "Corporate Homepage — Bottom (Intake Form & Footer)"),
    ("academy-home-top.png", "academy-home.html", 0, 1440, 900, "Academy Homepage — Top (Hero & Nav)"),
    ("academy-home-middle.png", "academy-home.html", -1200, 1440, 900, "Academy Homepage — Middle (Programmes & Methodology)"),
    ("academy-home-bottom.png", "academy-home.html", -2600, 1440, 900, "Academy Homepage — Bottom (Tuition, Sponsors & Apply CTA)"),
    ("corporate-services.png", "corporate-services.html", 0, 1440, 900, "Corporate Services Overview"),
    ("academy-programmes.png", "academy-programmes.html", 0, 1440, 900, "Academy Programmes Directory"),
    ("corporate-home-mobile.png", "corporate-home.html", 0, 390, 844, "Mobile Corporate Homepage (390px)"),
    ("academy-home-mobile.png", "academy-home.html", 0, 390, 844, "Mobile Academy Homepage (390px)"),
]

for name, src, shift_y, w, h, desc in configs:
    src_path = os.path.join(proto_dir, src)
    with open(src_path, "r", encoding="utf-8") as f:
        html = f.read()

    if shift_y != 0:
        injection = f"<style>body {{ margin-top: {shift_y}px !important; }}</style></head>"
        temp_html = html.replace("</head>", injection)
    else:
        temp_html = html

    temp_file = os.path.join(proto_dir, f"_temp_{name}.html")
    with open(temp_file, "w", encoding="utf-8") as f:
        f.write(temp_html)

    out_file = os.path.join(shots_dir, name)
    file_url = "file:///" + temp_file.replace("\\", "/")

    args = [
        edge_path,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        f"--window-size={w},{h}",
        f"--screenshot={out_file}",
        file_url
    ]
    subprocess.run(args, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if os.path.exists(temp_file):
        os.remove(temp_file)

    size = os.path.getsize(out_file) if os.path.exists(out_file) else 0
    print(f"{name:30} | {size:8} bytes | {desc}")
