import os
import subprocess

edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
proto_dir = os.path.abspath(r"design\wireframes\prototype")
shots_dir = os.path.abspath(r"design\wireframes\screenshots")

with open(os.path.join(proto_dir, "corporate-home.html"), "r", encoding="utf-8") as f:
    content = f.read()

shifted_middle = content.replace("</head>", "<style>body { margin-top: -1300px !important; }</style></head>")
test_html = os.path.join(proto_dir, "test_shift.html")
with open(test_html, "w", encoding="utf-8") as f:
    f.write(shifted_middle)

out = os.path.join(shots_dir, "corporate-home-middle.png")
file_url = "file:///" + test_html.replace("\\", "/")

args = [
    edge_path,
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--window-size=1440,900",
    f"--screenshot={out}",
    file_url
]
subprocess.run(args)
size = os.path.getsize(out) if os.path.exists(out) else 0
print("Middle shifted screenshot size:", size)
if os.path.exists(test_html):
    os.remove(test_html)
