# Design Desk

A browser game for PAI 785. Students design the Messiland Housing Stability Program with six choices on an "Ordinance" screen, then run it for two quarters of case cards, read the evaluators' memos, get one redesign, and end with a verdict letter: promoted, probation, or let go. Everything a student reads and every number lives in `content.json`; the engine is `index.html`. The original design document is `Design Desk — Game Design Document.md`.

## The files

- `index.html` — the whole game: layout, rules, indicator math, card stream, memos, end screen, export. The two pixel fonts are embedded, so it works offline. You should never need to edit this file to change content.
- `content.json` — all content and all numbers. Anything marked `PLACEHOLDER` was invented to make the game playable and should be rewritten.
- `test.js` — a headless test. Run `node test.js` in this folder; it plays three games to the end and checks the math and screens. Not needed to play.
- `README.md` — this file.

## Opening the game

The page reads `content.json` from the same folder. Browsers block that when you double-click a file, so:

1. **Host it** (best for class). Put `index.html` and `content.json` in a GitHub Pages repository or any web host and share the link. Blackboard's file area usually works if both files sit in the same folder.
2. **Double-click `index.html`.** The page will say it cannot read `content.json` and show a "choose file" button. Pick `content.json` and play.
3. **Local server** from this folder, then open <http://localhost:8000>:
   ```
   python -m http.server 8000
   ```

Progress is saved in the browser; a refresh does not lose a game. The start screen offers "Resume saved game" when one exists. "Restart" in the footer erases it. Space or Enter advances; keys 1 to 5 pick an answer.

## Instructor settings

Add `?instructor=1` to the address. A panel on the start screen lets you set the number of quarters, cards per quarter, decision cards per quarter, the Q2 fine-print unlock (opens income threshold and benefit cap at the redesign), and a pre-class design code. It builds a student link as you type; copy that link and share it. The panel also runs a content check and lists any broken references in `content.json`.

| Want | Link |
|---|---|
| Class default (2 quarters, 8 cards, 2 decisions) | `index.html` |
| With the Q2 fine-print unlock | `index.html?unlock=1` |
| Three quarters | `index.html?quarters=3` |
| Run the built-in self-test | `index.html?selftest=1` |

**Design codes.** The Ordinance screen shows a code such as `DD2-12-2-2-3-3`. A student who designs at home copies it; in class their partner types it on the start screen, or you put it in a link with `&code=DD2-12-2-2-3-3`. The six parts are, in order: problem, the two objectives (digits), payment, implementer, documentation, enforcement, each as the option's position in `content.json` (1 = first option).

**Seeds.** The seed code (default 10) decides which cards appear and in what order. Pairs with the same seed and design see the same cases.

## How the game computes what students see

Underneath, five indicators run 0 to 100 as in the design document: Reach, Burden, Equity, Fiscal integrity, Political support. Students see three plain results instead, defined in `setting.results`:

| Shown | From | Formula (editable) |
|---|---|---|
| Households helped, % of eligible | Reach | `reach` |
| "N in 10 applicants gave up" | Burden | `burden × 0.1` |
| Improper payments, % | Fiscal integrity | `20 − fiscal × 0.2` |
| Council votes to renew, of 5 | Political support | `political × 0.05` |

Each result has `scale` and `offset`; the value shown is `offset + scale × indicator`. Equity appears as the four group bars and the gap between best and worst served. The ending is chosen from `setting.endings` by Political support: 75 or more is promoted, 50 to 74 probation, under 50 let go. Lower the `min` values to make the game kinder.

**Promises.** Each objective in `choices` carries a `target`: a `metric` (a result id such as `helped` or `money`, a group id such as `g1`, or an indicator id such as `burden`), an `op` (`>=` or `<=`) and a `value`. The right-hand Promises panel shows each chosen objective as on track or missed during play. At the end, each missed promise costs `setting.missed_objective_penalty` points of Political support (20 points is one council vote, so the default of 10 is half a vote per missed promise).

**Budget.** `setting.budget` is a fixed appropriation of 100%. Each quarter spends `quarter_spend_at_reach50 × (Reach ÷ 50) × the product of the cost multipliers` of the active options; each option can carry a `cost` (1.0 is neutral, 1.5 spends half again as much, 0.7 spends less). When the remaining budget cannot cover the quarter, applicant cases from a certain point onward are stamped with `dry_result` and get `dry_effects`, and the quarter also takes `dry_quarter_effects`. To make the game easier, raise `quarter_spend_at_reach50` down or `total` up; to remove the budget entirely, delete the `budget` block.

Base effects of the six choices (plus the council's fixed settings) are applied once, when the ordinance passes: starting value `setting.baseline` plus the sum of `effects`. At the redesign, the difference between the old and new option is applied once. Modifiers (`modifiers`) and card effects apply at the end of each quarter in which they are active.

## Editing content.json

Open it in any text editor (VS Code and Notepad++ highlight mistakes). JSON is strict: every `"key": value` pair except the last in a block ends with a comma, strings use straight double quotes, no trailing commas. After saving, open the game with `?instructor=1` and read the "Content check" line. If the page says "content.json is not valid JSON" it names the line.

**Condition syntax**, used by `appears_when`, `when` and `condition`: a list of terms that must all be true. A term is an option id such as `"doc_full"`; write `"doc_self|doc_standard"` to mean either. `["any"]` or `[]` means always.

Option ids are under `choices`: `cs_*` problem (causal story), `gg_*` governing aim, `il_*` approach, `obj_*` objectives, `mix_*` payment, `imp_*` implementer, `it_*` income threshold, `cap_*` benefit cap, `dur_*` duration, `win_*` window, `elig_*` eligibility route, `doc_*` documentation, `enf_*` enforcement, `form_*` form length, `app_*` appeal window. The student chooses the six listed in `lite.choices`; the governing aim and approach are implied from the problem by `lite.implied`; the rest are fixed by `lite.council_defaults`.

### How to change an effect number

1. Find the option under `choices` (Full verification is `"id": "doc_full"` inside `documentation`).
2. Edit its `effects`: keys `reach`, `burden`, `fiscal`, `political`. Positive raises the indicator; for Burden higher is worse.
   ```json
   "effects": { "reach": -20, "burden": 25, "fiscal": 15, "political": 5 }
   ```
3. To change how an option treats a target group, edit `group_multipliers`: `1.0` neutral, `0.5` halves that group's reach, `1.3` raises it. Groups: `g1` families, `g2` elderly, `g3` mixed-status, `g4` landlords. This is how a setting moves Equity and the group bars.
4. Save and reload.

### How to add a card

Copy a card in `cards` and change it:

```json
{
  "id": "c40",
  "type": "applicant",
  "group": "g2",
  "appears_when": ["any"],
  "quarter_min": 1,
  "title": "Name, a few words",
  "place": "Neighborhood or office",
  "fields": { "Situation": "One line", "Documents": "One line" },
  "reading": "Moynihan et al. 2015",
  "outcomes": [
    { "when": ["doc_full"], "result": "DENIED", "text": "One line.", "effects": { "reach": -2 }, "group_reach": { "g2": -3 }, "follow_up": "c40f" }
  ],
  "default": { "result": "APPROVED", "text": "One line.", "effects": { "reach": 1 } }
}
```

- `type`: `applicant`, `implementer`, `stakeholder` or `event`; the deck follows `setting.card_type_shares`.
- `fields` are the typed lines on the document; keep each to one line. `body` adds a paragraph if you need one.
- `outcomes` are tried in order; the first whose `when` holds applies. If none holds, `default` applies.
- `effects` move indicators at quarter end; `group_reach` moves a group's reach (and so Equity).
- `follow_up` names a card for next quarter. Give follow-up cards `"follow_up_only": true`.
- **Decision cards** have `choices` instead of `outcomes`; each has `label`, `result`, `text`, `effects`, optional `group_reach`, optional `follow_up`. Two or three choices. `follow_up_alt` with `follow_up_chance` (0 to 1) gives a coin-flip follow-up.
- `result` is the stamp. Results containing APPROVED, PAID, CLEAN, ACCEPTED and similar words stamp green; NOTED, HEARING and similar stamp grey; the rest red. The word lists are in `renderCard` in `index.html` if you need another word.
- Place names: write `{newspaper}`, `{city}`, `{council}` or `{mayors_office}` in any text and the setting block fills it in.

### How to add a fit rule

Add to `fit_rules`:

```json
{ "id": "fr_my_rule", "type": "congruence", "condition": ["obj_14days", "doc_full"], "light": "amber",
  "explanation": "A 14-day objective with full verification.", "citation": "Moynihan et al. 2015" }
```

`type` is `coherence` (goals down the column), `consistency` (means down the column) or `congruence` (goals against means). `light` is `green`, `amber` or `red`; each light shows the worst matched rule. Green rules exist so the student sees an explanation on hover. Fit lights never touch the results.

### How to add a modifier

Add to `modifiers`: `condition`, `effects` (applied every quarter while active), optional `group_reach`, optional `cap` such as `{ "reach": 60 }`, optional `forced_card` (shown once, the first quarter the modifier is active), plus `explanation` and `citation`. Hovering a result shows the active drivers.

### Evaluators and endings

- `evaluators`: each has a `color` (letterhead), `weights` (which indicators its score averages; Burden is inverted automatically), a `template` with slots such as `{helped}`, `{improper}`, `{votes}`, `{verdict}`, `{cards}`, `{purpose}`, `{objectives}`, `{worst_group}`, `{worst_pct}`, and `verdicts` by score with `tone` (`good`, `mixed`, `bad`), a `seal` word and the text. The schedule is `mode.evaluators`.
- `setting.endings`: `min` thresholds on Political support, a `stamp`, a `title` and `text`; `{votes}` and `{cs}` (the chosen problem) are filled in.
- `briefings`: the short texts for the ordinance, the passed screen, Q1, Q2, and Q2 with the unlock; `redesign` is the line shown under the Q1 memos.
- `setting`: every place name. Change `city`, `program`, `council`, `mayors_office`, `newspaper`, `neighborhoods` and `seal` and the game moves to another city.

## Working with Claude Code on this project

Describe what you saw and what you expected, one change at a time. Ask it to commit after each working change so you can always go back (`git log` lists the history). After any engine change, ask it to run `node test.js`.
