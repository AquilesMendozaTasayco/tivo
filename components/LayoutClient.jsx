"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import BotonWhatsApp from "@/components/BotonWhatsApp";

export default function LayoutClient({ children }) {
  const pathname = usePathname();
  const esAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!esAdmin && <Navbar />}
      {children}
      {!esAdmin && <Footer />}
      {!esAdmin && <BotonWhatsApp />}
    </>
  );
}