/* ═══════════════════════════════════════════
   script.js — Expense Tracker
   ─ Add income and expense transactions
   ─ LocalStorage persistence
   ─ Category breakdown bars
   ─ Running balance, progress bar
   ─ Filter by type (all / expense / income)
════════════════════════════════════════════ */

// ── STATE ──
let transactions = JSON.parse(localStorage.getItem('kab-expenses')) || [];
let txType  = 'expense'; // current selection on type toggle
let txFilter = 'all';    // current filter on history list

// Category emoji map
const CATEGORY_EMOJI = {
  food:      '🍜',
  transport: '🚌',
  school:    '📚',
  shopping:  '🛍',
  health:    '💊',
  salary:    '💰',
  other:     '📦',
};

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  // Set month label in header
  document.getElementById('monthLabel').textContent =
    new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Allow Enter key to submit
  document.getElementById('txDesc').addEventListener('keydown', e => {
    if (e.key === 'Enter') addTransaction();
  });

  render();
});

// ── SAVE ──
function save() {
  localStorage.setItem('kab-expenses', JSON.stringify(transactions));
}

// ── SET TYPE (expense / income toggle) ──
function setType(type, btn) {
  txType = type;
  document.getElementById('btnExpense').classList.toggle('active', type === 'expense');
  document.getElementById('btnIncome').classList.toggle('active',  type === 'income');
}

// ── SET FILTER ──
function setFilter(value, btn) {
  txFilter = value;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderList();
}

// ── ADD TRANSACTION ──
function addTransaction() {
  const descInput   = document.getElementById('txDesc');
  const amountInput = document.getElementById('txAmount');
  const category    = document.getElementById('txCategory').value;

  const desc   = descInput.value.trim();
  const amount = parseFloat(amountInput.value);

  // Validation
  if (!desc) {
    flash(descInput);
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    flash(amountInput);
    return;
  }

  // Build transaction object
  const tx = {
    id:       Date.now(),
    desc:     desc,
    amount:   amount,
    type:     txType,       // 'expense' or 'income'
    category: category,
    date:     new Date().toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric'
              }),
  };

  transactions.unshift(tx); // newest first
  save();
  render();

  // Clear inputs
  descInput.value  = '';
  amountInput.value = '';
  descInput.focus();
}

// ── DELETE TRANSACTION ──
function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  save();
  render();
}

// ── RESET ALL ──
function resetData() {
  if (confirm('Are you sure you want to clear all transactions?')) {
    transactions = [];
    save();
    render();
  }
}

// ── RENDER (everything) ──
function render() {
  renderSummary();
  renderList();
  renderBreakdown();
}

// ── RENDER SUMMARY ──
function renderSummary() {
  const totalIncome   = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  document.getElementById('totalIncome').textContent   = `₱ ${fmt(totalIncome)}`;
  document.getElementById('totalExpenses').textContent = `₱ ${fmt(totalExpenses)}`;
  document.getElementById('balance').textContent       = `₱ ${fmt(balance)}`;

  // Progress bar — what % of income has been spent
  const pct = totalIncome > 0 ? Math.min((totalExpenses / totalIncome) * 100, 100) : 0;
  const fill = document.getElementById('budgetFill');
  fill.style.width = pct + '%';
  fill.classList.toggle('danger', pct >= 80); // turns red when ≥80%
  document.getElementById('budgetPercent').textContent =
    `${Math.round(pct)}% of income`;
}

// ── RENDER TRANSACTION LIST ──
function renderList() {
  const list       = document.getElementById('txList');
  const emptyState = document.getElementById('emptyState');

  // Apply filter
  const filtered = transactions.filter(t => {
    if (txFilter === 'expense') return t.type === 'expense';
    if (txFilter === 'income')  return t.type === 'income';
    return true;
  });

  list.innerHTML = filtered.map(tx => `
    <li class="tx-item">
      <span class="tx-emoji">${CATEGORY_EMOJI[tx.category] || '📦'}</span>
      <div class="tx-info">
        <div class="tx-desc">${escapeHtml(tx.desc)}</div>
        <div class="tx-meta">${tx.date} · ${tx.category}</div>
      </div>
      <span class="tx-amount ${tx.type}">
        ${tx.type === 'expense' ? '−' : '+'}₱${fmt(tx.amount)}
      </span>
      <button class="tx-delete" onclick="deleteTransaction(${tx.id})" title="Delete">
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    </li>
  `).join('');

  emptyState.classList.toggle('show', filtered.length === 0);
}

// ── RENDER CATEGORY BREAKDOWN ──
// Shows a bar per category with total spent
function renderBreakdown() {
  const container = document.getElementById('breakdownList');

  // Sum expenses per category
  const totals = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      totals[t.category] = (totals[t.category] || 0) + t.amount;
    });

  const entries   = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  const maxAmount = entries.length ? entries[0][1] : 1;

  if (entries.length === 0) {
    container.innerHTML = '<p style="font-size:.8rem;color:#4a5568;padding:.25rem 0;">No expense data yet.</p>';
    return;
  }

  container.innerHTML = entries.map(([cat, amount]) => {
    const pct = (amount / maxAmount) * 100;
    return `
      <div class="breakdown-item">
        <span class="breakdown-label">${CATEGORY_EMOJI[cat]} ${cat}</span>
        <div class="breakdown-bar-track">
          <div class="breakdown-bar-fill" style="width:${pct}%"></div>
        </div>
        <span class="breakdown-amount">₱${fmt(amount)}</span>
      </div>`;
  }).join('');
}

// ── HELPERS ──

// Format number as Philippine Peso: 1234.5 → "1,234.50"
function fmt(num) {
  return num.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Prevent XSS
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Flash red border on invalid input
function flash(inputEl) {
  inputEl.style.borderColor = '#f85149';
  inputEl.focus();
  setTimeout(() => (inputEl.style.borderColor = ''), 800);
}
