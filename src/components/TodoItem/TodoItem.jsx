import { useState } from 'react'
import styles from './TodoItem.module.css'

const PRIORITY_MAP = {
  high: { label: 'High', color: 'high', icon: '🔴' },
  medium: { label: 'Medium', color: 'medium', icon: '🟡' },
  low: { label: 'Low', color: 'low', icon: '🟢' },
}

const CATEGORY_MAP = {
  study: { label: 'Study', icon: '📚' },
  work: { label: 'Work', icon: '💼' },
  personal: { label: 'Personal', icon: '🏠' },
  shopping: { label: 'Shopping', icon: '🛒' },
}

const STATUS_MAP = {
  pending: { label: 'Pending', next: 'inprogress', nextLabel: 'Start', color: 'pending' },
  inprogress: { label: 'In Progress', next: 'completed', nextLabel: 'Complete', color: 'inprogress' },
  completed: { label: 'Completed', next: 'pending', nextLabel: 'Reopen', color: 'completed' },
}

function formatDue(dateStr) {
  if (!dateStr) return null
  const due = new Date(dateStr + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24))
  if (diff < 0) return { label: `${Math.abs(diff)}d overdue`, overdue: true }
  if (diff === 0) return { label: 'Due today', today: true }
  if (diff === 1) return { label: 'Due tomorrow', soon: true }
  if (diff <= 3) return { label: `Due in ${diff} days`, soon: true }
  return {
    label: due.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  }
}

export default function TodoItem({ task, onDelete, onEdit, onStatusChange }) {
  const [confirmDelete, setConfirmDelete] = useState(false)

  const priority = PRIORITY_MAP[task.priority] || PRIORITY_MAP.medium
  const category = CATEGORY_MAP[task.category] || CATEGORY_MAP.personal
  const status = STATUS_MAP[task.status] || STATUS_MAP.pending
  const due = task.dueDate ? formatDue(task.dueDate) : null
  const isCompleted = task.status === 'completed'

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete(task.id)
    } else {
      setConfirmDelete(true)
      setTimeout(() => setConfirmDelete(false), 2500)
    }
  }

  return (
    <div className={`${styles.card} ${styles[`priority_${task.priority}`]} ${isCompleted ? styles.completed : ''}`}>
      <div className={styles.priorityBar} data-priority={task.priority} />

      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.meta}>
            <span className={`${styles.statusBadge} ${styles[`status_${task.status}`]}`}>
              {status.label}
            </span>
            <span className={styles.categoryBadge}>
              {category.icon} {category.label}
            </span>
            <span className={`${styles.priorityBadge} ${styles[`prio_${task.priority}`]}`}>
              {priority.icon} {priority.label}
            </span>
          </div>

          <div className={styles.actions}>
            <button
              className={styles.actionBtn}
              onClick={() => onEdit(task)}
              title="Edit task"
              aria-label="Edit task"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
            <button
              className={`${styles.actionBtn} ${confirmDelete ? styles.deleteConfirm : styles.deleteBtn}`}
              onClick={handleDelete}
              title={confirmDelete ? 'Click again to confirm' : 'Delete task'}
              aria-label="Delete task"
            >
              {confirmDelete ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                  <path d="M10 11v6M14 11v6"/>
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className={styles.body}>
          <h3 className={`${styles.title} ${isCompleted ? styles.strikethrough : ''}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className={styles.desc}>{task.description}</p>
          )}
        </div>

        <div className={styles.footer}>
          {due && (
            <span className={`${styles.due} ${due.overdue ? styles.overdue : ''} ${due.today ? styles.today : ''} ${due.soon ? styles.soon : ''}`}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              {due.label}
            </span>
          )}

          <button
            className={`${styles.statusBtn} ${styles[`statusBtn_${task.status}`]}`}
            onClick={() => onStatusChange(task.id, status.next)}
          >
            {status.nextLabel} →
          </button>
        </div>
      </div>
    </div>
  )
}
