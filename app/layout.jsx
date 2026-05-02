import "./globals.css";
import { Montserrat } from "next/font/google";
import LayoutClient from "@/components/LayoutClient";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "TIVO — Comparte más que un viaje",
  description:
    "TIVO es la app de carpooling que conecta personas en Lima para moverse de forma más segura, económica y humana. Comparte tu ruta, reduce costos y construye comunidad.",
  keywords: ["TIVO", "carpooling", "viajes compartidos", "Lima", "movilidad", "transporte"],
  authors: [{ name: "TIVO" }],
  openGraph: {
    title: "TIVO — Comparte más que un viaje",
    description:
      "Movilidad humana, segura y sostenible. Comparte viajes y construye comunidad en Lima.",
    type: "website",
    locale: "es_PE",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={montserrat.className}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}