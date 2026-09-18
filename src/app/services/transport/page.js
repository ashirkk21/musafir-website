import Image from "next/image";
import styles from "./Transport.module.css";
import transports from "../../../data/transports.json";
import policies from "../../../data/policies.json";
import {
  IconUsers,
  IconLuggage,
  IconMapPin,
  IconCheck,
  IconCar,
  IconArrowRight
} from "../../../components/Icons";
import ScrollReveal from "../../../components/ScrollReveal";

export default function TransportPage() {
  return (
    <main className={styles.pageContainer}>
      {/* Hero Header */}
      <ScrollReveal direction="left">
        <section className={styles.heroHeader}>
          <span className={styles.badge}>Commercial Fleet Rental</span>
          <h1 className={styles.heroTitle}>Rent Mountain Transport</h1>
          <p className={styles.heroSubtitle}>
            Reliable northern travel with our maintained private fleet and certified mountain drivers.
            Available for Islamabad pickups, Swat, Naran, Hunza, and Skardu routes.
          </p>
        </section>
      </ScrollReveal>

      {/* Fleet Grid */}
      <ScrollReveal direction="right">
        <div className={styles.mainContent}>
          <div className={styles.fleetGrid}>
            {transports.map((vehicle) => {
              const waMsg = encodeURIComponent(
                `Hello Musafir Pakistan! I would like to rent the "${vehicle.name}" (${vehicle.category}). Please share availability and route quotation.`
              );
              const waUrl = `https://wa.me/923366832018?text=${waMsg}`;

              return (
                <div key={vehicle.id} className={styles.vehicleCard}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={vehicle.image}
                      alt={vehicle.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <span className={styles.categoryBadge}>{vehicle.category}</span>
                  </div>

                  <div className={styles.cardBody}>
                    <h2 className={styles.vehicleName}>{vehicle.name}</h2>

                    <div className={styles.capacityRow}>
                      <span>
                        <IconUsers size={15} color="#4b5563" />
                        {vehicle.capacity}
                      </span>
                      <span>
                        <IconLuggage size={15} color="#4b5563" />
                        {vehicle.luggage}
                      </span>
                    </div>



                    <ul className={styles.featuresList}>
                      {vehicle.features.map((feat, idx) => (
                        <li key={idx}>
                          <span className={styles.featureIcon}>
                            <IconCheck size={14} color="#15803d" />
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <div className={styles.cardFooter}>
                      <div className={styles.priceCol}>
                        <span className={styles.priceLabel}>Estimated Rate</span>
                        <span className={styles.priceVal}>{vehicle.ratePerDay}</span>
                      </div>

                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.rentBtn}
                      >
                        <span>Book Vehicle</span>
                        <IconArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Official Musafir Transport Policy */}
          <section className={styles.policyCard}>
            <h3 style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" }}>
              <IconCar size={24} color="var(--primary-color)" />
              <span>Musafir Fleet Operating Terms & Guidelines</span>
            </h3>
            <ul className={styles.featuresList} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', padding: 0 }}>
              {policies.transportPolicy.map((rule, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '1rem', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', border: '1px solid #e2ece5' }}>
                  <span className={styles.featureIcon} style={{ flexShrink: 0, marginTop: '2px' }}>
                    <IconCheck size={16} color="#15803d" />
                  </span>
                  <span style={{ fontSize: '0.95rem', color: '#374151', lineHeight: '1.5' }}>{rule}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </ScrollReveal>
    </main>
  );
}