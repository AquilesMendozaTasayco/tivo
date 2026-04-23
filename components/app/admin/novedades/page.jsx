"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc,
  doc, serverTimestamp, query, orderBy
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import Swal from "sweetalert2";
import {
  Plus, Pencil, Trash2, Eye, EyeOff, Upload, X, Save,
  Newspaper, Search, Star, StarOff, Tag, Calendar, FileText, ImageIcon, PlusCircle, MinusCircle
} from "lucide-react";

const categorias = ["Lanzamientos", "Tecnología", "Expansión", "Ingeniería", "Corporativo", "Sostenibilidad", "Noticias"];

const bloqueVacio = () => ({ tipo: "parrafo", texto: "" });

export default function AdminNovedadesPage() {
  const [novedades, setNovedades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingNovedad, setEditingNovedad] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategoria, setFilterCategoria] = useState("");
  const [formData, setFormData] = useState({
    slug: "",
    categoria: "",
    fecha: "",
    titulo: "",
    extracto: "",
    imagenPrincipal: "",
    contenido: [bloqueVacio()],
    active: true,
    destacado: false,
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingContentImage, setUploadingContentImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => { fetchNovedades(); }, []);

  const fetchNovedades = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "novedades"), orderBy("fecha", "desc"));
      const snap = await getDocs(q);
      setNovedades(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) {
      Swal.fire({ icon: "error", title: "Error", text: "No se pudieron cargar las novedades", confirmButtonColor: "#1e3a8a" });
    } finally { setLoading(false); }
  };

  const generateSlug = (text) =>
    text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");

  const handleImageUpload = async (e, type = "principal", index = null) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { Swal.fire({ icon: "error", title: "Archivo inválido", confirmButtonColor: "#1e3a8a" }); return; }
    if (file.size > 5 * 1024 * 1024) { Swal.fire({ icon: "error", title: "Imagen muy grande (máx. 5MB)", confirmButtonColor: "#1e3a8a" }); return; }

    try {
      if (type === "principal") setUploadingImage(true);
      else setUploadingContentImage(index);

      const storageRef = ref(storage, `novedades/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      if (type === "principal") {
        setFormData(p => ({ ...p, imagenPrincipal: url }));
        setImagePreview(url);
      } else {
        const newContenido = [...formData.contenido];
        newContenido[index] = { ...newContenido[index], url };
        setFormData(p => ({ ...p, contenido: newContenido }));
      }

      Swal.fire({ icon: "success", title: "¡Imagen subida!", timer: 1200, showConfirmButton: false });
    } catch (e) {
      Swal.fire({ icon: "error", title: "Error al subir imagen", confirmButtonColor: "#1e3a8a" });
    } finally {
      setUploadingImage(false);
      setUploadingContentImage(null);
    }
  };

  const handleCreate = () => {
    setEditingNovedad(null);
    setFormData({ slug: "", categoria: "", fecha: "", titulo: "", extracto: "", imagenPrincipal: "", contenido: [bloqueVacio()], active: true, destacado: false });
    setImagePreview("");
    setShowModal(true);
  };

  const handleEdit = (novedad) => {
    setEditingNovedad(novedad);
    setFormData({
      slug: novedad.slug || "",
      categoria: novedad.categoria || "",
      fecha: novedad.fecha || "",
      titulo: novedad.titulo || "",
      extracto: novedad.extracto || "",
      imagenPrincipal: novedad.imagenPrincipal || "",
      contenido: novedad.contenido?.length ? novedad.contenido : [bloqueVacio()],
      active: novedad.active !== undefined ? novedad.active : true,
      destacado: novedad.destacado || false,
    });
    setImagePreview(novedad.imagenPrincipal || "");
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formData.titulo.trim()) { Swal.fire({ icon: "warning", title: "Título requerido", confirmButtonColor: "#1e3a8a" }); return; }
    if (!formData.categoria) { Swal.fire({ icon: "warning", title: "Categoría requerida", confirmButtonColor: "#1e3a8a" }); return; }
    if (!formData.fecha) { Swal.fire({ icon: "warning", title: "Fecha requerida", confirmButtonColor: "#1e3a8a" }); return; }
    if (!formData.imagenPrincipal) { Swal.fire({ icon: "warning", title: "Imagen principal requerida", confirmButtonColor: "#1e3a8a" }); return; }
    try {
      const data = { ...formData, slug: formData.slug || generateSlug(formData.titulo) };
      if (editingNovedad) {
        await updateDoc(doc(db, "novedades", editingNovedad.id), { ...data, updatedAt: serverTimestamp() });
        Swal.fire({ icon: "success", title: "¡Actualizado!", timer: 1500, showConfirmButton: false });
      } else {
        await addDoc(collection(db, "novedades"), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
        Swal.fire({ icon: "success", title: "¡Creado!", timer: 1500, showConfirmButton: false });
      }
      setShowModal(false);
      fetchNovedades();
    } catch (e) {
      Swal.fire({ icon: "error", title: "Error al guardar", confirmButtonColor: "#1e3a8a" });
    }
  };

  const handleToggleActive = async (novedad) => {
    try {
      await updateDoc(doc(db, "novedades", novedad.id), { active: !novedad.active, updatedAt: serverTimestamp() });
      Swal.fire({ icon: "success", title: novedad.active ? "Desactivado" : "Activado", timer: 1500, showConfirmButton: false });
      fetchNovedades();
    } catch (e) { Swal.fire({ icon: "error", title: "Error", confirmButtonColor: "#1e3a8a" }); }
  };

  const handleToggleDestacado = async (novedad) => {
    try {
      await updateDoc(doc(db, "novedades", novedad.id), { destacado: !novedad.destacado, updatedAt: serverTimestamp() });
      Swal.fire({ icon: "success", title: novedad.destacado ? "Removido de destacados" : "Añadido a destacados", timer: 1500, showConfirmButton: false });
      fetchNovedades();
    } catch (e) { Swal.fire({ icon: "error", title: "Error", confirmButtonColor: "#1e3a8a" }); }
  };

  const handleDelete = async (novedad) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?", text: `Se eliminará "${novedad.titulo}"`, icon: "warning",
      showCancelButton: true, confirmButtonColor: "#dc2626", cancelButtonColor: "#6b7280",
      confirmButtonText: "Sí, eliminar", cancelButtonText: "Cancelar", reverseButtons: true,
    });
    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, "novedades", novedad.id));
        Swal.fire({ icon: "success", title: "¡Eliminado!", timer: 1500, showConfirmButton: false });
        fetchNovedades();
      } catch (e) { Swal.fire({ icon: "error", title: "Error al eliminar", confirmButtonColor: "#1e3a8a" }); }
    }
  };

  // Gestión de bloques de contenido
  const addBloque = (tipo) => {
    const nuevo = tipo === "imagen"
      ? { tipo: "imagen", url: "", caption: "" }
      : { tipo: "parrafo", texto: "" };
    setFormData(p => ({ ...p, contenido: [...p.contenido, nuevo] }));
  };

  const removeBloque = (index) => {
    setFormData(p => ({ ...p, contenido: p.contenido.filter((_, i) => i !== index) }));
  };

  const updateBloque = (index, field, value) => {
    const newContenido = [...formData.contenido];
    newContenido[index] = { ...newContenido[index], [field]: value };
    setFormData(p => ({ ...p, contenido: newContenido }));
  };

  const filtered = novedades.filter(n => {
    const matchSearch = n.titulo?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = filterCategoria ? n.categoria === filterCategoria : true;
    return matchSearch && matchCat;
  });

  const categoriasDisponibles = [...new Set(novedades.map(n => n.categoria).filter(Boolean))];

  const categoriaBadgeColor = (cat) => {
    const map = {
      "Lanzamientos": "bg-blue-100 text-blue-700",
      "Tecnología": "bg-purple-100 text-purple-700",
      "Expansión": "bg-green-100 text-green-700",
      "Ingeniería": "bg-orange-100 text-orange-700",
      "Corporativo": "bg-slate-100 text-slate-700",
      "Sostenibilidad": "bg-emerald-100 text-emerald-700",
      "Noticias": "bg-red-100 text-red-700",
    };
    return map[cat] || "bg-slate-100 text-slate-700";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-8">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="h-8 w-1 bg-[#1e3a8a]" />
                <h1 className="text-4xl font-black uppercase tracking-tight text-slate-900">Novedades</h1>
              </div>
              <p className="mt-1 ml-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                Gestiona el blog y noticias de la empresa
              </p>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleCreate}
              className="flex items-center gap-2 rounded-xl bg-[#1e3a8a] px-6 py-3 font-bold text-xs uppercase tracking-widest text-white shadow-lg shadow-blue-900/30 transition-all hover:bg-[#1e40af] hover:shadow-xl">
              <Plus size={16} /> Nueva Novedad
            </motion.button>
          </div>

          <div className="mt-6 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="Buscar novedades..." value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border-2 border-slate-200 bg-white py-3 pl-12 pr-4 text-sm font-medium text-slate-900 placeholder-slate-400 transition-all focus:border-[#1e3a8a] focus:outline-none focus:ring-4 focus:ring-blue-900/10" />
            </div>
            <select value={filterCategoria} onChange={(e) => setFilterCategoria(e.target.value)}
              className="rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 transition-all focus:border-[#1e3a8a] focus:outline-none">
              <option value="">Todas las categorías</option>
              {categorias.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </motion.div>

        {/* STATS */}
        <div className="mb-8 grid grid-cols-4 gap-4">
          {[
            { label: "Total", value: novedades.length, bg: "bg-white", border: "border-slate-200", text: "text-slate-900" },
            { label: "Activas", value: novedades.filter(n => n.active !== false).length, bg: "bg-green-50", border: "border-green-200", text: "text-green-700" },
            { label: "Destacadas", value: novedades.filter(n => n.destacado).length, bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-700" },
            { label: "Inactivas", value: novedades.filter(n => n.active === false).length, bg: "bg-red-50", border: "border-red-200", text: "text-red-700" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className={`rounded-2xl border-2 ${s.border} ${s.bg} p-4 shadow-sm`}>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">{s.label}</p>
              <p className={`mt-1 text-3xl font-black ${s.text}`}>{s.value}</p>
            </motion.div>
          ))}
        </div>

        {/* GRID */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#1e3a8a] border-t-transparent" />
          </div>
        ) : filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl bg-white p-16 text-center shadow-xl">
            <Newspaper size={64} className="mx-auto mb-4 text-slate-300" />
            <p className="text-sm font-black uppercase tracking-widest text-slate-400">
              {searchTerm || filterCategoria ? "No se encontraron novedades" : "No hay novedades registradas"}
            </p>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((novedad, index) => (
              <motion.div key={novedad.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-2xl">

                {/* BADGES */}
                <div className="absolute right-3 top-3 z-10 flex flex-col gap-1">
                  <span className={`rounded-full px-2 py-0.5 text-[9px] font-black uppercase ${novedad.active !== false ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {novedad.active !== false ? "Activa" : "Inactiva"}
                  </span>
                  {novedad.destacado && (
                    <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-[9px] font-black uppercase text-yellow-700">★ Dest.</span>
                  )}
                </div>

                {/* IMAGEN */}
                <div className="relative h-40 w-full overflow-hidden">
                  <img src={novedad.imagenPrincipal} alt={novedad.titulo}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className={`absolute bottom-2 left-2 rounded-full px-2 py-0.5 text-[9px] font-black uppercase ${categoriaBadgeColor(novedad.categoria)}`}>
                    {novedad.categoria}
                  </span>
                </div>

                {/* INFO */}
                <div className="p-4">
                  <div className="mb-1 flex items-center gap-1 text-[9px] font-bold text-slate-400">
                    <Calendar size={10} />
                    {novedad.fecha}
                  </div>
                  <h3 className="mb-2 line-clamp-2 text-sm font-black leading-snug text-slate-900">{novedad.titulo}</h3>
                  <p className="mb-4 line-clamp-2 text-[10px] text-slate-500">{novedad.extracto}</p>

                  {/* ACCIONES */}
                  <div className="grid grid-cols-2 gap-1">
                    <button onClick={() => handleEdit(novedad)} className="flex items-center justify-center gap-1 rounded-lg bg-blue-100 px-2 py-2 text-[9px] font-black uppercase tracking-widest text-blue-700 transition-colors hover:bg-blue-200">
                      <Pencil size={11} /> Editar
                    </button>
                    <button onClick={() => handleToggleActive(novedad)} className={`flex items-center justify-center gap-1 rounded-lg px-2 py-2 text-[9px] font-black uppercase tracking-widest transition-colors ${novedad.active !== false ? "bg-orange-100 text-orange-700 hover:bg-orange-200" : "bg-green-100 text-green-700 hover:bg-green-200"}`}>
                      {novedad.active !== false ? <EyeOff size={11} /> : <Eye size={11} />}
                      {novedad.active !== false ? "Ocultar" : "Activar"}
                    </button>
                    <button onClick={() => handleToggleDestacado(novedad)} className={`flex items-center justify-center gap-1 rounded-lg px-2 py-2 text-[9px] font-black uppercase tracking-widest transition-colors ${novedad.destacado ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                      {novedad.destacado ? <Star size={11} /> : <StarOff size={11} />}
                      {novedad.destacado ? "Quitar" : "Destacar"}
                    </button>
                    <button onClick={() => handleDelete(novedad)} className="flex items-center justify-center gap-1 rounded-lg bg-red-100 px-2 py-2 text-[9px] font-black uppercase tracking-widest text-red-700 transition-colors hover:bg-red-200">
                      <Trash2 size={11} /> Eliminar
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* MODAL */}
        <AnimatePresence>
          {showModal && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setShowModal(false)}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />

              <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl">

                {/* HEADER */}
                <div className="mb-8 flex items-center justify-between border-b border-slate-100 pb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-1 bg-[#1e3a8a]" />
                    <h2 className="text-xl font-black uppercase tracking-widest text-slate-900">
                      {editingNovedad ? "Editar Novedad" : "Nueva Novedad"}
                    </h2>
                  </div>
                  <button onClick={() => setShowModal(false)} className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-6">

                  {/* Título + Slug */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Título *</label>
                      <input type="text" value={formData.titulo}
                        onChange={(e) => setFormData(p => ({ ...p, titulo: e.target.value, slug: generateSlug(e.target.value) }))}
                        placeholder="Título de la novedad"
                        className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 transition-all focus:border-[#1e3a8a] focus:outline-none focus:ring-4 focus:ring-blue-900/10" />
                    </div>
                    <div>
                      <label className="mb-2 block text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Slug (URL)</label>
                      <input type="text" value={formData.slug} onChange={(e) => setFormData(p => ({ ...p, slug: e.target.value }))}
                        placeholder="titulo-de-la-novedad"
                        className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm font-medium text-slate-600 transition-all focus:border-[#1e3a8a] focus:outline-none focus:ring-4 focus:ring-blue-900/10" />
                    </div>
                  </div>

                  {/* Categoría + Fecha */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Categoría *</label>
                      <select value={formData.categoria} onChange={(e) => setFormData(p => ({ ...p, categoria: e.target.value }))}
                        className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 transition-all focus:border-[#1e3a8a] focus:outline-none focus:ring-4 focus:ring-blue-900/10">
                        <option value="">Selecciona una categoría</option>
                        {categorias.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Fecha *</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input type="text" value={formData.fecha} onChange={(e) => setFormData(p => ({ ...p, fecha: e.target.value }))}
                          placeholder="Ej: 12 Feb 2026"
                          className="w-full rounded-xl border-2 border-slate-200 py-3 pl-9 pr-4 text-sm font-medium text-slate-900 transition-all focus:border-[#1e3a8a] focus:outline-none focus:ring-4 focus:ring-blue-900/10" />
                      </div>
                    </div>
                  </div>

                  {/* Extracto */}
                  <div>
                    <label className="mb-2 block text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Extracto / Resumen</label>
                    <textarea value={formData.extracto} onChange={(e) => setFormData(p => ({ ...p, extracto: e.target.value }))}
                      placeholder="Breve descripción que aparece en la tarjeta..." rows={2}
                      className="w-full resize-none rounded-xl border-2 border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 transition-all focus:border-[#1e3a8a] focus:outline-none focus:ring-4 focus:ring-blue-900/10" />
                  </div>

                  {/* Imagen principal */}
                  <div>
                    <label className="mb-2 block text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Imagen Principal *</label>
                    {imagePreview ? (
                      <div className="relative">
                        <div className="h-48 overflow-hidden rounded-xl border-2 border-slate-200">
                          <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                        </div>
                        <button onClick={() => { setImagePreview(""); setFormData(p => ({ ...p, imagenPrincipal: "" })); }}
                          className="absolute right-2 top-2 rounded-lg bg-red-500 p-2 text-white hover:bg-red-600">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ) : (
                      <label className="flex h-48 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 transition-all hover:border-[#1e3a8a] hover:bg-blue-50">
                        {uploadingImage ? <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#1e3a8a] border-t-transparent" /> : (
                          <>
                            <Upload size={36} className="mb-3 text-slate-300" />
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Click para subir imagen</span>
                            <span className="mt-1 text-[9px] text-slate-400">PNG, JPG (máx. 5MB)</span>
                          </>
                        )}
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "principal")} className="hidden" disabled={uploadingImage} />
                      </label>
                    )}
                  </div>

                  {/* BLOQUES DE CONTENIDO */}
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Contenido del artículo</label>
                      <div className="flex gap-2">
                        <button onClick={() => addBloque("parrafo")}
                          className="flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-200">
                          <FileText size={11} /> + Párrafo
                        </button>
                        <button onClick={() => addBloque("imagen")}
                          className="flex items-center gap-1 rounded-lg bg-blue-100 px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-blue-700 hover:bg-blue-200">
                          <ImageIcon size={11} /> + Imagen
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {formData.contenido.map((bloque, index) => (
                        <div key={index} className={`rounded-xl border-2 p-4 ${bloque.tipo === "imagen" ? "border-blue-200 bg-blue-50" : "border-slate-200 bg-slate-50"}`}>
                          <div className="mb-2 flex items-center justify-between">
                            <span className={`text-[9px] font-black uppercase tracking-widest ${bloque.tipo === "imagen" ? "text-blue-600" : "text-slate-500"}`}>
                              {bloque.tipo === "imagen" ? "🖼 Imagen" : "¶ Párrafo"} #{index + 1}
                            </span>
                            {formData.contenido.length > 1 && (
                              <button onClick={() => removeBloque(index)} className="rounded-lg p-1 text-red-400 hover:bg-red-100">
                                <MinusCircle size={14} />
                              </button>
                            )}
                          </div>

                          {bloque.tipo === "parrafo" ? (
                            <textarea value={bloque.texto} onChange={(e) => updateBloque(index, "texto", e.target.value)}
                              placeholder="Escribe el contenido del párrafo..." rows={3}
                              className="w-full resize-none rounded-lg border-2 border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 transition-all focus:border-[#1e3a8a] focus:outline-none" />
                          ) : (
                            <div className="space-y-2">
                              {bloque.url ? (
                                <div className="relative">
                                  <img src={bloque.url} alt="content" className="h-32 w-full rounded-lg object-cover" />
                                  <button onClick={() => updateBloque(index, "url", "")} className="absolute right-1 top-1 rounded bg-red-500 p-1 text-white hover:bg-red-600">
                                    <X size={12} />
                                  </button>
                                </div>
                              ) : (
                                <label className="flex h-24 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-blue-300 bg-white hover:border-[#1e3a8a] hover:bg-blue-50">
                                  {uploadingContentImage === index ? (
                                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#1e3a8a] border-t-transparent" />
                                  ) : (
                                    <>
                                      <Upload size={20} className="mb-1 text-slate-400" />
                                      <span className="text-[9px] text-slate-500">Subir imagen de contenido</span>
                                    </>
                                  )}
                                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "contenido", index)} className="hidden" disabled={uploadingContentImage !== null} />
                                </label>
                              )}
                              <input type="text" value={bloque.caption || ""} onChange={(e) => updateBloque(index, "caption", e.target.value)}
                                placeholder="Caption / pie de foto (opcional)"
                                className="w-full rounded-lg border-2 border-blue-200 bg-white px-3 py-2 text-xs text-slate-700 focus:border-[#1e3a8a] focus:outline-none" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Checkboxes */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="flex cursor-pointer items-center gap-4 rounded-xl border-2 border-green-200 bg-green-50 p-4 transition-all hover:border-green-300">
                      <input type="checkbox" checked={formData.active} onChange={(e) => setFormData(p => ({ ...p, active: e.target.checked }))} className="h-4 w-4 accent-green-600" />
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-green-700">Novedad Activa</p>
                        <p className="text-[9px] text-slate-500">Visible en el sitio público</p>
                      </div>
                    </label>
                    <label className="flex cursor-pointer items-center gap-4 rounded-xl border-2 border-yellow-200 bg-yellow-50 p-4 transition-all hover:border-yellow-300">
                      <input type="checkbox" checked={formData.destacado} onChange={(e) => setFormData(p => ({ ...p, destacado: e.target.checked }))} className="h-4 w-4 accent-yellow-600" />
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-yellow-700">★ Novedad Destacada</p>
                        <p className="text-[9px] text-slate-500">Aparece en sección principal del home</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* FOOTER */}
                <div className="mt-8 flex gap-4 border-t border-slate-100 pt-6">
                  <button onClick={() => setShowModal(false)}
                    className="flex-1 rounded-xl border-2 border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50">
                    Cancelar
                  </button>
                  <button onClick={handleSave} disabled={uploadingImage || uploadingContentImage !== null}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1e3a8a] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/30 transition-all hover:bg-[#1e40af] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50">
                    <Save size={16} />
                    {editingNovedad ? "Actualizar" : "Publicar Novedad"}
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}