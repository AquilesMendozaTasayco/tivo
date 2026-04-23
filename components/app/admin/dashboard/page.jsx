"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/admin/login");
      } else {
        setUserEmail(user.email || "");
      }
    });

    return () => unsub();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/admin/login");
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>✅ Dashboard Admin</h1>
      <p>Sesión iniciada como: <b>{userEmail}</b></p>

      <button onClick={handleLogout} style={{ padding: 10, marginTop: 12 }}>
        Cerrar sesión
      </button>
    </div>
  );
}
