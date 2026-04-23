"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc,
  doc, serverTimestamp, query, orderBy,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import Swal from "sweetalert2";
import { Plus, Pencil, Trash2, Eye, EyeOff, Upload, X, Save, Search, Package, Loader2, GripVertical } from "lucide-react";

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
  nombre: "", subtitulo: "", tagline: "",
  descripcionCorta: "", descripcionLarga: "",
  color: "#1a4a2e", colorClaro: "#e9f5ec",
  beneficiosPills: "",
  usoInterno: [], usoExterno: [],
  imagen: "", imagenHero: "", imagenDetalle1: "", imagenDetalle2: "",
  active: true, slug: "",
};

function ListaDinamica({ label, items, onChange, placeholder }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between mb-0.5">
        <label className="block text-[10px] font-bold uppercase tracking-[0.25em] text-[#4a5a4e]">{label}</label>
        <span className="text-[10px] text-[#9ab5a0]">{items.length} ítem{items.length !== 1 ? "s" : ""}</span>
      </div>
      <div className="flex flex-col gap-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <GripVertical className="h-4 w-4 text-[#c6e3cb] flex-shrink-0" />
            <input type="text" value={item}
              onChange={(e) => { const n = [...items]; n[i] = e.target.value; onChange(n); }}
              placeholder={placeholder}
              className="flex-1 px-3 py-2 rounded-xl border border-[#d4e9d8] bg-[#f8fdf8] text-sm text-[#1a2e1f] placeholder-[#9ab5a0] outline-none focus:border-[#1a4a2e] focus:ring-2 focus:ring-[#1a4a2e]/10 transition-all"
            />
            <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 hover:bg-red-100 text-red-400 hover:text-red-600 transition-colors flex-shrink-0">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => onChange([...items, ""])}
        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-dashed border-[#a8d5a2] bg-[#f8fdf8] hover:bg-[#f0f7f1] text-[#1a4a2e] text-xs font-semibold transition-colors mt-1">
        <Plus className="h-3.5 w-3.5" /> Agregar ítem
      </button>
    </div>
  );
}

function UploadImagen({ label, value, uploading, onChange, onClear }) {
  return (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-[0.25em] text-[#4a5a4e] mb-1.5">{label}</label>
      {value ? (
        <div className="relative">
          <img src={value} alt={label} className="w-full h-40 object-cover rounded-xl border border-[#d4e9d8]" />
          <button type="button" onClick={onClear} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <label className={`flex h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all ${uploading ? "border-[#1a4a2e] bg-[#f0f7f1]" : "border-[#c6e3cb] bg-[#f8fdf8] hover:border-[#1a4a2e] hover:bg-[#f0f7f1]"}`}>
          {uploading ? <Loader2 className="h-7 w-7 animate-spin text-[#1a4a2e]" /> : (
            <>
              <Upload className="h-7 w-7 text-[#a8d5a2] mb-2" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#4a5a4e]">Subir imagen</span>
              <span className="text-[10px] text-[#9ab5a0] mt-0.5">PNG, JPG — máx. 5 MB</span>
            </>
          )}
          <input type="file" accept="image/*" onChange={onChange} className="hidden" disabled={uploading} />
        </label>
      )}
    </div>
  );
}

export default function AdminProductosPage() {
  const [productos,         setProductos]         = useState([]);
  const [loading,           setLoading]           = useState(true);
  const [showModal,         setShowModal]         = useState(false);
  const [editando,          setEditando]          = useState(null);
  const [formData,          setFormData]          = useState(formInicial);
  const [searchTerm,        setSearchTerm]        = useState("");
  const [saving,            setSaving]            = useState(false);
  const [uploadingImg,      setUploadingImg]      = useState(false);
  const [uploadingHero,     setUploadingHero]     = useState(false);
  const [uploadingDet1,     setUploadingDet1]     = useState(false);
  const [uploadingDet2,     setUploadingDet2]     = useState(false);

  useEffect(() => { fetchProductos(); }, []);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const snap = await getDocs(query(collection(db, "productos"), orderBy("nombre", "asc")));
      setProductos(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch { Toast.fire({ icon: "error", title: "Error al cargar" }); }
    finally  { setLoading(false); }
  };

  const upload = async (e, campo) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return Swal.fire({ ...swalBase, icon: "error", title: "Solo imágenes" });
    if (file.size > 5 * 1024 * 1024)    return Swal.fire({ ...swalBase, icon: "error", title: "Máximo 5 MB" });
    const map = { imagen: setUploadingImg, imagenHero: setUploadingHero, imagenDetalle1: setUploadingDet1, imagenDetalle2: setUploadingDet2 };
    try {
      map[campo]?.(true);
      const r = ref(storage, `productos/${Date.now()}_${file.name}`);
      await uploadBytes(r, file);
      set(campo, await getDownloadURL(r));
      Toast.fire({ icon: "success", title: "Imagen subida" });
    } catch { Swal.fire({ ...swalBase, icon: "error", title: "Error al subir" }); }
    finally  { map[campo]?.(false); }
  };

  const handleCrear = () => { setEditando(null); setFormData(formInicial); setShowModal(true); };

  const handleEditar = (p) => {
    setEditando(p);
    setFormData({
      nombre: p.nombre || "", subtitulo: p.subtitulo || "", tagline: p.tagline || "",
      descripcionCorta: p.descripcionCorta || "", descripcionLarga: p.descripcionLarga || "",
      color: p.color || "#1a4a2e", colorClaro: p.colorClaro || "#e9f5ec",
      beneficiosPills: (p.beneficiosPills || []).join(", "),
      usoInterno: p.usoInterno || [], usoExterno: p.usoExterno || [],
      imagen: p.imagen || "", imagenHero: p.imagenHero || "",
      imagenDetalle1: p.imagenDetalle1 || "", imagenDetalle2: p.imagenDetalle2 || "",
      active: p.active !== false, slug: p.slug || "",
    });
    setShowModal(true);
  };

  const handleGuardar = async () => {
    if (!formData.nombre.trim()) return Swal.fire({ ...swalBase, icon: "warning", title: "Nombre requerido" });
    if (!formData.slug.trim())   return Swal.fire({ ...swalBase, icon: "warning", title: "Slug requerido", text: "Ej: esencia-verde" });
    if (!formData.imagen)        return Swal.fire({ ...swalBase, icon: "warning", title: "Imagen principal requerida" });
    const data = {
      ...formData,
      beneficiosPills: formData.beneficiosPills.split(",").map((s) => s.trim()).filter(Boolean),
      usoInterno: formData.usoInterno.filter(Boolean),
      usoExterno: formData.usoExterno.filter(Boolean),
      updatedAt: serverTimestamp(),
    };
    try {
      setSaving(true);
      if (editando) {
        await updateDoc(doc(db, "productos", editando.id), data);
        Toast.fire({ icon: "success", title: "Producto actualizado" });
      } else {
        await addDoc(collection(db, "productos"), { ...data, createdAt: serverTimestamp() });
        Toast.fire({ icon: "success", title: "Producto creado" });
      }
      setShowModal(false); fetchProductos();
    } catch { Swal.fire({ ...swalBase, icon: "error", title: "Error al guardar" }); }
    finally { setSaving(false); }
  };

  const handleToggle = async (p) => {
    try {
      await updateDoc(doc(db, "productos", p.id), { active: !p.active, updatedAt: serverTimestamp() });
      Toast.fire({ icon: "success", title: p.active ? "Desactivado" : "Activado" });
      fetchProductos();
    } catch { Toast.fire({ icon: "error", title: "Error" }); }
  };

  const handleEliminar = async (p) => {
    const r = await Swal.fire({
      ...swalBase, icon: "warning", title: "¿Eliminar producto?",
      text: `"${p.nombre}" se eliminará permanentemente.`,
      showCancelButton: true, confirmButtonText: "Sí, eliminar", cancelButtonText: "Cancelar",
      customClass: { ...swalBase.customClass, confirmButton: "!bg-red-500 !rounded-xl !px-6 !py-2.5 !text-sm !font-semibold !text-white" },
    });
    if (!r.isConfirmed) return;
    try {
      for (const c of ["imagen", "imagenHero", "imagenDetalle1", "imagenDetalle2"])
        if (p[c]) try { await deleteObject(ref(storage, p[c])); } catch {}
      await deleteDoc(doc(db, "productos", p.id));
      Toast.fire({ icon: "success", title: "Eliminado" }); fetchProductos();
    } catch { Swal.fire({ ...swalBase, icon: "error", title: "Error al eliminar" }); }
  };

  const set = (k, v) => setFormData((p) => ({ ...p, [k]: v }));
  const ic = "w-full px-4 py-3 rounded-xl border border-[#d4e9d8] bg-[#f8fdf8] text-sm text-[#1a2e1f] placeholder-[#9ab5a0] outline-none focus:border-[#1a4a2e] focus:ring-2 focus:ring-[#1a4a2e]/10 transition-all";
  const lc = "block text-[10px] font-bold uppercase tracking-[0.25em] text-[#4a5a4e] mb-1.5";
  const sc = "text-xs font-bold text-[#1a4a2e] uppercase tracking-widest mb-4 pb-2 border-b border-[#e2f0e4]";
  const filtrados    = productos.filter((p) => p.nombre?.toLowerCase().includes(searchTerm.toLowerCase()));
  const anyUploading = uploadingImg || uploadingHero || uploadingDet1 || uploadingDet2;

  return (
    <div className="min-h-screen bg-[#f8fdf8] p-6 lg:p-8">
      <div className="mx-auto max-w-7xl flex flex-col gap-8">

        <motion.div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
          <div>
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 rounded-full bg-[#1a4a2e]" />
              <h1 className="text-2xl font-bold text-[#1a2e1f]" style={{ fontFamily: "Georgia, serif" }}>Productos</h1>
            </div>
            <p className="ml-4 text-xs font-medium text-[#4a5a4e] uppercase tracking-widest mt-0.5">Catálogo de fitofármacos</p>
          </div>
          <button onClick={handleCrear} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1a4a2e] hover:bg-[#153d25] text-white text-sm font-semibold rounded-xl shadow-md shadow-[#1a4a2e]/20 hover:-translate-y-0.5 transition-all">
            <Plus className="h-4 w-4" /> Nuevo producto
          </button>
        </motion.div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total",     value: productos.length,                                   bg: "bg-white",     border: "border-[#e2f0e4]", text: "text-[#1a2e1f]" },
            { label: "Activos",   value: productos.filter((p) => p.active !== false).length, bg: "bg-[#f0f7f1]", border: "border-[#c6e3cb]", text: "text-[#1a4a2e]" },
            { label: "Inactivos", value: productos.filter((p) => p.active === false).length,  bg: "bg-red-50",    border: "border-red-200",   text: "text-red-600"   },
          ].map((s, i) => (
            <motion.div key={i} className={`${s.bg} border ${s.border} rounded-2xl p-5 shadow-sm`}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#6b7c6e] mb-1">{s.label}</p>
              <p className={`text-3xl font-bold ${s.text}`} style={{ fontFamily: "Georgia, serif" }}>{s.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9ab5a0]" />
          <input type="text" placeholder="Buscar producto..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#d4e9d8] bg-white text-sm text-[#1a2e1f] placeholder-[#9ab5a0] outline-none focus:border-[#1a4a2e] focus:ring-2 focus:ring-[#1a4a2e]/10 shadow-sm transition-all" />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-[#1a4a2e]" /></div>
        ) : filtrados.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#e2f0e4] p-16 text-center">
            <Package className="h-14 w-14 mx-auto mb-4 text-[#c6e3cb]" />
            <p className="text-sm font-semibold text-[#4a5a4e] uppercase tracking-widest">{searchTerm ? "Sin resultados" : "No hay productos"}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtrados.map((p, i) => (
              <motion.div key={p.id} className="group bg-white rounded-2xl border border-[#e2f0e4] hover:border-[#4a8c5c] hover:shadow-lg overflow-hidden transition-all duration-300 flex flex-col"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <div className="relative h-44 overflow-hidden bg-[#f8fdf8]">
                  {p.imagen ? <img src={p.imagen} alt={p.nombre} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    : <div className="w-full h-full flex items-center justify-center"><Package className="h-12 w-12 text-[#c6e3cb]" /></div>}
                  <div className="absolute inset-0 opacity-20" style={{ backgroundColor: p.color || "#1a4a2e" }} />
                  <div className="absolute top-3 right-3">
                    <span className={`text-[9px] font-bold uppercase px-2.5 py-1 rounded-full ${p.active !== false ? "bg-[#f0f7f1] text-[#1a4a2e] border border-[#c6e3cb]" : "bg-red-50 text-red-600 border border-red-200"}`}>
                      {p.active !== false ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-white text-xs font-bold shadow-md" style={{ backgroundColor: p.color || "#1a4a2e" }}>{p.nombre}</div>
                </div>
                <div className="p-4 flex flex-col gap-3 flex-1">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: p.color || "#1a4a2e" }}>{p.subtitulo}</p>
                    <p className="text-xs text-[#4a5a4e] line-clamp-2 leading-relaxed">{p.descripcionCorta}</p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {[{ key: "imagen", label: "Principal" }, { key: "imagenHero", label: "Hero" }, { key: "imagenDetalle1", label: "Det. 1" }, { key: "imagenDetalle2", label: "Det. 2" }].map((img) => (
                      <span key={img.key} className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${p[img.key] ? "bg-[#f0f7f1] text-[#1a4a2e]" : "bg-slate-100 text-slate-400"}`}>
                        {img.label} {p[img.key] ? "✓" : "—"}
                      </span>
                    ))}
                  </div>
                  {p.beneficiosPills?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {p.beneficiosPills.slice(0, 3).map((b, j) => (<span key={j} className="text-[9px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: p.colorClaro || "#e9f5ec", color: p.color || "#1a4a2e" }}>{b}</span>))}
                      {p.beneficiosPills.length > 3 && <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#f0f7f1] text-[#4a5a4e]">+{p.beneficiosPills.length - 3}</span>}
                    </div>
                  )}
                  <div className="grid grid-cols-3 gap-1.5 mt-auto">
                    <button onClick={() => handleEditar(p)} className="flex items-center justify-center gap-1 py-2 rounded-lg bg-[#f0f7f1] hover:bg-[#e2f0e4] text-[#1a4a2e] text-[10px] font-semibold uppercase tracking-wider transition-colors"><Pencil className="h-3 w-3" />Editar</button>
                    <button onClick={() => handleToggle(p)} className={`flex items-center justify-center gap-1 py-2 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-colors ${p.active !== false ? "bg-orange-50 hover:bg-orange-100 text-orange-600" : "bg-[#f0f7f1] hover:bg-[#e2f0e4] text-[#1a4a2e]"}`}>
                      {p.active !== false ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}{p.active !== false ? "Ocultar" : "Activar"}
                    </button>
                    <button onClick={() => handleEliminar(p)} className="flex items-center justify-center gap-1 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-[10px] font-semibold uppercase tracking-wider transition-colors"><Trash2 className="h-3 w-3" />Eliminar</button>
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
            <motion.div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} />
            <motion.div className="fixed left-1/2 top-1/2 z-50 w-full max-w-3xl max-h-[92vh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-white rounded-2xl shadow-2xl border border-[#e2f0e4]"
              initial={{ opacity: 0, scale: 0.95, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 24 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>

              <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-7 py-5 border-b border-[#e2f0e4]">
                <div className="flex items-center gap-3"><div className="w-1 h-6 rounded-full bg-[#1a4a2e]" /><h2 className="text-lg font-bold text-[#1a2e1f]" style={{ fontFamily: "Georgia, serif" }}>{editando ? "Editar producto" : "Nuevo producto"}</h2></div>
                <button onClick={() => setShowModal(false)} className="p-2 rounded-lg text-[#4a5a4e] hover:bg-[#f0f7f1] transition-colors"><X className="h-5 w-5" /></button>
              </div>

              <div className="px-7 py-6 flex flex-col gap-7">
                <div>
                  <h3 className={sc}>Información básica</h3>
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className={lc}>Nombre *</label><input type="text" value={formData.nombre} onChange={(e) => set("nombre", e.target.value)} placeholder="Ej: Esencia Verde" className={ic} /></div>
                      <div><label className={lc}>Slug * <span className="normal-case text-[#9ab5a0] tracking-normal font-normal">(url)</span></label><input type="text" value={formData.slug} onChange={(e) => set("slug", e.target.value)} placeholder="esencia-verde" className={ic} /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className={lc}>Subtítulo</label><input type="text" value={formData.subtitulo} onChange={(e) => set("subtitulo", e.target.value)} placeholder="Extracto bioactivo..." className={ic} /></div>
                      <div><label className={lc}>Tagline</label><input type="text" value={formData.tagline} onChange={(e) => set("tagline", e.target.value)} placeholder="El poder de la naturaleza..." className={ic} /></div>
                    </div>
                    <div><label className={lc}>Descripción corta</label><textarea value={formData.descripcionCorta} onChange={(e) => set("descripcionCorta", e.target.value)} rows={2} placeholder="Para tarjetas..." className={`${ic} resize-none`} /></div>
                    <div><label className={lc}>Descripción larga</label><textarea value={formData.descripcionLarga} onChange={(e) => set("descripcionLarga", e.target.value)} rows={4} placeholder="Descripción completa..." className={`${ic} resize-none`} /></div>
                  </div>
                </div>

                <div>
                  <h3 className={sc}>Colores y beneficios</h3>
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className={lc}>Color principal</label><div className="flex items-center gap-2"><input type="color" value={formData.color} onChange={(e) => set("color", e.target.value)} className="h-10 w-12 rounded-lg border border-[#d4e9d8] cursor-pointer flex-shrink-0" /><input type="text" value={formData.color} onChange={(e) => set("color", e.target.value)} className={`${ic} flex-1`} /></div></div>
                      <div><label className={lc}>Color claro</label><div className="flex items-center gap-2"><input type="color" value={formData.colorClaro} onChange={(e) => set("colorClaro", e.target.value)} className="h-10 w-12 rounded-lg border border-[#d4e9d8] cursor-pointer flex-shrink-0" /><input type="text" value={formData.colorClaro} onChange={(e) => set("colorClaro", e.target.value)} className={`${ic} flex-1`} /></div></div>
                    </div>
                    <div>
                      <label className={lc}>Pills de beneficios <span className="normal-case text-[#9ab5a0] tracking-normal font-normal">(separados por coma)</span></label>
                      <input type="text" value={formData.beneficiosPills} onChange={(e) => set("beneficiosPills", e.target.value)} placeholder="Antiinflamatorio, Antioxidante, Cicatrizante" className={ic} />
                      {formData.beneficiosPills && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {formData.beneficiosPills.split(",").map((b, i) => b.trim() && (<span key={i} className="text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: formData.colorClaro, color: formData.color }}>{b.trim()}</span>))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className={sc}>Usos y propiedades</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <ListaDinamica label="Uso interno" items={formData.usoInterno} onChange={(v) => set("usoInterno", v)} placeholder="Ej: Anticancerígeno y antitumoral" />
                    <ListaDinamica label="Uso externo" items={formData.usoExterno} onChange={(v) => set("usoExterno", v)} placeholder="Ej: Antiséptico para heridas" />
                  </div>
                </div>

                <div>
                  <h3 className={sc}>Imágenes</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <UploadImagen label="Imagen principal *"         value={formData.imagen}         uploading={uploadingImg}  onChange={(e) => upload(e, "imagen")}         onClear={() => set("imagen", "")} />
                    <UploadImagen label="Imagen hero (banner)"       value={formData.imagenHero}     uploading={uploadingHero} onChange={(e) => upload(e, "imagenHero")}     onClear={() => set("imagenHero", "")} />
                    <UploadImagen label="Imagen detalle 1 (galería)" value={formData.imagenDetalle1} uploading={uploadingDet1} onChange={(e) => upload(e, "imagenDetalle1")} onClear={() => set("imagenDetalle1", "")} />
                    <UploadImagen label="Imagen detalle 2 (galería)" value={formData.imagenDetalle2} uploading={uploadingDet2} onChange={(e) => upload(e, "imagenDetalle2")} onClear={() => set("imagenDetalle2", "")} />
                  </div>
                  <p className="text-[10px] text-[#9ab5a0] mt-2">Las imágenes detalle 1 y 2 se muestran como galería vertical en la página del producto.</p>
                </div>

                <label className="flex items-center gap-4 p-4 rounded-xl border border-[#c6e3cb] bg-[#f0f7f1] cursor-pointer hover:border-[#4a8c5c] transition-colors">
                  <input type="checkbox" checked={formData.active} onChange={(e) => set("active", e.target.checked)} className="h-4 w-4 accent-[#1a4a2e] rounded" />
                  <div><p className="text-xs font-bold text-[#1a4a2e] uppercase tracking-wider">Producto activo</p><p className="text-xs text-[#4a5a4e]">Visible en el catálogo público del sitio web</p></div>
                </label>
              </div>

              <div className="sticky bottom-0 bg-white border-t border-[#e2f0e4] px-7 py-5 flex gap-3">
                <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl border border-[#d4e9d8] bg-[#f8fdf8] text-sm font-semibold text-[#4a5a4e] hover:bg-[#f0f7f1] transition-colors">Cancelar</button>
                <button onClick={handleGuardar} disabled={saving || anyUploading}
                  className="flex flex-1 items-center justify-center gap-2 py-3 rounded-xl bg-[#1a4a2e] hover:bg-[#153d25] disabled:opacity-60 text-white text-sm font-bold shadow-lg shadow-[#1a4a2e]/20 transition-all">
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  {saving ? "Guardando..." : editando ? "Actualizar producto" : "Crear producto"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}