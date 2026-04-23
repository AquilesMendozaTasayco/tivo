"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc,
  doc, serverTimestamp, orderBy, query,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import Swal from "sweetalert2";
import { Plus, Pencil, Trash2, Eye, EyeOff, Upload, X, Save, Loader2, ImageIcon, GripVertical } from "lucide-react";

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

const formInicial = {
  titulo: "", subtitulo: "", cta: "", href: "/productos",
  imagen: "", orden: 0, active: true,
};

export default function AdminBannersPage() {
  const [banners,   setBanners]   = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editando,  setEditando]  = useState(null);
  const [formData,  setFormData]  = useState(formInicial);
  const [saving,    setSaving]    = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => { fetchBanners(); }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const snap = await getDocs(query(collection(db, "banners"), orderBy("orden", "asc")));
      setBanners(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch { Toast.fire({ icon: "error", title: "Error al cargar banners" }); }
    finally  { setLoading(false); }
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return Swal.fire({ ...swalBase, icon: "error", title: "Solo imágenes" });
    if (file.size > 5 * 1024 * 1024)    return Swal.fire({ ...swalBase, icon: "error", title: "Máximo 5 MB" });
    try {
      setUploading(true);
      const r = ref(storage, `banners/${Date.now()}_${file.name}`);
      await uploadBytes(r, file);
      set("imagen", await getDownloadURL(r));
      Toast.fire({ icon: "success", title: "Imagen subida" });
    } catch { Swal.fire({ ...swalBase, icon: "error", title: "Error al subir imagen" }); }
    finally  { setUploading(false); }
  };

  const handleCrear = () => {
    setEditando(null);
    setFormData({ ...formInicial, orden: banners.length });
    setShowModal(true);
  };

  const handleEditar = (b) => {
    setEditando(b);
    setFormData({
      titulo:    b.titulo    || "",
      subtitulo: b.subtitulo || "",
      cta:       b.cta       || "",
      href:      b.href      || "/productos",
      imagen:    b.imagen    || "",
      orden:     b.orden     ?? 0,
      active:    b.active !== false,
    });
    setShowModal(true);
  };

  const handleGuardar = async () => {
    if (!formData.titulo.trim()) return Swal.fire({ ...swalBase, icon: "warning", title: "Título requerido" });
    if (!formData.imagen)        return Swal.fire({ ...swalBase, icon: "warning", title: "Imagen requerida" });
    const data = { ...formData, orden: Number(formData.orden), updatedAt: serverTimestamp() };
    try {
      setSaving(true);
      if (editando) {
        await updateDoc(doc(db, "banners", editando.id), data);
        Toast.fire({ icon: "success", title: "Banner actualizado" });
      } else {
        await addDoc(collection(db, "banners"), { ...data, createdAt: serverTimestamp() });
        Toast.fire({ icon: "success", title: "Banner creado" });
      }
      setShowModal(false);
      fetchBanners();
    } catch { Swal.fire({ ...swalBase, icon: "error", title: "Error al guardar" }); }
    finally { setSaving(false); }
  };

  const handleToggle = async (b) => {
    try {
      await updateDoc(doc(db, "banners", b.id), { active: !b.active, updatedAt: serverTimestamp() });
      Toast.fire({ icon: "success", title: b.active ? "Banner desactivado" : "Banner activado" });
      fetchBanners();
    } catch { Toast.fire({ icon: "error", title: "Error" }); }
  };

  const handleEliminar = async (b) => {
    const r = await Swal.fire({
      ...swalBase, icon: "warning", title: "¿Eliminar banner?",
      text: `"${b.titulo}" se eliminará permanentemente.`,
      showCancelButton: true, confirmButtonText: "Sí, eliminar", cancelButtonText: "Cancelar",
      customClass: { ...swalBase.customClass, confirmButton: "!bg-red-500 !rounded-xl !px-6 !py-2.5 !text-sm !font-semibold !text-white" },
    });
    if (!r.isConfirmed) return;
    try {
      if (b.imagen) try { await deleteObject(ref(storage, b.imagen)); } catch {}
      await deleteDoc(doc(db, "banners", b.id));
      Toast.fire({ icon: "success", title: "Banner eliminado" });
      fetchBanners();
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
              <h1 className="text-2xl font-bold text-[#1a2e1f]" style={{ fontFamily: "Georgia, serif" }}>Banners Hero</h1>
            </div>
            <p className="ml-4 text-xs font-medium text-[#4a5a4e] uppercase tracking-widest mt-0.5">Gestiona el carrusel de la página principal</p>
          </div>
          <button onClick={handleCrear}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1a4a2e] hover:bg-[#153d25] text-white text-sm font-semibold rounded-xl shadow-md shadow-[#1a4a2e]/20 hover:-translate-y-0.5 transition-all">
            <Plus className="h-4 w-4" /> Nuevo banner
          </button>
        </motion.div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total",     value: banners.length,                                  bg: "bg-white",     border: "border-[#e2f0e4]", text: "text-[#1a2e1f]" },
            { label: "Activos",   value: banners.filter((b) => b.active !== false).length, bg: "bg-[#f0f7f1]", border: "border-[#c6e3cb]", text: "text-[#1a4a2e]" },
            { label: "Inactivos", value: banners.filter((b) => b.active === false).length,  bg: "bg-red-50",    border: "border-red-200",   text: "text-red-600"   },
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
        ) : banners.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#e2f0e4] p-16 text-center">
            <ImageIcon className="h-14 w-14 mx-auto mb-4 text-[#c6e3cb]" />
            <p className="text-sm font-semibold text-[#4a5a4e] uppercase tracking-widest">No hay banners</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {banners.map((b, i) => (
              <motion.div key={b.id}
                className="group bg-white rounded-2xl border border-[#e2f0e4] hover:border-[#4a8c5c] hover:shadow-lg overflow-hidden transition-all duration-300"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>

                <div className="flex flex-col sm:flex-row">
                  <div className="relative w-full sm:w-44 h-36 sm:h-auto flex-shrink-0 overflow-hidden">
                    {b.imagen ? (
                      <img src={b.imagen} alt={b.titulo} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-[#f8fdf8] flex items-center justify-center min-h-[100px]">
                        <ImageIcon className="h-8 w-8 text-[#c6e3cb]" />
                      </div>
                    )}
                    <div className="absolute top-2 left-2">
                      <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${b.active !== false ? "bg-[#f0f7f1] text-[#1a4a2e] border border-[#c6e3cb]" : "bg-red-50 text-red-600 border border-red-200"}`}>
                        {b.active !== false ? "Activo" : "Inactivo"}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 p-4 flex flex-col gap-3 min-w-0">
                    <div className="flex items-start gap-2 min-w-0">
                      <GripVertical className="h-4 w-4 text-[#c6e3cb] flex-shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-[#1a2e1f] truncate">{b.titulo}</p>
                        <p className="text-xs text-[#4a5a4e] line-clamp-2 mt-0.5">{b.subtitulo}</p>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
                          <span className="text-[10px] text-[#9ab5a0]">CTA: <span className="text-[#1a4a2e] font-medium">{b.cta}</span></span>
                          <span className="text-[10px] text-[#9ab5a0]">→ <span className="font-medium">{b.href}</span></span>
                          <span className="text-[10px] text-[#9ab5a0]">Orden: <span className="font-medium">{b.orden}</span></span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#f0f7f1]">
                      <button onClick={() => handleEditar(b)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#f0f7f1] hover:bg-[#e2f0e4] text-[#1a4a2e] text-[10px] font-semibold uppercase tracking-wider transition-colors">
                        <Pencil className="h-3 w-3" /> Editar
                      </button>
                      <button onClick={() => handleToggle(b)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-colors ${b.active !== false ? "bg-orange-50 hover:bg-orange-100 text-orange-600" : "bg-[#f0f7f1] hover:bg-[#e2f0e4] text-[#1a4a2e]"}`}>
                        {b.active !== false ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        {b.active !== false ? "Ocultar" : "Activar"}
                      </button>
                      <button onClick={() => handleEliminar(b)}
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
                    {editando ? "Editar banner" : "Nuevo banner"}
                  </h2>
                </div>
                <button onClick={() => setShowModal(false)} className="p-2 rounded-lg text-[#4a5a4e] hover:bg-[#f0f7f1] transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="px-7 py-6 flex flex-col gap-6">
                <div>
                  <h3 className={sc}>Contenido del banner</h3>
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className={lc}>Título *</label>
                      <input type="text" value={formData.titulo} onChange={(e) => set("titulo", e.target.value)}
                        placeholder="La naturaleza es nuestra farmacia" className={ic} />
                    </div>
                    <div>
                      <label className={lc}>Subtítulo</label>
                      <textarea value={formData.subtitulo} onChange={(e) => set("subtitulo", e.target.value)} rows={3}
                        placeholder="Descripción del banner..." className={`${ic} resize-none`} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={lc}>Texto del botón CTA</label>
                        <input type="text" value={formData.cta} onChange={(e) => set("cta", e.target.value)}
                          placeholder="Descubre nuestros productos" className={ic} />
                      </div>
                      <div>
                        <label className={lc}>Enlace del botón</label>
                        <input type="text" value={formData.href} onChange={(e) => set("href", e.target.value)}
                          placeholder="/productos" className={ic} />
                      </div>
                    </div>
                    <div>
                      <label className={lc}>Orden <span className="normal-case text-[#9ab5a0] tracking-normal font-normal">(menor = primero)</span></label>
                      <input type="number" value={formData.orden} onChange={(e) => set("orden", e.target.value)}
                        placeholder="0" className={ic} />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className={sc}>Imagen de fondo</h3>
                  {formData.imagen ? (
                    <div className="relative">
                      <img src={formData.imagen} alt="preview" className="w-full h-48 object-cover rounded-xl border border-[#d4e9d8]" />
                      <button onClick={() => set("imagen", "")}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <label className={`flex h-48 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all ${uploading ? "border-[#1a4a2e] bg-[#f0f7f1]" : "border-[#c6e3cb] bg-[#f8fdf8] hover:border-[#1a4a2e] hover:bg-[#f0f7f1]"}`}>
                      {uploading ? <Loader2 className="h-7 w-7 animate-spin text-[#1a4a2e]" /> : (
                        <>
                          <Upload className="h-7 w-7 text-[#a8d5a2] mb-2" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#4a5a4e]">Subir imagen de fondo</span>
                          <span className="text-[10px] text-[#9ab5a0] mt-0.5">PNG, JPG — máx. 5 MB — recomendado 1920×1080</span>
                        </>
                      )}
                      <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} />
                    </label>
                  )}
                </div>

                <label className="flex items-center gap-4 p-4 rounded-xl border border-[#c6e3cb] bg-[#f0f7f1] cursor-pointer hover:border-[#4a8c5c] transition-colors">
                  <input type="checkbox" checked={formData.active} onChange={(e) => set("active", e.target.checked)} className="h-4 w-4 accent-[#1a4a2e] rounded" />
                  <div>
                    <p className="text-xs font-bold text-[#1a4a2e] uppercase tracking-wider">Banner activo</p>
                    <p className="text-xs text-[#4a5a4e]">Visible en el carrusel del home</p>
                  </div>
                </label>
              </div>

              <div className="sticky bottom-0 bg-white border-t border-[#e2f0e4] px-7 py-5 flex gap-3">
                <button onClick={() => setShowModal(false)}
                  className="flex-1 py-3 rounded-xl border border-[#d4e9d8] bg-[#f8fdf8] text-sm font-semibold text-[#4a5a4e] hover:bg-[#f0f7f1] transition-colors">
                  Cancelar
                </button>
                <button onClick={handleGuardar} disabled={saving || uploading}
                  className="flex flex-1 items-center justify-center gap-2 py-3 rounded-xl bg-[#1a4a2e] hover:bg-[#153d25] disabled:opacity-60 text-white text-sm font-bold shadow-lg shadow-[#1a4a2e]/20 transition-all">
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  {saving ? "Guardando..." : editando ? "Actualizar banner" : "Crear banner"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}