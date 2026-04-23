"use client";

import PageHero from "@/components/PageHero";
import { useState } from "react";
import { Phone, MessageSquare, Mail, Send, MapPin, ArrowRight, Globe, Clock } from "lucide-react";
import Swal from "sweetalert2";

export default function Contacto() {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    email: "",
    modelo: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Loading
    Swal.fire({
      title: "Enviando...",
      text: "Por favor espera.",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire({
          icon: "error",
          title: "Error al enviar",
          text: data?.message || "No se pudo enviar la solicitud.",
          confirmButtonColor: "#2563eb",
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "¡Solicitud enviada!",
        text: "Un asesor CAMANX te contactará pronto.",
        confirmButtonColor: "#2563eb",
        confirmButtonText: "Aceptar",
      });

      setForm({ nombre: "", telefono: "", email: "", modelo: "", mensaje: "" });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error de red",
        text: "No se pudo conectar con el servidor. Intenta nuevamente.",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop"
        title="Contacto"
        breadcrumb="Central de Reservas"
      />

      <section className="relative bg-white py-24 overflow-hidden">
        <div className="absolute top-10 right-[-5%] text-[15vw] font-black text-slate-50 select-none leading-none z-0">
          CAMANX
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="flex flex-col lg:flex-row gap-0">

            {/* FORMULARIO */}
            <div className="lg:w-7/12 bg-slate-900 p-8 md:p-16 shadow-2xl">
              <div className="mb-12">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500">Booking Service</span>
                <h2 className="mt-4 text-3xl font-black uppercase tracking-tighter text-white md:text-5xl">
                  Solicita tu <span className="text-blue-500 underline decoration-2 underline-offset-8">Unidad</span>
                </h2>
              </div>

              <form onSubmit={onSubmit} className="space-y-10">
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                  <DarkField label="Tu Nombre" name="nombre" placeholder="Nombre completo" value={form.nombre} onChange={handleChange} />
                  <DarkField label="Teléfono" name="telefono" placeholder="+51 000 000 000" value={form.telefono} onChange={handleChange} />
                  <DarkField label="Email" name="email" type="email" placeholder="correo@ejemplo.com" value={form.email} onChange={handleChange} />
                  <DarkField label="Modelo de Interés" name="modelo" placeholder="SUV, Sedan, etc." value={form.modelo} onChange={handleChange} />
                </div>

                <div className="pt-4">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-4 block">
                    Mensaje Operativo
                  </label>
                  <textarea
                    name="mensaje"
                    value={form.mensaje}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-slate-700 py-3 text-white outline-none focus:border-blue-500 transition-colors resize-none"
                    rows={2}
                    placeholder="Detalles adicionales del alquiler..."
                  />
                </div>

                <button
                  type="submit"
                  className="group relative overflow-hidden bg-blue-600 px-12 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-white transition-all hover:bg-blue-500"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Enviar Solicitud <Send className="h-3 w-3" />
                  </span>
                </button>
              </form>
            </div>

            {/* INFO CONTACTO */}
            <div className="lg:w-5/12 bg-[#1e3a8a] p-8 md:p-16 flex flex-col justify-between">
              <div className="space-y-12">
                <div>
                  <h3 className="text-white text-xl font-black uppercase tracking-tighter mb-6 flex items-center gap-4">
                    <span className="h-px w-8 bg-blue-400"></span>
                    Central Operativa
                  </h3>
                  <div className="space-y-8">
                    <ContactItem icon={<Phone size={18} />} label="Atención 24/7" value="+51 921 785 028" />
                    <ContactItem icon={<Mail size={18} />} label="Reservas" value="camanxrentacar@gmail.com" />
                    <ContactItem icon={<MapPin size={18} />} label="Sede Principal" value="Lima - Perú" />
                  </div>
                </div>

                <div className="bg-white/5 p-6 border-l-2 border-blue-400">
                  <div className="flex items-center gap-3 mb-2 text-blue-300">
                    <Clock size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Disponibilidad</span>
                  </div>
                  <p className="text-white text-xs leading-relaxed">
                    Nuestra flota está disponible para recojo y entrega inmediata en puntos estratégicos de la ciudad.
                  </p>
                </div>
              </div>

              <div className="mt-12">
                <a href="#" className="flex items-center justify-between text-white border-t border-white/10 pt-6 group">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Ver Ubicaciones</span>
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-8 justify-center lg:justify-start">
            <SocialLink icon={<Globe size={14} />} label="Sitio Web" />
            <SocialLink icon={<MessageSquare size={14} />} label="WhatsApp Business" />
          </div>
        </div>
      </section>
    </>
  );
}

function DarkField({ label, name, placeholder, type = "text", value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[9px] font-black uppercase tracking-widest text-slate-500">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="bg-transparent border-b border-slate-700 py-3 text-sm text-white outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600"
      />
    </div>
  );
}

function ContactItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-5">
      <div className="text-blue-400">{icon}</div>
      <div>
        <p className="text-[9px] font-black uppercase tracking-widest text-blue-300/60 leading-none mb-1">{label}</p>
        <p className="text-white font-bold tracking-tight uppercase">{value}</p>
      </div>
    </div>
  );
}

function SocialLink({ icon, label }) {
  return (
    <div className="flex items-center gap-2 text-slate-400 hover:text-[#1e3a8a] cursor-pointer transition-colors">
      {icon}
      <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
    </div>
  );
}