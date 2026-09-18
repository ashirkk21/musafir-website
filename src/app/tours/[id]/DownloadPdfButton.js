"use client";

import { useState } from "react";
import styles from "./TourDetails.module.css";
import { IconFileText } from "../../../components/Icons";

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
  }
];

export default function DownloadPdfButton({ pkg, policies }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (typeof window === "undefined") return;

    try {
      setIsGenerating(true);
      const html2pdf = (await import("html2pdf.js")).default;
      
      const container = document.createElement("div");
      container.style.padding = "20px";
      container.style.fontFamily = "'Inter', 'Segoe UI', sans-serif";
      container.style.color = "#1f2937";
      container.style.backgroundColor = "#ffffff";
      
      const getImageUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('http')) return url;
        return window.location.origin + (url.startsWith('/') ? '' : '/') + url;
      };
      const coverImage = getImageUrl(pkg.poster || pkg.image);

      // Build HTML string for a clean, visually appealing document
      let html = '';
      
      if (coverImage) {
        html += `
          <div style="margin-bottom: 25px; border-radius: 12px; overflow: hidden; border: 2px solid #16a34a; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); background-color: #000;">
            <img src="${coverImage}" alt="${pkg.title} Cover" style="width: 100%; height: auto; display: block;" crossorigin="anonymous" />
          </div>
        `;
      } else {
        html += `
          <div style="border: 2px solid #16a34a; border-radius: 12px; overflow: hidden; margin-bottom: 25px;">
            <div style="background-color: #16a34a; color: white; padding: 25px 20px; text-align: center;">
              <h1 style="font-size: 28px; font-weight: 800; margin: 0 0 10px 0; letter-spacing: -0.5px;">${pkg.title}</h1>
              <p style="font-size: 16px; font-weight: 500; margin: 0; opacity: 0.9;">
                ${pkg.duration.days} Days / ${pkg.duration.nights} Nights
              </p>
            </div>
            <div style="background-color: #f0fdf4; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #bbf7d0;">
              <div>
                <span style="font-size: 13px; color: #166534; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Starting Price (Solo)</span>
                <div style="font-size: 20px; font-weight: 700; color: #15803d;">PKR ${pkg.pricing.solo.toLocaleString()}</div>
              </div>
              <div style="text-align: right;">
                <span style="font-size: 13px; color: #166534; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Couple Price</span>
                <div style="font-size: 20px; font-weight: 700; color: #15803d;">PKR ${pkg.pricing.couple.toLocaleString()}</div>
              </div>
            </div>
          </div>
        `;
      }
      
      html += `
        <div style="margin-bottom: 25px;">
          <h2 style="font-size: 18px; font-weight: 700; color: #16a34a; margin-bottom: 12px; border-bottom: 2px solid #f0fdf4; padding-bottom: 8px;">Key Highlights</h2>
          <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px;">
            <p style="font-size: 14px; line-height: 1.7; margin: 0; color: #4b5563;">
              ${pkg.attractions.map(attr => `<span style="display: inline-block; background: #e5e7eb; padding: 2px 8px; border-radius: 4px; margin: 0 6px 6px 0; font-weight: 500;">${attr}</span>`).join("")}
            </p>
          </div>
        </div>

        <h2 style="font-size: 18px; font-weight: 700; color: #16a34a; margin-bottom: 15px; border-bottom: 2px solid #f0fdf4; padding-bottom: 8px;">Day-by-Day Itinerary</h2>
      `;
      
      pkg.routePlan.forEach((day, index) => {
        html += `
          <div style="margin-bottom: 15px; page-break-inside: avoid; border-left: 3px solid #16a34a; padding-left: 15px; position: relative;">
            <div style="position: absolute; left: -21px; top: -2px; background: #16a34a; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; border: 3px solid white;">${day.day}</div>
            <h3 style="font-size: 16px; font-weight: 700; margin: 0 0 6px 0; color: #1f2937;">${day.title}</h3>
            <p style="font-size: 14px; margin: 0; line-height: 1.6; color: #4b5563;">${day.description}</p>
          </div>
        `;
      });
      
      html += `
        <div style="page-break-inside: avoid; margin-top: 30px;">
          <h2 style="font-size: 18px; font-weight: 700; color: #16a34a; margin: 0 0 15px 0; border-bottom: 2px solid #f0fdf4; padding-bottom: 8px;">Inclusions & Exclusions</h2>
          <div style="display: flex; gap: 20px; font-size: 14px;">
            <div style="flex: 1; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 15px;">
              <h3 style="font-size: 15px; font-weight: 700; color: #166534; margin: 0 0 12px 0; display: flex; align-items: center;">
                <span style="background: #22c55e; color: white; width: 20px; height: 20px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 8px; font-size: 14px;">✓</span>
                Included
              </h3>
              <ul style="margin: 0; padding-left: 0; list-style: none; line-height: 1.6; color: #374151;">
                ${pkg.inclusions.map(i => `<li style="margin-bottom:8px; padding-left: 20px; position: relative;"><span style="position: absolute; left: 0; color: #22c55e;">•</span>${i}</li>`).join('')}
              </ul>
            </div>
            <div style="flex: 1; background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 15px;">
              <h3 style="font-size: 15px; font-weight: 700; color: #991b1b; margin: 0 0 12px 0; display: flex; align-items: center;">
                <span style="background: #ef4444; color: white; width: 20px; height: 20px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 8px; font-size: 14px;">✕</span>
                Not Included
              </h3>
              <ul style="margin: 0; padding-left: 0; list-style: none; line-height: 1.6; color: #374151;">
                ${pkg.exclusions.map(i => `<li style="margin-bottom:8px; padding-left: 20px; position: relative;"><span style="position: absolute; left: 0; color: #ef4444;">•</span>${i}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      `;

      if (pkg.menu) {
        html += `
          <div style="page-break-inside: avoid; margin-top: 30px;">
            <h2 style="font-size: 18px; font-weight: 700; color: #16a34a; margin: 0 0 15px 0; border-bottom: 2px solid #f0fdf4; padding-bottom: 8px;">Meal Plan</h2>
            <div style="display: flex; gap: 20px; font-size: 14px;">
              <div style="flex: 1; background-color: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 15px;">
                <h3 style="font-size: 15px; font-weight: 700; color: #b45309; margin: 0 0 10px 0;">Breakfast</h3>
                <ul style="margin: 0; padding-left: 20px; line-height: 1.6; color: #4b5563;">
                  ${pkg.menu.breakfast.map(i => `<li style="margin-bottom:4px;">${i}</li>`).join('')}
                </ul>
              </div>
              <div style="flex: 1; background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 15px;">
                <h3 style="font-size: 15px; font-weight: 700; color: #1d4ed8; margin: 0 0 10px 0;">Dinner</h3>
                <ul style="margin: 0; padding-left: 20px; line-height: 1.6; color: #4b5563;">
                  ${pkg.menu.dinner.map(i => `<li style="margin-bottom:4px;">${i}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>
        `;
      }

      if (pkg.addOns && pkg.addOns.length > 0) {
        html += `
          <div style="page-break-inside: avoid; margin-top: 30px;">
            <h2 style="font-size: 18px; font-weight: 700; color: #16a34a; margin: 0 0 15px 0; border-bottom: 2px solid #f0fdf4; padding-bottom: 8px;">Optional Upgrades & Add-ons</h2>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
              ${pkg.addOns.map(addon => `
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; font-size: 13px;">
                  <h4 style="margin: 0 0 5px 0; font-size: 14px; font-weight: 700; color: #0f172a;">${addon.service}</h4>
                  <p style="margin: 0 0 8px 0; color: #475569; line-height: 1.5;">${addon.description}</p>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #64748b; font-size: 12px;">${addon.limit || ''}</span>
                    <strong style="color: #16a34a;">+ PKR ${addon.rates.toLocaleString()}</strong>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }

      if (policies.packingChecklist && policies.packingChecklist.length > 0) {
        html += `
          <div style="page-break-inside: avoid; margin-top: 30px;">
            <h2 style="font-size: 18px; font-weight: 700; color: #16a34a; margin: 0 0 12px 0; border-bottom: 2px solid #f0fdf4; padding-bottom: 8px;">Recommended Packing Checklist</h2>
            <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px;">
              <ul style="margin: 0; padding-left: 0; list-style: none; display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; font-size: 13px; color: #374151;">
                ${policies.packingChecklist.map(item => `<li style="position: relative; padding-left: 20px;"><span style="position: absolute; left: 0; color: #22c55e; font-weight: bold;">✓</span>${item}</li>`).join('')}
              </ul>
            </div>
          </div>
        `;
      }

      html += `
        <div style="page-break-before: auto; margin-top: 30px;">
          <h2 style="font-size: 18px; font-weight: 700; color: #16a34a; margin: 0 0 15px 0; border-bottom: 2px solid #f0fdf4; padding-bottom: 8px;">Booking, Child & Cancellation Policies</h2>
      `;

      if (policies.kidsPolicy && policies.kidsPolicy.length > 0) {
        html += `
          <div style="margin-bottom: 20px; page-break-inside: avoid;">
            <h3 style="font-size: 15px; font-weight: 700; color: #1f2937; margin: 0 0 10px 0;">Child Seating & Fare Policy</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px; border: 1px solid #e5e7eb;">
              <thead>
                <tr style="background-color: #f3f4f6;">
                  <th style="padding: 10px; text-align: left; border: 1px solid #e5e7eb; width: 30%;">Age Bracket</th>
                  <th style="padding: 10px; text-align: left; border: 1px solid #e5e7eb;">Seat Arrangement & Fare</th>
                </tr>
              </thead>
              <tbody>
                ${policies.kidsPolicy.map(k => `
                  <tr>
                    <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: 600; color: #111827;">${k.tier}</td>
                    <td style="padding: 10px; border: 1px solid #e5e7eb; color: #4b5563;">${k.rule}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
      }

      if (policies.refundPolicy && policies.refundPolicy.length > 0) {
        html += `
          <div style="margin-bottom: 20px; page-break-inside: avoid;">
            <h3 style="font-size: 15px; font-weight: 700; color: #1f2937; margin: 0 0 10px 0;">Refund & Cancellation Timeline</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px; border: 1px solid #e5e7eb;">
              <thead>
                <tr style="background-color: #f3f4f6;">
                  <th style="padding: 10px; text-align: left; border: 1px solid #e5e7eb; width: 50%;">Cancellation Timeline</th>
                  <th style="padding: 10px; text-align: left; border: 1px solid #e5e7eb;">Refund Terms</th>
                </tr>
              </thead>
              <tbody>
                ${policies.refundPolicy.map(r => `
                  <tr>
                    <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: 600; color: #111827;">${r.condition}</td>
                    <td style="padding: 10px; border: 1px solid #e5e7eb; color: #4b5563;"><span style="background-color: #fef2f2; color: #991b1b; padding: 2px 6px; border-radius: 4px; border: 1px solid #fecaca; font-weight: 500; font-size: 12px;">${r.refund}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
      }

      if (policies.bookingPolicy && policies.bookingPolicy.length > 0) {
        html += `
          <div style="margin-bottom: 20px; page-break-inside: avoid;">
            <h3 style="font-size: 15px; font-weight: 700; color: #1f2937; margin: 0 0 10px 0;">Reservation & Payment Schedule</h3>
            <ul style="margin: 0; padding-left: 0; list-style: none; font-size: 13px; color: #4b5563; line-height: 1.6;">
              ${policies.bookingPolicy.map(rule => `<li style="position: relative; padding-left: 20px; margin-bottom: 6px;"><span style="position: absolute; left: 0; color: #16a34a;">•</span>${rule}</li>`).join('')}
            </ul>
          </div>
        `;
      }
      
      html += `</div>`; // Close Booking Policies section

      if (policies.generalTravelPolicies && policies.generalTravelPolicies.length > 0) {
        html += `
          <div style="page-break-inside: avoid; margin-top: 25px;">
            <h2 style="font-size: 18px; font-weight: 700; color: #16a34a; margin: 0 0 12px 0; border-bottom: 2px solid #f0fdf4; padding-bottom: 8px;">General Travel Guidelines & Code of Conduct</h2>
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px;">
              <ul style="margin: 0; padding-left: 0; list-style: none; font-size: 13px; color: #334155; line-height: 1.6;">
                ${policies.generalTravelPolicies.map(rule => `<li style="position: relative; padding-left: 20px; margin-bottom: 8px;"><span style="position: absolute; left: 0; color: #16a34a;">•</span>${rule}</li>`).join('')}
              </ul>
            </div>
          </div>
        `;
      }

      // Add Payment/Price Card Content at the bottom
      html += `
        <div style="page-break-before: auto; margin-top: 30px;">
          <h2 style="font-size: 18px; font-weight: 700; color: #16a34a; margin: 0 0 15px 0; border-bottom: 2px solid #f0fdf4; padding-bottom: 8px;">Payment Methods</h2>
          <p style="font-size: 14px; color: #4b5563; margin-bottom: 15px;">Secure your booking by transferring the amount to any of our official accounts below. Please share the receipt via WhatsApp for confirmation.</p>
          <div style="display: flex; flex-wrap: wrap; gap: 15px;">
      `;

      PAYMENT_METHODS.forEach((method) => {
        html += `
            <div style="flex: 1; min-width: 45%; background-color: #ffffff; border: 1px solid #e5e7eb; border-left: 4px solid ${method.accentColor}; border-radius: 8px; padding: 15px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); page-break-inside: avoid;">
              <div style="font-size: 12px; font-weight: 600; color: ${method.accentColor}; text-transform: uppercase; margin-bottom: 4px;">${method.badge}</div>
              <h3 style="font-size: 16px; font-weight: 700; margin: 0 0 12px 0; color: #111827;">${method.fullName}</h3>
              
              <div style="margin-bottom: 8px;">
                <span style="font-size: 12px; color: #6b7280; display: block;">Account Title</span>
                <strong style="font-size: 14px; color: #1f2937;">${method.title}</strong>
              </div>
              
              <div style="margin-bottom: 8px;">
                <span style="font-size: 12px; color: #6b7280; display: block;">${method.numberLabel}</span>
                <strong style="font-size: 15px; color: #1f2937; letter-spacing: 0.5px;">${method.number}</strong>
              </div>
              
              ${method.branch ? `
                <div>
                  <span style="font-size: 12px; color: #6b7280; display: block;">Branch / Details</span>
                  <span style="font-size: 13px; color: #4b5563;">${method.branch}</span>
                </div>
              ` : ''}
            </div>
        `;
      });

      html += `
          </div>
        </div>
      `;

      container.innerHTML = html;
      
      const opt = {
        margin:       15,
        filename:     `${pkg.title}-Itinerary.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, logging: false },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak:    { mode: ['css', 'legacy'] }
      };

      await html2pdf().set(opt).from(container).save();
      
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button 
      onClick={handleDownload} 
      className={styles.pdfDownloadBtn}
      disabled={isGenerating}
      title="Download Package PDF"
    >
      <IconFileText size={18} />
      <span>{isGenerating ? "Generating..." : "Download PDF"}</span>
    </button>
  );
}

