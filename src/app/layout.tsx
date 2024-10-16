import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import WhatsApp from "@/components/WhatsApp";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Head from "next/head";
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
  title: "psiuniverse",
  description:
    "Conéctate con psicólogos de alta calidad y agenda tu sesión en minutos con psiuniverse. Terapias personalizadas desde cualquier lugar, con opciones flexibles y atención integral para tu bienestar físico, mental y emocional. ",
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
      <Metatags />
      <body
        className={`${inter.className} relative`}
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url(/background.png)",
        }}
      >
        <NavBar />
        {children}
        <Analytics />
        <WhatsApp />
        <Footer />
      </body>
    </html>
  );
}

function Metatags() {
  return (
    <Head>
      <title>psiuniverse</title>
      <meta name="title" content="psiuniverse" />
      <meta
        name="description"
        content="Conéctate con psicólogos de alta calidad y agenda tu sesión en minutos con psiuniverse. Terapias personalizadas desde cualquier lugar, con opciones flexibles y atención integral para tu bienestar físico, mental y emocional."
      />
      <meta name="robots" content="index, follow" />
      <meta
        name="keywords"
        content="psicología, terapia, bienestar mental, salud emocional, profesionales, calidad, psiuniverse, atención, mejor, psicólogo, terapeuta, terapias, personalizadas, flexibles, integral, bienestar, físico, mental, emocional"
      />
      <meta name="author" content="psiuniverse" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta property="og:type" content="website" />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="og:url" content="https://www.psiuniverse.com/" />
      <meta property="og:title" content="psiuniverse" />
      <meta
        property="og:description"
        content="Conéctate con psicólogos de alta calidad y agenda tu sesión en minutos con psiuniverse. Terapias personalizadas desde cualquier lugar, con opciones flexibles y atención integral para tu bienestar físico, mental y emocional."
      />
      <meta
        property="og:image"
        content="https://www.psiuniverse.com/psiuniverse.jpg"
      />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://www.psiuniverse.com/" />
      <meta property="twitter:title" content="psiuniverse" />
      <meta
        property="twitter:description"
        content="Conéctate con psicólogos de alta calidad y agenda tu sesión en minutos con psiuniverse. Terapias personalizadas desde cualquier lugar, con opciones flexibles y atención integral para tu bienestar físico, mental y emocional."
      />
      <meta
        property="twitter:image"
        content="https://www.psiuniverse.com/psiuniverse.jpg"
      />
      <link rel="icon" href="https://www.psiuniverse.com/favicon.ico" />
    </Head>
  );
}
