import { useEffect, useMemo, useState } from 'react'
import './App.css'

const initialEmployees = [
  {
    id: 1,
    name: 'Ava Patel',
    email: 'ava.patel@northstar.com',
    role: 'Product Designer',
    department: 'Design',
    status: 'Active',
    manager: 'Mina Chen',
    location: 'New York',
    joinDate: '2022-04-12',
    performance: 94,
    bio: 'Design systems and customer experience strategist.'
  },
  {
    id: 2,
    name: 'Marcus Lee',
    email: 'marcus.lee@northstar.com',
    role: 'Engineering Lead',
    department: 'Engineering',
    status: 'On Leave',
    manager: 'Sara Gomez',
    location: 'Austin',
    joinDate: '2020-09-03',
    performance: 88,
    bio: 'Leads platform reliability and growth initiatives.'
  },
  {
    id: 3,
    name: 'Nadia Brooks',
    email: 'nadia.brooks@northstar.com',
    role: 'Operations Manager',
    department: 'Operations',
    status: 'Active',
    manager: 'Owen Scott',
    location: 'Chicago',
    joinDate: '2021-01-17',
    performance: 91,
    bio: 'Coordinates execution across cross-functional initiatives.'
  },
  {
    id: 4,
    name: 'Dylan Cruz',
    email: 'dylan.cruz@northstar.com',
    role: 'Sales Executive',
    department: 'Sales',
    status: 'Pending',
    manager: 'Lina Ortiz',
    location: 'Remote',
    joinDate: '2024-02-01',
    performance: 82,
    bio: 'Focuses on enterprise partnerships and account growth.'
  }
]

const emptyForm = {
  name: '',
  email: '',
  role: '',
  department: 'Engineering',
  status: 'Active',
  manager: '',
  location: '',
  joinDate: '',
  performance: 85,
  bio: ''
}

function App() {
  const [employees, setEmployees] = useState(() => {
    if (typeof window === 'undefined') return initialEmployees
    const saved = window.localStorage.getItem('northstar-employees')
    return saved ? JSON.parse(saved) : initialEmployees
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [departmentFilter, setDepartmentFilter] = useState('All')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState(emptyForm)

  useEffect(() => {
    window.localStorage.setItem('northstar-employees', JSON.stringify(employees))
  }, [employees])

  const stats = useMemo(() => {
    const activeCount = employees.filter((employee) => employee.status === 'Active').length
    const avgPerformance = employees.length
      ? Math.round(
          employees.reduce((total, employee) => total + employee.performance, 0) / employees.length
        )
      : 0
    const departments = new Set(employees.map((employee) => employee.department)).size

    return [
      { label: 'Total employees', value: employees.length, detail: 'Across all teams' },
      { label: 'Active now', value: activeCount, detail: 'Currently engaged' },
      { label: 'Avg. performance', value: `${avgPerformance}%`, detail: 'Healthy momentum' },
      { label: 'Departments', value: departments, detail: 'Specialized groups' }
    ]
  }, [employees])

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch = `${employee.name} ${employee.role} ${employee.email}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'All' || employee.status === statusFilter
      const matchesDepartment = departmentFilter === 'All' || employee.department === departmentFilter

      return matchesSearch && matchesStatus && matchesDepartment
    })
  }, [departmentFilter, employees, searchTerm, statusFilter])

  const openCreateModal = () => {
    setEditingId(null)
    setFormData(emptyForm)
    setIsModalOpen(true)
  }

  const openEditModal = (employee) => {
    setEditingId(employee.id)
    setFormData(employee)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingId(null)
    setFormData(emptyForm)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formData.name || !formData.email || !formData.role) {
      return
    }

    if (editingId) {
      setEmployees((current) =>
        current.map((employee) => (employee.id === editingId ? { ...employee, ...formData } : employee))
      )
    } else {
      const newEmployee = {
        ...formData,
        id: Date.now(),
        performance: Number(formData.performance)
      }
      setEmployees((current) => [newEmployee, ...current])
    }

    closeModal()
  }

  const handleDelete = (id) => {
    setEmployees((current) => current.filter((employee) => employee.id !== id))
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Workforce Command Center</p>
          <h1>Employee Management Studio</h1>
          <p className="subtext">
            Keep your team organized, searchable, and ready to grow with a refined HR workspace.
          </p>
        </div>
        <button className="primary-btn" type="button" onClick={openCreateModal}>
          + Add Employee
        </button>
      </header>

      <section className="hero-panel">
        <div className="hero-copy">
          <span className="pill">Live snapshot • {employees.length} people</span>
          <h2>Everything your people team needs, beautifully organized.</h2>
          <p>
            Search talent, review engagement, update employee status, and maintain a polished view of your
            organization from one place.
          </p>
          <div className="hero-actions">
            <button className="primary-btn" type="button" onClick={openCreateModal}>
              Create profile
            </button>
            <button className="ghost-btn" type="button">
              Export overview
            </button>
          </div>
        </div>

        <div className="hero-stats">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
              <small>{stat.detail}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="controls-panel">
        <label className="search-box">
          <span>🔎</span>
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by name, role, or email"
          />
        </label>

        <div className="filter-group">
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="All">All statuses</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Pending">Pending</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select value={departmentFilter} onChange={(event) => setDepartmentFilter(event.target.value)}>
            <option value="All">All departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="Operations">Operations</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
      </section>

      <section className="content-grid">
        <div className="employee-list">
          {filteredEmployees.map((employee) => (
            <article key={employee.id} className="employee-card">
              <div className="employee-top">
                <div className="avatar">
                  {employee.name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')
                    .slice(0, 2)}
                </div>
                <div className="employee-main">
                  <h3>{employee.name}</h3>
                  <p>
                    {employee.role} • {employee.department}
                  </p>
                </div>
                <span className={`status-pill ${employee.status.toLowerCase().replace(/\s+/g, '-')}`}>
                  {employee.status}
                </span>
              </div>

              <div className="meta-grid">
                <div>
                  <span>Email</span>
                  <p>{employee.email}</p>
                </div>
                <div>
                  <span>Manager</span>
                  <p>{employee.manager}</p>
                </div>
                <div>
                  <span>Location</span>
                  <p>{employee.location}</p>
                </div>
                <div>
                  <span>Joined</span>
                  <p>{employee.joinDate}</p>
                </div>
              </div>

              <div className="performance-row">
                <div>
                  <span>Performance</span>
                  <div className="progress-bar">
                    <div style={{ width: `${employee.performance}%` }} />
                  </div>
                </div>
                <strong>{employee.performance}%</strong>
              </div>

              <p className="employee-bio">{employee.bio}</p>

              <div className="card-actions">
                <button type="button" className="secondary-btn" onClick={() => openEditModal(employee)}>
                  Edit
                </button>
                <button type="button" className="danger-btn" onClick={() => handleDelete(employee.id)}>
                  Delete
                </button>
              </div>
            </article>
          ))}

          {filteredEmployees.length === 0 && (
            <div className="empty-state">
              <h3>No employees found</h3>
              <p>Try a broader search or add a new team member.</p>
            </div>
          )}
        </div>

        <aside className="insights-panel">
          <div className="insight-card">
            <h3>Team health</h3>
            <ul>
              <li>
                <span>Onboarding ready</span>
                <strong>2 profiles</strong>
              </li>
              <li>
                <span>High performers</span>
                <strong>6 strong contributors</strong>
              </li>
              <li>
                <span>Leave coverage</span>
                <strong>2 backup leads</strong>
              </li>
            </ul>
          </div>

          <div className="insight-card">
            <h3>Quick actions</h3>
            <ul className="tips-list">
              <li>Review pending employee approvals weekly.</li>
              <li>Celebrate top achievers with a recognition note.</li>
              <li>Keep location and reporting lines current.</li>
            </ul>
          </div>
        </aside>
      </section>

      {isModalOpen && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <div>
                <p className="eyebrow">{editingId ? 'Update employee' : 'Create employee'}</p>
                <h3>{editingId ? 'Edit employee profile' : 'Add a new team member'}</h3>
              </div>
              <button type="button" className="icon-btn" onClick={closeModal}>
                ×
              </button>
            </div>

            <form className="form-grid" onSubmit={handleSubmit}>
              <label>
                Full name
                <input name="name" value={formData.name} onChange={handleChange} required />
              </label>
              <label>
                Email
                <input name="email" type="email" value={formData.email} onChange={handleChange} required />
              </label>
              <label>
                Role
                <input name="role" value={formData.role} onChange={handleChange} required />
              </label>
              <label>
                Department
                <select name="department" value={formData.department} onChange={handleChange}>
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Operations">Operations</option>
                  <option value="Sales">Sales</option>
                </select>
              </label>
              <label>
                Status
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </label>
              <label>
                Manager
                <input name="manager" value={formData.manager} onChange={handleChange} />
              </label>
              <label>
                Location
                <input name="location" value={formData.location} onChange={handleChange} />
              </label>
              <label>
                Join date
                <input name="joinDate" type="date" value={formData.joinDate} onChange={handleChange} />
              </label>
              <label>
                Performance
                <input
                  name="performance"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.performance}
                  onChange={handleChange}
                />
              </label>
              <label className="full-width">
                Short bio
                <textarea name="bio" rows="3" value={formData.bio} onChange={handleChange} />
              </label>

              <div className="modal-actions full-width">
                <button type="button" className="secondary-btn" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="primary-btn">
                  {editingId ? 'Save changes' : 'Create employee'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
