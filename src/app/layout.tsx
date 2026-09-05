import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import { getCmsSettings } from "../lib/db";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guruji Digital & Tech | Premium Web Development & Digital Marketing India",
  description: "Get high-performance business websites, Shopify stores, and lead-generating Google/Meta ad campaigns. Professional digital consultancy starting at just ₹99.",
  keywords: ["web development India", "digital marketing agency", "small business website", "Google Ads management", "Meta Ads India", "Guruji Digital"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = getCmsSettings();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Load Razorpay Checkout Script */}
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
      </head>
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-black text-zinc-950 dark:text-zinc-50 font-sans">
        <Header agencyName={settings.agencyName} />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer
          agencyName={settings.agencyName}
          tagline={settings.tagline}
          phone={settings.contactPhone}
          email={settings.contactEmail}
          address={settings.officeAddress}
          experienceYears={settings.experienceYears}
          satisfiedClients={settings.satisfiedClients}
          projectsCompleted={settings.projectsCompleted}
          adBudgetManaged={settings.adBudgetManaged}
        />
        <FloatingWhatsApp
          phoneNumber={settings.whatsappNumber}
          agencyName={settings.agencyName}
        />
      </body>
    </html>
  );
}

