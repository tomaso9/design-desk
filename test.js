// Headless test: loads index.html's script with a stub DOM and plays games end to end. Run: node test.js
const fs = require('fs'), path = require('path'), vm = require('vm');
const dir = process.argv[2] || __dirname;
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
const script = html.match(/<script>([\s\S]*)<\/script>/)[1];
const content = JSON.parse(fs.readFileSync(path.join(dir, 'content.json'), 'utf8'));

const rendered = {};
const el = id => ({ set innerHTML(v) { rendered[id] = v; }, get innerHTML() { return rendered[id] || ''; }, querySelectorAll: () => [], querySelector: () => null, onclick: null, style: {}, classList: { toggle() {} }, dataset: {}, click() {}, textContent: '', className: '' });
const store = {};
const ctx = {
  console, Math, JSON, Set, Array, Object, String, Number, Blob: class { constructor(p) { this.text = p.join(''); } },
  URL: { createObjectURL: () => 'blob:x', revokeObjectURL() {} }, FileReader: class {}, URLSearchParams,
  setTimeout: () => 1, alert: m => { throw new Error('alert: ' + m); }, confirm: () => true,
  localStorage: { getItem: k => store[k] ?? null, setItem: (k, v) => { store[k] = v; }, removeItem: k => { delete store[k]; } },
  location: { search: '', origin: 'file://', pathname: '/index.html' },
  document: { getElementById: el, querySelector: () => null, querySelectorAll: () => [], addEventListener() {}, body: el('body'), createElement: () => ({ click() {}, set href(v) {}, get href() { return 'blob:x'; } }) },
  fetch: () => ({ then: () => ({ then: () => ({ catch() {} }) }) }),
};
ctx.window = ctx; ctx.addEventListener = () => {};
vm.createContext(ctx);
vm.runInContext(script, ctx);
vm.runInContext('C = ' + JSON.stringify(content) + ';', ctx);

const g = name => vm.runInContext(name, ctx);
const run = code => vm.runInContext(code, ctx);
let fails = 0;
const t = (name, ok, extra) => { console.log((ok ? 'PASS ' : 'FAIL ') + name + (extra ? '  ' + extra : '')); if (!ok) fails++; };

// 1. built-in self test
run('S = null; newState({seed:"10"});');
g('selfTest()').forEach(l => { console.log('  ' + l); if (l.startsWith('FAIL')) fails++; });

// 2. play a game to the end through the same functions the buttons call
function play(label, u, code, redesign) {
  run(`newState(${JSON.stringify(u)}); S.phase='ordinance';`);
  const err = g(`loadDesignCode(${JSON.stringify(code)})`);
  t(`${label}: design code accepted`, err === '', err);
  t(`${label}: design complete`, g('designComplete()'));
  run('adopt(); render();');
  t(`${label}: passed screen renders`, /PASS|ADOPTED/.test(rendered.center));
  run("S.quarter=1; S.phase='briefing'; render();");
  let guard = 0;
  while (g('S.phase') !== 'end' && guard++ < 500) {
    const ph = g('S.phase');
    if (ph === 'briefing') run('startCards(); render();');
    else if (ph === 'adjust') {
      run('render();');
      const editable = g('editableChoices()');
      if (redesign) for (const [k, v] of Object.entries(redesign)) if (editable.includes(k)) run(`setChoice(${JSON.stringify(k)}, ${JSON.stringify(v)})`);
      run('lockQuarter(); render();');
    } else if (ph === 'cards') {
      run('render();');
      const dec = g('isDecision(cardById(S.deck[S.cardIdx]))');
      if (dec) { t(`${label}: decision card shows choices`, /YOUR DECISION/.test(rendered.center)); run('decide(0); render();'); }
      t(`${label}: resolved card shows a stamp`, /class="stamp/.test(rendered.center));
      run('nextCard();');
      if (g('S.phase') === 'memo') t(`${label}: closing the quarter redraws the screen`, /MEMO/.test(rendered.center));
    } else if (ph === 'memo') run('continueAfterMemo(); render();');
    else throw new Error('unexpected phase ' + ph);
  }
  t(`${label}: reached end`, g('S.phase') === 'end');
  run('render();');
  const H = JSON.parse(g('JSON.stringify(S.history.map(h=>h.ind))'));
  t(`${label}: quarters played = ${u.quarters || content.mode.quarters}`, H.length - 1 === (u.quarters || content.mode.quarters));
  t(`${label}: all indicators within 0-100`, H.every(h => Object.values(h).every(v => v >= 0 && v <= 100)));
  t(`${label}: memos written`, g('S.memos.length') > 0, 'memos=' + g('S.memos.map(m=>m.q+":"+m.ev).join(",")'));
  t(`${label}: end screen has verdict, results, tabs`, /PROMOTED|PROBATION|LET GO/.test(rendered.center) && /HOUSEHOLDS HELPED/.test(rendered.center) && /Who got help/.test(rendered.center));
  for (const tab of ['grid', 'evas', 'log', 'debrief']) { run(`S.tab=${JSON.stringify(tab)}; render();`); t(`${label}: tab ${tab} renders`, rendered.center.length > 500); }
  t(`${label}: debrief tab tells students to answer in the file`, /Download the log/.test(rendered.center) && /exportBtn3/.test(rendered.center));
  run('S.tab="grid"; render();');
  t(`${label}: grid tab defines the three fit words`, /Coherence:/.test(rendered.center) && /Congruence:/.test(rendered.center));
  run('S.tab="evas"; S.evas="chief"; render();');
  t(`${label}: evaluate-as renders a memo`, /Chief of Staff/.test(rendered.center));
  t(`${label}: export builds`, (() => { try { run('exportLog()'); return true; } catch (e) { console.log(e.message); return false; } })());
  console.log('   final:', JSON.stringify(H[H.length - 1]), ' verdict:', g('ending().stamp'), ' changes:', g('S.changes.length'), ' groups:', g('JSON.stringify(groupReach())'));
}

play('strict design', { seed: '10' }, 'DD3-23-3-4-3-3', { documentation: 'doc_standard', enforcement: 'enf_trust' });
play('trusting design + unlock', { seed: 'AB', unlock: true }, 'DD4-14-1-2-1-1', { income_threshold: 'it_50', benefit_cap: 'cap_low', documentation: 'doc_full' });
play('landlord design, 3 quarters', { seed: '7', quarters: 3 }, 'DD1-41-1-1-2-2', null);

// 3. the coherence-trap design from Section 5: lights green, equity poor
run('newState({seed:"10"}); S.phase="ordinance"; loadDesignCode("DD1-14-1-1-2-2"); S.choices.eligibility="elig_landlord"; adopt();');
const fit = JSON.parse(g('JSON.stringify(runFit())'));
t('coherence trap: all three lights green', ['coherence', 'consistency', 'congruence'].every(k => fit[k].light === 'green'), JSON.stringify(fit));
t('coherence trap: equity below 40', g('S.ind.equity') < 40, 'equity=' + g('S.ind.equity'));

// 3b. budget: a generous design runs dry mid-quarter and applicant cards are turned away
run('newState({seed:"10"}); S.phase="ordinance"; loadDesignCode("DD1-12-2-2-1-1"); adopt(); S.budget=20; S.quarter=1; startCards();');
t('budget: plan computed', g('S.plan && S.plan.spend > 0'), 'spend=' + g('S.plan.spend'));
t('budget: runs dry when spend exceeds remaining', g('S.plan.dryAt') !== null, 'dryAt=' + g('S.plan.dryAt'));
run('S.cardIdx=S.plan.dryAt; render();');
t('budget: dry applicant card is stamped NO FUNDS', /NO FUNDS/.test(rendered.center) && g('S.resolved.result') === 'NO FUNDS');
t('budget: dry card bypasses the decision buttons', !/YOUR DECISION/.test(rendered.center));
run('S.cardIdx=S.deck.length-1; S.resolved=null; S.qCards=[]; endQuarter();');
t('budget: spent down to zero and dry headline logged', g('S.budget') === 0 && g('S.log.some(l=>/runs out of money/.test(l.text))'));
run('newState({seed:"10"}); S.phase="ordinance"; loadDesignCode("DD1-12-2-2-1-1"); adopt(); S.quarter=1; startCards();');
t('budget: default appropriation covers quarter 1', g('S.plan.dryAt') === null, 'spend=' + g('S.plan.spend') + ' budget=' + g('S.budget'));

// 3c. promises: a missed objective costs political support at the end
run('newState({seed:"10"}); S.phase="ordinance"; loadDesignCode("DD1-23-2-2-3-2"); adopt(); S.ind.reach=10; S.quarter=S.cfg.quarters; S.deck=[]; S.qCards=[]; S.plan={spend:0,dryAt:null}; const p0=S.ind.political; endQuarter(); globalThis.__pdrop=p0-S.ind.political;');
t('promises: reach 70% promise missed at reach 10', g('S.promises.find(o=>o.id==="obj_reach70").met') === false);
t('promises: missed promise costs political support', g('__pdrop') >= content.setting.missed_objective_penalty, 'drop=' + g('__pdrop'));
run('render();');
t('promises: panel shows on the right', /PROMISES/.test(rendered.right) && /BUDGET/.test(rendered.right));

// 4. intro screen renders the instructions and the fit definitions
run('newState({seed:"10"}); S.phase="intro"; render();');
t('intro: instructions and definitions render', /How this works/.test(rendered.center) && /Coherence:/.test(rendered.center) && /WRITE THE ORDINANCE/.test(rendered.center));

// 5. the ordinance screen: incomplete objectives disable Next, complete enables it
run('newState({seed:"10"}); S.phase="ordinance"; S.step=1; S.choices.objectives=["obj_evict30"]; render();');
t('ordinance: one objective leaves Next disabled', /id="nextBtn" disabled/.test(rendered.center) && /Pick 2 to continue/.test(rendered.center));
run('S.choices.objectives=["obj_evict30","obj_reach70"]; render();');
t('ordinance: two objectives enable Next', !/id="nextBtn" disabled/.test(rendered.center));
t('ordinance: objectives say when they are kept', (rendered.center.match(/Kept if/g) || []).length === 5);
run('S.step=4; render();');
t('ordinance: options state their cost per quarter in dollars', /Costs about \$[\d.]+[Mk]? more per quarter/.test(rendered.center) && /Saves about \$[\d.]+[Mk]? per quarter/.test(rendered.center));
t('ordinance: no arrow lines', !/↑|↓/.test(rendered.center));

// 6. cards: decisions that spend say so in dollars, approvals stamp the household amount, budget effects are real
run('newState({seed:"10"}); S.phase="ordinance"; loadDesignCode("DD1-23-2-1-2-2"); adopt(); S.quarter=1; S.deck=["a12","c01"]; S.cardIdx=0; S.plan={spend:0,dryAt:null}; S.phase="cards"; S.qCards=[]; render();');
t('decision choice shows what it spends', /Spends \$360k of the appropriation/.test(rendered.center));
run('decide(0); render();');
t('budget effect deducted for real', g('S.budget') === 97, 'budget=' + g('S.budget'));
t('approval stamps the household amount', /class="amt">\$19k</.test(rendered.center), (rendered.center.match(/class="amt">[^<]*/) || [''])[0]);
run('S.cardIdx=1; S.resolved=null; render();');
t('denial stamps no amount', /DENIED/.test(rendered.center) && !/class="amt"/.test(rendered.center));
t('budget panel shows dollars', /\$12M/.test(rendered.right) && /spent so far this quarter/.test(rendered.right));

console.log(fails ? `\n${fails} FAILURE(S)` : '\nALL PASS');
process.exit(fails ? 1 : 0);
