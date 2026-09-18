import Image from "next/image";
import Link from "next/link";
import styles from "./About.module.css";
import ScrollReveal from "../../components/ScrollReveal";
import galleryData from "../../data/gallery.json";
import reviewsData from "../../data/reviews.json";
import {
  IconCheck,
  IconShield,
  IconCompass,
  IconMapPin,
  IconUsers,
  IconHotel,
  IconCar,
  IconPlane,
  IconStar,
  IconSparkles,
  IconArrowRight,
  IconClock,
  IconWhatsApp,
  IconHeadphones,
  IconBuilding,
  IconPhone,
  IconMail
} from "../../components/Icons";

export const metadata = {
  title: "About Us — Musafir Pakistan Tours & Travels",
  description: "Learn about Musafir Pakistan, CEO Ashir Khan's vision, our executive team, deluxe hotel partners, verified transport fleet, recent trips, and authentic customer reviews.",
  alternates: {
    canonical: "/about"
  },
  openGraph: {
    title: "About Musafir Pakistan | Team, Vision & Reviews",
    description: "Learn about Musafir Pakistan, CEO Ashir Khan's vision, our executive team, deluxe hotel partners, and verified transport fleet.",
    url: "/about"
  }
};

export default function AboutPage() {
  // Section 2: Why You Need Musafir Pakistan? (Page 4 of Company Profile)
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

  // Section 3: Business Partners & Services (Pages 5, 6, 7 & 14 of Company Profile)
  const partnerCategories = [
    {
      title: "Deluxe Hospitality Partners",
      icon: <IconHotel size={22} />,
      partners: [
        { name: "Serena Hotels & Resorts", badge: "Hunza, Gilgit & Swat" },
        { name: "Shangrila Resort", badge: "Skardu & Lower Kachura" },
        { name: "Luxus Hunza Attabad", badge: "Attabad Lake" },
        { name: "Pearl Continental", badge: "Bhurban & Muzaffarabad" }
      ]
    },
    {
      title: "Executive Fleet & Transport",
      icon: <IconCar size={22} />,
      partners: [
        { name: "Toyota Grand Cabin Saloon", badge: "Luxury AC Fleet" },
        { name: "Toyota Coaster Luxury", badge: "Group Departures" },
        { name: "4x4 Prado & Land Cruiser", badge: "Mountain Expeditions" },
        { name: "4x4 Mountain Jeep Unions", badge: "Deosai / Babusar / Passu" }
      ]
    },
    {
      title: "Aviation & Domestic Ticketing",
      icon: <IconPlane size={22} />,
      partners: [
        { name: "Pakistan International Airlines", badge: "Domestic Flight Desk" },
        { name: "AirSial & Fly Jinnah", badge: "Skardu & Gilgit Flights" },
        { name: "Pakistan Railways Greenline", badge: "Executive Train Desk" },
        { name: "Daewoo & Faisal Movers", badge: "Intercity Bus Booking" }
      ]
    },
    {
      title: "Accreditations & Tourism Bodies",
      icon: <IconShield size={22} />,
      partners: [
        { name: "Alpine Club of Pakistan", badge: "Expedition Partner" },
        { name: "TPAP Tourism Association", badge: "Active Member" },
        { name: "Emergency Rescue 1122", badge: "Field Protocol" },
        { name: "GB Tourism Police", badge: "Highway Liaison" }
      ]
    }
  ];

  // Section 4: Meet Our Team — Executive Leadership (CEO & Co-Founder)
  const executiveLeaders = [
    {
      id: "ashir",
      name: "Ashir Khan",
      title: "Chief Executive Officer & Founder",
      badge: "Founder & CEO",
      image: "/images/profile/team/ashir_khan.jpg",
      email: "hello@musafirpakistan.com",
      phone: "+92 336 6832018",
      bio: "Visionary founder of Musafir Pakistan. Ashir has steered the company into one of Pakistan's premier northern and southern tour operators. He personally oversees strategic nationwide expedition routes, certified high-altitude 4x4 fleet safety protocols, and executive hospitality partnerships across Gilgit-Baltistan, KPK, Balochistan, and Azad Kashmir.",
      quote: "“Our goal has always been simple – to bring the breathtaking beauty of Pakistan closer to everyone with honesty, safety, and care.”"
    },
    {
      id: "atia",
      name: "Atia Khan",
      title: "Co-Founder & Director of Guest Experience",
      badge: "Co-Founder & Director",
      image: "/images/profile/team/atia_khan.jpg",
      email: "hello@musafirpakistan.com",
      phone: "+92 336 6832018",
      bio: "Co-founding director shaping Musafir Pakistan’s signature hospitality standards and customer-first culture. Atia spearheads bespoke luxury honeymoon setups, private family travel journeys, and sets uncompromising welfare protocols for women-only and family tour groups, ensuring complete privacy, safety, and comfort on every expedition.",
      quote: "“Every journey should feel effortless, safe, and deeply personal for families and couples alike.”"
    }
  ];

  // Section 4: Department & Operations Leads
  const departmentLeaders = [
    {
      id: "abdul-moiz",
      name: "Abdul Moiz",
      role: "Customer Services Executive",
      subRole: "Head of 24/7 Traveler Care & Booking Desk",
      image: "/images/profile/team/abdul_moiz.jpg",
      bio: "The primary point of contact for our travelers. Abdul Moiz oversees end-to-end booking reservations, instant customized trip quotations, transparent payment confirmations, and 24/7 on-tour guest check-ins to ensure rapid assistance for any journey questions.",
      tags: ["Traveler Care", "Instant Support", "Booking Desk"]
    },
    {
      id: "naveed",
      name: "Naveed Ahmed",
      role: "Corporate Sales Manager",
      subRole: "Head of B2B Retreats & Institutional Excursions",
      image: "/images/profile/team/naveed_ahmed.jpg",
      bio: "Specializing in corporate team-building retreats, university student excursions, and institutional transport contracts. Naveed designs custom group itineraries with verified hotel room blocks, conference arrangements, and executive Coaster fleet logistics.",
      tags: ["Corporate Sales", "B2B Retreats", "Fleet Logistics"]
    },
    {
      id: "saad",
      name: "Saad Ali",
      role: "Social Media Executive",
      subRole: "Head of Field Storytelling & Community",
      image: "/images/profile/team/saad_ali.jpg",
      bio: "Bringing the wonders of Pakistan to life across digital channels. Saad captures on-ground field photography, scenic drone vistas, authentic traveler reviews, and manages our vibrant #TravelWithMusafirPakistan community.",
      tags: ["Social Media", "Field Storytelling", "Community Host"]
    }
  ];

  // Section 5: Our Recent Trips (Page 17 Gallery & Trips of Company Profile)
  const recentTrips = [
    {
      id: 1,
      title: "Skardu & Waterfall Expedition",
      location: "Baltistan, Pakistan",
      image: "/images/profile/gallery/trip1.jpg",
      duration: "5-10 Days",
      type: "Signature Tour",
      highlights: "Group exploration of Upper Kachura Lake, Shangrila Resort, Cold Desert Katpana, and Manthoka Waterfall."
    },
    {
      id: 2,
      title: "Karakoram Highway 4x4 Prado Safari",
      location: "Hunza & Passu Cones",
      image: "/images/profile/gallery/trip2.jpg",
      duration: "6-9 Days",
      type: "Private 4x4",
      highlights: "Cruising the world-famous KKH in Musafir Pakistan branded Prado SUVs with stops at Attabad Lake and Hussaini Bridge."
    },
    {
      id: 3,
      title: "Alpine Lakes & Turquoise Waters",
      location: "Gilgit-Baltistan Plateau",
      image: "/images/profile/gallery/trip3.jpg",
      duration: "7 Days",
      type: "Group Adventure",
      highlights: "Travelers celebrating at pristine high-altitude lakes with crystal glacial waters and majestic reflections."
    },
    {
      id: 4,
      title: "High Mountain Summit & Viewpoints",
      location: "Babusar Top (13,700 ft)",
      image: "/images/profile/gallery/trip4.jpg",
      duration: "6 Days",
      type: "Mountain Trek",
      highlights: "Standing in awe before towering peaks, panoramic sunrise vistas, and guided valley ridge walks."
    },
    {
      id: 5,
      title: "Babusar Pass & Kaghan Valley Corridor",
      location: "13,700 ft Mountain Pass",
      image: "/images/profile/gallery/trip5.jpg",
      duration: "7 Days",
      type: "Group Tour",
      highlights: "Scenic mountain crossing connecting Naran Valley with Gilgit-Baltistan amidst snow peaks and alpine clouds."
    },
    {
      id: 6,
      title: "Khunjerab Pass & Border Expedition",
      location: "Pak-China Border 4,693m",
      image: "/images/profile/gallery/trip6.jpg",
      duration: "9 Days",
      type: "Flagship Departure",
      highlights: "Reaching the highest paved international border crossing in the world with snow mountain flag celebrations."
    }
  ];

  // Section 6: What Our Traveler Says (Page 16 of Company Profile)
  const officialReviews = [
    {
      id: 1,
      author: "Hassan Khalid",
      role: "Northern Expedition Traveler",
      avatar: "/images/profile/reviews/hassan_khalid.jpg",
      trip: "Northern Group Expedition",
      rating: 5,
      comment:
        "Exploring Pakistan with Musafir Pakistan was a dream come true. Their well-planned itineraries and knowledgeable guides made the journey even more memorable."
    },
    {
      id: 2,
      author: "Samira Hadid",
      role: "Family Tour Guest",
      avatar: "/images/profile/reviews/samira_hadid.jpg",
      trip: "Deluxe Family Tour",
      rating: 5,
      comment:
        "It was an absolutely amazing experience, food, transport, and accommodation, etc... Everything is amazing. for me, it was an excellent experience, Recommended the services of the Musafir Pakistan Team."
    },
    {
      id: 3,
      author: "Fahad Hussain",
      role: "Adventure Tour Guest",
      avatar: "/images/profile/reviews/fahad_hussain.jpg",
      trip: "Group Adventure Tour",
      rating: 5,
      comment:
        "It was a great experience. Everything was well arranged and organized. Really enjoyed the tour. Bilal bhai was very kind and cooperative in all aspects. He made this tour best for us."
    }
  ];

  return (
    <main className={styles.aboutPage}>
      {/* Hero Header with Scenic Northern Pakistan Backdrop */}
      <section className={styles.heroSection}>
        <div className={styles.heroBgWrapper}>
          <Image
            src="/images/hunza.jpg"
            alt="Scenic Hunza Valley and Passu Cones, Northern Pakistan"
            fill
            priority
            sizes="100vw"
            className={styles.heroBgImage}
          />
          <div className={styles.heroGradientOverlay} />
        </div>

        <div className={styles.container}>
          <ScrollReveal animation="fade-up">
            <div className={styles.heroBadge}>
              <IconSparkles size={16} />
              <span>Musafir Pakistan Company Profile</span>
            </div>
            <h1 className={styles.heroTitle}>
              Your Trusted Partner In Exploring <span>The Beauty of Pakistan</span>
            </h1>
            <p className={styles.heroSubtitle}>
              From serene valleys to majestic snow-capped peaks, we specialize in curating unforgettable
              travel experiences across northern and southern Pakistan with comfort, safety, and adventure.
            </p>

            <div className={styles.heroStats}>
              <div className={styles.heroStatItem}>
                <span className={styles.heroStatVal}>5,000+</span>
                <span className={styles.heroStatLabel}>Happy Travelers</span>
              </div>
              <div className={styles.heroStatItem}>
                <span className={styles.heroStatVal}>120+</span>
                <span className={styles.heroStatLabel}>Tours Executed</span>
              </div>
              <div className={styles.heroStatItem}>
                <span className={styles.heroStatVal}>4.9 / 5.0</span>
                <span className={styles.heroStatLabel}>Guest Satisfaction</span>
              </div>
              <div className={styles.heroStatItem}>
                <span className={styles.heroStatVal}>100%</span>
                <span className={styles.heroStatLabel}>Safety & Comfort Record</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CEO Introduction Section (Dark Section) */}
      <section className={styles.ceoSection}>
        <div className={styles.container}>
          <ScrollReveal animation="fade-up">
            <div className={styles.ceoCard}>
              <div className={styles.ceoImageCol}>
                <Image
                  src="/images/profile/ceo_ashir.jpg"
                  alt="Ashir Khan - CEO, Musafir Pakistan"
                  fill
                  sizes="(max-width: 768px) 200px, 250px"
                  className={styles.ceoImage}
                />
              </div>
              <div className={styles.ceoContentCol}>
                <div className={styles.ceoBadge}>
                  <IconSparkles size={14} />
                  <span>Introduction From Our CEO</span>
                </div>
                <blockquote className={styles.ceoQuote}>
                  “At Musafir Pakistan, our goal has always been simple – to bring the beauty of Pakistan closer
                  to everyone. From the breathtaking northern landscapes to the cultural richness of the south,
                  we believe in creating memorable travel experiences that reflect the diversity and wonder of
                  our homeland. Whether you're planning a group tour, a private getaway, or a special honeymoon
                  trip, Musafir Pakistan is here to make your travel dreams come true. I personally invite you to
                  explore Pakistan with us, where every journey is an adventure waiting to unfold.”
                </blockquote>
                <div className={styles.ceoAuthor}>
                  <span className={styles.ceoName}>Ashir Khan</span>
                  <span className={styles.ceoTitle}>CEO, Musafir Pakistan</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========================================================
          SECTION 1: OUR MISSION & VISION (Dark Section)
          ======================================================== */}
      <section className={styles.missionSection}>
        <div className={styles.container}>
          <ScrollReveal animation="fade-up">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>Company Foundation</span>
              <h2 className={styles.sectionTitle}>Our Mission & Vision</h2>
              <p className={styles.sectionSubtitle}>
                We are a premier travel agency offering personalized tours and top-tier services across
                Pakistan, ensuring every journey is memorable, comfortable, and hassle-free.
              </p>
            </div>
          </ScrollReveal>

          <div className={styles.missionGrid}>
            <ScrollReveal animation="fade-left">
              <div className={styles.missionCard}>
                <div className={styles.cardWatermark}>
                  <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 60L35 15L55 35L85 5L120 60H0Z" fill="currentColor" />
                  </svg>
                </div>
                <div className={styles.cardIconCircle}>
                  <IconCompass size={28} />
                </div>
                <h3>Our Mission</h3>
                <p>
                  To make Pakistan’s breathtaking valleys, alpine wonders, and cultural heritage accessible,
                  safe, and enjoyable for travelers from all walks of life. We deliver seamless end-to-end
                  travel solutions with uncompromised guest safety, transparent pricing, and respectful
                  community empowerment.
                </p>
                <ul className={styles.missionList}>
                  <li>
                    <IconCheck size={18} className={styles.checkIcon} />
                    <span>Personalized group tours, private family trips, and luxury honeymoons</span>
                  </li>
                  <li>
                    <IconCheck size={18} className={styles.checkIcon} />
                    <span>Hassle-free arrangements from transport, meals, and verified hotels</span>
                  </li>
                  <li>
                    <IconCheck size={18} className={styles.checkIcon} />
                    <span>Empowering indigenous mountain guides and preserving natural habitats</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-right">
              <div className={styles.missionCard}>
                <div className={styles.cardWatermark}>
                  <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 60L35 15L55 35L85 5L120 60H0Z" fill="currentColor" />
                  </svg>
                </div>
                <div className={styles.cardIconCircle}>
                  <IconShield size={28} />
                </div>
                <h3>Our Vision</h3>
                <p>
                  To be Pakistan's most trusted, innovative, and customer-first travel companion, recognized
                  globally for showcasing the authentic hospitality, scenic splendor, and hidden treasures of
                  both Northern and Southern Pakistan with unmatched professionalism and warmth.
                </p>
                <ul className={styles.missionList}>
                  <li>
                    <IconCheck size={18} className={styles.checkIcon} />
                    <span>Setting benchmark standards in tourist safety and mountain fleet operations</span>
                  </li>
                  <li>
                    <IconCheck size={18} className={styles.checkIcon} />
                    <span>Expanding sustainable tourism across Skardu, Hunza, Swat, and Southern beaches</span>
                  </li>
                  <li>
                    <IconCheck size={18} className={styles.checkIcon} />
                    <span>Connecting travelers with lifelong memories: #TravelWithMusafirPakistan</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 2: WHY YOU CHOOSE US? (Soft Off-White Section: #F5F7FA)
          ======================================================== */}
      <section className={styles.whyChooseSection}>
        <div className={styles.container}>
          <ScrollReveal animation="fade-up">
            <div className={styles.sectionHeaderLight}>
              <span className={styles.sectionBadge}>Why You Need Musafir Pakistan?</span>
              <h2 className={styles.sectionTitle}>Why Choose Us?</h2>
              <p className={styles.sectionSubtitle}>
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

      {/* Today's Quote Banner (Dark Section) */}
      <section className={styles.quoteSection}>
        <div className={styles.container}>
          <ScrollReveal animation="fade-up">
            <div className={styles.quoteBanner}>
              <div className={styles.quoteMark}>“</div>
              <h3 className={styles.quoteText}>
                Travel Because <span>Money Returns</span>, Time Doesn't.
              </h3>
              <span className={styles.quoteHashtag}>#TravelWithMusafirPakistan</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========================================================
          SECTION 3: OUR BUSINESS PARTNERS & SERVICES (Solid Dark #141F30)
          ======================================================== */}
      <section className={styles.partnersSection}>
        <div className={styles.container}>
          <ScrollReveal animation="fade-up">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>Verified Alliances</span>
              <h2 className={styles.sectionTitle}>Our Business Partners</h2>
              <p className={styles.sectionSubtitle}>
                We partner with premier hospitality providers, executive transport fleets, and aviation
                authorities to guarantee unmatched comfort and reliability on every route.
              </p>
            </div>
          </ScrollReveal>

          <div className={styles.partnerCategories}>
            {partnerCategories.map((cat, idx) => (
              <ScrollReveal key={idx} animation="fade-up" delay={idx * 0.1}>
                <div className={styles.partnerCategoryCard}>
                  <div className={styles.partnerCatHeader}>
                    <div className={styles.partnerCatIcon}>{cat.icon}</div>
                    <h3 className={styles.partnerCatTitle}>{cat.title}</h3>
                  </div>
                  <div className={styles.partnerPillList}>
                    {cat.partners.map((partner, pIdx) => (
                      <div key={pIdx} className={styles.partnerPill}>
                        <span>{partner.name}</span>
                        <span className={styles.partnerPillBadge}>{partner.badge}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 4: MEET OUR TEAM (Soft Off-White Section: #F5F7FA)
          ======================================================== */}
      <section className={styles.teamSection}>
        <div className={styles.container}>
          <ScrollReveal animation="fade-up">
            <div className={styles.sectionHeaderLight}>
              <span className={styles.sectionBadge}>The Leadership Behind Your Journeys</span>
              <h2 className={styles.sectionTitle}>Meet Our Team</h2>
              <p className={styles.sectionSubtitle}>
                Meet the visionary executive founders, strategic route planners, and customer care
                professionals dedicated to making every Musafir journey extraordinary.
              </p>
            </div>
          </ScrollReveal>

          {/* Executive Leadership Grid (CEO & Co-Founder) */}
          <div className={styles.leadershipGrid}>
            {executiveLeaders.map((exec, idx) => (
              <ScrollReveal key={exec.id} animation="fade-up" delay={idx * 0.1}>
                <div className={styles.execCard}>
                  <div className={styles.execAvatarCol}>
                    <div className={styles.execAvatarWrapper}>
                      <Image
                        src={exec.image}
                        alt={`${exec.name} — ${exec.title}`}
                        fill
                        sizes="140px"
                        className={styles.execImage}
                      />
                    </div>
                    <a href={`mailto:${exec.email}`} className={styles.execDirectContact}>
                      <IconMail size={13} />
                      <span>Contact</span>
                    </a>
                  </div>

                  <div className={styles.execContentCol}>
                    <span className={styles.execBadge}>
                      <IconSparkles size={13} />
                      <span>{exec.badge}</span>
                    </span>
                    <h3 className={styles.execName}>{exec.name}</h3>
                    <div className={styles.execTitle}>{exec.title}</div>
                    <p className={styles.execBio}>{exec.bio}</p>

                    <blockquote className={styles.execQuote}>{exec.quote}</blockquote>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Department & Operations Leads Header */}
          <ScrollReveal animation="fade-up">
            <div className={styles.deptSectionDivider}>
              <h3 className={styles.deptDividerTitle}>Department & Operations Leaders</h3>
              <p className={styles.deptDividerSubtitle}>
                The dedicated specialists managing traveler care, B2B corporate sales, and real-time field storytelling
              </p>
            </div>
          </ScrollReveal>

          {/* Department & Operations Leads Grid */}
          <div className={styles.deptGrid}>
            {departmentLeaders.map((dept, idx) => (
              <ScrollReveal key={dept.id} animation="fade-up" delay={idx * 0.08}>
                <div className={styles.deptCard}>
                  <div className={styles.deptAvatarWrapper}>
                    <Image
                      src={dept.image}
                      alt={`${dept.name} — ${dept.role}`}
                      fill
                      sizes="120px"
                      className={styles.deptImage}
                    />
                  </div>
                  <span className={styles.deptRole}>{dept.role}</span>
                  <h4 className={styles.deptName}>{dept.name}</h4>
                  <div className={styles.deptSubRole}>{dept.subRole}</div>
                  <p className={styles.deptBio}>{dept.bio}</p>

                  <div className={styles.deptTagRow}>
                    {dept.tags.map((tag, tIdx) => (
                      <span key={tIdx} className={styles.deptTag}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 5: OUR RECENT TRIPS (Dark Section #0B1220)
          ======================================================== */}
      <section className={styles.recentTripsSection}>
        <div className={styles.container}>
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
            {recentTrips.map((trip, idx) => (
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

      {/* ========================================================
          SECTION 6: WHAT OUR TRAVELER SAYS (Dark Section #0B1220)
          ======================================================== */}
      <section className={styles.reviewsSection}>
        <div className={styles.container}>
          <ScrollReveal animation="fade-up">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>Verified Experiences</span>
              <h2 className={styles.sectionTitle}>What Our Travelers Say</h2>
              <p className={styles.sectionSubtitle}>
                Genuine words from travelers who explored the breathtaking landscapes of Pakistan with our
                team.
              </p>
            </div>
          </ScrollReveal>

          <div className={styles.reviewsGrid}>
            {officialReviews.map((review, idx) => (
              <ScrollReveal key={review.id} animation="fade-up" delay={idx * 0.1}>
                <div className={styles.reviewCard}>
                  <div className={styles.reviewTop}>
                    <div className={styles.starCluster}>
                      {Array.from({ length: review.rating }).map((_, sIdx) => (
                        <IconStar key={sIdx} size={16} fill="#f59e0b" color="#f59e0b" />
                      ))}
                    </div>
                    <span className={styles.tripTag}>{review.trip}</span>
                  </div>
                  <p className={styles.reviewQuote}>"{review.comment}"</p>
                  <div className={styles.reviewAuthorMeta}>
                    <div className={styles.authorInfo}>
                      <div className={styles.reviewAvatar}>
                        <Image
                          src={review.avatar}
                          alt={review.author}
                          fill
                          sizes="48px"
                          className={styles.avatarImg}
                        />
                      </div>
                      <div className={styles.authorDetails}>
                        <span className={styles.authorName}>{review.author}</span>
                        <span className={styles.authorRole}>{review.role}</span>
                      </div>
                    </div>
                    <span className={styles.verifiedPill}>
                      <IconCheck size={13} color="#22c55e" />
                      <span>Verified</span>
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className={styles.centerAction}>
            <Link href="/gallery/reviews" className={styles.viewAllGalleryBtn}>
              <span>Read More Reviews ({reviewsData.length}+ Reviews)</span>
              <IconArrowRight size={16} />
            </Link>
          </div>

          {/* Bottom Callout & Official Contact (Dark Card with Emerald Accents) */}
          <ScrollReveal animation="fade-up">
            <div className={styles.ctaCard}>
              <div className={styles.ctaContent}>
                <h3>Ready to Explore Pakistan with Us?</h3>
                <p>
                  Whether you're planning a northern group tour, a private family getaway, or an exclusive
                  honeymoon trip, our team at Musafir Pakistan is ready to assist you.
                </p>
              </div>
              <div className={styles.ctaButtons}>
                <Link href="/custom-trip" className={styles.ctaPrimaryBtn}>
                  <IconSparkles size={16} />
                  <span>Plan Custom Trip</span>
                </Link>
                <a
                  href="https://wa.me/923366832018?text=Hello%20Musafir%20Pakistan!%20I%20would%20like%20to%20inquire%20about%20your%20upcoming%20tours."
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaSecondaryBtn}
                >
                  <IconWhatsApp size={16} />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Office location details */}
            <div className={styles.officeCard}>
              <div className={styles.officeInfoCol}>
                <IconBuilding size={18} color="#22c55e" />
                <span>
                  <strong>Head Office:</strong> Suit # G-40, Ground Floor, Falaknaz Tower, Opp. Airport,
                  Sharah-E-Faisal, Karachi
                </span>
              </div>
              <div className={styles.officeInfoCol}>
                <IconPhone size={18} color="#22c55e" />
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  <a href="tel:+923366832018" style={{ whiteSpace: "nowrap" }}>+92-336-683-2018</a>
                  <span>/</span>
                  <a href="tel:02134684011" style={{ whiteSpace: "nowrap" }}>021-34684011</a>
                </div>
              </div>
              <div className={styles.officeInfoCol}>
                <IconMail size={18} color="#22c55e" />
                <a href="mailto:hello@musafirpakistan.com" style={{ wordBreak: "break-all" }}>hello@musafirpakistan.com</a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Mountain Ridge Transition Divider to Footer */}
        <div className={styles.footerMountainDivider} aria-hidden="true">
          <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
            <path
              d="M0 120L60 95L160 110L280 60L420 100L560 40L720 85L880 30L1040 75L1200 45L1340 85L1440 60V120H0Z"
              fill="#080e1a"
              opacity="0.6"
            />
            <path
              d="M0 120L80 105L200 70L340 110L480 55L640 95L800 50L960 90L1120 40L1260 80L1380 55L1440 80V120H0Z"
              fill="#060b14"
            />
          </svg>
        </div>
      </section>
    </main>
  );
}
