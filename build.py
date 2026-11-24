"""Builds index.html by inserting src/toons.js into src/game.tpl.html."""
from pathlib import Path
root = Path(__file__).parent
tpl = (root / "src/game.tpl.html").read_text()
toons = (root / "src/toons.js").read_text()
(root / "index.html").write_text(tpl.replace("__TOONS__", toons))
print("Built index.html")
