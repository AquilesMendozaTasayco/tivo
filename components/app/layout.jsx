"use client";

import "./globals.css";
import { Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import BotonWhatsApp from "@/components/BotonWhatsApp";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const esAdmin = pathname.startsWith("/admin");

  return (
    <html lang="es">
      <body className={montserrat.className}>
        {!esAdmin && <Navbar />}

        {children}

        {!esAdmin && <Footer />}
        {!esAdmin && <BotonWhatsApp />}
      </body>
    </html>
  );
}
