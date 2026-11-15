import os
import subprocess
import time

edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
base_dir = os.path.abspath(r"design\wireframes")
shots_dir = os.path.join(base_dir, "screenshots")
os.makedirs(shots_dir, exist_ok=True)

targets = [
    ("corporate-home-top.png", "corporate-home.html", 1440, 900),
    ("corporate-home-middle.png", "corporate-home.html?scroll=services", 1440, 900),
    ("corporate-home-bottom.png", "corporate-home.html?scroll=intake", 1440, 900),
    ("academy-home-top.png", "academy-home.html", 1440, 900),
    ("academy-home-middle.png", "academy-home.html?scroll=programmes", 1440, 900),
    ("academy-home-bottom.png", "academy-home.html?scroll=apply", 1440, 900),
    ("corporate-services.png", "corporate-services.html", 1440, 900),
    ("academy-programmes.png", "academy-programmes.html", 1440, 900),
    ("corporate-home-mobile.png", "corporate-home.html", 390, 844),
    ("academy-home-mobile.png", "academy-home.html", 390, 844),
]

for filename, path_query, width, height in targets:
    out_file = os.path.join(shots_dir, filename)
    url = f"http://localhost:3000/{path_query}"
    args = [
        edge_path,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        f"--window-size={width},{height}",
        f"--screenshot={out_file}",
        url
    ]
    print(f"Capturing {filename} from {url} at {width}x{height}...")
    subprocess.run(args, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(0.8)

print("\nVerifying captured screenshots:")
all_ok = True
for filename, _, _, _ in targets:
    p = os.path.join(shots_dir, filename)
    exists = os.path.exists(p)
    size = os.path.getsize(p) if exists else 0
    status = "OK" if exists and size > 15000 else "FAILED"
    if status == "FAILED":
        all_ok = False
    print(f"{filename}: {status} ({size} bytes)")

print("\nALL SCREENSHOTS CAPTURED SUCCESSFULLY:" if all_ok else "\nSOME CAPTURES FAILED:")
