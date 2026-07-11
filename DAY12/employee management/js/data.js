// ============================================================
// data.js — LocalStorage helpers + seed data
// ============================================================

const DB = {
  // ─── Helpers ───────────────────────────────────────────────
  get(key) { return JSON.parse(localStorage.getItem(key) || 'null'); },
  set(key, val) { localStorage.setItem(key, JSON.stringify(val)); },

  // ─── Seed Database ─────────────────────────────────────────
  seed() {
    if (this.get('seeded')) return;

    // Admin user
    this.set('admin', { id: 'admin', name: 'Super Admin', email: 'admin@hrms.com', password: 'admin123', role: 'admin', avatar: '👑', color: '#4f8ef7' });

    // Employees
    const employees = [
      { id: 'E001', name: 'Suriya', email: 'suriya@hrms.com', password: 'emp123', role: 'Employee', department: 'Engineering', designation: 'Senior Developer', salary: 95000, joined: '2022-03-15', phone: '+91-9876543210', avatar: '👨‍💻', color: '#4f8ef7', status: 'active' },
      { id: 'E002', name: 'Priya Nair', email: 'priya@hrms.com', password: 'emp123', role: 'Employee', department: 'Design', designation: 'UI/UX Designer', salary: 78000, joined: '2021-07-01', phone: '+91-9876543211', avatar: '👩‍🎨', color: '#ec4899', status: 'active' },
      { id: 'E003', name: 'Rohan Mehta', email: 'rohan@hrms.com', password: 'emp123', role: 'Employee', department: 'Marketing', designation: 'Marketing Manager', salary: 82000, joined: '2020-11-10', phone: '+91-9876543212', avatar: '📊', color: '#f59e0b', status: 'active' },
      { id: 'E004', name: 'Sneha Patel', email: 'sneha@hrms.com', password: 'emp123', role: 'Employee', department: 'HR', designation: 'HR Executive', salary: 68000, joined: '2023-01-20', phone: '+91-9876543213', avatar: '🤝', color: '#22d3a5', status: 'active' },
      { id: 'E005', name: 'Kiran Reddy', email: 'kiran@hrms.com', password: 'emp123', role: 'Employee', department: 'Engineering', designation: 'Backend Developer', salary: 88000, joined: '2022-08-05', phone: '+91-9876543214', avatar: '⚙️', color: '#7c5cfc', status: 'active' },
      { id: 'E006', name: 'Divya Kumar', email: 'divya@hrms.com', password: 'emp123', role: 'Employee', department: 'Finance', designation: 'Financial Analyst', salary: 75000, joined: '2021-04-18', phone: '+91-9876543215', avatar: '💰', color: '#f43f5e', status: 'active' },
      { id: 'E007', name: 'Amit Singh', email: 'amit@hrms.com', password: 'emp123', role: 'Employee', department: 'Engineering', designation: 'DevOps Engineer', salary: 92000, joined: '2020-06-30', phone: '+91-9876543216', avatar: '🛠️', color: '#0ea5e9', status: 'active' },
      { id: 'E008', name: 'Meera Joshi', email: 'meera@hrms.com', password: 'emp123', role: 'Employee', department: 'Design', designation: 'Graphic Designer', salary: 65000, joined: '2023-03-12', phone: '+91-9876543217', avatar: '🎨', color: '#a78bfa', status: 'active' },
    ];
    this.set('employees', employees);

    // Attendance (last 30 days for each employee)
    const attendance = {};
    const today = new Date();
    employees.forEach(emp => {
      attendance[emp.id] = {};
      for (let i = 0; i < 30; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dStr = d.toISOString().split('T')[0];
        const dow = d.getDay();
        if (dow === 0 || dow === 6) continue; // skip weekends
        const r = Math.random();
        if (i === 0) continue; // today mark manually
        if (r < 0.82) {
          attendance[emp.id][dStr] = { status: 'present', inTime: '09:' + String(Math.floor(Math.random()*30)).padStart(2,'0'), outTime: '18:' + String(Math.floor(Math.random()*30)).padStart(2,'0') };
        } else if (r < 0.92) {
          attendance[emp.id][dStr] = { status: 'leave', reason: 'Casual Leave' };
        } else {
          attendance[emp.id][dStr] = { status: 'absent' };
        }
      }
    });
    this.set('attendance', attendance);

    // Salary records (last 6 months)
    const salaryRecords = {};
    employees.forEach(emp => {
      salaryRecords[emp.id] = [];
      for (let m = 0; m < 6; m++) {
        const d = new Date(today.getFullYear(), today.getMonth() - m, 1);
        const monthStr = d.toLocaleString('default', { month: 'long' }) + ' ' + d.getFullYear();
        const daysPresent = Math.floor(Math.random() * 4) + 22;
        const pf = Math.round(emp.salary * 0.12);
        const tax = Math.round(emp.salary * 0.08);
        const hra = Math.round(emp.salary * 0.4);
        const ta = 2000;
        const net = emp.salary - pf - tax + ta;
        salaryRecords[emp.id].push({
          month: monthStr, monthIdx: m,
          basic: emp.salary - hra,
          hra, ta, gross: emp.salary + ta,
          pf, tax, net,
          daysPresent, status: m === 0 ? 'pending' : 'paid',
          paidOn: m === 0 ? null : new Date(d.getFullYear(), d.getMonth() + 1, 5).toISOString().split('T')[0],
        });
      }
    });
    this.set('salary', salaryRecords);

    // Leave requests
    const leaves = [
      { id: 'L001', empId: 'E001', empName: 'Suriya', type: 'Casual Leave', from: '2026-07-15', to: '2026-07-16', days: 2, reason: 'Family function', status: 'pending', applied: '2026-07-08' },
      { id: 'L002', empId: 'E002', empName: 'Priya Nair', type: 'Sick Leave', from: '2026-07-05', to: '2026-07-06', days: 2, reason: 'Fever', status: 'approved', applied: '2026-07-04' },
      { id: 'L003', empId: 'E003', empName: 'Rohan Mehta', type: 'Annual Leave', from: '2026-07-20', to: '2026-07-25', days: 6, reason: 'Vacation', status: 'pending', applied: '2026-07-09' },
      { id: 'L004', empId: 'E005', empName: 'Kiran Reddy', type: 'Casual Leave', from: '2026-07-03', to: '2026-07-03', days: 1, reason: 'Personal work', status: 'approved', applied: '2026-07-02' },
      { id: 'L005', empId: 'E007', empName: 'Amit Singh', type: 'Sick Leave', from: '2026-07-10', to: '2026-07-11', days: 2, reason: 'Not feeling well', status: 'rejected', applied: '2026-07-09' },
    ];
    this.set('leaves', leaves);

    // Leave quotas per employee
    const leaveQuotas = {};
    employees.forEach(emp => {
      leaveQuotas[emp.id] = { casual: { total: 12, used: Math.floor(Math.random()*4) }, sick: { total: 8, used: Math.floor(Math.random()*3) }, annual: { total: 20, used: Math.floor(Math.random()*6)+2 } };
    });
    this.set('leaveQuotas', leaveQuotas);

    // Tasks
    const tasks = [
      { id: 'T001', title: 'Complete Q3 performance review', assignedTo: 'E001', assignedBy: 'admin', priority: 'high', due: '2026-07-15', status: 'in-progress', project: 'HR Ops', created: '2026-07-01' },
      { id: 'T002', title: 'Update employee handbook', assignedTo: 'E004', assignedBy: 'admin', priority: 'medium', due: '2026-07-20', status: 'pending', project: 'Documentation', created: '2026-07-02' },
      { id: 'T003', title: 'Fix login page bug on Safari', assignedTo: 'E001', assignedBy: 'admin', priority: 'high', due: '2026-07-11', status: 'pending', project: 'Engineering', created: '2026-07-09' },
      { id: 'T004', title: 'Design new onboarding screens', assignedTo: 'E002', assignedBy: 'admin', priority: 'high', due: '2026-07-18', status: 'in-progress', project: 'Product', created: '2026-07-03' },
      { id: 'T005', title: 'Prepare monthly financial report', assignedTo: 'E006', assignedBy: 'admin', priority: 'medium', due: '2026-07-31', status: 'pending', project: 'Finance', created: '2026-07-05' },
      { id: 'T006', title: 'Set up CI/CD pipeline', assignedTo: 'E007', assignedBy: 'admin', priority: 'low', due: '2026-07-25', status: 'completed', project: 'Engineering', created: '2026-06-28' },
      { id: 'T007', title: 'Create marketing campaign assets', assignedTo: 'E003', assignedBy: 'admin', priority: 'medium', due: '2026-07-22', status: 'pending', project: 'Marketing', created: '2026-07-07' },
      { id: 'T008', title: 'Design banner for website', assignedTo: 'E008', assignedBy: 'admin', priority: 'low', due: '2026-07-28', status: 'completed', project: 'Design', created: '2026-07-01' },
    ];
    this.set('tasks', tasks);

    // Announcements
    const announcements = [
      { id: 'A001', title: '🏖️ Summer Outing Planned!', body: 'We are planning a team outing on July 20th. Please confirm your attendance by July 14th.', posted: '2026-07-08', priority: 'high', postedBy: 'HR Team' },
      { id: 'A002', title: '📋 Q2 Performance Reviews', body: 'Q2 performance reviews will be conducted from July 15 to July 20. Managers please schedule 1-on-1s.', posted: '2026-07-06', priority: 'medium', postedBy: 'HR Team' },
      { id: 'A003', title: '🎉 New Office Policy Update', body: 'Work from home policy has been updated. Employees can WFH up to 2 days per week effective August 1st.', posted: '2026-07-04', priority: 'low', postedBy: 'Management' },
    ];
    this.set('announcements', announcements);

    // Notifications
    const notifications = [
      { id: 'N001', text: 'Suriya applied for leave', time: '2 hours ago', read: false, type: 'leave' },
      { id: 'N002', text: 'July payroll ready for processing', time: '5 hours ago', read: false, type: 'salary' },
      { id: 'N003', text: 'Rohan Mehta applied for annual leave', time: '1 day ago', read: false, type: 'leave' },
      { id: 'N004', text: 'New task assigned: Fix login bug', time: '1 day ago', read: true, type: 'task' },
    ];
    this.set('notifications', notifications);

    this.set('seeded', true);
  },

  // ─── Getters ────────────────────────────────────────────────
  getEmployees() { return this.get('employees') || []; },
  getEmployee(id) { return this.getEmployees().find(e => e.id === id); },
  getAttendance() { return this.get('attendance') || {}; },
  getSalary() { return this.get('salary') || {}; },
  getLeaves() { return this.get('leaves') || []; },
  getLeaveQuota(empId) { return (this.get('leaveQuotas') || {})[empId] || {}; },
  getTasks() { return this.get('tasks') || []; },
  getAnnouncements() { return this.get('announcements') || []; },
  getNotifications() { return this.get('notifications') || []; },
  getAdmin() { return this.get('admin') || {}; },

  // ─── Setters ─────────────────────────────────────────────────
  saveEmployees(emps) { this.set('employees', emps); },
  saveAttendance(att) { this.set('attendance', att); },
  saveSalary(sal) { this.set('salary', sal); },
  saveLeaves(lv) { this.set('leaves', lv); },
  saveTasks(tasks) { this.set('tasks', tasks); },
  saveNotifications(n) { this.set('notifications', n); },
  saveAnnouncements(a) { this.set('announcements', a); },

  // ─── Utils ──────────────────────────────────────────────────
  generateId(prefix) {
    const items = { E: this.getEmployees(), L: this.getLeaves(), T: this.getTasks(), A: this.getAnnouncements() };
    const list = items[prefix] || [];
    const max = list.reduce((m, i) => Math.max(m, parseInt(i.id.slice(1)) || 0), 0);
    return prefix + String(max + 1).padStart(3, '0');
  },
  fmt(n) { return '₹' + Number(n).toLocaleString('en-IN'); },
  today() { return new Date().toISOString().split('T')[0]; },
};
