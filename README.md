# Lavender-Snood
Lavender boys and friends play snood.

The game is a lavender, psychedelic bubble shooter where the pieces are cartoon versions of the crew. Open `index.html` in a browser to play: drag to aim, let go to launch, and match 3 or more of the same face to pop them.

## Files

| File | What it is |
|---|---|
| `index.html` | The playable game. It's built, so don't edit it by hand. |
| `src/toons.js` | The cartoon crew. Each friend is one line in the `TOONS` list. |
| `src/game.tpl.html` | Game logic, layout and styling. |
| `build.py` | Rebuilds `index.html` from the two `src` files. |
| `cast.html` | Preview sheet that shows every cartoon at a large size. |

After editing anything in `src/`, run `python3 build.py`.

## Adding or changing a friend

Add a line to `TOONS` in `src/toons.js`:

```js
{name:'Sam', color:'#ff8a1f', shape:'egg', hair:'curly', hc:'#3a2a1e', glasses:'round', facial:'beard', fc:'#3a2a1e', mouth:'grin', eyes:'happy'},
```

| Option | Values |
|---|---|
| `shape` | pill, octagon, egg, shield, squircle, bell, scallop, oval, thin, blob |
| `hair` | curly, swept, crop, shag, short, side, wavy, medwavy, longwavy, long, messy, bowl, buzz, bald, fringe |
| `hat` | cap, flat, beret (with `hatc` for the hat color, `brimc` for a contrasting brim) |
| `glasses` | round, rect, sun |
| `facial` | stubble, mustache, goatee, beard, bigbeard (with `fc` for the color) |
| `mouth` | flat, smile, grin, toothy, open, talk, oh, smirk |
| `eyes` | normal, happy, calm, wide, squint |

`hc` sets the hair color. `skin` sets the face tone, and the friend's game `color` becomes the disc behind the head. `brow` and `browW` set eyebrow color and thickness, and `nose` sets nose size (1 is normal). Each friend's `color` should be one that isn't already taken.

## How a level works

Each level uses a random lineup of up to 8 friends. It starts with 4 and adds one every two levels. Specials (Wildcard, Stone) show up from level 2, and Skull blockers from level 3.
