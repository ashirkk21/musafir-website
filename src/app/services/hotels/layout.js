export const metadata = {
  title: "Verified Partner Hotels & Mountain Resorts Across Pakistan",
  description:
    "Book directly at Musafir Pakistan's verified partner hotels in Skardu, Hunza, Swat, Kashmir, Naran, Kumrat, Shogran, Murree, Nathia Gali, Balakot, and Islamabad. Pre-inspected rooms with 24/7 hot water, heating, and backup generators.",
  alternates: {
    canonical: "/services/hotels"
  },
  openGraph: {
    title: "Verified Partner Hotels & Resorts | Musafir Pakistan",
    description:
      "Pre-inspected partner hotels across Northern Pakistan. Direct rates with verified heating, hot water, and generator backup.",
    url: "/services/hotels",
    images: [{ url: "/images/skardu.jpg", width: 1200, height: 630, alt: "Verified partner hotels across Northern Pakistan" }]
  }
};

export default function HotelsLayout({ children }) {
  return children;
}
