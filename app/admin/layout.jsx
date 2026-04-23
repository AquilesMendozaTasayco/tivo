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

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
        setLoading(false);
      } else {
        setAuthenticated(false);
        setLoading(false);
        if (!isLoginPage) {
          router.push("/admin/login");
        }
      }
    });
    return () => unsubscribe();
  }, [router, isLoginPage]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f8fdf8]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-full border-4 border-[#e2f0e4] border-t-[#1a4a2e] animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 40 40" className="w-6 h-6" fill="none">
                <path d="M20 6 C14 6 8 12 8 20 C8 28 14 34 20 34 C26 34 32 28 32 20 C32 12 26 6 20 6Z" fill="none" stroke="#a8d5a2" strokeWidth="1.5" />
                <path d="M20 10 C20 10 16 16 16 22 C16 26 18 30 20 32 C22 30 24 26 24 22 C24 16 20 10 20 10Z" fill="#a8d5a2" />
                <path d="M10 18 C13 15 18 16 20 20 C22 16 27 15 30 18" stroke="#1a4a2e" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              </svg>
            </div>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#4a8c5c]">
            Verificando acceso...
          </p>
        </div>
      </div>
    );
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!authenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-[#f8fdf8]">
      <Sidebar />
      <main className="flex-1 min-w-0 bg-[#f8fdf8]">
        {children}
      </main>
    </div>
  );
}