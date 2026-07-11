// ============================================================
// ui.js — Shared UI helpers (Toast, Modal, Loaders)
// ============================================================

const UI = {
  // ─── Toast Notifications ───────────────────────────────────
  toast(message, type = 'info', duration = 3500) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span class="toast-icon">${icons[type]||'💬'}</span><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('toast-out');
      setTimeout(() => toast.remove(), 400);
    }, duration);
  },

  // ─── Modal ─────────────────────────────────────────────────
  openModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('active');
  },
  closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  },
  closeAllModals() {
    document.querySelectorAll('.modal-overlay.active').forEach(el => el.classList.remove('active'));
  },

  // ─── Section Navigation ────────────────────────────────────
  showSection(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const sec = document.getElementById('section-' + sectionId);
    if (sec) sec.classList.add('active');
    const nav = document.querySelector(`.nav-item[data-section="${sectionId}"]`);
    if (nav) nav.classList.add('active');
    const header = document.getElementById('page-header');
    if (header) {
      const titles = {
        dashboard: ['Dashboard', 'Welcome back! Here\'s what\'s happening today.'],
        employees: ['Employees', 'Manage your team members and their information.'],
        attendance: ['Attendance', 'Track and manage employee attendance records.'],
        salary: ['Payroll & Salary', 'Process and manage employee compensation.'],
        leaves: ['Leave Management', 'Manage leave applications and approvals.'],
        tasks: ['Task Manager', 'Assign and track tasks across your team.'],
        reports: ['Reports', 'Generate and download detailed reports.'],
        announcements: ['Announcements', 'Post company-wide announcements and updates.'],
        profile: ['My Profile', 'View and update your personal information.'],
        emp_dashboard: ['My Dashboard', 'Your personal overview for today.'],
        emp_attendance: ['My Attendance', 'View your attendance records and punch in/out.'],
        emp_salary: ['My Salary', 'View your salary details and pay slips.'],
        emp_leaves: ['My Leaves', 'Manage your leave applications.'],
        emp_tasks: ['My Tasks', 'View tasks assigned to you.'],
        emp_profile: ['My Profile', 'Update your personal information.'],
      };
      const t = titles[sectionId] || ['—', ''];
      header.querySelector('h2').textContent = t[0];
      header.querySelector('p').textContent = t[1];
    }
    // Dispatch event for lazy init
    window.dispatchEvent(new CustomEvent('sectionChange', { detail: sectionId }));
  },

  // ─── Avatar ────────────────────────────────────────────────
  avatar(name, color, size = 'md') {
    const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    return `<div class="avatar avatar-${size}" style="background:${color}22;color:${color};border:2px solid ${color}44;">${initials}</div>`;
  },

  // ─── Animate Numbers ───────────────────────────────────────
  animateNumber(el, target, prefix = '', suffix = '') {
    let start = 0;
    const duration = 1200;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = prefix + Math.floor(ease * target).toLocaleString('en-IN') + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  },

  // ─── Confirm Dialog ────────────────────────────────────────
  confirm(message, onConfirm, onCancel) {
    let overlay = document.getElementById('confirm-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'confirm-overlay';
      overlay.className = 'modal-overlay';
      overlay.innerHTML = `<div class="modal" style="max-width:400px;text-align:center;">
        <div style="font-size:2.5rem;margin-bottom:16px;">⚠️</div>
        <h3 id="confirm-msg" style="margin-bottom:24px;font-size:1rem;line-height:1.6;color:var(--text-secondary)"></h3>
        <div style="display:flex;gap:12px;justify-content:center;">
          <button id="confirm-cancel" class="btn btn-ghost">Cancel</button>
          <button id="confirm-ok" class="btn btn-danger">Confirm</button>
        </div>
      </div>`;
      document.body.appendChild(overlay);
    }
    document.getElementById('confirm-msg').textContent = message;
    overlay.classList.add('active');
    document.getElementById('confirm-ok').onclick = () => { overlay.classList.remove('active'); onConfirm && onConfirm(); };
    document.getElementById('confirm-cancel').onclick = () => { overlay.classList.remove('active'); onCancel && onCancel(); };
  },

  // ─── Format Date ───────────────────────────────────────────
  fmtDate(str) {
    if (!str) return '—';
    const d = new Date(str);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  },

  // ─── Priority Badge ─────────────────────────────────────────
  priorityBadge(p) {
    const map = { high: 'red', medium: 'amber', low: 'green' };
    return `<span class="badge badge-${map[p]||'blue'}">${p||'—'}</span>`;
  },

  // ─── Status Badge ───────────────────────────────────────────
  statusBadge(s) {
    const map = { active: 'green', inactive: 'red', pending: 'amber', approved: 'green', rejected: 'red', paid: 'green', processing: 'blue', 'in-progress': 'blue', completed: 'green', present: 'green', absent: 'red', leave: 'amber' };
    return `<span class="badge badge-${map[s]||'blue'}">${s||'—'}</span>`;
  },

  // ─── Live Clock ─────────────────────────────────────────────
  startClock(el) {
    const tick = () => {
      const now = new Date();
      el.textContent = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    };
    tick();
    return setInterval(tick, 1000);
  },
};

// Close modals on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
  if (e.target.classList.contains('modal-close')) {
    e.target.closest('.modal-overlay')?.classList.remove('active');
  }
});
