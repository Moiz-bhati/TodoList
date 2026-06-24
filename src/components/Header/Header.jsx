import styles from './Header.module.css'

const formatDate = () => {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function Header({ darkMode, onToggleDark, stats }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="8" fill="currentColor" opacity="0.15"/>
              <path d="M7 9.5h14M7 14h10M7 18.5h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="21" cy="18.5" r="3.5" fill="currentColor"/>
              <path d="M19.5 18.5l1 1 2-2" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h1 className={styles.title}>Smart Todo Manager</h1>
            <p className={styles.date}>{formatDate()}</p>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.stats}>
            <StatPill label="Total" value={stats.total} color="accent" />
            <StatPill label="Done" value={stats.completed} color="green" />
            <StatPill label="Pending" value={stats.pending} color="orange" />
          </div>

          <button
            className={styles.themeToggle}
            onClick={onToggleDark}
            aria-label="Toggle dark mode"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

function StatPill({ label, value, color }) {
  return (
    <div className={`${styles.pill} ${styles[`pill_${color}`]}`}>
      <span className={styles.pillValue}>{value}</span>
      <span className={styles.pillLabel}>{label}</span>
    </div>
  )
}
