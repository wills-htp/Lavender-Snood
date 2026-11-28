# Lavender-Snood
Lavender boys and friends play snood.

The game is a lavender, psychedelic bubble shooter where the pieces are cartoon versions of the crew. Play it at **https://wills-htp.github.io/Lavender-Snood/** (GitHub Pages), or open `index.html` in a browser: drag to aim, let go to launch, and match 3 or more of the same face to pop them.

## Files

| File | What it is |
|---|---|
| `index.html` | The playable game. It's built, so don't edit it by hand. |
| `src/toons.js` | The cartoon crew. Each friend is one line in the `TOONS` list. |
| `src/game.tpl.html` | Game logic, layout and styling. |
| `src/friends.js` | The "Add a friend" screen: makes a cartoon from a photo by measuring it (no AI). |
| `src/music.js` | The soundtrack: original mellow minimal techno, synthesized live in the browser. |
| `build.py` | Rebuilds `index.html` from the `src` files. |
| `cast.html` | Preview sheet that shows every cartoon at a large size. |

After editing anything in `src/`, run `python3 build.py`.

## Adding or changing a friend

Add a line to `TOONS` in `src/toons.js`:

```js
{name:'Sam', color:'#ff8a1f', face:'#ff8a1f', accent:'#ffffff', shape:'egg', hair:'curly', hc:'#3a2a1e', glasses:'round', facial:'beard', fc:'#3a2a1e', mouth:'grin', eyes:'happy'},
```

| Option | Values |
|---|---|
| `shape` | pill, octagon, egg, shield, squircle, bell, scallop, oval, thin, chisel, rect, blob |
| `hair` | curly, tightcurl, swept, crop, shag, wisps, tousled, blondtop, short, side, wavy, medwavy, longwavy, long, messy, bowl, buzz, bald, fringe |
| `hat` | cap, flat, knit, beret (with `hatc` for the hat color, `brimc` for a contrasting brim) |
| `glasses` | round, rect, thick, sun |
| `facial` | stubble, mustache, goatee, beard, bigbeard (with `fc` for the color) |
| `mouth` | flat, smile, grin, toothy, open, talk, oh, smirk, tongue |
| `eyes` | normal, happy, calm, wide, squint |

`hc` sets the hair color. `face` sets the main face color and `accent` the second color (ears, nose, inner rim). `pattern` can be wood, metal or rainbow. `brow` and `browW` set eyebrow color and thickness, and `nose` sets nose size (1 is normal). Each friend's `color` should be one that isn't already taken.

## Scoring

Pops are 10 each. Drops score much more and grow with how many fall at once; dropped faces of a different color than your shot earn extra. Bouncing your shot off a wall first is a bank shot: +50% for one bounce, double for two or more. Clearing a board in fewer shots earns a bonus.

## How a level works

Each level uses a random lineup of the crew. Difficulty ramps slowly:

- Starting rows: 5 on level 1, one more every 2 levels, up to 9 (level 9).
- Faces in play: 4 on levels 1-2, 5 on levels 3-6, then one more every 2 levels, up to 8.
- The roof drops a little after every shot; it gets about 4% faster each level, up to level 12.
- A big drop (6 or more) pushes the roof back up half a row; a mega drop (12 or more), a full row.
- Wildcards and Stones show up from level 2, along with Gilles (half as often as a Wildcard): his line of flight tears a jagged path up through 5 to 10 guys, ignoring color, and Skulls (never in the top row) from level 3.
