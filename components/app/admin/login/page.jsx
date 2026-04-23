"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Lock, Mail, ChevronRight, ShieldCheck, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const brandBlue = "#1e3a8a"; // El azul de CAMANX

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/novedades");
    } catch (err) {
      setError("Credenciales inválidas. Acceso denegado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      {/* Tarjeta de Login - Estilo Minimalista y Limpio */}
      <div className="w-full max-w-[420px] bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 md:p-12 relative">
        
        {/* Línea superior con el azul de CAMANX */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-[#1e3a8a]" />

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-slate-50 border border-slate-100 mb-6">
            <Lock className="h-5 w-5 text-[#1e3a8a]" />
          </div>
          <h1 className="text-xl font-black uppercase tracking-[0.2em] text-slate-900">
            Panel <span className="text-[#1e3a8a]">Camanx</span>
          </h1>
          <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-400 mt-3">
            Gestión Administrativa
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">
          {/* Campo Usuario */}
          <div className="space-y-3">
            <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1">
              Usuario Autorizado
            </label>
            <div className="relative group">
              <Mail className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-[#1e3a8a] transition-colors" />
              <input
                type="email"
                placeholder="admin@camanx.pe"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border-b border-slate-200 bg-transparent py-3 pl-8 pr-4 text-xs font-bold text-slate-900 outline-none transition-all focus:border-[#1e3a8a]"
              />
            </div>
          </div>

          {/* Campo Contraseña */}
          <div className="space-y-3">
            <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1">
              Contraseña
            </label>
            <div className="relative group">
              <Lock className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-[#1e3a8a] transition-colors" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border-b border-slate-200 bg-transparent py-3 pl-8 pr-4 text-xs font-bold text-slate-900 outline-none transition-all focus:border-[#1e3a8a]"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border-l-2 border-red-500 p-3">
              <p className="text-[9px] font-bold uppercase text-red-600 tracking-widest italic">
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full group relative flex items-center justify-center bg-[#1e3a8a] py-5 px-6 text-[10px] font-black uppercase tracking-[0.3em] text-white transition-all hover:bg-[#162d6b] shadow-xl shadow-[#1e3a8a]/20 active:scale-[0.98] disabled:bg-slate-200"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin text-white" />
            ) : (
              <>
                Entrar al Sistema
                <ChevronRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        <div className="mt-12 flex items-center justify-center gap-3 border-t border-slate-100 pt-8">
          <ShieldCheck className="h-3.5 w-3.5 text-[#1e3a8a]" />
          <span className="text-[8px] font-bold uppercase tracking-[0.5em] text-slate-400">
            Camanx • Acceso Seguro
          </span>
        </div>
      </div>
    </div>
  );
}