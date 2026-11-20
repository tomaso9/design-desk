# Design Desk — Game Design Document

Nov 19, 2026 · @Tomas Olivier

A Papers, Please–style policy design simulation set in Messiland, for PAI 785 (AI Applications of Policy Design). Students design a program at all three of Howlett's levels, then live with it through four quarters of implementation. Draft for iteration before building in Claude Code.

## 1. Purpose and learning objectives

Design Desk puts students in the chair of a policy designer whose choices at every level of abstraction (governance frame, program objectives and tools, on-the-ground calibrations) are then applied to real cases, so the gap between design intent and outcome becomes something they experience rather than read about. It is a Policy Design Sandbox exercise (5 points, graded on the memo, not the in-game score), playable in 45–55 minutes in pairs.

After playing and debriefing, students should be able to:

| # | Learning objective | Course reading it operationalizes | Where it appears in the game |
| --- | --- | --- | --- |
| LO1 | Define a policy problem and recognize that the causal story chosen constrains every later design choice | Stone 2012 ch. 2 (and causal stories); Bardach (defining the problem, assembling evidence); Week 3 context | Act 1 problem frame and evidence brief |
| LO2 | Map a design onto Howlett's six cells (macro/meso/micro × goals/means) and see how higher levels bound lower ones | Howlett 2009; Van Geet et al. 2021 Fig. 1; Week 12 sandbox | The three design acts; fit check |
| LO3 | Predict how instrument logic and instrument mix change who complies and why | Schneider & Ingram 1990; Linder & Peters 1989; Capano & Howlett 2022 | Act 1 instrument logic; Act 2 tools |
| LO4 | Make micro-level settings and calibrations deliberately, including the wording of a clause, and trace their burden and equity effects | Howlett 2009 (calibrations); Moynihan et al. 2015; Week 7 policy content | Act 3 fine print and clause builder |
| LO5 | Anticipate implementer discretion and capacity limits as design constraints, not post-hoc surprises | May 2012; Busetti & Dente 2018; Week 2 design turn | Act 2 implementer choice; Act 4 frontline cards |
| LO6 | Distinguish design fit (coherence, consistency, congruence) from design quality, and spot the coherence trap | Van Geet et al. 2021; Week 12 lecture | Fit check lights vs. indicator bars |
| LO7 | Recognize that evaluation criteria and the level at which one evaluates are themselves design choices | Stone 2012 ch. 5; Week 12 Phase 3 | Evaluators who judge at different levels |
| LO8 | Critique the behavioral model embedded in a simulation (and by extension, in an AI tool) | Bowles 2008; course AI-reflection prompts | Debrief prompt 3 |

Pedagogical basis: the rules of a game make an argument about how the world works (Bogost 2007, procedural rhetoric); students learn design-for-implementation by operating the system, not describing it. The design→implement→evaluate→redesign loop is Kolb's (1984) experiential cycle, with the debrief and memo supplying the reflection step that games alone omit. Multi-session role-play simulations in a public policy course produced measurable gains in higher-level learning (Silvia 2012, JPAE), and simulation outcomes only translate into learning outcomes when assessment is aligned to the simulation's goals (Stapleton 2018, JPSE), which is why grading attaches to the memo.

## 2. Core concept and player framing

The student is a policy designer in **Messiland**, a fictional mid-sized city whose council has just declared an eviction emergency. They begin as the senior analyst in the Mayor's Office asked to design the **Messiland Housing Stability Program** from the ground up: how to define the problem, what kind of government response fits it, what the program should aim at, which tools and implementers to use, and finally the fine print. Only after the council adopts the design do they become the Program Director who has to live with it for four quarters.

The structure follows Howlett's nested model as the course teaches it in Week 12: three design acts (macro, meso, micro), each filling one row of the six-cell grid, then implementation. Upstream choices are sticky. Micro calibrations can be changed every quarter by administrative decision; meso objectives and tools only at a mid-game council review, at a political cost; the macro frame only by spending most of the student's political capital to reopen the ordinance. This makes the nesting a lived constraint rather than a diagram: the problem you defined in minute three is the problem you are stuck with in minute forty.

Why rental assistance: it is familiar to MPA and IR students alike, has a real-world record of burden-driven under-enrollment (the 2021 US Emergency Rental Assistance rollout), and lets every causal story, instrument logic and target-group construction appear naturally. The scenario can later be swapped (small-business grants, a vaccination campaign, a visa program for the IR students) because the engine is content-agnostic.

The Papers, Please borrowing is specific: the student does not watch a dashboard move in the abstract. They see the individual case their rule just rejected, the caseworker who bent their rule, and the landlord who found the loophole, one card at a time, before the aggregate numbers update. Tension comes from a per-quarter case quota and a clock, which reproduces the cognitive load under which real implementers apply rules.

**Messiland flavor.** The running joke runs through the setting, not the content: Messiland City Council, the Mayor's Office on Plaza Diez, neighborhoods named Rosario Heights, Castelldefels Flats, Bayside Terrace and the Old Port, a city seal with a small 10, and a default random seed of 10. Case names and events stay realistic; no real person appears or is quoted, and no club or brand names are used, so the joke stays inside the classroom and the game stays usable elsewhere by changing one field in the content file.

Tone: dry, bureaucratic, lightly ironic, never cartoonish. Cases are written to be sympathetic on all sides so there is no obviously correct design.

## 3. Game loop

One playthrough is three design acts followed by four implementation quarters. The acts take about 15 minutes together; each quarter about 8. Full game 45–55 minutes.

**Act 1 — Council Chamber (macro, \~5 min).** A short briefing from the Mayor: evictions up 40%, council wants a program by the end of the month, budget fixed. The student makes four choices that fill the macro row of the grid:

1. **Causal story.** What kind of problem is this? Market failure (rents outran wages), landlord behavior (opportunistic filings), tenant behavior (payment habits, information gaps), or structural shortage (not enough units). Each story makes some instruments look natural and others absurd (Stone on causal stories; Bardach step 1).
2. **Governance goal.** Housing stability as a right, market stabilization, fiscal prudence, or neighborhood preservation. This is the "general idea that governs policy development" in Howlett's top-left cell.
3. **Instrument logic.** Coercive/regulatory, financial/market, communicative/voluntary, or network/co-production (Howlett's top-right cell; Linder & Peters 1989 on instrument preferences as worldviews).
4. **Evidence brief.** Commission one of three briefs before deciding: the Budget Office's cost study, the Tenant Coalition's survey, or the University's administrative-data analysis. Each is accurate and partial; the chosen brief shapes which base rates the dashboard shows at the start and which surprises come later (Week 8 on evidence; Bardach on assembling evidence).

The act ends with an auto-generated one-paragraph Statement of Purpose built from the four choices. Evaluators quote it back later.

**Act 2 — Drafting Desk (meso, \~5 min).** Fills the meso row.

1. **Objectives.** Pick two of five quantified objectives: cut evictions 30%; reach 70% of eligible households; keep improper payments under 3%; stabilize small-landlord receipts; process applications within 14 days. Any pair creates a tension that the fit check and the evaluators will surface (Week 12: tension between meso objectives).
2. **Tools.** Instrument mix and implementer, as in the parameter table in Section 4 (Schneider & Ingram 1990; May 2012).

**Act 3 — Fine Print (micro, \~5 min).** Fills the micro row: settings and calibrations.

1. **Settings.** Income threshold (50 / 80 / 120% AMI), benefit cap per month (three tiers), duration (3 / 6 / 12 months), application window (rolling vs. two fixed rounds).
2. **Calibrations.** Documentation, enforcement posture, form length (one page vs. full packet), appeal window (none / 14 / 60 days).
3. **Clause builder.** The student assembles the program's eligibility clause from fragment menus ("A household is eligible if it \[has received a written eviction notice / is at risk of eviction / owes rent\] and \[its income in the prior 30 days / prior 12 months / at time of application\] is below…"). The assembled clause is what caseworkers read aloud in decision cards, and ambiguities in it become decision cards (Week 7: why designers write better policy text than lawyers).

**Act 4 — Implementation (four quarters, \~8 min each).** Each quarter runs: briefing → adjustment → case stream (12 cards, 3 decision cards with a 30-second timer) → evaluation memo and fit check → redesign prompt. What the student can adjust depends on the level:

- Micro settings and calibrations: any quarter, no cost beyond transition warnings.
- Meso objectives and tools: only at the Q2 council review, costing Political support.
- Macro frame: locked. Reopening the ordinance is allowed once and costs most of the political capital; the Q3 briefing offers it if indicators are poor.

After Q4: four-quarter indicator chart, the six-cell grid as the student filled it with every change marked, the decision log, and the debrief prompts. The log is exportable as text.

After Q4 the game shows a four-quarter trajectory for each indicator, the student's full decision log, and the debrief prompts (Section 7). The log is exportable as text so students can paste it into their memo.

Design rationale. The three acts make the student do the upstream work that policy analysis courses often leave to the case author: define the problem, choose a frame, commit to objectives. Their stickiness operationalizes Howlett's claim that higher levels bound lower ones, and May's point that designers and implementers are usually different people with different degrees of freedom. The quarters are then Kolb's cycle in miniature: Act 4's case stream is the concrete experience, the evaluator memo the reflective observation, the redesign prompt the abstraction, and the next adjustment the experiment. Keeping micro adjustable and macro locked also teaches, by frustration, why so much real reform happens at the calibration level (Howlett & Cashore 2009 on the frequency of change at different levels).

## 4. Design choices: the six-cell grid

Every choice the student makes sits in one cell of Howlett's grid, and the game shows the grid filling as they play. Fourteen choices in all, most of them a single click among three or four options; the engine only has to know which cell a choice belongs to, since that determines when it can be changed and which fit checks it enters.

| Level | Goals side | Means side | Reading | Can be changed |
| --- | --- | --- | --- | --- |
| **Macro** (Act 1) | **Causal story**: market failure · landlord behavior · tenant behavior · structural shortage. **Governance goal**: housing as a right · market stabilization · fiscal prudence · neighborhood preservation | **Instrument logic**: coercive/regulatory · financial/market · communicative/voluntary · network/co-production | Stone ch. 2; Howlett 2009; Linder & Peters 1989 | Locked; one costly reopening |
| **Meso** (Act 2) | **Objectives** (pick 2): cut evictions 30% · reach 70% of eligible · improper payments under 3% · stabilize small-landlord receipts · 14-day processing | **Instrument mix**: direct-to-landlord payment · payment to tenant · conditional (payment + counseling) · hortatory (campaign + hotline + small grants). **Implementer**: city housing department · community nonprofits · private contractor · online portal only | Schneider & Ingram 1990; May 2012; Busetti & Dente 2018 | Q2 council review only, at political cost |
| **Micro** (Act 3) | **Settings**: income threshold 50/80/120% AMI · benefit cap low/mid/high · duration 3/6/12 months · window rolling/two rounds | **Calibrations**: documentation self-attestation/standard/full · enforcement trust-and-audit/pre-payment review/clawback · form one page/full packet · appeal none/14/60 days. **Clause builder** (eligibility text from fragments) | Howlett 2009 on calibrations; Moynihan et al. 2015; Week 7 | Any quarter |

Two further choices sit outside the grid: the **evidence brief** (Act 1; shapes starting information, Week 8) and, in Act 4, the **decision cards**, which are micro-level discretion exercised case by case.

Each option carries a short tooltip written in the voice of a staffer ("Full verification: we've caught every fraud case we've ever had this way. We've also lost about a third of applicants before they finish the form."). Macro tooltips are written as worldviews rather than consequences ("If the problem is landlord behavior, you're going to want teeth"). Tooltips state direction, never numbers, so students infer magnitudes from the case stream.

Choices interact across levels. The consequence model (Section 5) applies interaction modifiers for combinations that reinforce or undercut each other, and the fit check names the mismatches between cells (e.g., a communicative instrument logic at the macro level paired with pre-payment review at the micro level is inconsistent means; a "reach 70%" objective paired with full verification is incongruent goal and means). Not every mismatch is a mistake, which is the point of Section 5's fit-versus-quality distinction.

## 5. Indicators and consequence model

Five indicators on a 0–100 scale, updated at the end of each quarter, plus a three-light fit check that is deliberately kept apart from them. The model is simple and transparent: additive base effects per option, a small number of cross-level interaction modifiers, and case-level adjustments from decision cards. Macro choices work mostly through the modifiers and through which cards appear; meso and micro choices carry most of the base effects. Students should be able to reverse-engineer it by Q3; that is a feature, because the debrief asks them to critique it.

| Indicator | What it represents | Reading | Main drivers |
| --- | --- | --- | --- |
| **Reach** | Share of eligible households that actually receive aid | Moynihan et al. 2015 (take-up); Van Geet et al. 2021 | Eligibility, Documentation, Implementer |
| **Burden** | Learning + compliance + psychological cost borne by applicants (higher is worse) | Moynihan et al. 2015 | Documentation, Implementer, Enforcement |
| **Equity** | How evenly Reach is distributed across four target groups (see below) | Schneider & Ingram 1993; Stone ch. 2 | Eligibility, Implementer, Documentation |
| **Fiscal integrity** | Inverse of improper payments and cost overrun | Bardach App. B; Stone ch. 5 (efficiency) | Documentation, Enforcement, Instrument |
| **Political support** | Council and press standing; renewal odds | Stone ch. 5; Linder & Peters 1991 | Fiscal integrity, visible failures, Instrument |

**Target groups.** Four populations with different starting positions, following the social-construction matrix: (1) working families with an eviction notice ("dependents," sympathetic, weak), (2) elderly renters on fixed income ("deserving," sympathetic, moderate power), (3) undocumented or mixed-status households ("deviants" in the political frame, no power), and (4) small landlords ("contenders," powerful, mixed sympathy). Each parameter setting has a per-group reach multiplier; Equity is 100 minus the spread between the best- and worst-served group.

**Base effects (illustrative, to be tuned in playtesting).** Each setting adds or subtracts points. Example row for Documentation:

| Setting | Reach | Burden | Equity | Fiscal integrity | Political support |
| --- | --- | --- | --- | --- | --- |
| A. Self-attestation | +15 | −20 | +10 | −15 | −10 |
| B. Standard | 0 | 0 | 0 | 0 | 0 |
| C. Full verification | −20 | +25 | −15 | +15 | +5 |

The content file (Section 10) holds one such row per setting for all five parameters, plus group multipliers.

**Interaction modifiers (the pedagogical core).** A short list, each tied to a reading, so that the "right" answer depends on fit rather than on any single setting:

- Full verification + Online portal only → Burden +15 extra, Equity −10 extra (digital-divide cost; Moynihan)
- Hortatory instrument + Universal eligibility → Reach −10 (information alone does not move resource-constrained groups; Schneider & Ingram 1990)
- Nonprofit implementer + Self-attestation → Equity +10, Fiscal integrity −5 (trust networks raise take-up among group 3 but reduce audit trail; May 2012)
- Direct-to-landlord payment + Landlord-initiated eligibility → Reach for groups 1–3 −15, Political support +10 (serving contenders; Schneider & Ingram 1993)
- Pre-payment review + Priority tiers → processing delay event: the prioritized group waits longest
- Private contractor + Post-payment clawback → Fiscal integrity +10, Equity −10 (contractor cream-skims; Busetti & Dente 2018)
- Causal story "tenant behavior" + any direct payment → Political support −6 each quarter (council asks why you are paying people you said were the problem; Stone on causal stories assigning blame)
- Causal story "structural shortage" + any design → Reach ceiling of 60 (the program cannot fix what it did not aim at; the Q3 briefing says so)
- Communicative instrument logic + Coercive enforcement (clawback) → Burden +8, Political support −5 (inconsistent means; the Tenant Coalition notices first)
- Evidence brief from the Budget Office → Fiscal integrity visible from Q1, Equity hidden until Q2; Tenant Coalition brief → the reverse; University brief → both visible but Act 1 takes a quarter longer, so Q1 starts with a backlog

**Fit check (three lights, shown after every quarter).** Following Van Geet et al. (2021, Fig. 1) and your Week 12 lecture, the game tests the filled grid for:

- **Coherence** (goals down the column): can the governance goal, the two objectives and the settings be pursued at once? "Fiscal prudence" + "reach 70%" + a 120% AMI threshold is red.
- **Consistency** (means down the column): do instrument logic, tools and calibrations reinforce each other? "Network/co-production" + nonprofit implementer + self-attestation is green; swap in pre-payment review and it goes amber.
- **Congruence** (goals against means, row by row): does each level's means plausibly deliver its goals? "Cut evictions 30%" with a hortatory instrument mix is red.

The lights are **not** folded into the indicators. A design can be all green and still score poorly on Reach and Equity; the landlord-centered design (market-stabilization goal, financial logic, stabilize-receipts objective, direct-to-landlord payment, landlord-initiated eligibility, standard documentation) is the built-in example: all three lights green, Political support high, Equity in the 30s. That is Van Geet's empirical finding and the coherence trap from Week 12, made playable: fit is necessary for a design to be legible, not sufficient for it to be good. The Q4 debrief asks students to say which they would rather have, a fitted design or an effective one, and why those came apart in their game.

**Decision cards** adjust indicators by ±3 to ±8 and can trigger a follow-up card next quarter (a denied applicant reappears as an eviction news story; an approved borderline case reappears as an audit finding).

**Formula sketch** for each indicator I at end of quarter q:

```latex
I_q = \operatorname{clip}\Big(I_{q-1} + \sum_{p} b_{p,s(p)} + \sum_{m \in \text{active}} k_m + \sum_{c \in \text{decisions}} d_c,\ 0,\ 100\Big)
```

where b is the base effect of parameter p at its chosen setting s(p), k are the active interaction modifiers, and d the decision-card adjustments. All three tables live in the content file so you can retune without touching code.

## 6. Case cards

Four card types, drawn from a deck of 50–60 for a four-quarter game. Each card has: a type, a target group, the parameter settings under which it appears (or "any"), the body text, an automatic outcome per relevant setting, and (for decision cards) two or three choices with indicator effects and an optional follow-up card. Cards are the content you will spend the most time on; a dozen good ones are worth more than fifty filler ones.

| Type | Share of deck | What it does | Example |
| --- | --- | --- | --- |
| **Applicant** | \~50% | A household applies; the rules resolve it. Shows the human face of a parameter choice. | A 68-year-old on Social Security whose income proof is a paper letter; under Online-portal-only she never completes the form. |
| **Implementer** | \~20% | A caseworker, nonprofit, or contractor reports how they are applying (or bending) the rule. | A nonprofit caseworker asks whether she can accept a utility bill as proof of residence for a mixed-status family. |
| **Stakeholder** | \~20% | A landlord, council member, journalist, or auditor reacts to the program. | A landlord association offers to pre-screen tenants if payments go directly to them. |
| **Event** | \~10% | An exogenous shock that stresses the current design. | State announces a new rule: all recipients must be re-verified within 60 days. |

**Twelve sample cards** (text is draft; outcomes shown for the settings where they bite):

1. **Applicant / Group 1.** Marisol R., two kids, eviction hearing in 11 days. Has lease and ID; employer pays cash. *Documentation B or C:* denied for lack of income proof. *A:* approved. *Follow-up if denied:* Q+1 stakeholder card, local news covers her eviction (Political −5).
2. **Applicant / Group 2.** Harold B., 74, fixed income, no smartphone. *Implementer D (portal only):* application abandoned, counts against Reach for group 2. *B (nonprofit):* a volunteer completes it with him.
3. **Applicant / Group 3.** The Okafor-Mendez household, mixed status, afraid to submit anything with a name on it. *Documentation A + Implementer B:* approved. *Any other combination:* does not apply at all (silent non-take-up, visible only in Equity).
4. **Applicant / Group 4.** Dana P. owns three units, two tenants behind. Applies on their behalf. *Eligibility D:* approved fast. *Others:* told tenants must apply; one tenant never does.
5. **Applicant / Group 1 (decision).** Applicant's lease expired last month and is month-to-month; rule says "current lease." Caseworker asks: approve, deny, or request a landlord letter (adds 2 weeks)? Each choice shifts Burden, Reach, and Fiscal integrity differently.
6. **Implementer (decision).** City caseworker reports she has been approving self-attested cases under 1,000 USD without review to clear the backlog. Endorse (Reach +5, Fiscal −5), stop it (Burden +3, backlog event next quarter), or formalize it as a rule (becomes a new setting next quarter). *Reading:* May 2012 on street-level values.
7. **Implementer.** Private contractor's monthly report shows 94% approval rate for applications with complete documents and 4% for incomplete ones; incomplete applications are disproportionately groups 1 and 3. *Implementer C:* Equity −6. *Reading:* Busetti & Dente 2018.
8. **Stakeholder (decision).** Landlord association offers to pre-screen tenants and submit bundled applications in exchange for direct payment. Accept (Reach +8 for group 4, Equity −8, Political +6), decline, or accept with a tenant-consent requirement (smaller effects both ways). *Reading:* Schneider & Ingram 1993 on contenders.
9. **Stakeholder.** Council member asks in a hearing why the program has spent 40% of budget and reached 15% of eligible households. *Documentation C:* Political −8. *Instrument D (hortatory):* Political −10 ("you ran ads").
10. **Stakeholder.** City auditor samples 50 payments; finds 3 duplicates. *Enforcement A:* Fiscal −6, Political −4. *Enforcement B:* no finding but processing-time event. *Enforcement C:* clawback letters go to 3 households, one of which was a data-entry error (Burden +4, news story).
11. **Event.** Local plant closes; 400 new households at risk. Applications double next quarter. *Documentation C or Enforcement B:* backlog, quota cannot be met, Reach −10. *Documentation A:* met, Fiscal −5.
12. **Event (decision).** State funding source requires that recipients be "legally present." Comply (group 3 reach → 0, Political +4), seek a waiver (one-quarter delay, 50% chance), or fund group 3 from city reserves (Fiscal −8, Political −6). *Reading:* Stone ch. 2 on who counts in "equity."

Writing guidelines for the full deck: one card per sentence of each assigned reading you want students to recognize in the debrief; every group gets at least one sympathetic and one difficult case; every parameter setting is visibly tested by at least two cards; no card has a choice that is costless on every indicator.

## 7. Evaluator memos and debrief

**Evaluators.** At the end of each quarter one of four evaluators writes a 60–80 word memo judging the quarter. Each evaluates at a different level of the grid and with a different criterion, so the same quarter can be praised and condemned at once. The order is fixed so every student meets all four:

| Quarter | Evaluator | Level | Criterion | What it weights |
| --- | --- | --- | --- | --- |
| Q1 | Messiland Budget Office | Micro | Efficiency | Fiscal integrity; processing time; whether calibrations leak money |
| Q2 | Tenant Coalition of Messiland | Meso | Equity and reach | Whether the two objectives were the right ones and are being met for groups 1–3 |
| Q3 | Mayor's Chief of Staff | Macro | Political viability | Whether the causal story and governance goal still hold up in council and press; quotes the Statement of Purpose back |
| Q4 | The student | Their choice | Their choice | Chosen from a list before Q4 begins; the game then shows how the other three would have scored the same quarter |

Memos are template text with slots filled from the indicators, the fit lights, the Statement of Purpose, and the two most consequential cards of the quarter.

Rationale: this is your Week 12 Phase 3 ("The Evaluator's Dilemma") run inside the game. Stone ch. 5 argues that efficiency, equity, security and liberty are contested criteria, not neutral yardsticks; the Week 12 plan adds that the level at which one evaluates determines the verdict. Rotating both the criterion and the level turns that argument into something the student feels: the Q1 memo praises a tight calibration that the Q2 memo blames for low reach, and the Q3 memo asks whether the whole frame was wrong.

**End-of-game screen.** A line chart of the five indicators across four quarters, the six-cell grid as finally filled with every change marked and dated, the fit lights per quarter, the decision log, and the Q4 self-evaluation beside the three other evaluators' verdicts.

**Debrief prompts** (shown in-game, answered in the memo):

1. Identify one case where your design produced an outcome you did not intend. Which reading predicted it?
2. Which evaluator's memo was hardest to dismiss, and what does that tell you about whose criteria you were implicitly designing for?
3. The game's model assumes certain things about how applicants, caseworkers and landlords behave. Name one such assumption, say whether it is defensible, and say what a real policy designer, or an AI tool, would need to know to check it.
4. Your fit lights and your indicators probably disagreed at some point. Which would you rather have had, a fitted design or an effective one, and what does the disagreement tell you about the level at which your design went wrong?

Prompt 3 is the bridge to the course's AI theme: a simulation is a behavioral model made executable, and so is an LLM's advice. The same critical habit applies to both (Bowles 2008 on what incentive-based designs assume about motivation).

## 8. Screen layout and interaction

One screen, three fixed panels, no scrolling during play. Desktop or laptop browser; tablet works, phone does not need to.

| Panel | Position | Contents | Interaction |
| --- | --- | --- | --- |
| **Design console** | Left, \~25% width | The six-cell grid, filled progressively through Acts 1–3; each cell shows the current choice and a lock icon when it cannot be changed this quarter; tooltips on hover; "Adopt design" / "Lock quarter" button; transition-cost warnings; the three fit lights beneath the grid | Editable in Acts 1–3 and in each quarter's adjustment phase, subject to the level's lock rules; greyed during the case stream |
| **Desk** | Center, \~50% | The current case card (styled as a paper form, letter, or memo); auto-resolved outcome line; for decision cards, two or three buttons and a 30-second bar; quota counter (cases done / waiting) | Click "Next" or a decision button; keyboard 1/2/3 for choices |
| **Dashboard** | Right, \~25% | Five indicator bars with the change this quarter; a 2×2 grid of the four target groups showing per-group reach; quarter and budget | Read-only; hovering an indicator shows which parameters moved it most |

Above the desk a thin header carries the program name, quarter, and the Mayor's briefing (collapsible). Below the desk a thin footer holds the decision log (last three entries) and an "Export log" button.

Visual style: muted paper tones, monospace stamps for APPROVED / DENIED / DELAYED, one accent color per target group used consistently across cards and the dashboard. No illustrations of people; cards use typed text and form fields only, which keeps production cost near zero and avoids caricature.

Accessibility: all choices reachable by keyboard, color never the only signal (stamps carry text), timer can be disabled by an instructor setting.

## 9. Classroom use and assessment

Best fit in the syllabus: Week 12 or 13, once students have the multilevel framework, instruments, implementation and burden in hand, so that Acts 1–3 feel like applying what they know rather than guessing. A stripped version (Act 3 and Act 4 only, with the macro and meso cells pre-filled by "the council") works earlier in the term as an implementation sandbox, and a future offering could run the full game in Week 1 and again in Week 12 so students see their own growth.

**Session plan (90 minutes)**

1. 5 min. Frame: "You are the Mayor's analyst. In fifteen minutes you will have designed a program; in forty, you will be running it." No theory recap.
2. 15 min. Acts 1–3 in pairs. Ask pairs to say their causal story out loud before clicking it.
3. 30 min. Act 4, four quarters (one drives, one logs; swap at Q3). Pairs mix MPA and IR students where possible.
4. 10 min. Pairs compare end-of-game grids and charts with a neighboring pair that chose a different causal story.
5. 15 min. Whole-class debrief on prompts 1–4. Project two contrasting grids side by side.
6. 15 min. Individual memo drafting begins; due end of day.

**Sandbox deliverable** (300–500 words, 5 points, same rubric as other sandboxes): the four debrief prompts, plus the pasted decision log as an appendix. Exemplary work names a specific card, a specific parameter, and a specific reading in the same sentence.

**Why not grade the in-game score.** Stapleton (2018) and Robinson & Goodridge (2021) both find that a good simulation outcome is not evidence of learning, and grading the score would reward students for optimizing the model rather than interrogating it. The memo rewards the interrogation. It also sidesteps the fairness concern that competitive-game formats can disadvantage some students (Robinson & Goodridge found no such effect, but the memo removes the question).

**AI policy.** AI use is permitted for the memo as in other sandboxes. A natural variant: students ask Claude to recommend a Q1 design before playing, then compare Claude's recommendation to what happened. This feeds the course's recurring "what did the AI assume" reflection directly.

**Executive Education and PhD students.** Offer an "expert mode" toggle that hides tooltips and shortens the decision timer, and invite PhD students to propose a modifier for the consequence model with a citation; accepted modifiers go into the next version.

### Lite mode (default for class)

Lite mode is the same game with fewer choices, fewer cards and two quarters. It plays in about 25 minutes and fits a 60-minute block with debrief and memo. It is a settings preset, not a separate build: the engine, content file and grid are shared, so anything written for the full game is available in Lite and vice versa. Full mode remains for Executive Education, PhD students, homework and a possible Week 1 / Week 12 replay.

| Element | Full mode | Lite mode | What Lite gives up |
| --- | --- | --- | --- |
| Design | Three acts, 14 choices, evidence brief, clause builder | One "Ordinance" screen, 6 choices: causal story · two objectives · instrument mix · implementer · documentation · enforcement | Governance goal and instrument logic are implied by the causal story; settings fixed by the council; no clause builder |
| Grid | Fills cell by cell across acts | Fills as the six choices are made; micro settings cell shows "set by council" | Student does not author the settings row |
| Quarters | Four | Two | Slow-burn follow-ups; the Q3 reopening offer |
| Cards per quarter | 12, 3 decision cards, 30-second timer | 8, 2 decision cards, timer off | Time pressure; some stakeholder cards |
| Lock rules | Micro any quarter; meso at Q2 review; macro locked | Documentation and enforcement adjustable at the one redesign; everything else locked | The meso-at-a-cost choice |
| Evaluators | One per quarter at micro, meso, macro, then the student | Two after Q1 (Budget Office at micro, Tenant Coalition at meso), Mayor's office at macro after Q2; student picks a lens at the end | The student's own-criterion quarter becomes a one-click choice on the end screen |
| Fit lights | After every quarter | After design and after Q2 | Watching fit change over time |
| Debrief prompts | Four | Prompts 1, 3 and 4 | Prompt 2 (hardest evaluator to dismiss) moves to class discussion |

**Lite session plan (60 minutes).** 3 min frame · 5 min Ordinance screen in pairs · 7 min Q1 · 2 min read memos and redesign · 7 min Q2 · 3 min end screen · 10 min pair-to-pair comparison · 13 min class debrief · 10 min memo drafting begins.

**Optional Q2 unlock.** If you want a taste of micro settings without the upfront cost, the Q2 briefing can say "the council has delegated the fine print to you" and open the income threshold and benefit cap for one adjustment. This keeps the settings row in play without adding to the design screen.

**Homework variant.** The Ordinance screen can be assigned as a 10-minute pre-class task; each student saves a design code and pairs load it in class. Students then arrive committed to a causal story, which sharpens the comparison step (flipped-classroom logic, Lage, Platt & Treglia 2000).

Rationale: novices learn more from a small number of well-chosen, fully worked cases than from volume, and timed decisions are high-load items (Sweller 1988 on cognitive load). Lite keeps every learning objective except LO4's clause-writing component, which the Q2 unlock partly restores.

## 10. Technical specification

A single self-contained web page. No server, no login, no database, no build step. Students open a link or a file.

| Decision | Choice | Why |
| --- | --- | --- |
| Platform | One `index.html` with embedded CSS and JavaScript | Opens anywhere, hosts on Blackboard as a file or on GitHub Pages as a link; nothing to install |
| Content storage | A separate `content.json` (or a folder of CSV files converted to JSON) holding parameters, base effects, modifiers, cards, evaluator templates, and briefings | You edit cases in a spreadsheet; Claude Code never needs to touch game logic to change content |
| State | In the browser's memory during play; decision log saved to the browser so a refresh does not lose a game; "Export log" downloads a .txt | No student data leaves the machine, so no privacy review needed |
| Randomness | Seeded by a code the student types (e.g., their initials) | Two students with the same seed see the same cards, which helps the pairwise comparison and lets you reproduce a bug |
| Instructor settings | A hidden `?instructor=1` URL flag exposes: mode (Lite / Full), timer on/off, number of quarters, cards per quarter, which deck, expert mode, Q2 fine-print unlock, pre-class design code | One file serves all cohorts |
| Libraries | None required; optionally one small charting library for the end screen | Fewer dependencies means fewer things break next year |

**Content file structure** (what your spreadsheet columns will be):

- `setting`: city name, program name, neighborhood names, seal text, default seed (the one place Messiland lives; change it and the game is portable)
- `choices`: id, level (macro/meso/micro), side (goals/means), act, name, options\[\] each with id, label, tooltip, base effects on the five indicators, per-group reach multipliers; a `lock` rule per level (locked / q2\_review / any\_quarter) and the political cost of changing it
- `fit_rules`: id, type (coherence/consistency/congruence), condition (option ids that together trigger it), light (green/amber/red), one-line explanation, reading citation
- `modifiers`: id, condition (option ids that must all be active), effects on indicators, explanation, citation
- `evidence_briefs`: id, author, text, which indicators start visible, starting base-rate adjustments
- `clause_fragments`: slot, options\[\] each with text and the ambiguity flag that spawns a decision card
- `cards`: id, type, group, appears\_when (option ids, or "any"), quarter\_min, body, outcomes{} keyed by option id with result and effects, choices\[\] (decision cards) each with label, effects, follow\_up
- `evaluators`: id, name, level, criterion, indicator weights, memo template with slots
- `briefings`: act or quarter, text, optional forced event card, optional reopening offer

**Engine logic Claude Code will write** (roughly 600–900 lines):

1. Load content; render the grid and the Act 1 briefing; walk the student through Acts 1–3, filling cells and generating the Statement of Purpose and the eligibility clause.
2. On adoption: compute starting indicators from base effects and the evidence brief; run the fit rules; select Q1 cards (filter by appears\_when and quarter\_min, weight by type share, seed the shuffle), queue any clause-ambiguity cards.
3. Each quarter: show briefing; open the cells the lock rules allow and charge any political cost; serve cards one at a time, resolving automatic ones against active options and presenting choices for decision cards; log everything.
4. On quarter end: apply base effects, active modifiers, decision effects; clip to 0–100; compute Equity from group reach; re-run fit rules; pick the evaluator for that quarter and fill its template; show the redesign prompt.
5. After Q4: render chart, final grid with change history, fit history, log, debrief prompts; export.

This is a small program. The risk is not that it cannot be built but that the content is thin; see Section 11.

## 11. Build plan, playtesting, and risks

Four stages, each ending with something you can click. Your time is mostly on content; Claude Code's is on the engine.

| Stage | Your work | Claude Code's work | Done when |
| --- | --- | --- | --- |
| 1. Skeleton (one sitting) | Paste the brief in Section 12; answer its clarifying questions | Builds `index.html` with the three panels, the five parameters, placeholder cards, and the indicator math | You can lock a design, click through 10 dummy cards, and see numbers move |
| 2. Content v1 (3–5 hours over a week) | Write 25–30 cards and tune base effects in the spreadsheet; write the four evaluator templates | Converts your spreadsheet to `content.json`; adds decision cards, follow-ups, evaluator memos, coherence check | A full four-quarter game is playable and the evaluators disagree with each other |
| 3. Playtest (one hour) | Two or three PhD students play; you watch and take notes | Fixes bugs; adjusts anything that felt arbitrary | Testers can explain, unprompted, why an indicator moved |
| 4. Polish (one sitting) | Final card edits; instructor settings you want | End screen chart, export, seeds, expert mode, visual pass | You would put it in front of the class |

**Working with Claude Code as a non-programmer.** Describe what you see and what you expected, in plain English, one change at a time ("When I pick Full verification the Burden bar should go up, but it went down"). Ask it to explain any file in one paragraph before you edit it. Keep everything in one folder and ask it to commit to git after each working change so you can always go back. Ask it to write a `README.md` for you that says how to add a card and how to retune an effect.

**Playtest protocol.** Think-aloud while playing; after each quarter ask "what do you think caused that change?" A tester who cannot answer means the model is opaque; a tester who answers instantly and correctly every time means it is too obvious. Target the middle.

**Risks**

| Risk | Likelihood | Mitigation |
| --- | --- | --- |
| Consequence model feels arbitrary; students treat it as a slot machine | Medium | Every effect traceable to a tooltip or reading; coherence check names the modifier; hover-to-explain on the dashboard |
| Students optimize the score rather than reflect | Medium | No grade on score; evaluators disagree so there is no single score to optimize; memo prompts require naming cases |
| Scope creep (more parameters, more groups, multiplayer) | High | Hold the line at 5 parameters, 4 groups, 4 quarters for version 1; log ideas for version 2 |
| Caricature of target groups, especially group 3 | Low–medium | Cards written as individuals, all groups get sympathetic and difficult cases; review by a colleague before use |
| Timer stresses some students | Low | Instructor toggle; pairs share the load |
| Browser or hosting breaks next year | Low | Zero dependencies, one file, kept in git |

## 12. Brief to paste into Claude Code

Copy the block below as your first message. Attach or paste this document alongside it. Claude Code will ask a few questions; answer them and let it build the skeleton before you write any cards.

```markdown
I am a university professor, not a programmer. I want to build a small browser game for my graduate public policy class. I have attached a design document ("Design Desk — Game Design Document"); please read it fully before doing anything.

Build stage 1 from Section 11: a single self-contained index.html (no server, no build tools, no external dependencies) that implements Sections 3, 4, 5, 7, 8, 9 (Lite mode) and 10 with placeholder content.

Requirements:
- Two modes from one engine and one content file, selected on the start screen and via the instructor flag: Lite (default) and Full, exactly as the table in the Lite mode subsection of Section 9 specifies. Lite is one "Ordinance" design screen with six choices, two quarters of 8 cards (2 decision cards, timer off), two evaluator memos after Q1 and one after Q2. Full is the three acts, four quarters, 12 cards per quarter with a 30-second timer, one evaluator per quarter.
- Three-panel layout per Section 8: the six-cell design grid with fit lights on the left, case desk in the center, dashboard on the right. In Lite mode the micro settings cell reads "set by council".
- All content loads from a separate content.json following the structure in Section 10. The city is called Messiland; keep every place name in the `setting` block so it can be changed in one spot.
- Full mode: Acts 1–3 as guided screens that fill the grid (four macro choices and the evidence brief; two objectives and two tools; settings, calibrations and the clause builder that assembles an eligibility sentence from fragment menus). Lite mode: the six choices on one screen, with the causal story implying instrument logic and governance goal.
- Lock rules from Section 4 in Full mode; in Lite mode only documentation and enforcement are adjustable at the single redesign, plus the optional Q2 fine-print unlock (income threshold and benefit cap) when the instructor flag enables it.
- Indicator math from Section 5 exactly, clipped to 0–100, and the three fit lights (coherence, consistency, congruence) kept separate from the indicators.
- Each quarter: briefing, adjustment, case stream, evaluator memo(s) at the level given in Section 7, fit lights, redesign prompt.
- End screen: a simple line chart of the five indicators over the quarters played, the final grid with every change marked, the fit history, the decision log, the debrief prompts for the mode (Lite shows prompts 1, 3 and 4), and in Lite a one-click "evaluate as…" choice that shows how each evaluator would have scored the game; an Export log button that downloads a .txt.
- Seeded randomness from a code the player enters (default 10). A "design code" that encodes the Ordinance-screen choices so a student can design at home and load it in class.
- A hidden ?instructor=1 flag with toggles for mode, timer, number of quarters, cards per quarter, expert mode, Q2 fine-print unlock, and "skip to Act 3" in Full mode.
- Populate content.json with everything in Sections 4, 5, 6 and 7 of the document. Mark anything you invent as PLACEHOLDER.

Working style:
- Before writing code, ask me any clarifying questions in plain English, no more than five.
- Explain each file you create in one paragraph I can understand.
- Initialize a git repository and commit after every working change.
- Write a README.md that tells me, step by step, how to switch modes, how to add a card, how to add a fit rule, and how to change an effect number without touching JavaScript.
- When something is ambiguous in the design document, choose the simplest option and tell me what you chose.
```

**Sources cited in this document**

- Bogost, I. (2007). *Persuasive Games: The Expressive Power of Videogames*. MIT Press.
- Gee, J. P. (2003). *What Video Games Have to Teach Us About Learning and Literacy*. Palgrave.
- Kolb, D. (1984). *Experiential Learning*. Prentice Hall.
- Howlett, M. (2009). Governance modes, policy regimes and operational plans: A multi-level nested model of policy instrument choice and policy design. *Policy Sciences* 42(1), 73–89.
- Howlett, M. & Cashore, B. (2009). The dependent variable problem in the study of policy change. *Journal of Comparative Policy Analysis* 11(1), 33–46.
- Stone, D. (1989). Causal stories and the formation of policy agendas. *Political Science Quarterly* 104(2), 281–300.
- Herd, P. & Moynihan, D. (2018). *Administrative Burden: Policymaking by Other Means*. Russell Sage.
- [Silvia, C. (2012). The impact of simulations on higher-level learning. *JPAE* 18(2).](https://informahealthcare.com/doi/abs/10.1080/15236803.2012.12001690)
- [Stapleton, S. (2018). Assessing learning outcomes from simulations. *Journal of Political Science Education*.](https://informahealthcare.com/doi/full/10.1080/15512169.2018.1526089)
- Robinson, A. & Goodridge, M. (2021). Objective assessment of pedagogical effectiveness and the Human Rights Foreign Policy Simulation Game. *JPSE* 17(2).
- [Oberle, M. et al. (2020). Simulation games in EU education. *European Political Science*.](https://link.springer.com/article/10.1057/s41304-020-00261-2)
- [Dunlop, C. Teaching with experiments. *International Handbook on the Teaching of Public Administration*.](https://ore.exeter.ac.uk/rest/bitstreams/184315/retrieve)
- Course readings referenced by section: Schneider & Ingram 1990, 1993; Linder & Peters 1989, 1991; Moynihan, Herd & Harvey 2015; May 2012; Busetti & Dente 2018; Bowles 2008; Van Geet et al. 2021; Capano & Howlett 2022; Bardach ch. on assembling evidence and Appendix B; Stone 2012 ch. 2 and 5; Week 7, 8 and 12 class plans (all in the PAI 785 project files).
