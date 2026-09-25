"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./RecentTrips.module.css";
import ScrollReveal from "./ScrollReveal";
import { IconMapPin, IconClock, IconArrowRight } from "./Icons";
import galleryData from "../data/gallery.json";

export default function RecentTrips({ trips, theme = "dark" }) {
  const isLight = theme === "light";
  const sectionClass = isLight ? `${styles.recentTripsSection} ${styles.lightTheme}` : styles.recentTripsSection;
  return (
    <section className={sectionClass}>
      <div className={styles.container || "container"}>
        <ScrollReveal animation="fade-up">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Real Tour Memories</span>
            <h2 className={styles.sectionTitle}>Our Recent Trips</h2>
            <p className={styles.sectionSubtitle}>
              Authentic field moments captured during our group departures, private 4x4 safaris, and
              alpine expeditions across Pakistan's most spectacular destinations.
            </p>
          </div>
        </ScrollReveal>

        <div className={styles.tripsGrid}>
          {trips.map((trip, idx) => (
            <ScrollReveal key={trip.id} animation="fade-up" delay={idx * 0.08}>
              <div className={styles.tripCard}>
                <div className={styles.tripImageWrapper}>
                  <Image
                    src={trip.image}
                    alt={trip.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className={styles.tripImage}
                  />
                  <span className={styles.tripBadge}>{trip.type}</span>
                </div>
                <div className={styles.tripContent}>
                  <h3 className={styles.tripTitle}>{trip.title}</h3>
                  <div className={styles.tripLocation}>
                    <IconMapPin size={15} color="#22c55e" />
                    <span>{trip.location}</span>
                    <span>•</span>
                    <IconClock size={15} color="#22c55e" />
                    <span>{trip.duration}</span>
                  </div>
                  <p className={styles.tripHighlights}>{trip.highlights}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className={styles.centerAction}>
          <Link href="/gallery/photos" className={styles.viewAllGalleryBtn}>
            <span>View Full Photo Gallery ({galleryData.length}+ Photos)</span>
            <IconArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
