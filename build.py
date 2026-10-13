"""Assemble src/ into a single self-contained index.html (for GitHub Pages)."""
import glob, os, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
src = lambda *p: os.path.join(ROOT, "src", *p)

css = open(src("style.css"), encoding="utf-8").read()
body = open(src("body.html"), encoding="utf-8").read()
js = "\n".join(open(f, encoding="utf-8").read() for f in sorted(glob.glob(src("js", "*.js"))))

head = """<title>GD&amp;T Trainer</title>
<meta name="description" content="Learn engineering drawings and GD&amp;T from zero: lessons, annotated example drawings, symbols, quiz, bonus tolerance calculator.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@400;500;600&display=swap">
<style>
""" + css + "</style>\n"

script = "<script>\n(function () {\n" + js + "\n})();\n</script>\n"

page = head + body + "\n" + script
full = ('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
        + head + "</head>\n<body>\n" + body + "\n" + script + "</body>\n</html>\n")

open(os.path.join(ROOT, "index.html"), "w", encoding="utf-8").write(full)
if len(sys.argv) > 1:
    open(sys.argv[1], "w", encoding="utf-8").write(page)
print("index.html", len(full), "bytes")
