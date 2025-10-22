const display = document.getElementById('display');
let current = '0';
let operator = null;
let previous = null;
let shouldReset = false;

function update() { display.textContent = current; }

function inputDigit(d) {
  if (shouldReset) { current = d; shouldReset = false; }
  else current = (current === '0' && d !== '.') ? d : current + d;
}

function inputDot() {
  if (shouldReset) { current = '0.'; shouldReset = false; return; }
  if (!current.includes('.')) current += '.';
}

function handleOp(op) {
  if (operator && !shouldReset) compute();
  previous = parseFloat(current);
  operator = op;
  shouldReset = true;
}

function compute() {
  if (operator == null || previous == null) return;
  const a = previous;
  const b = parseFloat(current);
  let res = 0;
  switch(operator){
    case '+': res = a + b; break;
    case '-': res = a - b; break;
    case '*': res = a * b; break;
    case '/': res = b === 0 ? 'Error' : a / b; break;
  }
  current = (typeof res === 'number' && !Number.isFinite(res)) ? 'Error' : String(res);
  operator = null;
  previous = null;
  shouldReset = true;
}

function clearAll(){ current = '0'; operator = null; previous = null; shouldReset = false; }

function del(){ if (shouldReset) { clearAll(); } else current = current.length>1 ? current.slice(0,-1) : '0'; }

function togglePercent(){ current = String(parseFloat(current) / 100); }

document.querySelectorAll('.keys button').forEach(btn => {
  btn.addEventListener('click', () => {
    const action = btn.dataset.action;
    const v = btn.textContent;
    if (!action) { inputDigit(v); update(); return; }
    switch(action){
      case 'dot': inputDot(); break;
      case 'op': handleOp(v); break;
      case 'equals': compute(); break;
      case 'clear': clearAll(); break;
      case 'del': del(); break;
      case 'percent': togglePercent(); break;
    }
    update();
  });
});

update();
