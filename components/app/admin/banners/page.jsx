"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  serverTimestamp,
  query,
  orderBy
} from "firebase/firestore";
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import Swal from "sweetalert2";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Eye, 
  EyeOff, 
  Upload,
  X,
  Save,
  ImageIcon,
  MonitorPlay
} from "lucide-react";

export default function AdminBannersPage() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [formData, setFormData] = useState({
    imageUrl: "",
    active: true,
    order: 0
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  // Cargar banners desde Firebase
  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "banners"), orderBy("order", "asc"));
      const querySnapshot = await getDocs(q);
      const bannersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBanners(bannersData);
    } catch (error) {
      console.error("Error fetching banners:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar los banners",
        confirmButtonColor: "#2563eb",
      });
    } finally {
      setLoading(false);
    }
  };

  // Manejar subida de imagen
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith("image/")) {
      Swal.fire({
        icon: "error",
        title: "Archivo inválido",
        text: "Por favor selecciona una imagen válida",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    // Validar tamaño (máx 5MB para banners)
    if (file.size > 5 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "Archivo muy grande",
        text: "La imagen no debe superar 5MB",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    try {
      setUploadingImage(true);
      
      // Crear referencia única para la imagen
      const timestamp = Date.now();
      const fileName = `banners/${timestamp}_${file.name}`;
      const storageRef = ref(storage, fileName);

      // Subir imagen
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      // Actualizar formulario
      setFormData(prev => ({ ...prev, imageUrl: downloadURL }));
      setImagePreview(downloadURL);

      Swal.fire({
        icon: "success",
        title: "¡Imagen subida!",
        text: "La imagen se ha cargado correctamente",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo subir la imagen",
        confirmButtonColor: "#2563eb",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  // Abrir modal para crear
  const handleCreate = () => {
    setEditingBanner(null);
    setFormData({
      imageUrl: "",
      active: true,
      order: banners.length
    });
    setImagePreview("");
    setShowModal(true);
  };

  // Abrir modal para editar
  const handleEdit = (banner) => {
    setEditingBanner(banner);
    setFormData({
      imageUrl: banner.imageUrl,
      active: banner.active,
      order: banner.order
    });
    setImagePreview(banner.imageUrl);
    setShowModal(true);
  };

  // Guardar banner (crear o actualizar)
  const handleSave = async () => {
    // Validaciones
    if (!formData.imageUrl) {
      Swal.fire({
        icon: "warning",
        title: "Imagen requerida",
        text: "Por favor sube una imagen para el banner",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    try {
      if (editingBanner) {
        // Actualizar
        await updateDoc(doc(db, "banners", editingBanner.id), {
          ...formData,
          updatedAt: serverTimestamp()
        });

        Swal.fire({
          icon: "success",
          title: "¡Actualizado!",
          text: "El banner se ha actualizado correctamente",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        // Crear
        await addDoc(collection(db, "banners"), {
          ...formData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });

        Swal.fire({
          icon: "success",
          title: "¡Creado!",
          text: "El banner se ha creado correctamente",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      setShowModal(false);
      fetchBanners();
    } catch (error) {
      console.error("Error saving banner:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo guardar el banner",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  // Activar/Desactivar banner
  const handleToggleActive = async (banner) => {
    try {
      await updateDoc(doc(db, "banners", banner.id), {
        active: !banner.active,
        updatedAt: serverTimestamp()
      });

      Swal.fire({
        icon: "success",
        title: banner.active ? "Desactivado" : "Activado",
        text: `El banner ha sido ${banner.active ? "desactivado" : "activado"}`,
        timer: 1500,
        showConfirmButton: false,
      });

      fetchBanners();
    } catch (error) {
      console.error("Error toggling banner:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo cambiar el estado",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  // Eliminar banner
  const handleDelete = async (banner) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Se eliminará este banner",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        // Eliminar imagen del storage si existe
        if (banner.imageUrl) {
          try {
            const imageRef = ref(storage, banner.imageUrl);
            await deleteObject(imageRef);
          } catch (error) {
            console.log("Error deleting image:", error);
          }
        }

        // Eliminar documento
        await deleteDoc(doc(db, "banners", banner.id));

        Swal.fire({
          icon: "success",
          title: "¡Eliminado!",
          text: "El banner ha sido eliminado",
          timer: 1500,
          showConfirmButton: false,
        });

        fetchBanners();
      } catch (error) {
        console.error("Error deleting banner:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar el banner",
          confirmButtonColor: "#2563eb",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100 p-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tight text-slate-900">
                Banners Hero
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Gestiona las imágenes del carrusel principal
              </p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCreate}
              className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-bold text-white shadow-lg shadow-purple-600/30 transition-all hover:bg-purple-700 hover:shadow-xl hover:shadow-purple-600/40"
            >
              <Plus size={20} />
              Nuevo Banner
            </motion.button>
          </div>
        </motion.div>

        {/* Banners Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-600 border-t-transparent"></div>
          </div>
        ) : banners.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl bg-white p-16 text-center shadow-xl"
          >
            <MonitorPlay size={64} className="mx-auto mb-4 text-slate-300" />
            <p className="text-xl font-bold text-slate-400">
              No hay banners registrados
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Agrega tu primer banner para el carrusel
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3"
          >
            {banners.map((banner, index) => (
              <motion.div
                key={banner.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-2xl"
              >
                {/* Status Badge */}
                <div className="absolute right-4 top-4 z-10">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold uppercase shadow-lg ${
                      banner.active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {banner.active ? "Activo" : "Inactivo"}
                  </span>
                </div>

                {/* Order Badge */}
                <div className="absolute left-4 top-4 z-10">
                  <span className="rounded-full bg-black/50 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                    Orden #{banner.order}
                  </span>
                </div>

                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                  <img
                    src={banner.imageUrl}
                    alt={`Banner ${banner.order}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Actions */}
                <div className="flex gap-2 p-4">
                  <button
                    onClick={() => handleEdit(banner)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-purple-100 px-4 py-3 font-bold text-purple-700 transition-colors hover:bg-purple-200"
                  >
                    <Pencil size={16} />
                    Cambiar Imagen
                  </button>
                  
                  <button
                    onClick={() => handleToggleActive(banner)}
                    className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 font-bold transition-colors ${
                      banner.active
                        ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                        : "bg-green-100 text-green-700 hover:bg-green-200"
                    }`}
                  >
                    {banner.active ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  
                  <button
                    onClick={() => handleDelete(banner)}
                    className="flex items-center justify-center rounded-lg bg-red-100 px-4 py-3 font-bold text-red-700 transition-colors hover:bg-red-200"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowModal(false)}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              />

              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-8 shadow-2xl"
              >
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-black uppercase text-slate-900">
                    {editingBanner ? "Cambiar Imagen del Banner" : "Nuevo Banner"}
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Form */}
                <div className="space-y-6">
                  {/* Orden */}
                  <div>
                    <label className="mb-2 block text-sm font-bold uppercase text-slate-700">
                      Orden de aparición en el carrusel
                    </label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                      min="0"
                      className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 font-medium transition-all focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20"
                    />
                    <p className="mt-1 text-xs text-slate-500">
                      El orden 0 aparecerá primero, 1 segundo, etc.
                    </p>
                  </div>

                  {/* Imagen */}
                  <div>
                    <label className="mb-2 block text-sm font-bold uppercase text-slate-700">
                      Imagen del Banner
                    </label>
                    <p className="mb-3 text-xs text-slate-500">
                      📐 Recomendado: 2073x850px o similar (proporción 21:9) - Máx 5MB
                    </p>
                    
                    {imagePreview ? (
                      <div className="relative">
                        <div className="relative h-80 overflow-hidden rounded-xl border-2 border-slate-200">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <button
                          onClick={() => {
                            setImagePreview("");
                            setFormData(prev => ({ ...prev, imageUrl: "" }));
                          }}
                          className="absolute right-2 top-2 rounded-lg bg-red-500 p-2 text-white shadow-lg transition-colors hover:bg-red-600"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    ) : (
                      <label className="flex h-80 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 transition-all hover:border-purple-500 hover:bg-purple-50">
                        {uploadingImage ? (
                          <>
                            <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-600 border-t-transparent mb-4"></div>
                            <span className="font-bold text-purple-600">Subiendo imagen...</span>
                          </>
                        ) : (
                          <>
                            <Upload size={56} className="mb-4 text-slate-400" />
                            <span className="text-lg font-bold text-slate-600">
                              Click para subir imagen
                            </span>
                            <span className="mt-2 text-sm text-slate-400">
                              PNG, JPG, WEBP (máx. 5MB)
                            </span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={uploadingImage}
                        />
                      </label>
                    )}
                  </div>

                  {/* Estado */}
                  <div className="rounded-xl bg-slate-50 p-4">
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        id="active"
                        checked={formData.active}
                        onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                        className="h-5 w-5 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                      />
                      <label htmlFor="active" className="font-bold text-slate-700">
                        Banner activo (visible en el carrusel)
                      </label>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-8 flex gap-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 rounded-xl border-2 border-slate-200 bg-white px-6 py-3 font-bold text-slate-700 transition-all hover:bg-slate-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={uploadingImage}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-bold text-white shadow-lg shadow-purple-600/30 transition-all hover:bg-purple-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Save size={20} />
                    {editingBanner ? "Actualizar Banner" : "Crear Banner"}
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