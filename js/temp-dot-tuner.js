/* =====================================================================
   TEMP — Pink-dot pop tuner.  DELETE BEFORE SHIP.
   A floating panel for dialling in the "Simple." full-stop pop:
   start delay, duration, bounce (back-ease overshoot) and start scale.
   Writes the --dot-* CSS vars consumed by .pink-accent (see the CSS),
   then calls window.__heroEntrance() to replay the whole hero sequence.
   To remove: delete this file and its <script> tag in index.html.
   ===================================================================== */
(function () {
  // Homepage only, and only where the entrance actually runs.
  var dot = document.querySelector('#top-module .display-hero .pink-accent');
  if (!dot) return;

  var root = document.documentElement;

  // Single source of truth — must match the CSS defaults.
  var controls = [
    { key: 'delay', label: 'Start delay', unit: 's',  min: 0,   max: 2.5, step: 0.05, val: 0.7,  css: '--dot-delay' },
    { key: 'dur',   label: 'Duration',    unit: 's',  min: 0.1, max: 1.2, step: 0.05, val: 0.25, css: '--dot-dur'   },
    { key: 'bounce',label: 'Bounce',      unit: '',   min: 1,   max: 2.4, step: 0.05, val: 2,    css: null          },
    { key: 'start', label: 'Start scale', unit: '',   min: 0,   max: 1,   step: 0.05, val: 0.2,  css: '--dot-start' }
  ];
  function get(k) { return controls.filter(function (c) { return c.key === k; })[0]; }

  // Snapshot the starting values so "Reset" can revert to them.
  var defaults = {};
  controls.forEach(function (c) { defaults[c.key] = c.val; });

  // bounce -> back-ease-out curve. Higher = more overshoot.
  function easeStr() { return 'cubic-bezier(0.34, ' + get('bounce').val.toFixed(2) + ', 0.64, 1)'; }

  // Push every value to the CSS vars on :root.
  function apply() {
    controls.forEach(function (c) {
      if (c.css) root.style.setProperty(c.css, c.val + (c.unit || ''));
    });
    root.style.setProperty('--dot-ease', easeStr());
  }

  function replay() {
    apply();
    // Rebuilds the "Simple" letters + support line (fresh nodes restart their
    // CSS animations) and recreates the dot, so the whole sequence plays again.
    if (typeof window.__heroEntrance === 'function') window.__heroEntrance();
  }

  // Revert every slider to its starting value, then replay.
  function reset() {
    controls.forEach(function (c) {
      c.val = defaults[c.key];
      var input = panel.querySelector('input[data-k="' + c.key + '"]');
      if (input) input.value = c.val;
    });
    refreshLabels();
    replay();
  }

  // ---- Build the panel -------------------------------------------------
  var css = '' +
    '#dot-tuner{position:fixed;right:16px;bottom:16px;z-index:99999;width:248px;' +
      'font:13px/1.4 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;' +
      'background:rgba(20,20,24,.92);color:#f4f4f5;padding:14px 16px 16px;' +
      'border-radius:12px;box-shadow:0 8px 30px rgba(0,0,0,.35);backdrop-filter:blur(8px)}' +
    '#dot-tuner h4{margin:0 0 10px;font-size:12px;letter-spacing:.04em;text-transform:uppercase;opacity:.7}' +
    '#dot-tuner .row{margin:0 0 10px}' +
    '#dot-tuner label{display:flex;justify-content:space-between;margin-bottom:4px}' +
    '#dot-tuner label b{font-weight:600;color:#f9a8d4}' +
    '#dot-tuner input[type=range]{width:100%;accent-color:#ec4899;margin:0}' +
    '#dot-tuner .ease{font-size:11px;opacity:.6;word-break:break-all;margin:8px 0 10px}' +
    '#dot-tuner .btns{display:flex;gap:8px}' +
    '#dot-tuner button{flex:1;padding:8px;border:0;border-radius:8px;background:#ec4899;' +
      'color:#fff;font-weight:600;font-size:13px;cursor:pointer;transition:transform 120ms ease-out}' +
    '#dot-tuner button.secondary{background:rgba(255,255,255,.12);color:#f4f4f5}' +
    '#dot-tuner button:active{transform:scale(0.97)}' +
    '#dot-tuner .hint{margin-top:8px;font-size:11px;opacity:.55}';
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var panel = document.createElement('div');
  panel.id = 'dot-tuner';
  panel.innerHTML = '<h4>Pink dot tuner · temp</h4>';

  controls.forEach(function (c) {
    var row = document.createElement('div');
    row.className = 'row';
    row.innerHTML =
      '<label>' + c.label + ' <b id="dt-' + c.key + '">' + c.val + c.unit + '</b></label>' +
      '<input type="range" data-k="' + c.key + '" min="' + c.min + '" max="' + c.max +
      '" step="' + c.step + '" value="' + c.val + '">';
    panel.appendChild(row);
  });

  var ease = document.createElement('div');
  ease.className = 'ease';
  ease.id = 'dt-ease';
  panel.appendChild(ease);

  var btns = document.createElement('div');
  btns.className = 'btns';
  var btn = document.createElement('button');
  btn.textContent = '▶ Replay';
  var resetBtn = document.createElement('button');
  resetBtn.className = 'secondary';
  resetBtn.textContent = '↺ Reset';
  btns.appendChild(btn);
  btns.appendChild(resetBtn);
  panel.appendChild(btns);

  var hint = document.createElement('div');
  hint.className = 'hint';
  hint.textContent = 'Text settles ≈0.95s. Press Replay to preview.';
  panel.appendChild(hint);

  document.body.appendChild(panel);

  function refreshLabels() {
    controls.forEach(function (c) {
      document.getElementById('dt-' + c.key).textContent = c.val + c.unit;
    });
    ease.textContent = '--dot-ease: ' + easeStr();
  }

  // ---- Wire up ---------------------------------------------------------
  // Sliders only record the value + update the vars/readout. The animation is
  // never replayed mid-adjustment — that re-runs only when you press Replay.
  panel.addEventListener('input', function (e) {
    var k = e.target.getAttribute('data-k');
    if (!k) return;
    get(k).val = parseFloat(e.target.value);
    refreshLabels();
    apply(); // stage the --dot-* vars so Replay uses the latest values
  });
  btn.addEventListener('click', replay);
  resetBtn.addEventListener('click', reset);

  refreshLabels();
  apply(); // seed the vars; main.js already played the entrance on load
})();
