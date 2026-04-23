"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc,
  doc, serverTimestamp, orderBy, query,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import Swal from "sweetalert2";
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Save, Loader2, MessageSquare } from "lucide-react";

const swalBase = {
  buttonsStyling: false,
  customClass: {
    popup:         "!rounded-2xl !shadow-2xl !border !border-[#e2f0e4]",
    title:         "!text-[#1a2e1f] !font-bold",
    htmlContainer: "!text-[#4a5a4e] !text-sm",
    confirmButton: "!bg-[#1a4a2e] !rounded-xl !px-6 !py-2.5 !text-sm !font-semibold !text-white !shadow-lg",
    cancelButton:  "!bg-[#f8fdf8] !rounded-xl !px-6 !py-2.5 !text-sm !font-semibold !text-[#4a5a4e] !border !border-[#d4e9d8]",
    actions: "!gap-3", icon: "!border-[#c6e3cb]",
  },
};

const Toast = Swal.mixin({
  toast: true, position: "top-end", showConfirmButton: false, timer: 3000, timerProgressBar: true,
  customClass: { popup: "!rounded-xl !shadow-xl !border !border-[#e2f0e4] !text-sm", timerProgressBar: "!bg-[#1a4a2e]" },
});

const COLORES = [
  { label: "Verde oscuro",  value: "#1a4a2e" },
  { label: "Verde medio",   value: "#2d6a4f" },
  { label: "Azul",          value: "#1b6ca8" },
  { label: "Marrón",        value: "#7b4f12" },
  { label: "Rojo tierra",   value: "#b5451b" },
];

const PRODUCTOS = ["Cycitral", "Biomint", "Sana+", "Biofungi", "Esencia Verde"];

const formInicial = {
  nombre: "", ubicacion: "", producto: "Cycitral",
  texto: "", estrellas: 5, inicial: "",
  color: "#1a4a2e", active: true, orden: 0,
};

export default function AdminTestimoniosPage() {
  const [testimonios, setTestimonios] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [showModal,   setShowModal]   = useState(false);
  const [editando,    setEditando]    = useState(null);
  const [formData,    setFormData]    = useState(formInicial);
  const [saving,      setSaving]      = useState(false);

  useEffect(() => { fetchTestimonios(); }, []);

  const fetchTestimonios = async () => {
    try {
      setLoading(true);
      const snap = await getDocs(query(collection(db, "testimonios"), orderBy("orden", "asc")));
      setTestimonios(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch { Toast.fire({ icon: "error", title: "Error al cargar testimonios" }); }
    finally  { setLoading(false); }
  };

  const handleCrear = () => {
    setEditando(null);
    setFormData({ ...formInicial, orden: testimonios.length });
    setShowModal(true);
  };

  const handleEditar = (t) => {
    setEditando(t);
    setFormData({
      nombre:    t.nombre    || "",
      ubicacion: t.ubicacion || "",
      producto:  t.producto  || "Cycitral",
      texto:     t.texto     || "",
      estrellas: t.estrellas ?? 5,
      inicial:   t.inicial   || "",
      color:     t.color     || "#1a4a2e",
      active:    t.active !== false,
      orden:     t.orden     ?? 0,
    });
    setShowModal(true);
  };

  const handleGuardar = async () => {
    if (!formData.nombre.trim()) return Swal.fire({ ...swalBase, icon: "warning", title: "Nombre requerido" });
    if (!formData.texto.trim())  return Swal.fire({ ...swalBase, icon: "warning", title: "Texto del testimonio requerido" });
    const inicial = formData.inicial.trim() || formData.nombre.trim()[0].toUpperCase();
    const data = { ...formData, inicial, orden: Number(formData.orden), estrellas: Number(formData.estrellas), updatedAt: serverTimestamp() };
    try {
      setSaving(true);
      if (editando) {
        await updateDoc(doc(db, "testimonios", editando.id), data);
        Toast.fire({ icon: "success", title: "Testimonio actualizado" });
      } else {
        await addDoc(collection(db, "testimonios"), { ...data, createdAt: serverTimestamp() });
        Toast.fire({ icon: "success", title: "Testimonio creado" });
      }
      setShowModal(false);
      fetchTestimonios();
    } catch { Swal.fire({ ...swalBase, icon: "error", title: "Error al guardar" }); }
    finally { setSaving(false); }
  };

  const handleToggle = async (t) => {
    try {
      await updateDoc(doc(db, "testimonios", t.id), { active: !t.active, updatedAt: serverTimestamp() });
      Toast.fire({ icon: "success", title: t.active ? "Desactivado" : "Activado" });
      fetchTestimonios();
    } catch { Toast.fire({ icon: "error", title: "Error" }); }
  };

  const handleEliminar = async (t) => {
    const r = await Swal.fire({
      ...swalBase, icon: "warning", title: "¿Eliminar testimonio?",
      text: `El testimonio de "${t.nombre}" se eliminará permanentemente.`,
      showCancelButton: true, confirmButtonText: "Sí, eliminar", cancelButtonText: "Cancelar",
      customClass: { ...swalBase.customClass, confirmButton: "!bg-red-500 !rounded-xl !px-6 !py-2.5 !text-sm !font-semibold !text-white" },
    });
    if (!r.isConfirmed) return;
    try {
      await deleteDoc(doc(db, "testimonios", t.id));
      Toast.fire({ icon: "success", title: "Eliminado" });
      fetchTestimonios();
    } catch { Swal.fire({ ...swalBase, icon: "error", title: "Error al eliminar" }); }
  };

  const set = (k, v) => setFormData((p) => ({ ...p, [k]: v }));
  const ic = "w-full px-4 py-3 rounded-xl border border-[#d4e9d8] bg-[#f8fdf8] text-sm text-[#1a2e1f] placeholder-[#9ab5a0] outline-none focus:border-[#1a4a2e] focus:ring-2 focus:ring-[#1a4a2e]/10 transition-all";
  const lc = "block text-[10px] font-bold uppercase tracking-[0.25em] text-[#4a5a4e] mb-1.5";
  const sc = "text-xs font-bold text-[#1a4a2e] uppercase tracking-widest mb-4 pb-2 border-b border-[#e2f0e4]";

  return (
    <div className="min-h-screen bg-[#f8fdf8] p-6 lg:p-8">
      <div className="mx-auto max-w-7xl flex flex-col gap-8">

        <motion.div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
          <div>
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 rounded-full bg-[#1a4a2e]" />
              <h1 className="text-2xl font-bold text-[#1a2e1f]" style={{ fontFamily: "Georgia, serif" }}>Testimonios</h1>
            </div>
            <p className="ml-4 text-xs font-medium text-[#4a5a4e] uppercase tracking-widest mt-0.5">Gestiona las opiniones de los pacientes</p>
          </div>
          <button onClick={handleCrear}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1a4a2e] hover:bg-[#153d25] text-white text-sm font-semibold rounded-xl shadow-md shadow-[#1a4a2e]/20 hover:-translate-y-0.5 transition-all">
            <Plus className="h-4 w-4" /> Nuevo testimonio
          </button>
        </motion.div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total",     value: testimonios.length,                                   bg: "bg-white",     border: "border-[#e2f0e4]", text: "text-[#1a2e1f]" },
            { label: "Activos",   value: testimonios.filter((t) => t.active !== false).length,  bg: "bg-[#f0f7f1]", border: "border-[#c6e3cb]", text: "text-[#1a4a2e]" },
            { label: "Inactivos", value: testimonios.filter((t) => t.active === false).length,   bg: "bg-red-50",    border: "border-red-200",   text: "text-red-600"   },
          ].map((s, i) => (
            <motion.div key={i} className={`${s.bg} border ${s.border} rounded-2xl p-5 shadow-sm`}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#6b7c6e] mb-1">{s.label}</p>
              <p className={`text-3xl font-bold ${s.text}`} style={{ fontFamily: "Georgia, serif" }}>{s.value}</p>
            </motion.div>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-[#1a4a2e]" /></div>
        ) : testimonios.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#e2f0e4] p-16 text-center">
            <MessageSquare className="h-14 w-14 mx-auto mb-4 text-[#c6e3cb]" />
            <p className="text-sm font-semibold text-[#4a5a4e] uppercase tracking-widest">No hay testimonios</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {testimonios.map((t, i) => (
              <motion.div key={t.id}
                className="group bg-white rounded-2xl border border-[#e2f0e4] hover:border-[#4a8c5c] hover:shadow-lg overflow-hidden transition-all duration-300"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>

                <div className="flex flex-col sm:flex-row">
                  <div className="flex-shrink-0 flex items-center justify-center w-full sm:w-20 py-6 sm:py-0"
                    style={{ backgroundColor: `${t.color}18` }}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-md"
                      style={{ backgroundColor: t.color }}>
                      {t.inicial || t.nombre?.[0]}
                    </div>
                  </div>

                  <div className="flex-1 p-4 flex flex-col gap-2 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-bold text-[#1a2e1f]">{t.nombre}</p>
                      <span className="text-[10px] text-[#9ab5a0]">{t.ubicacion}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: `${t.color}18`, color: t.color }}>{t.producto}</span>
                      <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${t.active !== false ? "bg-[#f0f7f1] text-[#1a4a2e] border border-[#c6e3cb]" : "bg-red-50 text-red-600 border border-red-200"}`}>
                        {t.active !== false ? "Activo" : "Inactivo"}
                      </span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: t.estrellas || 5 }).map((_, j) => (
                        <svg key={j} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-xs text-[#4a5a4e] line-clamp-2 leading-relaxed">"{t.texto}"</p>

                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#f0f7f1]">
                      <button onClick={() => handleEditar(t)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#f0f7f1] hover:bg-[#e2f0e4] text-[#1a4a2e] text-[10px] font-semibold uppercase tracking-wider transition-colors">
                        <Pencil className="h-3 w-3" /> Editar
                      </button>
                      <button onClick={() => handleToggle(t)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-colors ${t.active !== false ? "bg-orange-50 hover:bg-orange-100 text-orange-600" : "bg-[#f0f7f1] hover:bg-[#e2f0e4] text-[#1a4a2e]"}`}>
                        {t.active !== false ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        {t.active !== false ? "Ocultar" : "Activar"}
                      </button>
                      <button onClick={() => handleEliminar(t)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-[10px] font-semibold uppercase tracking-wider transition-colors">
                        <Trash2 className="h-3 w-3" /> Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <>
            <motion.div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)} />
            <motion.div
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl max-h-[92vh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-white rounded-2xl shadow-2xl border border-[#e2f0e4]"
              initial={{ opacity: 0, scale: 0.95, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 24 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>

              <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-7 py-5 border-b border-[#e2f0e4]">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 rounded-full bg-[#1a4a2e]" />
                  <h2 className="text-lg font-bold text-[#1a2e1f]" style={{ fontFamily: "Georgia, serif" }}>
                    {editando ? "Editar testimonio" : "Nuevo testimonio"}
                  </h2>
                </div>
                <button onClick={() => setShowModal(false)} className="p-2 rounded-lg text-[#4a5a4e] hover:bg-[#f0f7f1] transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="px-7 py-6 flex flex-col gap-6">

                <div>
                  <h3 className={sc}>Datos del paciente</h3>
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={lc}>Nombre completo *</label>
                        <input type="text" value={formData.nombre}
                          onChange={(e) => { set("nombre", e.target.value); if (!formData.inicial) set("inicial", e.target.value[0]?.toUpperCase() || ""); }}
                          placeholder="María Elena Quispe" className={ic} />
                      </div>
                      <div>
                        <label className={lc}>Inicial del avatar <span className="normal-case text-[#9ab5a0] tracking-normal font-normal">(auto si está vacío)</span></label>
                        <input type="text" value={formData.inicial} onChange={(e) => set("inicial", e.target.value.toUpperCase().slice(0, 1))}
                          placeholder="M" maxLength={1} className={ic} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={lc}>Ubicación</label>
                        <input type="text" value={formData.ubicacion} onChange={(e) => set("ubicacion", e.target.value)}
                          placeholder="Lima, Perú" className={ic} />
                      </div>
                      <div>
                        <label className={lc}>Producto</label>
                        <select value={formData.producto} onChange={(e) => set("producto", e.target.value)} className={ic}>
                          {PRODUCTOS.map((p) => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className={sc}>Contenido</h3>
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className={lc}>Testimonio *</label>
                      <textarea value={formData.texto} onChange={(e) => set("texto", e.target.value)} rows={4}
                        placeholder="Escribir la experiencia del paciente..." className={`${ic} resize-none`} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={lc}>Estrellas</label>
                        <select value={formData.estrellas} onChange={(e) => set("estrellas", Number(e.target.value))} className={ic}>
                          {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} estrella{n !== 1 ? "s" : ""}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className={lc}>Orden <span className="normal-case text-[#9ab5a0] tracking-normal font-normal">(menor = primero)</span></label>
                        <input type="number" value={formData.orden} onChange={(e) => set("orden", e.target.value)}
                          placeholder="0" className={ic} />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className={sc}>Color del avatar</h3>
                  <div className="flex flex-wrap gap-3">
                    {COLORES.map((c) => (
                      <button key={c.value} type="button" onClick={() => set("color", c.value)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${formData.color === c.value ? "border-[#1a4a2e] bg-[#f0f7f1] shadow-sm" : "border-[#e2f0e4] bg-white hover:border-[#a8d5a2]"}`}>
                        <span className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: c.value }} />
                        {c.label}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-3 p-3 rounded-xl bg-[#f8fdf8] border border-[#e2f0e4]">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                      style={{ backgroundColor: formData.color }}>
                      {formData.inicial || formData.nombre?.[0]?.toUpperCase() || "?"}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1a2e1f]">{formData.nombre || "Nombre del paciente"}</p>
                      <p className="text-[10px] text-[#6b7c6e]">{formData.ubicacion || "Ubicación"}</p>
                    </div>
                  </div>
                </div>

                <label className="flex items-center gap-4 p-4 rounded-xl border border-[#c6e3cb] bg-[#f0f7f1] cursor-pointer hover:border-[#4a8c5c] transition-colors">
                  <input type="checkbox" checked={formData.active} onChange={(e) => set("active", e.target.checked)} className="h-4 w-4 accent-[#1a4a2e] rounded" />
                  <div>
                    <p className="text-xs font-bold text-[#1a4a2e] uppercase tracking-wider">Testimonio activo</p>
                    <p className="text-xs text-[#4a5a4e]">Visible en el carrusel del sitio web</p>
                  </div>
                </label>
              </div>

              <div className="sticky bottom-0 bg-white border-t border-[#e2f0e4] px-7 py-5 flex gap-3">
                <button onClick={() => setShowModal(false)}
                  className="flex-1 py-3 rounded-xl border border-[#d4e9d8] bg-[#f8fdf8] text-sm font-semibold text-[#4a5a4e] hover:bg-[#f0f7f1] transition-colors">
                  Cancelar
                </button>
                <button onClick={handleGuardar} disabled={saving}
                  className="flex flex-1 items-center justify-center gap-2 py-3 rounded-xl bg-[#1a4a2e] hover:bg-[#153d25] disabled:opacity-60 text-white text-sm font-bold shadow-lg shadow-[#1a4a2e]/20 transition-all">
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  {saving ? "Guardando..." : editando ? "Actualizar" : "Crear testimonio"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}