"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./TourDetails.module.css";
import {
  IconWhatsApp,
  IconShield,
  IconCar,
  IconPhone,
  IconCheck,
  IconSparkles
} from "../../../components/Icons";

function IconCopy({ size = 15, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="13" height="13" x="9" y="9" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

// 1. Bank Alfalah Official Swirl Ribbon Emblem
function BankAlfalahLogo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <defs>
        <clipPath id="baClip1">
          <path d="m0 595.7l284.88-588.13c4.36-9.06 16.84-10.24 22.8-2.1l274.72 372.6c66.53 90.23 2.22 217.84-109.85 217.98-44.61 0.07-86.4-21.59-112.02-58.08l-47.72-67.95c-16.26-23.06-47.47-29.86-71.83-15.57z" />
        </clipPath>
        <linearGradient id="baGrad1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ee2722" />
          <stop offset="100%" stopColor="#9c1815" />
        </linearGradient>
        <clipPath id="baClip2">
          <path d="m582.44 378.07l-274.76-372.6c-5.96-8.14-18.44-6.96-22.8 2.1l-284.88 588.13 354.73-208.09c24.36-14.27 60.07-7.48 76.32 15.59l47.72 67.89c25.66 36.5 66.36 58.17 110.98 58.12h0.08q-0.01 0 0.04 0c26.34-44.38 28.02-103.04-7.43-151.14z" />
        </clipPath>
        <linearGradient id="baGrad2" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9c1815" />
          <stop offset="40%" stopColor="#ee2722" />
          <stop offset="100%" stopColor="#ee2722" />
        </linearGradient>
      </defs>
      <g clipPath="url(#baClip1)">
        <path fill="url(#baGrad1)" d="m0 595.7l284.9-588.1c4.3-9.1 16.8-10.3 22.8-2.1l274.7 372.6c66.5 90.2 2.2 217.8-109.8 218-44.7 0-86.4-21.6-112.1-58.1l-47.7-68c-16.2-23-47.5-29.8-71.8-15.6z" />
      </g>
      <g clipPath="url(#baClip2)">
        <path fill="url(#baGrad2)" d="m582.4 378.1l-274.7-372.6c-6-8.2-18.5-7-22.8 2.1l-284.9 588.1 354.7-208.1c24.4-14.3 60.1-7.5 76.4 15.6l47.7 67.9c25.6 36.5 66.3 58.2 110.9 58.1h0.1q0 0 0.1 0c26.3-44.4 28-103-7.5-151.1z" />
      </g>
    </svg>
  );
}

// 2. JazzCash Official Emblem
function JazzCashLogo({ size = 28 }) {
  return (
    <Image src="/images/payment/jazzcash.png" alt="JazzCash" width={size} height={size} style={{ objectFit: 'contain' }} />
  );
}

// 3. Easypaisa Official Emblem
function EasypaisaLogo({ size = 28 }) {
  return (
    <Image src="/images/payment/easypaisa.png" alt="Easypaisa" width={size} height={size} style={{ objectFit: 'contain' }} />
  );
}

// 4. NayaPay Official Emblem
function NayaPayLogo({ size = 28 }) {
  return (
    <Image src="/images/payment/nayapay.png" alt="NayaPay" width={size} height={size} style={{ objectFit: 'contain' }} />
  );
}

const PAYMENT_METHODS = [
  {
    id: "alfalah",
    shortName: "Bank Alfalah",
    fullName: "Bank Alfalah Limited",
    badge: "Official Bank Account",
    title: "MUSAFIR PAKISTAN",
    numberLabel: "Account Number",
    number: "0017-1008-670-633",
    branch: "Shahrah-e-Faisal / Airport Branch, Karachi (0017)",
    accentColor: "#dc2626",
    icon: <BankAlfalahLogo size={26} />,
    iconLarge: <BankAlfalahLogo size={36} />
  },
  {
    id: "jazzcash",
    shortName: "JazzCash",
    fullName: "JazzCash Mobile Account",
    badge: "Mobile Wallet",
    title: "ASHIR UMER KHAN",
    numberLabel: "Mobile Account #",
    number: "0315-2793707",
    branch: "JazzCash Digital Banking",
    accentColor: "#ea580c",
    icon: <JazzCashLogo size={26} />,
    iconLarge: <JazzCashLogo size={36} />
  },
  {
    id: "easypaisa",
    shortName: "Easypaisa",
    fullName: "Easypaisa Mobile Account",
    badge: "Digital Bank Account",
    title: "ASHIR UMER KHAN",
    numberLabel: "Mobile Account #",
    number: "0315-2793707",
    branch: "Telenor Microfinance Bank",
    accentColor: "#16a34a",
    icon: <EasypaisaLogo size={26} />,
    iconLarge: <EasypaisaLogo size={36} />
  },
  {
    id: "nayapay",
    shortName: "NayaPay",
    fullName: "NayaPay Digital Wallet",
    badge: "EMI Digital Account",
    title: "ASHIR UMER KHAN",
    numberLabel: "NayaPay ID / Mobile",
    number: "0315-2793707",
    branch: "NayaPay Electronic Money",
    accentColor: "#0d9488",
    icon: <NayaPayLogo size={26} />,
    iconLarge: <NayaPayLogo size={36} />
  }
];

export default function TourBookingCard({ pkg, whatsappUrl }) {
  const [activePaymentId, setActivePaymentId] = useState("alfalah");
  const [copied, setCopied] = useState(false);

  const selectedMethod =
    PAYMENT_METHODS.find((m) => m.id === activePaymentId) || PAYMENT_METHODS[0];

  const handleCopy = (text) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={styles.bookingCard}>
      {/* 1. Header: Price + Couple Rate + Moved Trust Badges */}
      <div className={styles.bookingCardHeader}>
        <div className={styles.priceLabel}>Starting Fare</div>
        {(pkg.type || "").toLowerCase().includes("private") ? (
          <div className={styles.priceValue}>
            PKR {pkg.pricing.couple.toLocaleString()}
            <span className={styles.priceSub}> / couple</span>
          </div>
        ) : (
          <>
            <div className={styles.priceValue}>
              PKR {pkg.pricing.solo.toLocaleString()}
              <span className={styles.priceSub}> / person</span>
            </div>
            <div className={styles.couplePrice}>
              Couple Rate: <strong>PKR {pkg.pricing.couple.toLocaleString()}</strong>
            </div>
          </>
        )}

        {/* Trust Badges moved under Couple Rate */}
        <div className={styles.headerTrustBadges}>
          <div className={styles.headerTrustItem}>
            <span className={styles.headerTrustIcon}>
              <IconShield size={16} color="var(--primary-color)" />
            </span>
            <span>Verified Hotel Accommodations</span>
          </div>
          <div className={styles.headerTrustItem}>
            <span className={styles.headerTrustIcon}>
              <IconCar size={16} color="var(--primary-color)" />
            </span>
            <span>Dedicated Mountain Fleet</span>
          </div>
          <div className={styles.headerTrustItem}>
            <span className={styles.headerTrustIcon}>
              <IconPhone size={16} color="var(--primary-color)" />
            </span>
            <span>24/7 Ground Coordinator</span>
          </div>
        </div>
      </div>

      {/* 2. Tour Specs Summary */}
      <div className={styles.bookingSummaryList}>
        <div className={styles.summaryRow}>
          <span>Duration</span>
          <strong>
            {pkg.duration.days} Days / {pkg.duration.nights} Nights
          </strong>
        </div>
        <div className={styles.summaryRow}>
          <span>Category</span>
          <strong>{pkg.type}</strong>
        </div>
        <div className={styles.summaryRow}>
          <span>Group Makeup</span>
          <strong>Families / Couples / Bachelors</strong>
        </div>
        <div className={styles.summaryRow}>
          <span>Departures</span>
          <strong>Karachi / Islamabad</strong>
        </div>
      </div>

      {/* 3. CTA & Payment Methods Selection (Replaced Request Custom Quotation) */}
      <div className={styles.bookingCtaWrapper}>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.primaryWhatsappBtn}
        >
          <IconWhatsApp size={20} />
          <span>Reserve via WhatsApp</span>
        </a>

        {/* Payment Methods Tabs */}
        <div className={styles.paymentSection}>
          <div className={styles.paymentSectionHeader}>
            <span className={styles.paymentSectionTitle}>Payment Methods</span>
            <span className={styles.paymentSectionSubtitle}>Click to view details</span>
          </div>

          <div className={styles.paymentTabsRow}>
            {PAYMENT_METHODS.map((method) => {
              const isActive = activePaymentId === method.id;
              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setActivePaymentId(method.id)}
                  className={`${styles.paymentTab} ${isActive ? styles.paymentTabActive : ""}`}
                  aria-pressed={isActive}
                >
                  <div className={styles.paymentTabIconWrap}>
                    {method.icon}
                  </div>
                  <span className={styles.paymentTabLabel}>{method.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Payment Details Box in the exact bottom spot where Trust Badges used to be */}
      <div className={styles.paymentDetailsContainer}>
        <div className={styles.activePaymentCard}>
          <div className={styles.paymentDetailHeader}>
            <div className={styles.paymentDetailBadgeWrap}>
              <span className={styles.paymentDetailBadge}>{selectedMethod.badge}</span>
              <h4 className={styles.paymentDetailName}>{selectedMethod.fullName}</h4>
            </div>
            <div className={styles.paymentDetailLogoWrap}>
              {selectedMethod.iconLarge}
            </div>
          </div>

          <div className={styles.paymentDetailBody}>
            <div className={styles.accountDataRow}>
              <span className={styles.accountDataLabel}>Account Title</span>
              <span className={styles.accountDataValueTitle}>{selectedMethod.title}</span>
            </div>

            <div className={styles.accountDataRow}>
              <span className={styles.accountDataLabel}>{selectedMethod.numberLabel}</span>
              <div className={styles.accountNumberActionRow}>
                <code className={styles.accountNumberText}>{selectedMethod.number}</code>
                <button
                  type="button"
                  onClick={() => handleCopy(selectedMethod.number)}
                  className={`${styles.accountCopyBtn} ${copied ? styles.accountCopyBtnSuccess : ""}`}
                  aria-label="Copy Account Number"
                >
                  {copied ? (
                    <>
                      <IconCheck size={13} color="#15803d" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <IconCopy size={13} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {selectedMethod.branch && (
              <div className={styles.accountBranchRow}>
                <span className={styles.accountBranchLabel}>Branch / Service:</span>
                <span className={styles.accountBranchValue}>{selectedMethod.branch}</span>
              </div>
            )}
          </div>

          <div className={styles.paymentHintBox}>
            <IconSparkles size={14} color="var(--primary-color)" />
            <span>Send transfer receipt on WhatsApp for instant booking confirmation.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
