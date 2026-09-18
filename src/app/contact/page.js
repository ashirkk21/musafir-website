"use client";

import { useState } from "react";
import styles from "./Contact.module.css";
import {
  IconPhone,
  IconMail,
  IconWhatsApp,
  IconBuilding,
  IconMapPin,
  IconArrowRight
} from "../../components/Icons";
import ScrollReveal from "../../components/ScrollReveal";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hello Musafir Pakistan! My name is ${name} (Phone: ${phone}).\nMessage: ${message}`
    );
    window.open(`https://wa.me/923366832018?text=${text}`, "_blank");
  };

  return (
    <main className={styles.pageContainer}>
      {/* Hero Header */}
      <ScrollReveal direction="left">
        <section className={styles.heroHeader}>
          <span className={styles.badge}>Get in Touch</span>
          <h1 className={styles.heroTitle}>Contact Musafir Pakistan</h1>
          <p className={styles.heroSubtitle}>
            Inquiries regarding scheduled group departures, private family itineraries, or corporate retreats.
            Our operations offices in Karachi and Islamabad are available round the clock.
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal direction="right">
        <div className={styles.mainContent}>
          {/* Top Section: Helpline & Form */}
          <div className={styles.contactGrid} style={{ marginBottom: "5rem" }}>
            {/* Direct Contacts Column */}
            <div className={styles.directContacts} style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h3>
                <IconPhone size={24} color="var(--primary-color)" />
                <span style={{ fontSize: "1.4rem" }}>Helpline & Desk Support</span>
              </h3>
              <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
                Our representatives are available for direct calls and WhatsApp chat for fast responses.
              </p>
              
              <div className={styles.contactRow} style={{ marginBottom: "1.5rem" }}>
                <strong>Direct Call / WhatsApp:</strong>
                <a href="https://wa.me/923366832018" target="_blank" rel="noopener noreferrer" style={{ fontSize: "1.1rem" }}>
                  +92-336-683-2018
                </a>
              </div>
              <div className={styles.contactRow} style={{ marginBottom: "1.5rem" }}>
                <strong>Email Address:</strong>
                <a href="mailto:info@musafirpakistan.com" style={{ fontSize: "1.1rem" }}>info@musafirpakistan.com</a>
              </div>
              <div className={styles.contactRow}>
                <strong>Official Web:</strong>
                <span style={{ fontSize: "1.1rem" }}>www.musafirpakistan.com</span>
              </div>
            </div>



            {/* Message Form Column */}
            <div className={styles.formCard} style={{ height: "100%" }}>
              <h3 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>Send Us a Message</h3>
              <p>Fill in your query details to initiate real-time itinerary discussion with our tour coordinator.</p>

              <form onSubmit={handleSend}>
                <div className={styles.inputGroup}>
                  <label>Your Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Asad Ali"
                    className={styles.inputField}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>Phone / WhatsApp Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0333 1234567"
                    className={styles.inputField}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>Your Inquiry / Route Requirements</label>
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your destination, group size, and tentative travel dates..."
                    className={styles.inputField}
                    required
                  />
                </div>

                <button type="submit" className={styles.submitBtn}>
                  <IconWhatsApp size={20} />
                  <span>Connect via WhatsApp Desk</span>
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Section: Regional Offices */}
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "900", color: "var(--secondary-color)" }}>Visit Our Regional Offices</h2>
            <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>Walk-in customer support, tour planning, and payment processing.</p>
          </div>

          <div className={styles.contactGrid}>
            {/* Karachi Head Office */}
            <div className={styles.officeCard}>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <div style={{ flexShrink: 0, display: "flex", alignItems: "center", marginTop: "2px" }}>
                  <IconBuilding size={24} color="var(--secondary-color)" />
                </div>
                <span>Karachi Head Office</span>
              </h3>
              <p style={{ minHeight: "50px" }}>
                Office # M-7, Mezzanine Floor, Falaknaz Heights, Shahrah-e-Faisal, Near Airport Road, Karachi, Pakistan.
              </p>
              <div style={{ width: "100%", height: "250px", borderRadius: "16px", overflow: "hidden", margin: "1.5rem 0" }}>
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight="0" 
                  marginWidth="0" 
                  src="https://www.google.com/maps?q=Falaknaz+Heights,+Shahrah-e-Faisal,+Karachi&output=embed"
                  title="Karachi Head Office Map"
                ></iframe>
              </div>
              <a
                href="https://maps.app.goo.gl/mivsPu4eiUD7EUqt7"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapBtn}
                style={{ width: "100%", justifyContent: "center", padding: "1rem" }}
              >
                <IconMapPin size={18} />
                <span>Get Directions to Karachi Office</span>
                <IconArrowRight size={16} />
              </a>
            </div>

            {/* Islamabad Regional Office */}
            <div className={styles.officeCard}>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <div style={{ flexShrink: 0, display: "flex", alignItems: "center", marginTop: "2px" }}>
                  <IconBuilding size={24} color="var(--secondary-color)" />
                </div>
                <span>Islamabad Regional Office</span>
              </h3>
              <p style={{ minHeight: "50px" }}>
                Abrar Plaza, Plot# 09, Near PSO Pump, IJP Road, New Katarian Satellite Town, Islamabad.
              </p>
              <div style={{ width: "100%", height: "250px", borderRadius: "16px", overflow: "hidden", margin: "1.5rem 0" }}>
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight="0" 
                  marginWidth="0" 
                  src="https://www.google.com/maps?q=Abrar+Plaza,+IJP+Road,+Islamabad&output=embed"
                  title="Islamabad Regional Office Map"
                ></iframe>
              </div>
              <a
                href="https://maps.app.goo.gl/szN9kBiiwfZ6CcRRA"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapBtn}
                style={{ width: "100%", justifyContent: "center", padding: "1rem" }}
              >
                <IconMapPin size={18} />
                <span>Get Directions to Islamabad Office</span>
                <IconArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </main>
  );
}