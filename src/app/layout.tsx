import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import CustomCursor from "@/components/CustomCursor";
import Asteroids from "@/components/Asteroids";
import "./globals.css";

const siteUrl = "https://ashutosh-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ashutosh Kumar Goswami — Backend & Cloud Engineer",
  description:
    "Backend & cloud engineer building event-driven payment systems with Java, Spring Boot, AWS and Terraform. Working Student at OTTO Payments, M.Sc. High Integrity Systems.",
  keywords: [
    "Ashutosh Kumar Goswami",
    "Backend Engineer",
    "Java",
    "Spring Boot",
    "AWS",
    "Terraform",
    "Cloud Native",
    "Payments",
  ],
  authors: [{ name: "Ashutosh Kumar Goswami" }],
  openGraph: {
    title: "Ashutosh Kumar Goswami — Backend & Cloud Engineer",
    description:
      "Building event-driven, cloud-native payment systems with Java, Spring Boot & AWS.",
    url: siteUrl,
    siteName: "Ashutosh Kumar Goswami",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#07070b",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <Asteroids />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
