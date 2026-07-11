const Auth = {
  SESSION_KEY: 'hrms_session',

  setSession(data) { localStorage.setItem(this.SESSION_KEY, JSON.stringify(data)); },
  getSession() { return JSON.parse(localStorage.getItem(this.SESSION_KEY) || 'null'); },

  login(email, password) {
    const admin = DB.getAdmin();
    if (email === admin.email && password === admin.password) {
      const session = { id: admin.id, name: admin.name, role: 'admin', avatar: admin.avatar, color: admin.color, email: admin.email };
      this.setSession(session);
      return { success: true, role: 'admin' };
    }
    const emps = DB.getEmployees();
    const emp = emps.find(e => e.email === email && e.password === password);
    if (emp) {
      const session = { id: emp.id, name: emp.name, role: 'employee', avatar: emp.avatar, color: emp.color, email: emp.email, department: emp.department, designation: emp.designation };
      this.setSession(session);
      return { success: true, role: 'employee' };
    }
    return { success: false, error: 'Invalid email or password' };
  },

  logout() {
    localStorage.removeItem(this.SESSION_KEY);
    window.location.href = 'index.html';
  },

  requireAdmin() {
    const s = this.getSession();
    if (!s || s.role !== 'admin') { window.location.href = 'index.html'; return null; }
    return s;
  },
  requireEmployee() {
    const s = this.getSession();
    if (!s) { window.location.href = 'index.html'; return null; }
    return s;
  },
};
