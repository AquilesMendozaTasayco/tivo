"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  
  // No mostrar sidebar en la página de login
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Usuario autenticado
        setAuthenticated(true);
        setLoading(false);
      } else {
        // Usuario no autenticado
        setAuthenticated(false);
        setLoading(false);
        
        // Si no está en login, redirigir
        if (!isLoginPage) {
          router.push("/admin/login");
        }
      }
    });

    return () => unsubscribe();
  }, [router, isLoginPage]);

  // Mientras verifica autenticación, mostrar loading
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
            Verificando acceso...
          </p>
        </div>
      </div>
    );
  }

  // Si es página de login, mostrar sin sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Si no está autenticado y no es login, no mostrar nada (está redirigiendo)
  if (!authenticated) {
    return null;
  }

  // Usuario autenticado, mostrar layout completo
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: 20, background: "#f9fafb" }}>
        {children}
      </main>
    </div>
  );
}