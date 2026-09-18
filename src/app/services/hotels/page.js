"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Hotels.module.css";
import hotels from "../../../data/hotels.json";
import {
  IconMapPin,
  IconCheck,
  IconWhatsApp,
  IconStar,
  IconHotel,
  IconShield,
  IconArrowRight,
  IconSearch,
  IconCross
} from "../../../components/Icons";
import ScrollReveal from "../../../components/ScrollReveal";

export default function HotelsPage() {
  const [selectedDest, setSelectedDest] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Destination counts map
  const destCounts = hotels.reduce((acc, h) => {
    acc[h.destination] = (acc[h.destination] || 0) + 1;
    return acc;
  }, {});

  // Sort destinations: higher hotel counts first for best UX
  const uniqueDestinations = Array.from(
    new Set(hotels.map((h) => h.destination))
  ).sort((a, b) => {
    const countDiff = (destCounts[b] || 0) - (destCounts[a] || 0);
    return countDiff !== 0 ? countDiff : a.localeCompare(b);
  });

  const destinations = ["All", ...uniqueDestinations];

  const filteredHotels = hotels.filter((h) => {
    const matchesDest = selectedDest === "All" || h.destination === selectedDest;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      h.name.toLowerCase().includes(q) ||
      h.location.toLowerCase().includes(q) ||
      h.destination.toLowerCase().includes(q);
    return matchesDest && matchesSearch;
  });

  return (
    <main className={styles.pageContainer}>
      {/* Hero Header */}
      <ScrollReveal direction="left">
        <section className={styles.heroHeader}>
          <div className={styles.heroInner}>
            <span className={styles.badge}>Hospitality & Partner Stays</span>
            <h1 className={styles.heroTitle}>Partner Hotels & Mountain Resorts</h1>
            <p className={styles.heroSubtitle}>
              Verified accommodations across Skardu, Hunza, Swat, Kashmir, Naran, Kumrat, Shogran, Balakot, Galyat, and Islamabad. All properties are pre-screened for continuous hot water, room heating, clean linen, and power backup.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Floating Filter Console */}
      <div className={styles.filterSection}>
        <div className={styles.filterCard}>
          {/* Filter Controls Header */}
          <div className={styles.filterTopRow}>
            <div className={styles.searchBox}>
              <IconSearch size={18} color="#64748b" className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search by hotel name, valley, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className={styles.clearSearchBtn}
                  aria-label="Clear search"
                >
                  <IconCross size={14} color="#64748b" />
                </button>
              )}
            </div>

            <div className={styles.filterStatus}>
              <span className={styles.resultsCount}>
                Showing <strong>{filteredHotels.length}</strong> of {hotels.length} verified {hotels.length === 1 ? "property" : "properties"}
              </span>
              {(selectedDest !== "All" || searchQuery.trim()) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDest("All");
                    setSearchQuery("");
                  }}
                  className={styles.resetBtn}
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Destination Chips Row */}
          <div className={styles.destNavWrapper}>
            <div className={styles.destNav}>
              {destinations.map((dest) => {
                const count = dest === "All" ? hotels.length : (destCounts[dest] || 0);
                const isActive = selectedDest === dest;
                return (
                  <button
                    key={dest}
                    type="button"
                    onClick={() => setSelectedDest(dest)}
                    className={`${styles.destPill} ${isActive ? styles.destPillActive : ""}`}
                  >
                    <span>{dest === "All" ? "All Stays" : dest}</span>
                    <span className={styles.destCountBadge}>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Hotel Cards Grid */}
      <ScrollReveal direction="right">
        <div className={styles.mainContent}>
          {filteredHotels.length === 0 ? (
            <div className={styles.noResultsBox}>
              <IconHotel size={46} color="#94a3b8" />
              <h3>No Properties Found</h3>
              <p>
                We couldn&apos;t find any verified hotels matching your search
                {searchQuery ? ` "${searchQuery}"` : ""}
                {selectedDest !== "All" ? ` in ${selectedDest}` : ""}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedDest("All");
                  setSearchQuery("");
                }}
                className={styles.viewAllBtn}
              >
                View All {hotels.length} Stays
              </button>
            </div>
          ) : (
            <div
              key={`${selectedDest}-${searchQuery}`}
              className={styles.hotelsGrid}
            >
            {filteredHotels.map((hotel, idx) => {
              const waMsg = encodeURIComponent(
                `Hello Musafir Pakistan! I would like to inquire about room booking at "${hotel.name}" in ${hotel.location}.`
              );
              const waUrl = `https://wa.me/923366832018?text=${waMsg}`;

              return (
                <div
                  key={hotel.id}
                  className={styles.hotelCard}
                  style={{ animationDelay: `${Math.min(idx * 0.04, 0.36)}s` }}
                >
                  <Link href={`/services/hotels/${hotel.id}`} className={styles.imageWrapper}>
                    <Image
                      src={hotel.image}
                      alt={hotel.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <span className={styles.ratingBadge}>
                      <IconStar size={13} fill="#facc15" color="#facc15" />
                      <span>{hotel.rating}</span>
                    </span>
                    <span className={styles.destBadge}>{hotel.destination}</span>
                  </Link>

                  <div className={styles.cardBody}>
                    <Link href={`/services/hotels/${hotel.id}`} style={{ textDecoration: "none" }}>
                      <h2 className={styles.hotelName}>{hotel.name}</h2>
                    </Link>
                    <div className={styles.hotelLocation}>
                      <IconMapPin size={14} color="#15803d" />
                      <span>{hotel.location}</span>
                    </div>
                    <p className={styles.hotelDesc}>{hotel.description}</p>

                    <div className={styles.amenitiesList}>
                      {hotel.amenities.slice(0, 4).map((amenity, idx) => (
                        <span key={idx} className={styles.amenityChip}>
                          <IconCheck size={12} color="#15803d" />
                          <span>{amenity}</span>
                        </span>
                      ))}
                    </div>

                    <div className={styles.cardFooter}>
                      <div className={styles.priceCol}>
                        <span className={styles.priceLabel}>Starting From</span>
                        <span className={styles.priceVal}>
                          PKR {hotel.pricePerNight.toLocaleString()}
                          <small style={{ fontSize: "0.8rem", color: "#666" }}> / night</small>
                        </span>
                      </div>

                      <div className={styles.footerActions}>
                        <Link
                          href={`/services/hotels/${hotel.id}`}
                          className={styles.detailsBtn}
                        >
                          <span>Details & Gallery</span>
                          <IconArrowRight size={14} />
                        </Link>

                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.bookBtn}
                        >
                          <IconWhatsApp size={16} />
                          <span>Reserve</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          )}

          {/* Official Musafir Hotel Policy */}
          <section className={styles.policyCard}>
            <h3 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <IconHotel size={24} color="var(--primary-color)" />
              <span>Musafir Pakistan Hotel Guidelines & Operating Terms</span>
            </h3>
            <div className={styles.policyGrid}>
              <div className={styles.policyItem}>
                <h4>Check-in & Check-out Timings</h4>
                <p>
                  Standard Hotel Check-In is at <strong>3:00 PM</strong> and Check-Out is at <strong>12:00 PM</strong>. Early check-in or late check-out is subject to room availability at PKR 1,000 per hour.
                </p>
              </div>
              <div className={styles.policyItem}>
                <h4>Hygiene & Facility Verification</h4>
                <p>
                  All partner hotels are pre-inspected by our local coordinators to verify hot water running hours, clean beddings, functional room heaters, and backup generators.
                </p>
              </div>
              <div className={styles.policyItem}>
                <h4>Weather & Contingency Lodging</h4>
                <p>
                  In unforeseen road closures or sudden landslides, Musafir staff proactively coordinates alternate lodging arrangements in the nearest safe valley hub.
                </p>
              </div>
            </div>
          </section>
        </div>
      </ScrollReveal>
    </main>
  );
}