import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./TourDetails.module.css";
import packagesData from "@/data/packages.json";
import policies from "@/data/policies.json";
import connectToDatabase from "@/lib/db";
import Package from "@/lib/models/Package";
import { getFunFactsForPackage } from "../../../data/funFacts";
import TourAccordionSections from "./TourAccordionSections";
import TourBookingCard from "./TourBookingCard";
import DownloadPdfButton from "./DownloadPdfButton";
import {
  IconMapPin,
  IconClock,
  IconCalendar,
  IconCheck,
  IconCross,
  IconShield,
  IconCar,
  IconPhone,
  IconWhatsApp,
  IconUtensils,
  IconSparkles,
  IconLuggage,
  IconFileText,
  IconCreditCard,
  IconUsers,
  IconCompass,
  IconArrowRight
} from "../../../components/Icons";
import ScrollReveal from "../../../components/ScrollReveal";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const pkg = packagesData.find((p) => p.id === id);
  if (!pkg) return {};

  const destinations = pkg.attractions ? pkg.attractions.slice(0, 3).join(", ") : pkg.title;

  return {
    title: `${pkg.title} — ${pkg.duration.days} Days / ${pkg.duration.nights} Nights Tour Package`,
    description: `${pkg.tagline}. ${pkg.duration.days}-day ${pkg.type} from PKR ${pkg.pricing.solo.toLocaleString()}/person. Destinations: ${destinations}. Verified hotels, meals & transport included.`,
    alternates: {
      canonical: `/tours/${id}`
    },
    openGraph: {
      title: `${pkg.title} | Musafir Pakistan`,
      description: `${pkg.tagline}. Starting from PKR ${pkg.pricing.solo.toLocaleString()}/person.`,
      url: `/tours/${id}`,
      images: [{ url: pkg.poster || pkg.image, width: 1200, height: 630, alt: `${pkg.title} tour package` }]
    }
  };
}

function TourJsonLd({ pkg }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.title,
    description: pkg.tagline,
    touristType: pkg.type,
    itinerary: {
      "@type": "ItemList",
      numberOfItems: pkg.routePlan?.length || pkg.duration?.days || 0,
      itemListElement: (pkg.routePlan || []).map((day, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: day.title,
        description: day.description
      }))
    },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: pkg.pricing.solo,
      highPrice: pkg.pricing.couple,
      priceCurrency: "PKR",
      availability: "https://schema.org/InStock"
    },
    provider: {
      "@type": "TravelAgency",
      name: "Musafir Pakistan Tours & Travels",
      url: "https://musafirpakistan.com"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function TourDetailPage({ params }) {
  const { id } = await params;
  
  let pkgData = null;
  try {
    await connectToDatabase();
    pkgData = await Package.findOne({ id }).lean();
  } catch (err) {
    console.warn("MongoDB fetch warning in TourDetailPage:", err.message);
  }

  if (!pkgData) {
    pkgData = packagesData.find((p) => p.id === id);
  }

  if (!pkgData) {
    notFound();
  }

  // Parse JSON data objects because Mongoose lean() returns MongoDB objects which might cause serialization issues,
  // or we can just stringify and parse.
  const pkg = JSON.parse(JSON.stringify(pkgData));

  if (!pkg) {
    notFound();
  }

  const funFacts = (getFunFactsForPackage(pkg) || []).slice(0, 3);
  const relatedTours = packagesData.filter((p) => p.id !== id).slice(0, 3);

  const whatsappMessage = encodeURIComponent(
    `Hello Musafir Pakistan! I would like to inquire/book the "${pkg.title}" (${pkg.duration.days} Days / ${pkg.duration.nights} Nights) package.`
  );
  const whatsappUrl = `https://wa.me/923366832018?text=${whatsappMessage}`;

  return (
    <>
      <TourJsonLd pkg={pkg} />
      <main className={styles.detailContainer}>
      <div id="pdf-content-wrapper">
      {/* Redesigned Rich Tour Hero Showcase */}
      <ScrollReveal direction="left">
        <section className={styles.heroSection}>
          <div className={styles.heroImageContainer}>
            <Image
              src={pkg.image}
              alt={pkg.title}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
            <div className={styles.heroOverlay} />
          </div>

          <div className={styles.heroContent}>
            <div className={styles.heroSplit}>
              {/* Left Column: Essential Trip Information */}
              <div className={styles.heroLeft}>
                <div className={styles.breadcrumbs}>
                  <Link href="/">Home</Link> <span>/</span>
                  <Link href="/tours/group">Tours</Link> <span>/</span>
                  <span className={styles.currentCrumb}>{pkg.title}</span>
                </div>

                <div className={styles.badgeRow}>
                  <span className={styles.categoryBadge}>{pkg.type}</span>
                  <span className={styles.durationBadge}>
                    <IconClock size={14} />
                    <span>{pkg.duration.days} Days / {pkg.duration.nights} Nights</span>
                  </span>
                  <span className={styles.verifiedBadge}>
                    <IconShield size={14} />
                    <span>Verified Tour Operator</span>
                  </span>
                  <DownloadPdfButton pkg={pkg} policies={policies} />
                </div>

                <h1 className={styles.tourTitle}>{pkg.title}</h1>
                <p className={styles.tourTagline}>{pkg.tagline}</p>

                {/* Fast Highlights Badges */}
                <div className={styles.heroPillGrid}>
                  <div className={styles.heroPill}>
                    <IconCalendar size={15} color="#4ade80" />
                    <span>{pkg.departure}</span>
                  </div>
                  <div className={styles.heroPill}>
                    <IconCalendar size={15} color="#4ade80" />
                    <span>Every Tuesday & Friday From Islamabad</span>
                  </div>

                </div>

                {/* Price & Immediate Booking Trigger */}
                <div className={styles.heroPricingBar}>
                  <div className={styles.heroPriceBlock}>
                    <span className={styles.heroPriceLabel}>Solo / Per Person</span>
                    <span className={styles.heroPriceVal}>PKR {pkg.pricing.solo.toLocaleString()}</span>
                  </div>
                  <div className={styles.heroPriceDivider} />
                  <div className={styles.heroPriceBlock}>
                    <span className={styles.heroPriceLabel}>Couple Package</span>
                    <span className={styles.heroPriceVal}>PKR {pkg.pricing.couple.toLocaleString()}</span>
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.heroBookBtn}
                  >
                    <IconWhatsApp size={18} />
                    <span>Quick WhatsApp Booking</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Promotional Artwork / Poster Card */}
              <div className={styles.heroRight}>
                <div className={styles.heroPosterCard}>
                  <div className={styles.heroPosterImg}>
                    <Image
                      src={pkg.poster || pkg.image}
                      alt={`${pkg.title} Official Itinerary`}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, 360px"
                      priority
                    />
                    <div className={styles.posterBadgeOverlay}>
                      <span>Official Package Flyer</span>
                    </div>
                  </div>
                  <div className={styles.heroPosterFooter}>
                    <span className={styles.heroPosterHint}>Verified Departures & Transparent Inclusions</span>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.posterChatBtn}
                    >
                      <IconSparkles size={14} />
                      <span>Inquire Package Details</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Main Content Layout */}
      <ScrollReveal direction="right">
        <div className={styles.contentGrid}>
          {/* Left Detailed Information Column */}
          <div className={styles.mainInfo}>
            {/* Quick Attraction Chips */}
            {pkg.attractions && pkg.attractions.length > 0 && (
              <div className={styles.attractionChipsBlock}>
                <div className={styles.attractionChipsHeader}>
                  <IconMapPin size={16} color="var(--primary-color)" />
                  <span>Key Places & Highlights Covered:</span>
                </div>
                <div className={styles.attractionChips}>
                  {pkg.attractions.map((attraction, i) => (
                    <span key={i} className={styles.attractionChip}>
                      <IconCheck size={12} color="#15803d" />
                      <span>{attraction}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Did You Know? Fun Facts Card */}
            {funFacts && funFacts.length > 0 && (
              <section className={styles.funFactsCard}>
                <div className={styles.funFactsHeader}>
                  <div className={styles.funFactsIconWrap}>?</div>
                  <h3 className={styles.funFactsTitle}>Did you know?</h3>
                </div>

                <ul className={styles.funFactsList}>
                  {funFacts.map((fact, idx) => (
                    <li key={idx} className={styles.funFactItem}>
                      <div className={styles.funFactBullet}></div>
                      <p className={styles.funFactDesc}>{fact.description || fact}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Collapsible Logistics Accordions (All details in dropdowns to avoid confusion) */}
            <TourAccordionSections pkg={pkg} policies={policies} />
          </div>

          {/* Right Sticky Booking Box */}
          <aside className={styles.sidebar}>
            <TourBookingCard pkg={pkg} whatsappUrl={whatsappUrl} />
          </aside>
        </div>
      </ScrollReveal>
      </div>

      {/* Recommended / Related Tours */}
      {relatedTours.length > 0 && (
        <ScrollReveal direction="left">
          <section className={styles.relatedSection}>
            <div className={styles.relatedHeader}>
              <h2>Explore Other Packages</h2>
              <p>Discover more adventures across Pakistan</p>
            </div>
            <div className={styles.relatedGrid}>
              {relatedTours.map((t) => (
                <Link key={t.id} href={`/tours/${t.id}`} className={styles.relatedCard}>
                  <div className={styles.relatedImageWrapper}>
                    <Image
                      src={t.poster || t.image}
                      alt={t.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <div className={styles.relatedBadge}>{t.type}</div>
                  </div>
                  <div className={styles.relatedInfo}>
                    <h3>{t.title}</h3>
                    <p>{t.duration.days} Days • From PKR {t.pricing.solo.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </ScrollReveal>
      )}
    </main>
    </>
  );
}
