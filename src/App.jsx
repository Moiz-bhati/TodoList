import { useState, useEffect } from 'react'
import styles from './App.module.css'
import Header from './components/Header/Header'
import TodoForm from './components/TodoForm/TodoForm'
import SearchBar from './components/SearchBar/SearchBar'
import Filter from './components/Filter/Filter'
import ProgressBar from './components/ProgressBar/ProgressBar'
import TodoList from './components/TodoList/TodoList'

const STORAGE_KEY = 'smart-todo-tasks'
const THEME_KEY = 'smart-todo-theme'

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) === 'dark'
    } catch {
      return false
    }
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [notification, setNotification] = useState(null)
  const [editingTask, setEditingTask] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
    localStorage.setItem(THEME_KEY, darkMode ? 'dark' : 'light')
  }, [darkMode])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch (e) {
      console.error('Failed to save tasks:', e)
    }
  }, [tasks])

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const addTask = (taskData) => {
    const newTask = {
      id: crypto.randomUUID(),
      ...taskData,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
    setTasks(prev => [...prev, newTask].sort(sortByDueDate))
    showNotification('Task added successfully!')
    setShowForm(false)
  }

  const updateTask = (id, updates) => {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, ...updates } : t).sort(sortByDueDate)
    )
    showNotification('Task updated successfully!')
    setEditingTask(null)
    setShowForm(false)
  }

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id))
    showNotification('Task deleted.', 'info')
  }

  const changeStatus = (id, status) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t))
  }

  const handleEdit = (task) => {
    setEditingTask(task)
    setShowForm(true)
  }

  const handleCancelForm = () => {
    setEditingTask(null)
    setShowForm(false)
  }

  const sortByDueDate = (a, b) => {
    if (!a.dueDate) return 1
    if (!b.dueDate) return -1
    return new Date(a.dueDate) - new Date(b.dueDate)
  }

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase())
    if (!matchesSearch) return false
    switch (activeFilter) {
      case 'pending': return task.status === 'pending'
      case 'inprogress': return task.status === 'inprogress'
      case 'completed': return task.status === 'completed'
      case 'high': return task.priority === 'high'
      case 'medium': return task.priority === 'medium'
      case 'low': return task.priority === 'low'
      default: return true
    }
  })

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    pending: tasks.filter(t => t.status !== 'completed').length,
  }

  return (
    <div className={styles.app}>
      <Header
        darkMode={darkMode}
        onToggleDark={() => setDarkMode(d => !d)}
        stats={stats}
      />

      {notification && (
        <div className={`${styles.notification} ${styles[notification.type]}`}>
          <span className={styles.notifIcon}>
            {notification.type === 'info' ? '🗑️' : '✓'}
          </span>
          {notification.message}
        </div>
      )}

      <main className={styles.main}>
        <div className={styles.topBar}>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <button
            className={styles.addBtn}
            onClick={() => { setEditingTask(null); setShowForm(true) }}
          >
            <span>+</span> Add Task
          </button>
        </div>

        <ProgressBar total={stats.total} completed={stats.completed} />

        <Filter active={activeFilter} onChange={setActiveFilter} />

        {showForm && (
          <TodoForm
            onSubmit={editingTask ? (data) => updateTask(editingTask.id, data) : addTask}
            onCancel={handleCancelForm}
            initialData={editingTask}
          />
        )}

        <TodoList
          tasks={filteredTasks}
          onDelete={deleteTask}
          onEdit={handleEdit}
          onStatusChange={changeStatus}
          searchQuery={searchQuery}
          activeFilter={activeFilter}
        />
      </main>
    </div>
  )
}
