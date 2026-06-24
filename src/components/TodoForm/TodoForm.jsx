import { useState, useEffect } from 'react'
import styles from './TodoForm.module.css'

const defaultForm = {
  title: '',
  description: '',
  priority: 'medium',
  category: 'personal',
  dueDate: '',
}

export default function TodoForm({ onSubmit, onCancel, initialData }) {
  const [form, setForm] = useState(defaultForm)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        description: initialData.description || '',
        priority: initialData.priority || 'medium',
        category: initialData.category || 'personal',
        dueDate: initialData.dueDate || '',
      })
    } else {
      setForm(defaultForm)
    }
    setErrors({})
  }, [initialData])

  const validate = () => {
    const e = {}
    if (!form.title.trim()) e.title = 'Task title is required'
    if (form.title.trim().length > 100) e.title = 'Title must be under 100 characters'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) {
      setErrors(e2)
      return
    }
    onSubmit({ ...form, title: form.title.trim(), description: form.description.trim() })
    setForm(defaultForm)
    setErrors({})
  }

  const set = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors(ev => ({ ...ev, [field]: undefined }))
  }

  const isEdit = !!initialData

  return (
    <div className={styles.overlay}>
      <div className={styles.formCard}>
        <div className={styles.formHeader}>
          <div className={styles.formTitle}>
            <span className={styles.formIcon}>{isEdit ? '✏️' : '✨'}</span>
            {isEdit ? 'Edit Task' : 'New Task'}
          </div>
          <button className={styles.closeBtn} onClick={onCancel} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.field}>
            <label className={styles.label}>Task Title <span className={styles.req}>*</span></label>
            <input
              className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
              type="text"
              placeholder="What needs to be done?"
              value={form.title}
              onChange={set('title')}
              autoFocus
            />
            {errors.title && <p className={styles.error}>{errors.title}</p>}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Description</label>
            <textarea
              className={styles.textarea}
              placeholder="Add more details (optional)..."
              value={form.description}
              onChange={set('description')}
              rows={3}
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Priority</label>
              <select className={styles.select} value={form.priority} onChange={set('priority')}>
                <option value="high">🔴 High</option>
                <option value="medium">🟡 Medium</option>
                <option value="low">🟢 Low</option>
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Category</label>
              <select className={styles.select} value={form.category} onChange={set('category')}>
                <option value="study">📚 Study</option>
                <option value="work">💼 Work</option>
                <option value="personal">🏠 Personal</option>
                <option value="shopping">🛒 Shopping</option>
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Due Date</label>
              <input
                className={styles.input}
                type="date"
                value={form.dueDate}
                onChange={set('dueDate')}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn}>
              {isEdit ? 'Save Changes' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
