"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import BotonWhatsApp from "@/components/BotonWhatsApp";
import { LanguageProvider } from "@/lang/LanguageContext";

export default function LayoutClient({ children }) {
  const pathname = usePathname();
  const esAdmin = pathname.startsWith("/admin");

  return (
    <LanguageProvider>
      {!esAdmin && <Navbar />}
      {children}
      {!esAdmin && <Footer />}
      {!esAdmin && <BotonWhatsApp />}
    </LanguageProvider>
  );
}