"use client";

import { usePathname } from "next/navigation";
import styles from "./WhatsAppFloat.module.css";
import { IconWhatsApp } from "./Icons";

export default function WhatsAppFloat() {
  const pathname = usePathname();

  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <a
      href="https://wa.me/923366832018"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.floatBtn}
      aria-label="Chat on WhatsApp"
    >
      <IconWhatsApp size={28} />
      <span className={styles.label}>Chat with Us</span>
    </a>
  );
}
