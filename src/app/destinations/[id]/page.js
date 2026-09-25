import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./DestinationDetails.module.css";
import destinations from "@/data/destinations.json";
import packagesData from "@/data/packages.json";
import { getAttractionsForDestination } from "@/data/destinationAttractions";
import {
  IconMapPin,
  IconSun,
  IconClock,
  IconStar,
  IconShield,
  IconCheck,
  IconWhatsApp,
  IconArrowRight,
  IconCompass,
  IconSparkles,
  IconCar
} from "@/components/Icons";
import ScrollReveal from "@/components/ScrollReveal";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dest = destinations.find((d) => d.id === id);
  if (!dest) return {};

  return {
    title: `${dest.name} Travel Guide & Tour Packages | Musafir Pakistan`,
    description: `${dest.tagline}. Comprehensive travel guide, top attractions, seasonal road status, and verified tour departures to ${dest.name}.`,
    alternates: {
      canonical: `/destinations/${id}`
    },
    openGraph: {
      title: `${dest.name} Travel Guide | Musafir Pakistan`,
      description: dest.description,
      url: `/destinations/${id}`,
      images: [{ url: dest.image, width: 1200, height: 630, alt: `${dest.name} Travel Guide` }]
    }
  };
}

export function generateStaticParams() {
  return destinations.map((dest) => ({
    id: dest.id
  }));
}

export default async function DestinationDetailPage({ params }) {
  const { id } = await params;
  const dest = destinations.find((d) => d.id === id);

  if (!dest) {
    notFound();
  }

  const attractions = getAttractionsForDestination(dest.id);

  // Match related tours from packages.json
  const destQuery = (dest.id + " " + dest.name).toLowerCase();
  let keywords = [];
  if (destQuery.includes("hunza")) keywords = ["hunza"];
  else if (destQuery.includes("skardu")) keywords = ["skardu"];
  else if (destQuery.includes("swat")) keywords = ["swat", "kalam"];
  else if (destQuery.includes("naran")) keywords = ["naran", "babusar", "kaghan"];
  else if (destQuery.includes("kashmir") || destQuery.includes("neelum")) keywords = ["kashmir", "neelum", "arang", "taobut"];
  else if (destQuery.includes("kumrat")) keywords = ["kumrat"];
  else if (destQuery.includes("shogran")) keywords = ["shogran", "siri"];

  const relatedTours = packagesData.filter((pkg) => {
    const text = (pkg.id + " " + pkg.title + " " + (pkg.attractions?.join(" ") || "")).toLowerCase();
    return keywords.some((kw) => text.includes(kw));
  });

  const displayTours = relatedTours.length > 0 ? relatedTours : packagesData.slice(0, 3);

  const customWaMsg = encodeURIComponent(
    `Hello Musafir Pakistan! I would like to plan a custom tour to "${dest.name}". Please provide available options.`
  );
  const customWaUrl = `https://wa.me/923366832018?text=${customWaMsg}`;

  return (
    <main className={styles.pageContainer}>
      {/* Cinematic Hero Showcase */}
      <ScrollReveal direction="left">
        <section className={styles.heroSection}>
          <div className={styles.heroImageWrap}>
            <Image
              src={dest.image}
              alt={dest.name}
              fill
              style={{ objectFit: "cover" }}
              priority
              sizes="100vw"
            />
            <div className={styles.heroOverlay} />
          </div>

          <div className={styles.heroContent}>
            {/* Breadcrumbs */}
            <div className={styles.breadcrumbs}>
              <Link href="/">Home</Link> <span>/</span>
              <Link href="/destinations">Destinations</Link> <span>/</span>
              <span className={styles.currentCrumb}>{dest.name}</span>
            </div>

            <div className={styles.badgeRow}>
              <span className={styles.regionBadge}>{dest.region}</span>
              <span className={styles.seasonBadge}>
                <IconSun size={13} color="#facc15" />
                <span>Best Season: {dest.bestSeason}</span>
              </span>
              <span className={styles.verifiedBadge}>
                <IconShield size={13} color="#86efac" />
                <span>Verified Expedition Route</span>
              </span>
            </div>

            <h1 className={styles.heroTitle}>{dest.name}</h1>
            <p className={styles.heroTagline}>{dest.tagline}</p>

            {/* Quick Metrics Bar */}
            <div className={styles.heroStatsBar}>
              <div className={styles.heroStatItem}>
                <span className={styles.statLabel}>Regional Territory</span>
                <span className={styles.statValue}>{dest.region}</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.heroStatItem}>
                <span className={styles.statLabel}>Best Time to Visit</span>
                <span className={styles.statValue}>{dest.bestSeason}</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.heroStatItem}>
                <span className={styles.statLabel}>Must-Visit Landmarks</span>
                <span className={styles.statValue}>
                  {attractions.length > 0 ? `${attractions.length} Curated Sights` : `${dest.highlights.length} Highlights`}
                </span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.heroStatItem}>
                <span className={styles.statLabel}>Starting Tour Rate</span>
                <span className={styles.statValuePrice}>PKR {dest.startingPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <div className={styles.mainContent}>
        {/* Destination Overview Block */}
        <ScrollReveal direction="right">
          <section className={styles.overviewSection}>
            <div className={styles.overviewHeader}>
              <span className={styles.sectionBadge}>
                <IconCompass size={14} color="var(--primary-color)" />
                <span>Destination Overview</span>
              </span>
              <h2 className={styles.sectionHeading}>About {dest.name}</h2>
              <p className={styles.overviewText}>{dest.description}</p>
            </div>

            <div className={styles.highlightsBox}>
              <h3 className={styles.highlightsTitle}>Key Regional Highlights</h3>
              <div className={styles.highlightsGrid}>
                {dest.highlights.map((highlight, idx) => (
                  <div key={idx} className={styles.highlightChip}>
                    <IconCheck size={14} color="#15803d" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* In-Depth Attractions & Landmarks Showcase */}
        {attractions.length > 0 && (
          <ScrollReveal direction="left">
            <section className={styles.attractionsSection}>
              <div className={styles.sectionHeaderCentered}>
                <span className={styles.sectionBadge}>
                  <IconSparkles size={14} color="var(--primary-color)" />
                  <span>Must-Visit Places</span>
                </span>
                <h2 className={styles.sectionHeading}>
                  Top Attractions & Landmarks in {dest.name}
                </h2>
                <p className={styles.sectionSubheading}>
                  Detailed historical background, altitude data, photography insights, and essential experiences curated by our local mountain guides.
                </p>
              </div>

              <div className={styles.attractionArticles}>
                {attractions.map((place, index) => (
                  <article key={place.id} className={styles.attractionArticle}>
                    <div className={styles.articleHeadingBlock}>
                      <div className={styles.articleTitleRow}>
                        <h3 className={styles.articleTitle}>
                          <span className={styles.articleNumber}>{index + 1}.</span> {place.name}
                        </h3>
                        {place.badge && (
                          <span className={styles.articleBadge}>{place.badge}</span>
                        )}
                      </div>

                      <div className={styles.articleMetaLine}>
                        {place.altitude && (
                          <span className={styles.articleMetaItem}>
                            <strong>Elevation:</strong> {place.altitude}
                          </span>
                        )}
                        {place.altitude && place.region && <span className={styles.articleMetaDot}>•</span>}
                        {place.region && (
                          <span className={styles.articleMetaItem}>
                            <strong>Location:</strong> {place.region}
                          </span>
                        )}
                        {place.highlight && (
                          <>
                            <span className={styles.articleMetaDot}>•</span>
                            <span className={styles.articleMetaItem}>
                              <strong>Highlights:</strong> {place.highlight}
                            </span>
                          </>
                        )}
                      </div>

                      {place.tagline && (
                        <p className={styles.articleTagline}>{place.tagline}</p>
                      )}
                    </div>

                    <div className={styles.articleParagraphs}>
                      <p className={styles.articleDescriptionPara}>
                        {place.description}
                      </p>

                      {(place.experience || place.photoTip) && (
                        <div className={styles.articleHighlightsBox}>
                          {place.experience && (
                            <p className={styles.articleInsightPara}>
                              <strong className={styles.insightLabel}>💡 Must Experience: </strong>
                              {place.experience}
                            </p>
                          )}
                          {place.photoTip && (
                            <p className={styles.articleInsightPara}>
                              <strong className={styles.insightLabel}>📸 Photography Tip: </strong>
                              {place.photoTip}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* Related Tours Section at Bottom */}
        <ScrollReveal direction="right">
          <section className={styles.relatedToursSection}>
            <div className={styles.sectionHeaderCentered}>
              <span className={styles.sectionBadge}>
                <IconCar size={14} color="var(--primary-color)" />
                <span>Verified Expeditions</span>
              </span>
              <h2 className={styles.sectionHeading}>
                Tour Packages Visiting {dest.name}
              </h2>
              <p className={styles.sectionSubheading}>
                Choose from scheduled weekly group departures or private customized family itineraries with executive transport and pre-screened hotels.
              </p>
            </div>

            <div className={styles.toursGrid}>
              {displayTours.map((tour) => {
                const tourWaMsg = encodeURIComponent(
                  `Hello Musafir Pakistan! I am interested in the "${tour.title}" package to ${dest.name}.`
                );
                const tourWaUrl = `https://wa.me/923366832018?text=${tourWaMsg}`;

                return (
                  <div key={tour.id} className={styles.tourCard}>
                    <Link href={`/tours/${tour.id}`} className={styles.tourImageLink}>
                      <Image
                        src={tour.poster || tour.image}
                        alt={tour.title}
                        fill
                        style={{ objectFit: "cover" }}
                        className={styles.tourImg}
                      />
                      <span className={styles.tourTypeBadge}>{tour.type}</span>
                      <span className={styles.tourDurationBadge}>
                        <IconClock size={12} />
                        <span>{tour.duration.days}D / {tour.duration.nights}N</span>
                      </span>
                    </Link>

                    <div className={styles.tourBody}>
                      <Link href={`/tours/${tour.id}`} style={{ textDecoration: "none" }}>
                        <h3 className={styles.tourTitle}>{tour.title}</h3>
                      </Link>
                      <p className={styles.tourTagline}>{tour.tagline}</p>

                      {tour.attractions && tour.attractions.length > 0 && (
                        <div className={styles.tourHighlightsRow}>
                          {tour.attractions.slice(0, 3).map((a, i) => (
                            <span key={i} className={styles.tourHighlightChip}>
                              <IconMapPin size={11} color="#15803d" />
                              <span>{a}</span>
                            </span>
                          ))}
                        </div>
                      )}

                      <div className={styles.tourFooter}>
                        <div className={styles.tourPriceBlock}>
                          <span className={styles.tourPriceLabel}>Starting Fare</span>
                          <span className={styles.tourPriceVal}>
                            {(tour.type || "").toLowerCase().includes("private") ? (
                              <>
                                PKR {tour.pricing.couple.toLocaleString()}
                                <small> / couple</small>
                              </>
                            ) : (
                              <>
                                PKR {tour.pricing.solo.toLocaleString()}
                                <small> / person</small>
                              </>
                            )}
                          </span>
                        </div>

                        <div className={styles.tourActionBtns}>
                          <Link href={`/tours/${tour.id}`} className={styles.viewTourBtn}>
                            <span>View Details</span>
                            <IconArrowRight size={13} />
                          </Link>
                          <a
                            href={tourWaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.bookTourBtn}
                            aria-label="Book via WhatsApp"
                          >
                            <IconWhatsApp size={15} />
                            <span>Inquire</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </ScrollReveal>

        {/* Custom Itinerary / Private Transport CTA */}
        <section className={styles.customCtaCard}>
          <div className={styles.customCtaContent}>
            <h3>Want a Private or Tailored Itinerary to {dest.name}?</h3>
            <p>
              We organize dedicated 4x4 Prado, Grand Cabin, or luxury coaster convoys with pre-screened mountain hotels, certified regional tour coordinators, and personalized route plans tailored to your dates.
            </p>
            <div className={styles.customCtaButtons}>
              <a
                href={customWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaWaBtn}
              >
                <IconWhatsApp size={18} />
                <span>Contact on WhatsApp</span>
              </a>
              <Link href="/custom-trip" className={styles.ctaCustomBtn}>
                <span>Plan Custom Trip</span>
                <IconArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
