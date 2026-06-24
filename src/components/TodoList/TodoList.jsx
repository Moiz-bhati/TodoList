import styles from './TodoList.module.css'
import TodoItem from '../TodoItem/TodoItem'

export default function TodoList({ tasks, onDelete, onEdit, onStatusChange, searchQuery, activeFilter }) {
  if (tasks.length === 0) {
    const isEmpty = !searchQuery && activeFilter === 'all'
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIllustration}>
          {isEmpty ? (
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <rect x="8" y="12" width="48" height="44" rx="6" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.5"/>
              <path d="M20 24h24M20 32h18M20 40h12" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="48" cy="48" r="12" fill="var(--bg-surface)" stroke="var(--accent)" strokeWidth="1.5"/>
              <path d="M44 48h8M48 44v8" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="28" cy="28" r="20" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.5"/>
              <path d="M22 28h12M28 22v12" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
              <path d="M43 43l10 10" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          )}
        </div>
        <h3 className={styles.emptyTitle}>
          {isEmpty ? 'No tasks yet' : 'No tasks found'}
        </h3>
        <p className={styles.emptyDesc}>
          {isEmpty
            ? 'Add your first task to get started!'
            : `No tasks match "${searchQuery || activeFilter}". Try a different filter.`}
        </p>
      </div>
    )
  }

  return (
    <div className={styles.list}>
      {tasks.map(task => (
        <TodoItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  )
}
