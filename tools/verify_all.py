import os
import sys
import json
import re

if sys.stdout.encoding.lower() != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

def verify_all():
    errors = []
    warnings = []

    print("=== CE452 GIS LABORATORY COURSEWARE VERIFICATION SUITE ===")

    # 1. Verify sessions.json
    print("\n[1/5] Checking sessions.json...")
    if not os.path.exists('sessions.json'):
        errors.append("sessions.json missing")
        return errors, warnings

    try:
        with open('sessions.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
    except Exception as e:
        errors.append(f"Failed to parse sessions.json: {e}")
        return errors, warnings

    course = data.get('course', {})
    if course.get('code') != "CE452":
        errors.append(f"Incorrect course code: {course.get('code')}")
    if course.get('instructor') != "Dr Sirisha Uppaluri":
        errors.append(f"Instructor altered: {course.get('instructor')}")
    if course.get('co_instructor') != "Dr Arpan Pradhan":
        errors.append(f"Co-Instructor altered: {course.get('co_instructor')}")

    labs = data.get('labs', [])
    if len(labs) != 15:
        errors.append(f"Expected 15 laboratory exercises, found {len(labs)}")

    pages = data.get('pages', [])
    if len(pages) < 4:
        errors.append(f"Expected at least 4 administrative pages, found {len(pages)}")

    print(f"✓ sessions.json valid: {len(labs)} labs, {len(pages)} pages, instructor verified.")

    # 2. Check Labs
    print("\n[2/5] Checking laboratory markdown files (L01 to L15)...")
    for lab in labs:
        lid = lab.get('id')
        fpath = lab.get('file', f"labs/{lid}.md")
        if not os.path.exists(fpath):
            errors.append(f"Lab file missing: {fpath}")
            continue

        with open(fpath, 'r', encoding='utf-8') as f:
            c = f.read()
        if len(c.strip()) < 200:
            errors.append(f"Lab {lid} file content is suspiciously short ({len(c)} chars)")
        if not re.search(r'#\s+Lab', c):
            warnings.append(f"Lab {lid} missing primary H1 header")

    print(f"✓ Checked {len(labs)} lab markdown files.")

    # 3. Check Administrative Pages
    print("\n[3/5] Checking administrative pages (setup, pbl, assessment, references)...")
    for page in pages:
        pid = page.get('id')
        fpath = page.get('file', f"pages/{pid}.md")
        if not os.path.exists(fpath):
            errors.append(f"Page file missing: {fpath}")
            continue

        with open(fpath, 'r', encoding='utf-8') as f:
            c = f.read()
        if len(c.strip()) < 100:
            errors.append(f"Page {pid} content is too short")

    print(f"✓ Checked {len(pages)} administrative page files.")

    # 4. Check Build Assets
    print("\n[4/5] Checking web build assets...")
    required_assets = [
        'index.html',
        'assets/style.css',
        'assets/fieldbook.css',
        'assets/vendor/marked.min.js',
        'assets/vendor/katex/katex.min.css',
        'assets/vendor/katex/katex.min.js'
    ]
    for asset in required_assets:
        if not os.path.exists(asset):
            errors.append(f"Required web asset missing: {asset}")

    if not os.path.exists('assets/app.js'):
        warnings.append("assets/app.js has not been built yet. Run 'node tools/build.js'")

    print(f"✓ Checked required static and vendor assets.")

    # 5. Check Git Config
    print("\n[5/5] Checking repository deployment configuration...")
    if not os.path.exists('.nojekyll'):
        errors.append(".nojekyll missing (required for GitHub Pages)")
    if not os.path.exists('.gitignore'):
        warnings.append(".gitignore missing")

    print(f"✓ Verified GitHub Pages deployment config.")

    return errors, warnings

if __name__ == '__main__':
    errs, warns = verify_all()
    print("\n=== VERIFICATION RESULTS ===")
    if warns:
        for w in warns:
            print(f"⚠ WARNING: {w}")
    if errs:
        for e in errs:
            print(f"❌ ERROR: {e}")
        print(f"\nFailed with {len(errs)} error(s).")
        sys.exit(1)
    else:
        print("🎉 ZERO ERRORS FOUND! All laboratory manuals and configurations pass verification!")
        sys.exit(0)
