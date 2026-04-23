"use client";

import { useEffect, useState } from "react";
import app from "@/lib/firebase";

export default function TestFirebase() {
  const [estado, setEstado] = useState("Conectando...");

  useEffect(() => {
    if (app) {
      setEstado("✅ Firebase está conectado correctamente");
    } else {
      setEstado("❌ Error: Firebase no se conectó");
    }
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h1>🔥 Test Firebase</h1>
      <p>{estado}</p>
    </div>
  );
}
