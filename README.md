# Design Desk

A browser game for PAI 785. Students design the Messiland Housing Stability Program on Howlett's six-cell grid, then live with it through quarters of case cards. Everything a student sees is in `content.json`; the engine is in `index.html`. The design document is `Design Desk — Game Design Document.md`.

## The files

- `index.html` — the whole game engine: layout, rules, indicator math, card stream, memos, end screen, export. You should never need to edit this to change content.
- `content.json` — all content and all numbers: the setting, every choice and option, base effects, group multipliers, fit rules, modifiers, evidence briefs, clause fragments, cards, evaluator templates, briefings, debrief prompts. Anything marked `PLACEHOLDER` was invented to make the skeleton playable.
- `test.js` — a headless test. Run `node test.js` in this folder; it plays two Lite and two Full games to the end and checks the math. Not needed to play.
- `README.md` — this file.

## Opening the game

The page reads `content.json` from the same folder. Browsers block that when you double-click a file, so you have three options:

1. **Host it** (best for class). Put both files in a GitHub Pages repository or any web host and share the link. Blackboard's file area usually works too, as long as both files sit in the same folder.
2. **Double-click `index.html`.** The page will say it cannot read `content.json` and show a "choose file" button. Pick `content.json` and play. Nothing else changes.
3. **Run a tiny local server** from this folder, then open <http://localhost:8000>:
   ```
   python -m http.server 8000
   ```

Progress is saved in the browser, so a refresh does not lose a game. The start screen offers "Resume saved game" when one exists. "Restart" in the footer erases it.

## Switching modes

- **On the start screen**: the Mode dropdown offers Lite and Full.
- **By link**: add `?mode=full` or `?mode=lite` to the address.
- **Instructor panel**: add `?instructor=1` to the address. A panel appears on the start screen with every toggle: mode, timer on/off, number of quarters, cards per quarter, decision cards per quarter, expert mode, Q2 fine-print unlock, skip to Act 3, and a pre-class design code. It builds a student link as you change settings; copy that link and share it. "Apply" reloads the page with those settings. The panel also runs a content check and lists any broken references in `content.json`.

Useful links:

| Want | Link |
|---|---|
| Class default | `index.html` |
| Lite with the Q2 fine-print unlock | `index.html?mode=lite&unlock=1` |
| Full, timer off | `index.html?mode=full&timer=0` |
| Full, jump to Act 3 | `index.html?mode=full&skip3=1` |
| Expert mode (no tooltips, shorter timer) | `index.html?mode=full&expert=1` |
| Run the built-in self-test | `index.html?selftest=1` |

**Design codes.** In Lite the Ordinance screen shows a code such as `DD1-24-2-2-1-3` that encodes the six choices. A student who designs at home copies the code; in class their partner types it into the start screen (or you put it in a link with `&code=DD1-24-2-2-1-3`). The parts are, in order: causal story, the two objectives (digits), instrument mix, implementer, documentation, enforcement, each as the option's position in `content.json` (1 = first option).

**Seeds.** The seed code (default 10) drives which cards appear and in which order. Two pairs with the same seed and the same design see the same cards.

## Editing content.json

Open it in any text editor (VS Code and Notepad++ highlight mistakes; Notepad works). JSON is strict: every `"key": value` pair except the last in a block ends with a comma, strings use straight double quotes, and no trailing commas. After saving, load the game with `?instructor=1` and read the "Content check" line, or `?selftest=1`. If the page shows "content.json is not valid JSON" it will name the line.

**The condition syntax**, used by `appears_when`, `when` and `condition`: a list of terms that must all be true. A term is an option id such as `"doc_full"`; write `"doc_self|doc_standard"` to mean "either". `["any"]` or `[]` means always. Example: `["imp_nonprofit", "doc_self|doc_standard"]` means nonprofit implementer AND (self-attestation OR standard documentation).

Option ids are listed under `choices`: `cs_*` causal story, `gg_*` governance goal, `il_*` instrument logic, `obj_*` objectives, `mix_*` instrument mix, `imp_*` implementer, `it_*` income threshold, `cap_*` benefit cap, `dur_*` duration, `win_*` window, `elig_*` eligibility route, `doc_*` documentation, `enf_*` enforcement, `form_*` form length, `app_*` appeal window.

### How to change an effect number

1. Find the option under `choices`. For example, Full verification is `"id": "doc_full"` inside the `documentation` choice.
2. Edit its `effects` block. The four keys are `reach`, `burden`, `fiscal`, `political`. Positive numbers raise the indicator; for Burden, higher is worse.
   ```json
   "effects": { "reach": -20, "burden": 25, "fiscal": 15, "political": 5 }
   ```
3. To change how an option treats a target group, edit `group_multipliers`: `1.0` is neutral, `0.5` halves that group's reach, `1.3` raises it. Groups are `g1` families, `g2` elderly, `g3` mixed-status, `g4` landlords. Equity is 100 minus the gap between the best- and worst-served group, so multipliers are how a setting moves Equity.
4. Save and reload the page.

Base effects are applied once, when the design is adopted (starting value 50 plus the sum of effects). If a student changes a setting mid-game, the difference between the old and new effects is applied once. Modifiers (the `modifiers` list) and card effects apply at the end of every quarter in which they are active. The starting value is `setting.baseline`; political costs are `setting.political_cost`.

### How to add a card

Copy an existing card in the `cards` list and change it. Fields:

```json
{
  "id": "c40",
  "type": "applicant",
  "group": "g2",
  "appears_when": ["any"],
  "quarter_min": 1,
  "title": "Name and neighborhood",
  "body": "What the student reads.",
  "reading": "Moynihan et al. 2015",
  "outcomes": [
    { "when": ["doc_full"], "result": "DENIED", "text": "What happened.", "effects": { "reach": -2 }, "group_reach": { "g2": -3 }, "follow_up": "c40f" }
  ],
  "default": { "result": "APPROVED", "text": "What happened otherwise.", "effects": { "reach": 1 } }
}
```

- `type` is `applicant`, `implementer`, `stakeholder` or `event`; the deck is drawn in the shares given by `setting.card_type_shares`.
- `group` is a group id or `null`.
- `appears_when` limits the card to designs where the condition holds; `quarter_min` keeps it out of early quarters.
- `outcomes` are tried in order; the first whose `when` holds is applied. If none holds, `default` is applied.
- `effects` move indicators at quarter end; `group_reach` moves a group's reach points (and so Equity).
- `follow_up` names a card to show next quarter. Give follow-up cards `"follow_up_only": true` so they never appear on their own.
- **Decision cards** have a `choices` list instead of `outcomes`; each choice has `label`, `result`, `text`, `effects`, optional `group_reach`, optional `follow_up`. Two or three choices. A choice can also carry `follow_up_alt` and `follow_up_chance` (0 to 1) for a coin-flip follow-up. When the timer runs out, the last choice is applied.
- `result` is the stamp text. Results containing APPROVED, GRANTED, PAID, CLEAN and a few similar words are stamped green; everything else red.

### How to add a fit rule

Add an entry to `fit_rules`:

```json
{ "id": "fr_my_rule", "type": "congruence", "condition": ["obj_14days", "doc_full"], "light": "amber",
  "explanation": "A 14-day objective with full verification.", "citation": "Moynihan et al. 2015" }
```

- `type` is `coherence` (goals down the column), `consistency` (means down the column) or `congruence` (goals against means).
- `light` is `green`, `amber` or `red`. For each type, the light shown is the worst matched rule: any red matched makes it red, otherwise any amber makes it amber, otherwise green. Green rules exist to give the student an explanation when they hover the light.
- Fit lights never touch the indicators.

### How to add a modifier

Add to `modifiers`: `condition`, `effects` (applied every quarter while active), optional `group_reach`, optional `cap` (for example `{ "reach": 60 }`), optional `forced_card` (a card id shown once, the first quarter the modifier is active), plus `explanation` and `citation`. Active modifiers are listed under the dashboard so students can trace them.

### Other content

- `setting`: every place name lives here. Change `city`, `program`, `council`, `mayors_office`, `neighborhoods` and `seal` and the game moves to another city. Briefings use `{city}`, `{program}`, `{council}` and `{mayors_office}` placeholders.
- `lite.implied` maps each causal story to the governance goal and instrument logic Lite assumes. `lite.council_defaults` are the settings "set by council" in Lite. `lite.redesign_adjustable` and `lite.q2_unlock` say what the Lite redesign opens.
- `evaluators`: each has `weights` (which indicators its score averages; Burden is inverted automatically), a `template` with slots such as `{reach}`, `{fiscal}`, `{verdict}`, `{cards}`, `{lights}`, `{purpose}`, `{objectives}`, `{worst_group}`, and `verdicts` chosen by score (`min` thresholds, highest first).
- `briefings`: text per act and quarter, plus the redesign prompt shown after that quarter. `lite_q2_unlock` is used in Lite when the unlock is on.
- `modes`: the Lite and Full presets (quarters, cards, decision cards, timer seconds, evaluator schedule, which debrief prompts).

## Working with Claude Code on this project

Describe what you saw and what you expected, one change at a time. Ask it to commit after each working change so you can always go back (`git log` lists the history). The engine has a built-in self-test (`?selftest=1`) and a content check (`?instructor=1`); ask Claude Code to run its headless test after any engine change.
