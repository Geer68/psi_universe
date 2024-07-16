import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const satoshi = localFont({
  src: [
    {
      path: "../../public/assets/fonts/satoshi/Satoshi-Regular.woff2",
      weight: "400",
    },
    {
      path: "../../public/assets/fonts/satoshi/Satoshi-Medium.woff2",
      weight: "500",
    },
    {
      path: "../../public/assets/fonts/satoshi/Satoshi-Bold.woff2",
      weight: "700",
    },
  ],
  variable: "--font-satoshi",
});

const mortModern = localFont({
  src: [
    {
      path: "../../public/assets/fonts/mort-modern/MortModern-Light.otf",
      weight: "300",
    },
    {
      path: "../../public/assets/fonts/mort-modern/MortModern-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/assets/fonts/mort-modern/MortModern-Regular.otf",
      weight: "400",
    },
    {
      path: "../../public/assets/fonts/mort-modern/MortModern-Medium.otf",
      weight: "500",
    },
    {
      path: "../../public/assets/fonts/mort-modern/MortModern-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/assets/fonts/mort-modern/MortModern-SemiBold.otf",
      weight: "600",
    },
    {
      path: "../../public/assets/fonts/mort-modern/MortModern-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-mort-modern",
});

const mortModernCondensed = localFont({
  src: [
    {
      path: "../../public/assets/fonts/mort-modern/MortModern-BoldCondensedItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-mort-modern-condensed",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "psi•universe",
  description: "PSIUniverse",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${satoshi.variable} ${mortModern.variable} ${mortModernCondensed.variable}`}
      lang="es"
    >
      <body
        className={`${inter.className} relative`}
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url(/background.png)",
        }}
      >
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
