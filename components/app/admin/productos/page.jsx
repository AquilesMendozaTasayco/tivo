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
  Car, Search, Star, StarOff, Users, Fuel, Settings2, DollarSign
} from "lucide-react";

const marcas = ["Kia", "Toyota", "Chevrolet", "Hyundai", "Nissan", "Honda", "Suzuki", "Mitsubishi", "Volkswagen", "Ford"];
const transmisiones = ["Automático", "Mecánico"];
const combustibles = ["Gasolina", "Dual GNV", "Diesel", "Eléctrico", "Híbrido"];

export default function AdminFlotaPage() {
  const [carros, setCarros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCarro, setEditingCarro] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMarca, setFilterMarca] = useState("");
  const [formData, setFormData] = useState({
    nombre: "", marca: "", precio: "", pasajeros: "",
    transmision: "", combustible: "", detalle: "",
    imagen: "", active: true, destacado: false,
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => { fetchCarros(); }, []);

  const fetchCarros = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "carros"), orderBy("nombre", "asc"));
      const snap = await getDocs(q);
      setCarros(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) {
      Swal.fire({ icon: "error", title: "Error", text: "No se pudieron cargar los vehículos", confirmButtonColor: "#1e3a8a" });
    } finally { setLoading(false); }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { Swal.fire({ icon: "error", title: "Archivo inválido", text: "Por favor selecciona una imagen válida", confirmButtonColor: "#1e3a8a" }); return; }
    if (file.size > 5 * 1024 * 1024) { Swal.fire({ icon: "error", title: "Archivo muy grande", text: "La imagen no debe superar 5MB", confirmButtonColor: "#1e3a8a" }); return; }
    try {
      setUploadingImage(true);
      const storageRef = ref(storage, `flota/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setFormData(p => ({ ...p, imagen: url }));
      setImagePreview(url);
      Swal.fire({ icon: "success", title: "¡Imagen subida!", timer: 1500, showConfirmButton: false });
    } catch (e) {
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo subir la imagen", confirmButtonColor: "#1e3a8a" });
    } finally { setUploadingImage(false); }
  };

  const handleCreate = () => {
    setEditingCarro(null);
    setFormData({ nombre: "", marca: "", precio: "", pasajeros: "", transmision: "", combustible: "", detalle: "", imagen: "", active: true, destacado: false });
    setImagePreview("");
    setShowModal(true);
  };

  const handleEdit = (carro) => {
    setEditingCarro(carro);
    setFormData({
      nombre: carro.nombre || "", marca: carro.marca || "", precio: carro.precio || "",
      pasajeros: carro.pasajeros || "", transmision: carro.transmision || "",
      combustible: carro.combustible || "", detalle: carro.detalle || "",
      imagen: carro.imagen || "", active: carro.active !== undefined ? carro.active : true,
      destacado: carro.destacado || false,
    });
    setImagePreview(carro.imagen || "");
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formData.nombre.trim()) { Swal.fire({ icon: "warning", title: "Nombre requerido", text: "Por favor ingresa el nombre del vehículo", confirmButtonColor: "#1e3a8a" }); return; }
    if (!formData.marca) { Swal.fire({ icon: "warning", title: "Marca requerida", text: "Por favor selecciona la marca", confirmButtonColor: "#1e3a8a" }); return; }
    if (!formData.precio || isNaN(Number(formData.precio))) { Swal.fire({ icon: "warning", title: "Precio inválido", text: "Por favor ingresa un precio válido", confirmButtonColor: "#1e3a8a" }); return; }
    if (!formData.imagen) { Swal.fire({ icon: "warning", title: "Imagen requerida", text: "Por favor sube una imagen del vehículo", confirmButtonColor: "#1e3a8a" }); return; }
    try {
      const data = { ...formData, precio: Number(formData.precio), pasajeros: Number(formData.pasajeros) };
      if (editingCarro) {
        await updateDoc(doc(db, "carros", editingCarro.id), { ...data, updatedAt: serverTimestamp() });
        Swal.fire({ icon: "success", title: "¡Actualizado!", text: "El vehículo se ha actualizado correctamente", timer: 1500, showConfirmButton: false });
      } else {
        await addDoc(collection(db, "carros"), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
        Swal.fire({ icon: "success", title: "¡Creado!", text: "El vehículo se ha creado correctamente", timer: 1500, showConfirmButton: false });
      }
      setShowModal(false);
      fetchCarros();
    } catch (e) {
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo guardar el vehículo", confirmButtonColor: "#1e3a8a" });
    }
  };

  const handleToggleActive = async (carro) => {
    try {
      await updateDoc(doc(db, "carros", carro.id), { active: !carro.active, updatedAt: serverTimestamp() });
      Swal.fire({ icon: "success", title: carro.active ? "Desactivado" : "Activado", text: `El vehículo ha sido ${carro.active ? "desactivado" : "activado"}`, timer: 1500, showConfirmButton: false });
      fetchCarros();
    } catch (e) { Swal.fire({ icon: "error", title: "Error", text: "No se pudo cambiar el estado", confirmButtonColor: "#1e3a8a" }); }
  };

  const handleToggleDestacado = async (carro) => {
    try {
      await updateDoc(doc(db, "carros", carro.id), { destacado: !carro.destacado, updatedAt: serverTimestamp() });
      Swal.fire({ icon: "success", title: carro.destacado ? "Removido de destacados" : "Añadido a destacados", timer: 1500, showConfirmButton: false });
      fetchCarros();
    } catch (e) { Swal.fire({ icon: "error", title: "Error", text: "No se pudo cambiar el estado de destacado", confirmButtonColor: "#1e3a8a" }); }
  };

  const handleDelete = async (carro) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?", text: `Se eliminará el vehículo "${carro.nombre}"`, icon: "warning",
      showCancelButton: true, confirmButtonColor: "#dc2626", cancelButtonColor: "#6b7280",
      confirmButtonText: "Sí, eliminar", cancelButtonText: "Cancelar", reverseButtons: true,
    });
    if (result.isConfirmed) {
      try {
        if (carro.imagen) { try { await deleteObject(ref(storage, carro.imagen)); } catch (e) {} }
        await deleteDoc(doc(db, "carros", carro.id));
        Swal.fire({ icon: "success", title: "¡Eliminado!", text: "El vehículo ha sido eliminado", timer: 1500, showConfirmButton: false });
        fetchCarros();
      } catch (e) { Swal.fire({ icon: "error", title: "Error", text: "No se pudo eliminar el vehículo", confirmButtonColor: "#1e3a8a" }); }
    }
  };

  const filteredCarros = carros.filter(c => {
    const matchSearch = c.nombre?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchMarca = filterMarca ? c.marca === filterMarca : true;
    return matchSearch && matchMarca;
  });

  const marcasDisponibles = [...new Set(carros.map(c => c.marca).filter(Boolean))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-8">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="h-8 w-1 bg-[#1e3a8a]" />
                <h1 className="text-4xl font-black uppercase tracking-tight text-slate-900">
                  Flota de Vehículos
                </h1>
              </div>
              <p className="mt-1 ml-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                Gestiona el catálogo completo de vehículos
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={handleCreate}
              className="flex items-center gap-2 rounded-xl bg-[#1e3a8a] px-6 py-3 font-bold text-xs uppercase tracking-widest text-white shadow-lg shadow-blue-900/30 transition-all hover:bg-[#1e40af] hover:shadow-xl"
            >
              <Plus size={16} /> Nuevo Vehículo
            </motion.button>
          </div>

          <div className="mt-6 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text" placeholder="Buscar vehículos..." value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border-2 border-slate-200 bg-white py-3 pl-12 pr-4 text-sm font-medium text-slate-900 placeholder-slate-400 transition-all focus:border-[#1e3a8a] focus:outline-none focus:ring-4 focus:ring-blue-900/10"
              />
            </div>
            <select
              value={filterMarca} onChange={(e) => setFilterMarca(e.target.value)}
              className="rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 transition-all focus:border-[#1e3a8a] focus:outline-none"
            >
              <option value="">Todas las marcas</option>
              {marcasDisponibles.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </motion.div>

        {/* STATS */}
        <div className="mb-8 grid grid-cols-4 gap-4">
          {[
            { label: "Total", value: carros.length, bg: "bg-white", border: "border-slate-200", text: "text-slate-900" },
            { label: "Activos", value: carros.filter(c => c.active !== false).length, bg: "bg-green-50", border: "border-green-200", text: "text-green-700" },
            { label: "Destacados", value: carros.filter(c => c.destacado).length, bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-700" },
            { label: "Inactivos", value: carros.filter(c => c.active === false).length, bg: "bg-red-50", border: "border-red-200", text: "text-red-700" },
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
        ) : filteredCarros.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl bg-white p-16 text-center shadow-xl">
            <Car size={64} className="mx-auto mb-4 text-slate-300" />
            <p className="text-sm font-black uppercase tracking-widest text-slate-400">
              {searchTerm || filterMarca ? "No se encontraron vehículos" : "No hay vehículos registrados"}
            </p>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCarros.map((carro, index) => (
              <motion.div key={carro.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-2xl">

                {/* BADGES */}
                <div className="absolute right-3 top-3 z-10 flex flex-col gap-1">
                  <span className={`rounded-full px-2 py-0.5 text-[9px] font-black uppercase ${carro.active !== false ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {carro.active !== false ? "Activo" : "Inactivo"}
                  </span>
                  {carro.destacado && (
                    <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-[9px] font-black uppercase text-yellow-700">★ Destacado</span>
                  )}
                </div>

                {/* IMAGEN */}
                <div className="relative h-44 flex items-center justify-center overflow-hidden bg-slate-50 p-4">
                  <img src={carro.imagen} alt={carro.nombre} className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute bottom-2 left-2 rounded-lg bg-[#1e3a8a] px-3 py-1">
                    <span className="text-xs font-black text-white">S/ {carro.precio}</span>
                    <span className="text-[9px] text-blue-200">/día</span>
                  </div>
                </div>

                {/* INFO */}
                <div className="p-4">
                  <div className="mb-1 text-[9px] font-black uppercase tracking-[0.3em] text-[#1e3a8a]">{carro.marca}</div>
                  <h3 className="mb-3 line-clamp-1 text-sm font-black uppercase tracking-wide text-slate-900">{carro.nombre}</h3>

                  {/* SPECS */}
                  <div className="mb-4 grid grid-cols-3 gap-1">
                    {[
                      { icon: <Users size={12} />, val: carro.pasajeros },
                      { icon: <Settings2 size={12} />, val: carro.transmision === "Automático" ? "Auto" : "Mec" },
                      { icon: <Fuel size={12} />, val: carro.combustible?.split(" ")[0] },
                    ].map((s, i) => (
                      <div key={i} className="flex flex-col items-center rounded-lg bg-slate-50 p-2">
                        <span className="mb-1 text-slate-400">{s.icon}</span>
                        <span className="truncate w-full text-center text-[9px] font-black text-slate-600">{s.val}</span>
                      </div>
                    ))}
                  </div>

                  {/* ACCIONES */}
                  <div className="grid grid-cols-2 gap-1">
                    <button onClick={() => handleEdit(carro)} className="flex items-center justify-center gap-1 rounded-lg bg-blue-100 px-2 py-2 text-[9px] font-black uppercase tracking-widest text-blue-700 transition-colors hover:bg-blue-200">
                      <Pencil size={11} /> Editar
                    </button>
                    <button onClick={() => handleToggleActive(carro)} className={`flex items-center justify-center gap-1 rounded-lg px-2 py-2 text-[9px] font-black uppercase tracking-widest transition-colors ${carro.active !== false ? "bg-orange-100 text-orange-700 hover:bg-orange-200" : "bg-green-100 text-green-700 hover:bg-green-200"}`}>
                      {carro.active !== false ? <EyeOff size={11} /> : <Eye size={11} />}
                      {carro.active !== false ? "Ocultar" : "Activar"}
                    </button>
                    <button onClick={() => handleToggleDestacado(carro)} className={`flex items-center justify-center gap-1 rounded-lg px-2 py-2 text-[9px] font-black uppercase tracking-widest transition-colors ${carro.destacado ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                      {carro.destacado ? <Star size={11} /> : <StarOff size={11} />}
                      {carro.destacado ? "Quitar" : "Destacar"}
                    </button>
                    <button onClick={() => handleDelete(carro)} className="flex items-center justify-center gap-1 rounded-lg bg-red-100 px-2 py-2 text-[9px] font-black uppercase tracking-widest text-red-700 transition-colors hover:bg-red-200">
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

                {/* MODAL HEADER */}
                <div className="mb-8 flex items-center justify-between border-b border-slate-100 pb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-1 bg-[#1e3a8a]" />
                    <h2 className="text-xl font-black uppercase tracking-widest text-slate-900">
                      {editingCarro ? "Editar Vehículo" : "Nuevo Vehículo"}
                    </h2>
                  </div>
                  <button onClick={() => setShowModal(false)} className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-6">

                  {/* Nombre + Marca */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Nombre del Vehículo *</label>
                      <input type="text" value={formData.nombre} onChange={(e) => setFormData(p => ({ ...p, nombre: e.target.value }))}
                        placeholder="Ej: Kia Sorento"
                        className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 transition-all focus:border-[#1e3a8a] focus:outline-none focus:ring-4 focus:ring-blue-900/10" />
                    </div>
                    <div>
                      <label className="mb-2 block text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Marca *</label>
                      <select value={formData.marca} onChange={(e) => setFormData(p => ({ ...p, marca: e.target.value }))}
                        className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 transition-all focus:border-[#1e3a8a] focus:outline-none focus:ring-4 focus:ring-blue-900/10">
                        <option value="">Selecciona una marca</option>
                        {marcas.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Precio, Pasajeros, Transmisión, Combustible */}
                  <div className="grid gap-6 md:grid-cols-4">
                    <div>
                      <label className="mb-2 block text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Precio/Día (S/) *</label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input type="number" value={formData.precio} onChange={(e) => setFormData(p => ({ ...p, precio: e.target.value }))} placeholder="330"
                          className="w-full rounded-xl border-2 border-slate-200 py-3 pl-9 pr-4 text-sm font-medium text-slate-900 transition-all focus:border-[#1e3a8a] focus:outline-none focus:ring-4 focus:ring-blue-900/10" />
                      </div>
                    </div>
                    <div>
                      <label className="mb-2 block text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Pasajeros</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input type="number" value={formData.pasajeros} onChange={(e) => setFormData(p => ({ ...p, pasajeros: e.target.value }))} placeholder="5"
                          className="w-full rounded-xl border-2 border-slate-200 py-3 pl-9 pr-4 text-sm font-medium text-slate-900 transition-all focus:border-[#1e3a8a] focus:outline-none focus:ring-4 focus:ring-blue-900/10" />
                      </div>
                    </div>
                    <div>
                      <label className="mb-2 block text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Transmisión</label>
                      <select value={formData.transmision} onChange={(e) => setFormData(p => ({ ...p, transmision: e.target.value }))}
                        className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 transition-all focus:border-[#1e3a8a] focus:outline-none focus:ring-4 focus:ring-blue-900/10">
                        <option value="">Selecciona</option>
                        {transmisiones.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Combustible</label>
                      <select value={formData.combustible} onChange={(e) => setFormData(p => ({ ...p, combustible: e.target.value }))}
                        className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 transition-all focus:border-[#1e3a8a] focus:outline-none focus:ring-4 focus:ring-blue-900/10">
                        <option value="">Selecciona</option>
                        {combustibles.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Detalle */}
                  <div>
                    <label className="mb-2 block text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Descripción / Detalle</label>
                    <textarea value={formData.detalle} onChange={(e) => setFormData(p => ({ ...p, detalle: e.target.value }))}
                      placeholder="Describe el vehículo, características especiales, etc." rows={3}
                      className="w-full resize-none rounded-xl border-2 border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 transition-all focus:border-[#1e3a8a] focus:outline-none focus:ring-4 focus:ring-blue-900/10" />
                  </div>

                  {/* Imagen */}
                  <div>
                    <label className="mb-2 block text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Imagen del Vehículo *</label>
                    {imagePreview ? (
                      <div className="relative">
                        <div className="flex h-56 items-center justify-center overflow-hidden rounded-xl border-2 border-slate-200 bg-slate-50 p-4">
                          <img src={imagePreview} alt="Preview" className="max-h-full max-w-full object-contain" />
                        </div>
                        <button onClick={() => { setImagePreview(""); setFormData(p => ({ ...p, imagen: "" })); }}
                          className="absolute right-2 top-2 rounded-lg bg-red-500 p-2 text-white transition-colors hover:bg-red-600">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ) : (
                      <label className="flex h-56 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 transition-all hover:border-[#1e3a8a] hover:bg-blue-50">
                        {uploadingImage ? (
                          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#1e3a8a] border-t-transparent" />
                        ) : (
                          <>
                            <Upload size={36} className="mb-3 text-slate-300" />
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Click para subir imagen</span>
                            <span className="mt-1 text-[9px] text-slate-400">PNG, JPG (máx. 5MB)</span>
                          </>
                        )}
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploadingImage} />
                      </label>
                    )}
                  </div>

                  {/* Checkboxes */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="flex cursor-pointer items-center gap-4 rounded-xl border-2 border-green-200 bg-green-50 p-4 transition-all hover:border-green-300">
                      <input type="checkbox" checked={formData.active} onChange={(e) => setFormData(p => ({ ...p, active: e.target.checked }))} className="h-4 w-4 accent-green-600" />
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-green-700">Vehículo Activo</p>
                        <p className="text-[9px] text-slate-500">Visible en el catálogo público</p>
                      </div>
                    </label>
                    <label className="flex cursor-pointer items-center gap-4 rounded-xl border-2 border-yellow-200 bg-yellow-50 p-4 transition-all hover:border-yellow-300">
                      <input type="checkbox" checked={formData.destacado} onChange={(e) => setFormData(p => ({ ...p, destacado: e.target.checked }))} className="h-4 w-4 accent-yellow-600" />
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-yellow-700">★ Vehículo Destacado</p>
                        <p className="text-[9px] text-slate-500">Aparece en sección destacados del home</p>
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
                  <button onClick={handleSave} disabled={uploadingImage}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1e3a8a] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/30 transition-all hover:bg-[#1e40af] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50">
                    <Save size={16} />
                    {editingCarro ? "Actualizar" : "Crear Vehículo"}
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