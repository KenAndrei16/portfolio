/* ═══════════════════════════════════════════
   script.js — To-Do List App
   ─ Tasks stored in localStorage so they
     persist after closing the browser tab
   ─ Features: add, complete, delete, filter,
     priority levels, stats counter
════════════════════════════════════════════ */

// ── STATE ──
let tasks          = JSON.parse(localStorage.getItem('kab-tasks')) || [];
let filter         = 'all'; // 'all' | 'pending' | 'done'
let priorityFilter = 'all'; // 'all' | 'high' | 'medium' | 'low'

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  // Show today's date in the header
  const now = new Date();
  document.getElementById('dateDisplay').textContent =
    now.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric', year:'numeric' });

  // Allow pressing Enter to add a task
  document.getElementById('taskInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask();
  });

  render(); // draw the list
});

// ── SAVE to localStorage ──
function save() {
  localStorage.setItem('kab-tasks', JSON.stringify(tasks));
}

// ── ADD TASK ──
function addTask() {
  const input    = document.getElementById('taskInput');
  const priority = document.getElementById('prioritySelect').value;
  const text     = input.value.trim();

  if (!text) {
    // Briefly shake the input if empty
    input.style.borderColor = '#f85149';
    setTimeout(() => (input.style.borderColor = ''), 800);
    return;
  }

  // Create a new task object
  const task = {
    id:       Date.now(),       // unique ID using timestamp
    text:     text,
    priority: priority,         // 'low' | 'medium' | 'high'
    done:     false,
    created:  new Date().toISOString(),
  };

  tasks.unshift(task); // add to top of list
  save();
  render();

  input.value = ''; // clear the input
  input.focus();
}

// ── TOGGLE TASK DONE/UNDONE ──
function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.done = !task.done;
    save();
    render();
  }
}

// ── DELETE TASK ──
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  save();
  render();
}

// ── CLEAR ALL COMPLETED ──
function clearCompleted() {
  tasks = tasks.filter(t => !t.done);
  save();
  render();
}

// ── SET FILTER (All / Pending / Done) ──
function setFilter(value, btn) {
  filter = value;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  render();
}

// ── SET PRIORITY FILTER ──
function setPriorityFilter(value, btn) {
  priorityFilter = value;
  document.querySelectorAll('.priority-filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  render();
}

// ── RENDER ──
// Rebuilds the task list in the DOM based on current state + filter
function render() {
  const list       = document.getElementById('taskList');
  const emptyState = document.getElementById('emptyState');

  // Apply status filter then priority filter
  const visible = tasks.filter(t => {
    const statusOk   = filter === 'all' || (filter === 'pending' && !t.done) || (filter === 'done' && t.done);
    const priorityOk = priorityFilter === 'all' || t.priority === priorityFilter;
    return statusOk && priorityOk;
  });

  // Build HTML for each task
  list.innerHTML = visible.map(task => `
    <li class="task-item ${task.done ? 'done' : ''}" id="task-${task.id}">
      <!-- Circular checkbox -->
      <div class="task-check ${task.done ? 'checked' : ''}"
           onclick="toggleTask(${task.id})"
           title="${task.done ? 'Mark undone' : 'Mark done'}">
      </div>

      <!-- Priority colour dot -->
      <div class="priority-dot ${task.priority}" title="Priority: ${task.priority}"></div>

      <!-- Task text -->
      <span class="task-text">${escapeHtml(task.text)}</span>

      <!-- Delete button -->
      <button class="task-delete" onclick="deleteTask(${task.id})" title="Delete task">
        <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M3 6h18M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2"/>
        </svg>
      </button>
    </li>
  `).join('');

  // Show empty state if nothing to display
  emptyState.classList.toggle('show', visible.length === 0);

  // Update stats counters
  document.getElementById('totalCount').textContent   = tasks.length;
  document.getElementById('doneCount').textContent    = tasks.filter(t => t.done).length;
  document.getElementById('pendingCount').textContent = tasks.filter(t => !t.done).length;
}

// ── HELPER: Escape HTML to prevent XSS ──
// Prevents task text from being interpreted as HTML
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
