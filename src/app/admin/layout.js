import styles from "./AdminLayout.module.css";

export const metadata = {
  title: "Admin Dashboard - Musafir",
};

export default function AdminLayout({ children }) {
  return (
    <div className={styles.adminWrapper}>
      <header className={styles.adminHeader}>
        <div className={styles.adminBrand}>
          <h1 className={styles.adminTitle}>Musafir Admin Panel</h1>
          <span className={styles.badge}>Live</span>
        </div>
        <a href="/" className={styles.backLink}>
          <span>←</span> Back to Main Site
        </a>
      </header>
      <main className={styles.adminMain}>
        {children}
      </main>
    </div>
  );
}
