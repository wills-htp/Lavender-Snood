"""Builds index.html by inserting src/toons.js into src/game.tpl.html."""
from pathlib import Path
root = Path(__file__).parent
tpl = (root / "src/game.tpl.html").read_text()
toons = (root / "src/toons.js").read_text()
music = (root / "src/music.js").read_text()
config = (root / "src/config.js").read_text()
friends = (root / "src/friends.js").read_text()
(root / "index.html").write_text(tpl.replace("__TOONS__", toons).replace("__MUSIC__", music).replace("__CONFIG__", config).replace("__FRIENDS__", friends))
print("Built index.html")
