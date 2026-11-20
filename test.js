// Headless harness: loads index.html's script with a stub DOM and plays games end to end.
const fs = require('fs'), path = require('path'), vm = require('vm');
const dir = process.argv[2] || __dirname;
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
const script = html.match(/<script>([\s\S]*)<\/script>/)[1];
const content = JSON.parse(fs.readFileSync(path.join(dir, 'content.json'), 'utf8'));

const el = () => ({ _html: '', set innerHTML(v) { this._html = v; }, get innerHTML() { return this._html; }, querySelectorAll: () => [], querySelector: () => null, onclick: null, onchange: null, style: {}, classList: { toggle() {} }, dataset: {}, click() {}, textContent: '' });
const store = {};
const ctx = {
  console, Math, JSON, Set, Array, Object, String, Number, Blob: class { constructor(p) { this.text = p.join(''); } },
  URL: { createObjectURL: () => 'blob:x', revokeObjectURL() {} }, FileReader: class {}, URLSearchParams,
  setInterval: () => 1, clearInterval() {}, setTimeout: () => 1, alert: m => { throw new Error('alert: ' + m); }, confirm: () => true,
  localStorage: { getItem: k => store[k] ?? null, setItem: (k, v) => { store[k] = v; }, removeItem: k => { delete store[k]; } },
  location: { search: '', origin: 'file://', pathname: '/index.html' },
  document: { getElementById: () => el(), querySelector: () => null, querySelectorAll: () => [], addEventListener() {}, body: el(), createElement: () => ({ click() {}, set href(v) {}, get href() { return 'blob:x'; } }) },
  fetch: () => ({ then: () => ({ then: () => ({ catch() {} }) }) }),
};
vm.createContext(ctx);
vm.runInContext(script, ctx);
vm.runInContext('C = ' + JSON.stringify(content) + ';', ctx);

const g = name => vm.runInContext(name, ctx);
const run = code => vm.runInContext(code, ctx);
let fails = 0;
const t = (name, ok, extra) => { console.log((ok ? 'PASS ' : 'FAIL ') + name + (extra ? '  ' + extra : '')); if (!ok) fails++; };

// 1. built-in self test
run('S = null; newState("lite",{seed:"10"});');
const st = g('selfTest()');
st.forEach(l => { console.log('  ' + l); if (l.startsWith('FAIL')) fails++; });

// 2. play a game to the end, choosing option 0 on every decision card
function play(mode, u, picks) {
  run(`newState(${JSON.stringify(mode)}, ${JSON.stringify(u)});`);
  for (const [k, v] of Object.entries(picks)) run(`setChoice(${JSON.stringify(k)}, ${JSON.stringify(v)})`);
  if (u.brief) run(`S.brief=${JSON.stringify(u.brief)}; S.clause={trigger:1,income_period:2,residence:1};`);
  t(`${mode}: design complete`, g('designComplete()'));
  run('adopt(); render();');
  let guard = 0;
  while (g('S.phase') !== 'end' && guard++ < 500) {
    const ph = g('S.phase');
    if (ph === 'briefing') run('afterBriefing(); render();');
    else if (ph === 'lens') run('S.lens="tenant"; S.phase="briefing"; render();');
    else if (ph === 'adjust') {
      // exercise a mid-game redesign where allowed
      const editable = g('C.choices.filter(c=>canEdit(c.id)).map(c=>c.id)');
      if (editable.includes('documentation')) run('setChoice("documentation", S.choices.documentation==="doc_full"?"doc_standard":"doc_full")');
      if (editable.includes('instrument_mix')) run('setChoice("instrument_mix","mix_landlord")');
      if (editable.includes('causal_story')) run('setChoice("causal_story","cs_landlord")');
      run('lockQuarter(); render();');
    } else if (ph === 'cards') {
      run('render();'); // renders card; auto cards resolve on render
      const dec = g('isDecision(cardById(S.deck[S.cardIdx]))');
      if (dec) run('decide(0,false); render();');
      run('nextCard();');
    } else if (ph === 'memo') run('render(); continueAfterMemo(); render();');
    else throw new Error('unexpected phase ' + ph);
  }
  t(`${mode}: reached end`, g('S.phase') === 'end');
  run('render();');
  const hist = g('JSON.stringify(S.history.map(h=>h.ind))');
  const H = JSON.parse(hist);
  t(`${mode}: quarters played = ${u.quarters || content.modes[mode].quarters}`, H.length - 1 === (u.quarters || content.modes[mode].quarters), hist);
  t(`${mode}: all indicators within 0-100`, H.every(h => Object.values(h).every(v => v >= 0 && v <= 100)));
  t(`${mode}: memos written`, g('S.memos.length') > 0, 'memos=' + g('S.memos.map(m=>m.q+":"+m.ev).join(",")'));
  t(`${mode}: fit history has design + quarters`, g('S.fitHistory.length') === H.length);
  t(`${mode}: end screen renders`, g('document.getElementById("desk")') !== null);
  const desk = run('(()=>{const d=document.getElementById("desk");renderEnd(d);return d.innerHTML;})()');
  t(`${mode}: end screen has chart, memos, prompts, log`, /<svg/.test(desk) && /Evaluator memos/.test(desk) && /Debrief prompts/.test(desk) && /Decision log/.test(desk));
  t(`${mode}: export builds`, (() => { try { run('exportLog()'); return true; } catch (e) { console.log(e.message); return false; } })());
  console.log('   cards per quarter:', g('S.log.filter(l=>/^Q\\d/.test(l.text)).length'), ' changes:', g('S.changes.length'), ' used cards:', g('S.used.length'));
  console.log('   final:', JSON.stringify(H[H.length - 1]), ' groups:', JSON.stringify(g('groupReach()')));
}

play('lite', { seed: '10' }, { causal_story: 'cs_tenant', objectives: ['obj_reach70', 'obj_improper3'], instrument_mix: 'mix_conditional', implementer: 'imp_portal', documentation: 'doc_full', enforcement: 'enf_clawback' });
play('lite', { seed: 'AB', unlock: true }, { causal_story: 'cs_shortage', objectives: ['obj_evict30', 'obj_landlord'], instrument_mix: 'mix_landlord', implementer: 'imp_nonprofit', documentation: 'doc_self', enforcement: 'enf_trust' });
play('full', { seed: '10', brief: 'eb_university' }, { causal_story: 'cs_market', governance_goal: 'gg_fiscal', instrument_logic: 'il_communicative', objectives: ['obj_reach70', 'obj_14days'], instrument_mix: 'mix_hortatory', implementer: 'imp_contractor', income_threshold: 'it_120', benefit_cap: 'cap_low', duration: 'dur_3', window: 'win_rounds', eligibility: 'elig_priority', documentation: 'doc_full', enforcement: 'enf_prepay', form_length: 'form_full', appeal_window: 'app_none' });
play('full', { seed: '7', brief: 'eb_budget', timer: '1', expert: true }, { causal_story: 'cs_landlord', governance_goal: 'gg_right', instrument_logic: 'il_coercive', objectives: ['obj_evict30', 'obj_improper3'], instrument_mix: 'mix_tenant', implementer: 'imp_city', income_threshold: 'it_50', benefit_cap: 'cap_high', duration: 'dur_12', window: 'win_rolling', eligibility: 'elig_landlord', documentation: 'doc_self', enforcement: 'enf_clawback', form_length: 'form_one', appeal_window: 'app_60' });

// 3. the coherence-trap design from Section 5 should be all green
run('newState("full",{seed:"10"});');
for (const [k, v] of Object.entries({ causal_story: 'cs_market', governance_goal: 'gg_market', instrument_logic: 'il_financial', objectives: ['obj_landlord', 'obj_evict30'], instrument_mix: 'mix_landlord', implementer: 'imp_city', income_threshold: 'it_80', benefit_cap: 'cap_mid', duration: 'dur_6', window: 'win_rolling', eligibility: 'elig_landlord', documentation: 'doc_standard', enforcement: 'enf_prepay', form_length: 'form_one', appeal_window: 'app_14' })) run(`setChoice(${JSON.stringify(k)}, ${JSON.stringify(v)})`);
run('S.brief="eb_budget"; adopt();');
const fit = g('JSON.stringify(runFit())');
t('coherence trap: all three lights green', JSON.parse(fit).coherence.light === 'green' && JSON.parse(fit).consistency.light === 'green' && JSON.parse(fit).congruence.light === 'green', fit);
console.log('   landlord design start:', g('JSON.stringify(S.ind)'), g('JSON.stringify(groupReach())'));

console.log(fails ? `\n${fails} FAILURE(S)` : '\nALL PASS');
process.exit(fails ? 1 : 0);
