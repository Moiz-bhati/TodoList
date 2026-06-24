import styles from './Filter.module.css'

const FILTERS = [
  { id: 'all', label: 'All', icon: '◉' },
  { id: 'pending', label: 'Pending', icon: '⏳' },
  { id: 'inprogress', label: 'In Progress', icon: '🔄' },
  { id: 'completed', label: 'Completed', icon: '✅' },
  { id: 'high', label: 'High', icon: '🔴' },
  { id: 'medium', label: 'Medium', icon: '🟡' },
  { id: 'low', label: 'Low', icon: '🟢' },
]

export default function Filter({ active, onChange }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.scroll}>
        {FILTERS.map(f => (
          <button
            key={f.id}
            className={`${styles.btn} ${active === f.id ? styles.active : ''}`}
            onClick={() => onChange(f.id)}
          >
            <span className={styles.icon}>{f.icon}</span>
            {f.label}
          </button>
        ))}
      </div>
    </div>
  )
}
