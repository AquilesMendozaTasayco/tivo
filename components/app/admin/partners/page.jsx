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
  Search
} from "lucide-react";

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    active: true,
    order: 0
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  // Cargar partners desde Firebase
  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "partners"), orderBy("order", "asc"));
      const querySnapshot = await getDocs(q);
      const partnersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPartners(partnersData);
    } catch (error) {
      console.error("Error fetching partners:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar los partners",
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

    // Validar tamaño (máx 2MB)
    if (file.size > 2 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "Archivo muy grande",
        text: "La imagen no debe superar 2MB",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    try {
      setUploadingImage(true);
      
      // Crear referencia única para la imagen
      const timestamp = Date.now();
      const fileName = `partners/${timestamp}_${file.name}`;
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
    setEditingPartner(null);
    setFormData({
      name: "",
      imageUrl: "",
      active: true,
      order: partners.length
    });
    setImagePreview("");
    setShowModal(true);
  };

  // Abrir modal para editar
  const handleEdit = (partner) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name,
      imageUrl: partner.imageUrl,
      active: partner.active,
      order: partner.order
    });
    setImagePreview(partner.imageUrl);
    setShowModal(true);
  };

  // Guardar partner (crear o actualizar)
  const handleSave = async () => {
    // Validaciones
    if (!formData.name.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Nombre requerido",
        text: "Por favor ingresa el nombre del partner",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    if (!formData.imageUrl) {
      Swal.fire({
        icon: "warning",
        title: "Imagen requerida",
        text: "Por favor sube una imagen del partner",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    try {
      if (editingPartner) {
        // Actualizar
        await updateDoc(doc(db, "partners", editingPartner.id), {
          ...formData,
          updatedAt: serverTimestamp()
        });

        Swal.fire({
          icon: "success",
          title: "¡Actualizado!",
          text: "El partner se ha actualizado correctamente",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        // Crear
        await addDoc(collection(db, "partners"), {
          ...formData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });

        Swal.fire({
          icon: "success",
          title: "¡Creado!",
          text: "El partner se ha creado correctamente",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      setShowModal(false);
      fetchPartners();
    } catch (error) {
      console.error("Error saving partner:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo guardar el partner",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  // Activar/Desactivar partner
  const handleToggleActive = async (partner) => {
    try {
      await updateDoc(doc(db, "partners", partner.id), {
        active: !partner.active,
        updatedAt: serverTimestamp()
      });

      Swal.fire({
        icon: "success",
        title: partner.active ? "Desactivado" : "Activado",
        text: `El partner ha sido ${partner.active ? "desactivado" : "activado"}`,
        timer: 1500,
        showConfirmButton: false,
      });

      fetchPartners();
    } catch (error) {
      console.error("Error toggling partner:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo cambiar el estado",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  // Eliminar partner
  const handleDelete = async (partner) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `Se eliminará el partner "${partner.name}"`,
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
        if (partner.imageUrl) {
          try {
            const imageRef = ref(storage, partner.imageUrl);
            await deleteObject(imageRef);
          } catch (error) {
            console.log("Error deleting image:", error);
          }
        }

        // Eliminar documento
        await deleteDoc(doc(db, "partners", partner.id));

        Swal.fire({
          icon: "success",
          title: "¡Eliminado!",
          text: "El partner ha sido eliminado",
          timer: 1500,
          showConfirmButton: false,
        });

        fetchPartners();
      } catch (error) {
        console.error("Error deleting partner:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar el partner",
          confirmButtonColor: "#2563eb",
        });
      }
    }
  };

  // Filtrar partners
  const filteredPartners = partners.filter(partner =>
    partner.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-8">
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
                Partners
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Gestiona las empresas que confían en nosotros
              </p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCreate}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/40"
            >
              <Plus size={20} />
              Nuevo Partner
            </motion.button>
          </div>

          {/* Search Bar */}
          <div className="mt-6 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Buscar partners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border-2 border-slate-200 bg-white py-3 pl-12 pr-4 font-medium text-slate-900 placeholder-slate-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
            />
          </div>
        </motion.div>

        {/* Partners Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          </div>
        ) : filteredPartners.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl bg-white p-16 text-center shadow-xl"
          >
            <ImageIcon size={64} className="mx-auto mb-4 text-slate-300" />
            <p className="text-xl font-bold text-slate-400">
              {searchTerm ? "No se encontraron partners" : "No hay partners registrados"}
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredPartners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-2xl"
              >
                {/* Status Badge */}
                <div className="absolute right-4 top-4 z-10">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${
                      partner.active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {partner.active ? "Activo" : "Inactivo"}
                  </span>
                </div>

                {/* Image */}
                <div className="mb-4 flex h-32 items-center justify-center rounded-xl bg-slate-50 p-4">
                  <img
                    src={partner.imageUrl}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain grayscale transition-all group-hover:grayscale-0"
                  />
                </div>

                {/* Name */}
                <h3 className="mb-4 text-center text-lg font-bold text-slate-900">
                  {partner.name}
                </h3>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(partner)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-100 px-4 py-2 font-bold text-blue-700 transition-colors hover:bg-blue-200"
                  >
                    <Pencil size={16} />
                    Editar
                  </button>
                  
                  <button
                    onClick={() => handleToggleActive(partner)}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 font-bold transition-colors ${
                      partner.active
                        ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                        : "bg-green-100 text-green-700 hover:bg-green-200"
                    }`}
                  >
                    {partner.active ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  
                  <button
                    onClick={() => handleDelete(partner)}
                    className="flex items-center justify-center rounded-lg bg-red-100 px-4 py-2 font-bold text-red-700 transition-colors hover:bg-red-200"
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
                    {editingPartner ? "Editar Partner" : "Nuevo Partner"}
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
                  {/* Nombre */}
                  <div>
                    <label className="mb-2 block text-sm font-bold uppercase text-slate-700">
                      Nombre del Partner
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Ej: Alicorp"
                      className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 font-medium transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                    />
                  </div>

                  {/* Orden */}
                  <div>
                    <label className="mb-2 block text-sm font-bold uppercase text-slate-700">
                      Orden de aparición
                    </label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                      min="0"
                      className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 font-medium transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                    />
                  </div>

                  {/* Imagen */}
                  <div>
                    <label className="mb-2 block text-sm font-bold uppercase text-slate-700">
                      Logo del Partner
                    </label>
                    
                    {imagePreview ? (
                      <div className="relative">
                        <div className="flex h-48 items-center justify-center rounded-xl border-2 border-slate-200 bg-slate-50 p-4">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <button
                          onClick={() => {
                            setImagePreview("");
                            setFormData(prev => ({ ...prev, imageUrl: "" }));
                          }}
                          className="absolute right-2 top-2 rounded-lg bg-red-500 p-2 text-white transition-colors hover:bg-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ) : (
                      <label className="flex h-48 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 transition-all hover:border-blue-500 hover:bg-blue-50">
                        {uploadingImage ? (
                          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
                        ) : (
                          <>
                            <Upload size={48} className="mb-2 text-slate-400" />
                            <span className="font-bold text-slate-600">
                              Click para subir imagen
                            </span>
                            <span className="mt-1 text-xs text-slate-400">
                              PNG, JPG (máx. 2MB)
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
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      id="active"
                      checked={formData.active}
                      onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                      className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="active" className="font-bold text-slate-700">
                      Partner activo
                    </label>
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
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Save size={20} />
                    {editingPartner ? "Actualizar" : "Crear"}
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