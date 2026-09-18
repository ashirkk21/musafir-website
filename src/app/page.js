"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Home.module.css";
import initialPackages from "../data/packages.json";
import ScrollReveal from "../components/ScrollReveal";
import {
  IconArrowRight,
  IconArrowLeft,
  IconMapPin,
  IconCalendar,
  IconUsers,
  IconShield,
  IconCar,
  IconCheck,
  IconSearch,
  IconStar,
  IconSparkles,
  IconCompass,
  IconHeadphones
} from "../components/Icons";

const heroSlides = [
  {
    image: "/images/skardu.jpg",
    title: "Skardu Valley",
    region: "Baltistan",
    tag: "Gateway to K2 & Deosai"
  },
  {
    image: "/images/swat.jpg",
    title: "Swat & Kalam",
    region: "Khyber Pakhtunkhwa",
    tag: "Switzerland of the East"
  },
  {
    image: "/images/hunza.jpg",
    title: "Passu Cones",
    region: "Upper Hunza",
    tag: "Cathedral Peaks"
  },
  {
    image: "/images/hero.jpg",
    title: "Karakoram Corridors",
    region: "Gilgit-Baltistan",
    tag: "High Mountain Expeditions"
  },
  {
    image: "/images/autumn_hero.jpg",
    title: "Hunza Valley",
    region: "Gilgit-Baltistan",
    tag: "Golden Autumn Foliage"
  }
];

const trendingTags = [
  { label: "Hunza Valley", query: "hunza" },
  { label: "Skardu & Deosai", query: "skardu" },
  { label: "Swat & Kalam", query: "swat" },
  { label: "Neelum Valley", query: "kashmir" },
  { label: "Babusar Pass", query: "naran" }
];

const packageReviews = [
  { text: "An absolutely breathtaking experience! The guides were professional and the views were surreal.", score: "4.9/5" },
  { text: "Perfectly organized from start to finish. The hotels were top-notch and the itinerary was flawless.", score: "5.0/5" },
  { text: "A truly magical journey. The local insights provided by our guide made this trip unforgettable.", score: "4.8/5" },
  { text: "Excellent transport, great food, and stunning locations. Highly recommend this tour operator!", score: "4.9/5" },
  { text: "Exceeded all our expectations. Every detail was taken care of, allowing us to just enjoy the views.", score: "5.0/5" }
];

const whyChooseUsCards = [
  {
    icon: <IconCompass size={24} />,
    title: "Local Expertise",
    description:
      "Musafir Pakistan tour agents and guides have in-depth knowledge of local culture, customs, languages, and attractions, providing rich insights that deepen your connection to each destination."
  },
  {
    icon: <IconMapPin size={24} />,
    title: "Custom Route Plan",
    description:
      "We craft personalized itineraries tailored to your specific interests, timeline, budget, and travel style—whether a high-altitude expedition, private family tour, or romantic honeymoon."
  },
  {
    icon: <IconSparkles size={24} />,
    title: "Total Convenience",
    description:
      "Trip planning can be complex and time-consuming. Our team takes care of all accommodations, verified transportation, road permits, and excursion logistics, saving you valuable time and effort."
  },
  {
    icon: <IconShield size={24} />,
    title: "Reduce Travel Stress",
    description:
      "Navigating unfamiliar terrains and remote mountain corridors is effortless with our experienced tour managers who handle unexpected weather or road conditions with 24/7 dedicated support."
  },
  {
    icon: <IconHeadphones size={24} />,
    title: "Safety & Security",
    description:
      "Your safety is our top priority. We provide continuous route guidance, vetted mountain drivers, emergency contacts, safe lodging protocols, and full compliance with local tourism regulations."
  },
  {
    icon: <IconUsers size={24} />,
    title: "Overcome Language Barriers",
    description:
      "Our multilingual guides speak regional languages (Balti, Shina, Pashto, Hindko) alongside Urdu and English, giving you access to authentic cultural stories and hidden mountain gems."
  }
];

export default function Home() {
  console.log("Forcing client bundle invalidation");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [packages, setPackages] = useState(initialPackages);
  const [flippedCards, setFlippedCards] = useState({});

  const toggleCardFlip = (pkgId) => {
    setFlippedCards(prev => ({
      ...prev,
      [pkgId]: !prev[pkgId]
    }));
  };

  const destCarouselRef = useRef(null);
  const pkgCarouselRef = useRef(null);
  const privatePkgCarouselRef = useRef(null);

  const scrollDestCarousel = (direction) => {
    if (destCarouselRef.current) {
      const scrollAmount = direction === "left" ? -412 : 412; // 380px card + 32px gap
      destCarouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollPkgCarousel = (direction) => {
    if (pkgCarouselRef.current) {
      const scrollAmount = direction === "left" ? -442 : 442;
      pkgCarouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollPrivatePkgCarousel = (direction) => {
    if (privatePkgCarouselRef.current) {
      const scrollAmount = direction === "left" ? -442 : 442;
      privatePkgCarouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const privateTours = packages.filter(
    (p) =>
      p.type.toLowerCase().includes("private") ||
      p.type.toLowerCase().includes("honeymoon") ||
      p.type.toLowerCase().includes("deluxe") ||
      p.type.toLowerCase().includes("luxury")
  );

  useEffect(() => {
    fetch('/api/packages')
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data)) setPackages(data);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);
  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <main className={styles.main}>
      {/* Modern Breathtaking Hero Section */}
      <section className={styles.heroSection}>
        {/* Background Cinematic Video */}
        <div className={styles.heroBackground}>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className={styles.heroVideo}
          >
            <source src="/hero_video/hero.mp4" type="video/mp4" />
          </video>
          {/* Refined directional gradient: preserves clarity while keeping text readable */}
          <div className={styles.heroGradientOverlay} />
        </div>

        <div className={styles.heroInner}>
          <div className={styles.heroLeft}>
            {/* Trust Badge */}
            <div className={styles.heroTrustBadge}>
              <div className={styles.starCluster}>
                <IconStar size={14} fill="#f59e0b" color="#f59e0b" />
                <IconStar size={14} fill="#f59e0b" color="#f59e0b" />
                <IconStar size={14} fill="#f59e0b" color="#f59e0b" />
                <IconStar size={14} fill="#f59e0b" color="#f59e0b" />
                <IconStar size={14} fill="#f59e0b" color="#f59e0b" />
              </div>
              <span>4.9 / 5 Rated by 1,200+ Travelers • Trusted Tour Operator</span>
            </div>

            {/* Main Hero Headline */}
            <h1 className={styles.heroTitle}>
              Discover Northern Pakistan’s <br />
              <span className={styles.heroHighlight}>Majestic Valleys & Peaks</span>
            </h1>



            {/* Trending Destination Pills */}
            <div className={styles.trendingPills}>
              <span className={styles.trendingLabel}>Trending:</span>
              {trendingTags.map((item) => (
                <Link
                  key={item.label}
                  href={`/destinations?q=${item.query}`}
                  className={styles.trendPill}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* Trust & Verification Bar */}
      <ScrollReveal direction="left">
        <section className={styles.trustSection}>
          <div className={styles.trustGrid}>
            <div className={styles.trustCard}>
              <div className={`${styles.trustIcon} ${styles.trustIconGreen}`}>
                <IconShield size={22} />
              </div>
              <div>
                <h4 className={styles.trustTitle}>Trusted Tour Operator</h4>
                <p className={styles.trustDesc}>Providing safe and reliable tours across Northern Pakistan.</p>
              </div>
            </div>

            <div className={styles.trustCard}>
              <div className={`${styles.trustIcon} ${styles.trustIconBlue}`}>
                <IconCar size={22} />
              </div>
              <div>
                <h4 className={styles.trustTitle}>Executive Mountain Fleet</h4>
                <p className={styles.trustDesc}>Saloon Coasters, Grand Cabins & 4x4 Prado SUVs with expert drivers.</p>
              </div>
            </div>

            <div className={styles.trustCard}>
              <div className={`${styles.trustIcon} ${styles.trustIconAmber}`}>
                <IconMapPin size={22} />
              </div>
              <div>
                <h4 className={styles.trustTitle}>Karachi, Lahore & Islamabad</h4>
                <p className={styles.trustDesc}>Direct weekly departures and complete on-ground ops management.</p>
              </div>
            </div>

            <div className={styles.trustCard}>
              <div className={`${styles.trustIcon} ${styles.trustIconPurple}`}>
                <IconCheck size={22} />
              </div>
              <div>
                <h4 className={styles.trustTitle}>Verified Hotel Stays</h4>
                <p className={styles.trustDesc}>Pre-inspected rooms guaranteed with warm bedding, heating & hot water.</p>
              </div>
            </div>

            <div className={styles.trustCard}>
              <div className={`${styles.trustIcon} ${styles.trustIconTeal}`}>
                <IconHeadphones size={22} />
              </div>
              <div>
                <h4 className={styles.trustTitle}>24/7 Customer Support</h4>
                <p className={styles.trustDesc}>Dedicated travel consultants available around the clock to assist you.</p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Popular Destinations Gallery */}
      <ScrollReveal direction="right">
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Explore Pakistan</span>
            <h2>Top Travel Destinations</h2>
            <p>Explore seasonal itineraries and mountain corridors across Gilgit-Baltistan and Khyber Pakhtunkhwa.</p>
          </div>

          <div className={styles.destCarouselContainer}>
            <button className={`${styles.destScrollBtn} ${styles.destScrollLeft}`} onClick={() => scrollDestCarousel("left")}>
              <IconArrowLeft size={20} />
            </button>
            <button className={`${styles.destScrollBtn} ${styles.destScrollRight}`} onClick={() => scrollDestCarousel("right")}>
              <IconArrowRight size={20} />
            </button>

            <div className={styles.destCarouselWrapper} ref={destCarouselRef}>
              <div className={styles.destCarouselTrack}>
                {/* Set 1 */}
                <Link href="/destinations" className={styles.destCard}>
                  <Image src="/images/hunza.jpg" alt="Hunza Valley" fill style={{ objectFit: "cover" }} className={styles.destImage} />
                  <div className={styles.destOverlay}></div>
                  <div className={styles.destContent}>
                    <h3 className={styles.destName}>Hunza Valley</h3>
                    <div className={styles.exploreBtn}><IconArrowRight size={18} /></div>
                  </div>
                </Link>
                <Link href="/destinations" className={styles.destCard}>
                  <Image src="/images/skardu.jpg" alt="Skardu Valley" fill style={{ objectFit: "cover" }} className={styles.destImage} />
                  <div className={styles.destOverlay}></div>
                  <div className={styles.destContent}>
                    <h3 className={styles.destName}>Skardu</h3>
                    <div className={styles.exploreBtn}><IconArrowRight size={18} /></div>
                  </div>
                </Link>
                <Link href="/destinations" className={styles.destCard}>
                  <Image src="/images/swat.jpg" alt="Swat Valley" fill style={{ objectFit: "cover" }} className={styles.destImage} />
                  <div className={styles.destOverlay}></div>
                  <div className={styles.destContent}>
                    <h3 className={styles.destName}>Swat Valley</h3>
                    <div className={styles.exploreBtn}><IconArrowRight size={18} /></div>
                  </div>
                </Link>
                <Link href="/destinations" className={styles.destCard}>
                  <Image src="/images/hero.jpg" alt="Neelum Valley" fill style={{ objectFit: "cover" }} className={styles.destImage} />
                  <div className={styles.destOverlay}></div>
                  <div className={styles.destContent}>
                    <h3 className={styles.destName}>Neelum Valley</h3>
                    <div className={styles.exploreBtn}><IconArrowRight size={18} /></div>
                  </div>
                </Link>

                {/* Additional Cards */}
                <Link href="/destinations" className={styles.destCard}>
                  <Image src="/images/swat.jpg" alt="Kalam Valley" fill style={{ objectFit: "cover" }} className={styles.destImage} />
                  <div className={styles.destOverlay}></div>
                  <div className={styles.destContent}>
                    <h3 className={styles.destName}>Kalam Valley</h3>
                    <div className={styles.exploreBtn}><IconArrowRight size={18} /></div>
                  </div>
                </Link>
                <Link href="/destinations" className={styles.destCard}>
                  <Image src="/images/hunza.jpg" alt="Naran Kaghan" fill style={{ objectFit: "cover" }} className={styles.destImage} />
                  <div className={styles.destOverlay}></div>
                  <div className={styles.destContent}>
                    <h3 className={styles.destName}>Naran Kaghan</h3>
                    <div className={styles.exploreBtn}><IconArrowRight size={18} /></div>
                  </div>
                </Link>
                <Link href="/destinations" className={styles.destCard}>
                  <Image src="/images/skardu.jpg" alt="Fairy Meadows" fill style={{ objectFit: "cover" }} className={styles.destImage} />
                  <div className={styles.destOverlay}></div>
                  <div className={styles.destContent}>
                    <h3 className={styles.destName}>Fairy Meadows</h3>
                    <div className={styles.exploreBtn}><IconArrowRight size={18} /></div>
                  </div>
                </Link>
                <Link href="/destinations" className={styles.destCard}>
                  <Image src="/images/hero.jpg" alt="Chitral" fill style={{ objectFit: "cover" }} className={styles.destImage} />
                  <div className={styles.destOverlay}></div>
                  <div className={styles.destContent}>
                    <h3 className={styles.destName}>Chitral</h3>
                    <div className={styles.exploreBtn}><IconArrowRight size={18} /></div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Why Choose Us Section */}
      <section className={styles.whyChooseSection}>
        <div className={styles.whyContainer}>
          <ScrollReveal animation="fade-up">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Why You Need Musafir Pakistan?</span>
              <h2>Why Choose Us?</h2>
              <p>
                Discover the six pillars that make traveling with Musafir Pakistan an effortless, enriching,
                and safe adventure from start to finish.
              </p>
            </div>
          </ScrollReveal>

          <div className={styles.whyGrid}>
            {whyChooseUsCards.map((card, idx) => (
              <ScrollReveal key={idx} animation="fade-up" delay={idx * 0.08}>
                <div className={styles.whyCard}>
                  <div className={styles.whyIconWrapper}>{card.icon}</div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Top Domestic Tours / Featured Packages */}
      <ScrollReveal direction="left">
        <section className={styles.pkgWrapper}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Handpicked Itineraries</span>
            <h2>Top Domestic Tours</h2>
            <p>Transparent pricing, comprehensive meal plans, and day-by-day itineraries verified by our local field guides.</p>
          </div>

          <div className={styles.pkgCarouselContainer}>
            <button className={`${styles.destScrollBtn} ${styles.destScrollLeft}`} onClick={() => scrollPkgCarousel("left")}>
              <IconArrowLeft size={20} />
            </button>
            <button className={`${styles.destScrollBtn} ${styles.destScrollRight}`} onClick={() => scrollPkgCarousel("right")}>
              <IconArrowRight size={20} />
            </button>

            <div className={styles.pkgCarouselWrapper} ref={pkgCarouselRef}>
              <div className={styles.pkgCarouselTrack}>
                {packages.slice(0, 5).map((pkg, index) => {
                  const review = packageReviews[index % packageReviews.length];
                  const isFlipped = !!flippedCards[pkg.id];
                  return (
                  <div
                    key={pkg.id}
                    className={`${styles.pkgCard} ${isFlipped ? styles.isFlipped : ""}`}
                    onClick={() => toggleCardFlip(pkg.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Toggle details for ${pkg.title}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleCardFlip(pkg.id);
                      }
                    }}
                  >
                    <div className={styles.pkgCardInner}>
                      {/* Front of Card */}
                      <div className={styles.pkgCardFront}>
                        <div className={styles.pkgImageWrapper}>
                          <Image
                            src={pkg.poster || pkg.image}
                            alt={pkg.title}
                            fill
                            sizes="(max-width: 900px) 100vw, 410px"
                            style={{ objectFit: "cover" }}
                            className={styles.pkgImage}
                          />
                          {!pkg.poster && <div className={styles.pkgOverlay}></div>}
                        </div>
                        {!pkg.poster && <h3 className={styles.pkgFrontTitle}>{pkg.title}</h3>}
                        <div className={styles.pkgFrontArrow}>
                          <IconArrowRight size={24} />
                        </div>
                      </div>

                      {/* Back of Card */}
                      <div className={`${styles.pkgCardBack} ${styles.pkgGlassInfo}`}>
                        <div className={styles.pkgHeader}>
                          <span className={styles.pkgBadge}>{pkg.badge || pkg.type}</span>
                          <div className={styles.pkgPriceCompact}>
                             <span className={styles.priceLabel}>From</span>
                             <span className={styles.priceAmount}>PKR {pkg.pricing?.solo?.toLocaleString()}</span>
                          </div>
                        </div>
                        <h3>{pkg.title}</h3>
                        <p className={styles.pkgTagline}>{pkg.tagline}</p>

                        <div className={styles.pkgReview}>
                          <div className={styles.pkgStarCluster}>
                            <IconStar size={14} fill="#f59e0b" color="#f59e0b" />
                            <IconStar size={14} fill="#f59e0b" color="#f59e0b" />
                            <IconStar size={14} fill="#f59e0b" color="#f59e0b" />
                            <IconStar size={14} fill="#f59e0b" color="#f59e0b" />
                            <IconStar size={14} fill="#f59e0b" color="#f59e0b" />
                            <span className={styles.reviewScore}>{review.score}</span>
                          </div>
                          <p>"{review.text}"</p>
                          <span className={styles.reviewAuthor}>- Verified Traveler</span>
                        </div>

                        <div className={styles.pkgDetailsExpanded}>
                          <div className={styles.pkgFeaturesRow}>
                            <div className={styles.pkgFeatureItem}>
                              <IconCalendar size={16} />
                              <span>{pkg.duration?.days}D / {pkg.duration?.nights}N</span>
                            </div>
                            <div className={styles.pkgFeatureItem}>
                              <IconMapPin size={16} />
                              <span>{pkg.attractions?.[0] || pkg.title}</span>
                            </div>
                          </div>

                          <Link
                            href={`/tours/${pkg.id}`}
                            className={styles.pkgExploreBtn}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>Explore Itinerary</span>
                            <div className={styles.btnIconCircle}>
                              <IconArrowRight size={16} />
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )})}
              </div>
            </div>
          </div>

          <div className={styles.swipeHint}>
            <span className={styles.swipeArrow}>←</span>
            <span>Swipe to explore more</span>
            <span className={styles.swipeArrow}>→</span>
          </div>

          <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
            <Link href="/tours/group" className={styles.viewAllBtn}>
              <span>View All Packages</span>
              <IconArrowRight size={16} />
            </Link>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal direction="right">
        <section className={styles.pkgWrapper} style={{ background: "linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)", paddingTop: "2rem" }}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Exclusive Escapes</span>
            <h2>Featured Private Tours</h2>
            <p>Dedicated 4x4 Prado transport, flexible itineraries, and luxury stays crafted for your family or honeymoon.</p>
          </div>

          <div className={styles.pkgCarouselContainer}>
            <button className={`${styles.destScrollBtn} ${styles.destScrollLeft}`} onClick={() => scrollPrivatePkgCarousel("left")}>
              <IconArrowLeft size={20} />
            </button>
            <button className={`${styles.destScrollBtn} ${styles.destScrollRight}`} onClick={() => scrollPrivatePkgCarousel("right")}>
              <IconArrowRight size={20} />
            </button>

            <div className={styles.pkgCarouselWrapper} ref={privatePkgCarouselRef}>
              <div className={styles.pkgCarouselTrack}>
                {privateTours.slice(0, 5).map((pkg, index) => {
                  const review = packageReviews[index % packageReviews.length];
                  const isFlipped = !!flippedCards[pkg.id];
                  return (
                  <div
                    key={pkg.id}
                    className={`${styles.pkgCard} ${isFlipped ? styles.isFlipped : ""}`}
                    onClick={() => toggleCardFlip(pkg.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Toggle details for ${pkg.title}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleCardFlip(pkg.id);
                      }
                    }}
                  >
                    <div className={styles.pkgCardInner}>
                      {/* Front of Card */}
                      <div className={styles.pkgCardFront}>
                        <div className={styles.pkgImageWrapper}>
                          <Image
                            src={pkg.poster || pkg.image}
                            alt={pkg.title}
                            fill
                            sizes="(max-width: 900px) 100vw, 410px"
                            style={{ objectFit: "cover" }}
                            className={styles.pkgImage}
                          />
                          {!pkg.poster && <div className={styles.pkgOverlay}></div>}
                        </div>
                        {!pkg.poster && <h3 className={styles.pkgFrontTitle}>{pkg.title}</h3>}
                        <div className={styles.pkgFrontArrow}>
                          <IconArrowRight size={24} />
                        </div>
                      </div>

                      {/* Back of Card */}
                      <div className={`${styles.pkgCardBack} ${styles.pkgGlassInfo}`}>
                        <div className={styles.pkgHeader}>
                          <span className={styles.pkgBadge}>{pkg.badge || pkg.type}</span>
                          <div className={styles.pkgPriceCompact}>
                             <span className={styles.priceLabel}>From</span>
                             <span className={styles.priceAmount}>PKR {pkg.pricing?.couple?.toLocaleString()}</span>
                          </div>
                        </div>
                        <h3>{pkg.title}</h3>
                        <p className={styles.pkgTagline}>{pkg.tagline}</p>

                        <div className={styles.pkgReview}>
                          <div className={styles.pkgStarCluster}>
                            <IconStar size={14} fill="#f59e0b" color="#f59e0b" />
                            <IconStar size={14} fill="#f59e0b" color="#f59e0b" />
                            <IconStar size={14} fill="#f59e0b" color="#f59e0b" />
                            <IconStar size={14} fill="#f59e0b" color="#f59e0b" />
                            <IconStar size={14} fill="#f59e0b" color="#f59e0b" />
                            <span className={styles.reviewScore}>{review.score}</span>
                          </div>
                          <p>"{review.text}"</p>
                          <span className={styles.reviewAuthor}>- Verified Traveler</span>
                        </div>

                        <div className={styles.pkgDetailsExpanded}>
                          <div className={styles.pkgFeaturesRow}>
                            <div className={styles.pkgFeatureItem}>
                              <IconCalendar size={16} />
                              <span>{pkg.duration?.days}D / {pkg.duration?.nights}N</span>
                            </div>
                            <div className={styles.pkgFeatureItem}>
                              <IconMapPin size={16} />
                              <span>{pkg.attractions?.[0] || pkg.title}</span>
                            </div>
                          </div>

                          <Link
                            href={`/tours/${pkg.id}`}
                            className={styles.pkgExploreBtn}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>Explore Itinerary</span>
                            <div className={styles.btnIconCircle}>
                              <IconArrowRight size={16} />
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )})}
            </div>
          </div>
          </div>

          <div className={styles.swipeHint}>
            <span className={styles.swipeArrow}>←</span>
            <span>Swipe to explore more</span>
            <span className={styles.swipeArrow}>→</span>
          </div>

          <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
            <Link href="/tours/private" className={styles.viewAllBtn}>
              <span>View All Private Tours</span>
              <IconArrowRight size={16} />
            </Link>
          </div>
        </section>
      </ScrollReveal>

      {/* Private Tour Designer Section */}
      <ScrollReveal animation="fade-up">
        <section className={styles.privateTourSection}>
          <div className={styles.privateTourContainer}>
            <div className={styles.privateTourContent}>
              <h2>DESIGN YOUR PRIVATE TOUR</h2>
              <ul className={styles.privateTourList}>
                <li>
                  <span className={styles.bulletPoint}></span>
                  <span>Planning the perfect trip can be overwhelming. From choosing destinations to organizing transportation, accommodations, and experiences, travel planning often takes hours of research.</span>
                </li>
                <li>
                  <span className={styles.bulletPoint}></span>
                  <span>With Musafir Pakistan, you can skip the stress and enjoy a custom travel itinerary designed specifically for you.</span>
                </li>
                <li>
                  <span className={styles.bulletPoint}></span>
                  <span>Our Private Trip Designer service allows you to share your travel preferences, interests, and expectations so our experts can create a personalized travel itinerary tailored to your needs.</span>
                </li>
              </ul>
              <Link href="/tours/private" className={styles.privateTourBtn}>
                DESIGN YOUR TRIP <IconArrowRight size={18} />
              </Link>
            </div>
            <div className={styles.privateTourImageWrapper}>
              <div className={styles.imageBox}>
                <Image
                  src="/images/private-tour-mockup-themed.jpg"
                  alt="Private Tour Designer Interface Mockup"
                  fill
                  sizes="(max-width: 900px) 100vw, 600px"
                  style={{ objectFit: 'contain' }}
                  className={styles.privateTourImage}
                />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

    </main>
  );
}
