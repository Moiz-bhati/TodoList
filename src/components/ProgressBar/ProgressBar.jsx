import styles from './ProgressBar.module.css'

export default function ProgressBar({ total, completed }) {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100)
  const remaining = total - completed

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.info}>
          <span className={styles.pct}>{pct}%</span>
          <span className={styles.label}>
            {completed} of {total} tasks completed
          </span>
        </div>
        <div className={styles.chips}>
          <span className={styles.chip} data-color="green">
            ✓ {completed} Done
          </span>
          {remaining > 0 && (
            <span className={styles.chip} data-color="orange">
              ⏳ {remaining} Left
            </span>
          )}
        </div>
      </div>

      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      {pct === 100 && total > 0 && (
        <p className={styles.congrats}>🎉 All tasks complete! Great work.</p>
      )}
    </div>
  )
}
