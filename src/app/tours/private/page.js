"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../ToursListing.module.css";
import initialPackages from "../../../data/packages.json";
import {
  IconArrowRight,
  IconClock,
  IconCalendar,
  IconCheck,
  IconMapPin,
  IconUsers,
  IconSparkles,
  IconWhatsApp
} from "../../../components/Icons";
import ScrollReveal from "../../../components/ScrollReveal";

export default function PrivateToursPage() {
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [packages, setPackages] = useState(initialPackages);

  useEffect(() => {
    fetch("/api/packages")
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) setPackages(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const regions = [
    "All",
    "Skardu",
    "Hunza",
    "Swat",
    "Kashmir",
    "Shogran",
    "Naran",
    "Murree"
  ];

  const privateTours = packages.filter(
    (p) =>
      p.type.toLowerCase().includes("private") ||
      p.type.toLowerCase().includes("honeymoon") ||
      p.type.toLowerCase().includes("deluxe") ||
      p.type.toLowerCase().includes("luxury")
  );

  const filteredTours =
    selectedRegion === "All"
      ? privateTours
      : privateTours.filter((t) => {
          const reg = selectedRegion.toLowerCase();
          const matchMurree =
            reg === "murree" &&
            (t.title.toLowerCase().includes("muree") ||
              t.attractions?.some((a) => a.toLowerCase().includes("muree")));
          return (
            t.title.toLowerCase().includes(reg) ||
            matchMurree ||
            t.destinations?.some((d) => d.toLowerCase().includes(reg)) ||
            t.attractions?.some((a) => a.toLowerCase().includes(reg))
          );
        });

  const customWaMsg = encodeURIComponent(
    "Hello Musafir Pakistan! I would like to inquire about customizing a private tour for my family / couple."
  );
  const customWaUrl = `https://wa.me/923366832018?text=${customWaMsg}`;

  return (
    <main className={styles.pageContainer}>
      {/* Cinematic Hero Banner */}
      <ScrollReveal direction="left">
        <section className={styles.heroBanner}>
          <div className={styles.heroBg}>
            <Image
              src="/images/private-tours-banner.jpg"
              alt="Private and Honeymoon Tours in Northern Pakistan"
              fill
              style={{ objectFit: "cover" }}
              priority
              sizes="100vw"
            />
          </div>
          <div className={styles.heroOverlay} />

          <div className={styles.heroInner}>
            {/* Breadcrumbs */}
            <div className={styles.breadcrumbs}>
              <Link href="/" className={styles.breadcrumbLink}>
                Home
              </Link>
              <span>/</span>
              <span className={styles.breadcrumbLink}>Domestic Tours</span>
              <span>/</span>
              <span className={styles.breadcrumbCurrent}>
                Private & Deluxe Tours
              </span>
            </div>

            <span className={styles.heroBadge}>
              <IconSparkles size={14} />
              <span>Dedicated 4x4 Prado & Deluxe Stays • 100% Customized</span>
            </span>

            <h1 className={styles.heroTitle}>Private & Deluxe Expeditions</h1>

            <p className={styles.heroSubtitle}>
              Bespoke travel experiences crafted exclusively for your schedule.
              Travel with dedicated private 4x4 Prado or Corolla transport,
              handpicked boutique luxury stays, private mountain chauffeurs, and
              flexible daily itineraries.
            </p>

            {/* Region Quick Filters */}
            <div className={styles.filterBar}>
              {regions.map((region) => (
                <button
                  key={region}
                  type="button"
                  className={`${styles.filterBtn} ${
                    selectedRegion === region ? styles.filterBtnActive : ""
                  }`}
                  onClick={() => setSelectedRegion(region)}
                >
                  {region === "All" ? "All Private Tours" : `${region} Tours`}
                </button>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Tours Grid Section */}
      <ScrollReveal direction="right">
        <section className={styles.cardsSection}>
          <div className={styles.sectionBar}>
            <span className={styles.countText}>
              Showing {filteredTours.length} Private Deluxe{" "}
              {filteredTours.length === 1 ? "Tour" : "Tours"}
            </span>
          </div>

          <div className={styles.cardsGrid}>
            {filteredTours.map((t) => {
              const priceDisplay = t.pricing?.couple
                ? t.pricing.couple
                : t.pricing?.solo
                ? t.pricing.solo * 2
                : 150000;

              return (
                <div key={t.id} className={styles.tourCard}>
                  {/* Square Poster Display */}
                  <div className={styles.posterWrapper}>
                    <Image
                      src={t.poster || t.image}
                      alt={t.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className={styles.categoryTag}>{t.type}</div>
                    <div className={styles.durationBadge}>
                      <IconClock size={12} />
                      <span>
                        {t.duration.days}D / {t.duration.nights}N
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className={styles.cardBody}>
                    <h2 className={styles.tourTitle}>{t.title}</h2>
                    <p className={styles.tagline}>{t.tagline}</p>

                    {/* Key Attractions */}
                    {t.attractions && (
                      <div className={styles.highlightsList}>
                        {t.attractions.slice(0, 3).map((item, idx) => (
                          <div key={idx} className={styles.highlightItem}>
                            <IconCheck size={14} color="#16a34a" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Card Footer */}
                    <div className={styles.cardFooter}>
                      <div className={styles.priceCol}>
                        <span className={styles.priceLabel}>Starting from</span>
                        <span className={styles.priceVal}>
                          PKR {priceDisplay.toLocaleString()}
                          <small> / couple</small>
                        </span>
                      </div>

                      <Link href={`/tours/${t.id}`} className={styles.exploreBtn}>
                        <span>View Tour</span>
                        <IconArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Bespoke Custom Itinerary Callout */}
          <div
            style={{
              marginTop: "5rem",
              background:
                "radial-gradient(circle at 85% 30%, rgba(34, 197, 94, 0.16), transparent 60%), linear-gradient(135deg, #141f30 0%, #0b1220 100%)",
              border: "1px solid rgba(34, 197, 94, 0.35)",
              borderRadius: "28px",
              padding: "3.5rem 2.5rem",
              textAlign: "center",
              color: "#ffffff",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.35)"
            }}
          >
            <h3
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.3rem)",
                fontWeight: 800,
                color: "#ffffff",
                marginBottom: "0.8rem"
              }}
            >
              Need a Custom Route or Family Convoy?
            </h3>
            <p
              style={{
                color: "#cbd5e1",
                fontSize: "1.05rem",
                maxWidth: "680px",
                margin: "0 auto 2rem auto",
                lineHeight: "1.65"
              }}
            >
              Want to customize dates, upgrade hotel suites, or add specific valleys?
              Our private expedition specialists curate bespoke 4x4 Prado and Grand Cabin
              packages for couples, families, and corporate executives.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
                flexWrap: "wrap"
              }}
            >
              <a
                href={customWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#22c55e",
                  color: "#ffffff",
                  padding: "0.95rem 1.8rem",
                  borderRadius: "999px",
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  whiteSpace: "nowrap",
                  boxShadow: "0 6px 20px rgba(34, 197, 94, 0.3)"
                }}
              >
                <IconWhatsApp size={18} />
                <span>Contact on WhatsApp</span>
              </a>
              <Link
                href="/custom-trip"
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.25)",
                  color: "#ffffff",
                  padding: "0.95rem 1.8rem",
                  borderRadius: "999px",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  whiteSpace: "nowrap"
                }}
              >
                <span>Plan Custom Itinerary</span>
                <IconArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}