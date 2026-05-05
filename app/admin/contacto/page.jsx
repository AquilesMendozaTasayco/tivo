"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  collection, getDocs, doc, setDoc, serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import Swal from "sweetalert2";
import { Plus, Pencil, Trash2, X, Save, Loader2, MapPin, Phone, Mail, Clock, Link2, Globe } from "lucide-react";

const swalBase = {
  buttonsStyling: false,
  customClass: {
    popup: "!rounded-2xl !shadow-2xl !border !border-[#d4eef9]",
    title: "!text-[#0e4a6b] !font-bold",
    htmlContainer: "!text-[#4a6170] !text-sm",
    confirmButton: "!bg-[#0e4a6b] !rounded-xl !px-6 !py-2.5 !text-sm !font-semibold !text-white !shadow-lg",
    cancelButton: "!bg-[#f5fbfe] !rounded-xl !px-6 !py-2.5 !text-sm !font-semibold !text-[#4a6170] !border !border-[#d4eef9]",
    actions: "!gap-3",
  },
};

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: {
    popup: "!rounded-xl !shadow-xl !border !border-[#d4eef9] !text-sm",
    timerProgressBar: "!bg-[#0e4a6b]",
  },
});

const DATOS_INICIALES = {
  telefono: "",
  correo: "",
  direccion: "",
  horarios: [],
  latitud: "",
  longitud: "",
  mapUrl: "",
};

const REDES_INICIALES = {
  facebook: { nombre: "Facebook", href: "", path: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5c-.563-.074-1.751-.216-3.32-.216-3.384 0-5.699 2.064-5.699 5.844v2.372z" },
  instagram: { nombre: "Instagram", href: "", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
  tiktok: { nombre: "TikTok", href: "", path: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" },
  whatsapp: { nombre: "WhatsApp", href: "", path: "M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413z" },
};

export default function AdminContactoCompleto() {
  const [datosContacto, setDatosContacto] = useState(DATOS_INICIALES);
  const [redesSociales, setRedesSociales] = useState(REDES_INICIALES);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("contacto"); // contacto o redes
  const [formDataContacto, setFormDataContacto] = useState(DATOS_INICIALES);
  const [formDataRedes, setFormDataRedes] = useState(REDES_INICIALES);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchDatos();
  }, []);

  const fetchDatos = async () => {
    try {
      setLoading(true);
      
      // Contacto
      const contactoSnap = await getDocs(collection(db, "contacto"));
      if (contactoSnap.docs.length > 0) {
        const datos = contactoSnap.docs[0].data();
        setDatosContacto({ id: contactoSnap.docs[0].id, ...datos });
      } else {
        await setDoc(doc(db, "contacto", "datos"), DATOS_INICIALES);
        setDatosContacto({ id: "datos", ...DATOS_INICIALES });
      }

      // Redes Sociales
      const redesSnap = await getDocs(collection(db, "redesSociales"));
      if (redesSnap.docs.length > 0) {
        setRedesSociales(redesSnap.docs[0].data());
      } else {
        await setDoc(doc(db, "redesSociales", "enlaces"), REDES_INICIALES);
        setRedesSociales(REDES_INICIALES);
      }
    } catch (error) {
      console.error("Error:", error);
      Toast.fire({ icon: "error", title: "Error al cargar datos" });
    } finally {
      setLoading(false);
    }
  };

  const handleEditar = () => {
    setActiveTab("contacto");
    setFormDataContacto({
      telefono: datosContacto.telefono || "",
      correo: datosContacto.correo || "",
      direccion: datosContacto.direccion || "",
      horarios: datosContacto.horarios || [],
      latitud: datosContacto.latitud || "",
      longitud: datosContacto.longitud || "",
      mapUrl: datosContacto.mapUrl || "",
    });
    setFormDataRedes({
      facebook: { ...redesSociales.facebook },
      instagram: { ...redesSociales.instagram },
      tiktok: { ...redesSociales.tiktok },
      whatsapp: { ...redesSociales.whatsapp },
    });
    setShowModal(true);
  };

  const handleAgregarHorario = () => {
    setFormDataContacto({
      ...formDataContacto,
      horarios: [...formDataContacto.horarios, { dia: "", horario: "" }],
    });
  };

  const handleEliminarHorario = (index) => {
    setFormDataContacto({
      ...formDataContacto,
      horarios: formDataContacto.horarios.filter((_, i) => i !== index),
    });
  };

  const handleGuardar = async () => {
    if (!formDataContacto.telefono.trim()) {
      return Swal.fire({ ...swalBase, icon: "warning", title: "Teléfono requerido" });
    }
    if (!formDataContacto.correo.trim()) {
      return Swal.fire({ ...swalBase, icon: "warning", title: "Correo requerido" });
    }

    try {
      setSaving(true);

      // Guardar Contacto
      await setDoc(
        doc(db, "contacto", datosContacto.id || "datos"),
        {
          ...formDataContacto,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      // Guardar Redes Sociales
      await setDoc(
        doc(db, "redesSociales", "enlaces"),
        formDataRedes,
        { merge: true }
      );

      Toast.fire({ icon: "success", title: "✅ Datos guardados correctamente" });
      setShowModal(false);
      fetchDatos();
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({ ...swalBase, icon: "error", title: "Error al guardar" });
    } finally {
      setSaving(false);
    }
  };

  const setContacto = (k, v) => setFormDataContacto((p) => ({ ...p, [k]: v }));
  const setRed = (red, href) => {
    setFormDataRedes((p) => ({
      ...p,
      [red]: { ...p[red], href },
    }));
  };

  const ic = "w-full px-4 py-3 rounded-xl border border-[#d4eef9] bg-[#f5fbfe] text-sm text-[#0e4a6b] placeholder-[#8fb0c0] outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/10 transition-all";
  const lc = "block text-[10px] font-bold uppercase tracking-[0.25em] text-[#0e4a6b] mb-1.5";
  const sc = "text-xs font-bold text-[#0e4a6b] uppercase tracking-widest mb-4 pb-2 border-b border-[#d4eef9]";

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5fbfe] p-6 lg:p-8 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#0e4a6b]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5fbfe] p-6 lg:p-8">
      <div className="mx-auto max-w-7xl flex flex-col gap-8">

        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 rounded-full bg-[#0e4a6b]" />
              <h1 className="text-2xl font-bold text-[#0e2a3d]" style={{ fontFamily: "Georgia, serif" }}>
                Contacto & Redes
              </h1>
            </div>
            <p className="ml-4 text-xs font-medium text-[#4a6170] uppercase tracking-widest mt-0.5">
              Gestiona contacto, ubicación y redes sociales
            </p>
          </div>
          <button
            onClick={handleEditar}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0e4a6b] hover:bg-[#0d3d5a] text-white text-sm font-semibold rounded-xl shadow-md shadow-[#0e4a6b]/20 hover:-translate-y-0.5 transition-all"
          >
            <Pencil className="h-4 w-4" /> Editar todo
          </button>
        </motion.div>

        {/* TARJETAS DE INFORMACIÓN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Teléfono */}
          <motion.div
            className="bg-white border border-[#d4eef9] rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#1bb5e0] transition-all"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0e4a6b] to-[#1bb5e0] flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-[#0e4a6b] uppercase tracking-widest mb-1">Teléfono</p>
                <a
                  href={`tel:${datosContacto.telefono}`}
                  className="text-lg font-bold text-[#0e2a3d] hover:text-[#1bb5e0] transition-colors break-all"
                >
                  {datosContacto.telefono || "—"}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Correo */}
          <motion.div
            className="bg-white border border-[#d4eef9] rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#1bb5e0] transition-all"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0e4a6b] to-[#1bb5e0] flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-[#0e4a6b] uppercase tracking-widest mb-1">Correo</p>
                <a
                  href={`mailto:${datosContacto.correo}`}
                  className="text-lg font-bold text-[#0e2a3d] hover:text-[#1bb5e0] transition-colors break-all"
                >
                  {datosContacto.correo || "—"}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Dirección */}
          <motion.div
            className="bg-white border border-[#d4eef9] rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#1bb5e0] transition-all md:col-span-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0e4a6b] to-[#1bb5e0] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-[#0e4a6b] uppercase tracking-widest mb-1">Dirección</p>
                <p className="text-base font-semibold text-[#0e2a3d]">{datosContacto.direccion || "—"}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* HORARIOS */}
        {datosContacto.horarios && datosContacto.horarios.length > 0 && (
          <motion.div
            className="bg-white border border-[#d4eef9] rounded-2xl p-6 shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-[#0e4a6b]" />
              <h3 className="text-lg font-bold text-[#0e2a3d]">Horarios</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {datosContacto.horarios.map((h, i) => (
                <div key={i} className="bg-[#f5fbfe] border border-[#d4eef9] rounded-lg p-3">
                  <p className="text-[10px] font-bold text-[#0e4a6b] uppercase tracking-widest mb-1">
                    {h.dia}
                  </p>
                  <p className="text-sm font-semibold text-[#0e2a3d]">{h.horario}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* MAPA */}
        {datosContacto.mapUrl && (
          <motion.div
            className="bg-white border border-[#d4eef9] rounded-2xl p-6 shadow-sm overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-bold text-[#0e2a3d] mb-4">Ubicación</h3>
            <div className="w-full h-96 rounded-xl overflow-hidden border border-[#d4eef9]">
              <iframe
                title="Mapa de ubicación"
                src={datosContacto.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </motion.div>
        )}

        {/* REDES SOCIALES */}
        <motion.div
          className="bg-white border border-[#d4eef9] rounded-2xl p-6 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-5 h-5 text-[#0e4a6b]" />
            <h3 className="text-lg font-bold text-[#0e2a3d]">Redes Sociales</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(redesSociales).map(([key, red]) => (
              <div key={key} className="bg-[#f5fbfe] border border-[#d4eef9] rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0e4a6b] to-[#1bb5e0] flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d={red.path} />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-[#0e4a6b] uppercase tracking-widest mb-1">
                    {red.nombre}
                  </p>
                  {red.href ? (
                    <a
                      href={red.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-[#0e2a3d] hover:text-[#1bb5e0] transition-colors truncate"
                    >
                      Ir al perfil →
                    </a>
                  ) : (
                    <p className="text-xs text-[#8fb0c0]">Sin enlace</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* MODAL EDITAR */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            />
            <motion.div
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-3xl max-h-[92vh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-white rounded-2xl shadow-2xl border border-[#d4eef9]"
              initial={{ opacity: 0, scale: 0.95, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 24 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* HEADER CON TABS */}
              <div className="sticky top-0 bg-white z-10 border-b border-[#d4eef9]">
                <div className="flex items-center justify-between px-7 py-5 border-b border-[#d4eef9]">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-6 rounded-full bg-[#0e4a6b]" />
                    <h2 className="text-lg font-bold text-[#0e2a3d]" style={{ fontFamily: "Georgia, serif" }}>
                      Editar contacto & redes
                    </h2>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 rounded-lg text-[#4a6170] hover:bg-[#f5fbfe] transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* TABS */}
                <div className="flex gap-1 px-7 pt-3">
                  <button
                    onClick={() => setActiveTab("contacto")}
                    className={`px-4 py-2 rounded-t-xl text-sm font-semibold transition-all ${
                      activeTab === "contacto"
                        ? "bg-[#0e4a6b] text-white"
                        : "bg-[#f5fbfe] text-[#4a6170] hover:bg-[#e8f6fb]"
                    }`}
                  >
                    📍 Contacto
                  </button>
                  <button
                    onClick={() => setActiveTab("redes")}
                    className={`px-4 py-2 rounded-t-xl text-sm font-semibold transition-all ${
                      activeTab === "redes"
                        ? "bg-[#0e4a6b] text-white"
                        : "bg-[#f5fbfe] text-[#4a6170] hover:bg-[#e8f6fb]"
                    }`}
                  >
                    🌐 Redes Sociales
                  </button>
                </div>
              </div>

              <div className="px-7 py-6 flex flex-col gap-6">
                {/* TAB: CONTACTO */}
                {activeTab === "contacto" && (
                  <>
                    <div>
                      <h3 className={sc}>Información de contacto</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={lc}>Teléfono *</label>
                          <input
                            type="tel"
                            value={formDataContacto.telefono}
                            onChange={(e) => setContacto("telefono", e.target.value)}
                            placeholder="+51 900 241 682"
                            className={ic}
                          />
                        </div>
                        <div>
                          <label className={lc}>Correo *</label>
                          <input
                            type="email"
                            value={formDataContacto.correo}
                            onChange={(e) => setContacto("correo", e.target.value)}
                            placeholder="contacto@tivo.pe"
                            className={ic}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className={sc}>Ubicación</h3>
                      <div>
                        <label className={lc}>Dirección</label>
                        <input
                          type="text"
                          value={formDataContacto.direccion}
                          onChange={(e) => setContacto("direccion", e.target.value)}
                          placeholder="Calle Principal 123, Lima, Perú"
                          className={ic}
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className={sc}>Mapa</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className={lc}>Latitud</label>
                          <input
                            type="text"
                            value={formDataContacto.latitud}
                            onChange={(e) => setContacto("latitud", e.target.value)}
                            placeholder="-12.0464"
                            className={ic}
                          />
                        </div>
                        <div>
                          <label className={lc}>Longitud</label>
                          <input
                            type="text"
                            value={formDataContacto.longitud}
                            onChange={(e) => setContacto("longitud", e.target.value)}
                            placeholder="-77.0428"
                            className={ic}
                          />
                        </div>
                      </div>
                      <div>
                        <label className={lc}>URL de Google Maps (iframe src)</label>
                        <textarea
                          value={formDataContacto.mapUrl}
                          onChange={(e) => setContacto("mapUrl", e.target.value)}
                          placeholder="https://maps.google.com/maps?q=..."
                          rows={3}
                          className={`${ic} resize-none`}
                        />
                        <p className="text-xs text-[#8fb0c0] mt-1">
                          Obtén la URL desde: Google Maps → Compartir → Incrustar mapa → Copia el src del iframe
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className={sc}>Horarios de atención</h3>
                        <button
                          onClick={handleAgregarHorario}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#0e4a6b] bg-[#f5fbfe] rounded-lg hover:bg-[#e8f6fb] transition-colors"
                        >
                          <Plus className="h-3.5 w-3.5" /> Agregar
                        </button>
                      </div>

                      <div className="space-y-3">
                        {formDataContacto.horarios.map((h, i) => (
                          <div key={i} className="flex gap-3 items-end">
                            <div className="flex-1">
                              <label className={lc}>Día</label>
                              <input
                                type="text"
                                value={h.dia}
                                onChange={(e) => {
                                  const nuevosH = [...formDataContacto.horarios];
                                  nuevosH[i].dia = e.target.value;
                                  setContacto("horarios", nuevosH);
                                }}
                                placeholder="Lunes a Viernes"
                                className={ic}
                              />
                            </div>
                            <div className="flex-1">
                              <label className={lc}>Horario</label>
                              <input
                                type="text"
                                value={h.horario}
                                onChange={(e) => {
                                  const nuevosH = [...formDataContacto.horarios];
                                  nuevosH[i].horario = e.target.value;
                                  setContacto("horarios", nuevosH);
                                }}
                                placeholder="09:00 AM - 6:00 PM"
                                className={ic}
                              />
                            </div>
                            <button
                              onClick={() => handleEliminarHorario(i)}
                              className="p-2.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* TAB: REDES SOCIALES */}
                {activeTab === "redes" && (
                  <>
                    {Object.entries(formDataRedes).map(([key, red]) => (
                      <div key={key}>
                        <label className={lc}>
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d={red.path} />
                            </svg>
                            {red.nombre}
                          </div>
                        </label>
                        <input
                          type="url"
                          value={formDataRedes[key].href}
                          onChange={(e) => setRed(key, e.target.value)}
                          placeholder={`https://${key}.com/tuusuario`}
                          className={ic}
                        />
                      </div>
                    ))}
                  </>
                )}
              </div>

              <div className="sticky bottom-0 bg-white border-t border-[#d4eef9] px-7 py-5 flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 rounded-xl border border-[#d4eef9] bg-[#f5fbfe] text-sm font-semibold text-[#4a6170] hover:bg-[#e8f6fb] transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleGuardar}
                  disabled={saving}
                  className="flex flex-1 items-center justify-center gap-2 py-3 rounded-xl bg-[#0e4a6b] hover:bg-[#0d3d5a] disabled:opacity-60 text-white text-sm font-bold shadow-lg shadow-[#0e4a6b]/20 transition-all"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  {saving ? "Guardando..." : "Guardar cambios"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}