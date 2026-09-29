import styles from "./InternationalTrip.module.css";
import Link from "next/link";
import { IconArrowRight } from "@/components/Icons";

export const metadata = {
  title: "International Trips | Coming Soon | Musafir Travel and Tours",
  description: "Exciting international destinations are coming soon to Musafir Travel and Tours. Stay tuned!",
};

export default function InternationalTripPage() {
  return (
    <main className={styles.main}>
      <div className={styles.heroSection}>
        <div className={styles.overlay}></div>
        <div className={styles.content}>
          <div className={styles.badge}>Exciting News</div>
          <h1 className={styles.title}>International Trips</h1>
          <h2 className={styles.subtitle}>Coming Soon</h2>
          <p className={styles.description}>
            We are curating the best international travel experiences for you. 
            Get ready to explore the world with Musafir Travel and Tours.
          </p>
          
          <Link href="/" className={styles.backButton}>
            <span>Back to Home</span>
            <IconArrowRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
}
