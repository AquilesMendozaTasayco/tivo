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
import {
  Plus, Pencil, Trash2, Eye, EyeOff, Upload, X, Save, Loader2,
  Star, MessageSquareQuote, GripVertical,
} from "lucide-react";

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

const formInicial = {
  nombre: "",
  rol: "Usuario TIVO",
  mensaje: "",
  rating: 5,
  foto: "",
  orden: 0,
  active: true,
};

export default function AdminTestimoniosPage() {
  const [testimonios, setTestimonios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState(formInicial);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchTestimonios();
  }, []);

  const fetchTestimonios = async () => {
    try {
      setLoading(true);
      const snap = await getDocs(
        query(collection(db, "testimonios"), orderBy("orden", "asc"))
      );
      setTestimonios(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error("Error:", error);
      Toast.fire({ icon: "error", title: "Error al cargar testimonios" });
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return Swal.fire({ ...swalBase, icon: "error", title: "Solo se aceptan imágenes" });
    }
    if (file.size > 3 * 1024 * 1024) {
      return Swal.fire({ ...swalBase, icon: "error", title: "Máximo 3 MB de tamaño" });
    }

    try {
      setUploading(true);
      const timestamp = Date.now();
      const storageRef = ref(storage, `testimonios/${timestamp}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      set("foto", url);
      Toast.fire({ icon: "success", title: "✅ Foto subida correctamente" });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({ ...swalBase, icon: "error", title: "Error al subir foto" });
    } finally {
      setUploading(false);
    }
  };

  const handleCrear = () => {
    setEditando(null);
    setFormData({ ...formInicial, orden: testimonios.length });
    setShowModal(true);
  };

  const handleEditar = (t) => {
    setEditando(t);
    setFormData({
      nombre: t.nombre || "",
      rol: t.rol || "Usuario TIVO",
      mensaje: t.mensaje || "",
      rating: t.rating ?? 5,
      foto: t.foto || "",
      orden: t.orden ?? 0,
      active: t.active !== false,
    });
    setShowModal(true);
  };

  const handleGuardar = async () => {
    if (!formData.nombre.trim()) {
      return Swal.fire({ ...swalBase, icon: "warning", title: "Nombre requerido" });
    }
    if (!formData.mensaje.trim()) {
      return Swal.fire({ ...swalBase, icon: "warning", title: "Mensaje requerido" });
    }

    const data = {
      ...formData,
      orden: Number(formData.orden),
      rating: Number(formData.rating),
      updatedAt: serverTimestamp(),
    };

    try {
      setSaving(true);
      if (editando) {
        await updateDoc(doc(db, "testimonios", editando.id), data);
        Toast.fire({ icon: "success", title: "✅ Testimonio actualizado" });
      } else {
        await addDoc(collection(db, "testimonios"), {
          ...data,
          createdAt: serverTimestamp(),
        });
        Toast.fire({ icon: "success", title: "✅ Testimonio creado" });
      }
      setShowModal(false);
      fetchTestimonios();
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({ ...swalBase, icon: "error", title: "Error al guardar" });
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (t) => {
    try {
      await updateDoc(doc(db, "testimonios", t.id), {
        active: !t.active,
        updatedAt: serverTimestamp(),
      });
      Toast.fire({
        icon: "success",
        title: t.active ? "Testimonio desactivado" : "Testimonio activado",
      });
      fetchTestimonios();
    } catch (error) {
      console.error("Error:", error);
      Toast.fire({ icon: "error", title: "Error al actualizar" });
    }
  };

  const handleEliminar = async (t) => {
    const result = await Swal.fire({
      ...swalBase,
      icon: "warning",
      title: "¿Eliminar testimonio?",
      text: `"${t.nombre}" se eliminará permanentemente.`,
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      customClass: {
        ...swalBase.customClass,
        confirmButton:
          "!bg-red-500 !rounded-xl !px-6 !py-2.5 !text-sm !font-semibold !text-white !shadow-lg",
      },
    });

    if (!result.isConfirmed) return;

    try {
      // Eliminar foto de Storage si existe
      if (t.foto) {
        try {
          await deleteObject(ref(storage, t.foto));
        } catch {}
      }
      await deleteDoc(doc(db, "testimonios", t.id));
      Toast.fire({ icon: "success", title: "✅ Testimonio eliminado" });
      fetchTestimonios();
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({ ...swalBase, icon: "error", title: "Error al eliminar" });
    }
  };

  const set = (k, v) => setFormData((p) => ({ ...p, [k]: v }));

  const ic =
    "w-full px-4 py-3 rounded-xl border border-[#d4eef9] bg-[#f5fbfe] text-sm text-[#0e4a6b] placeholder-[#8fb0c0] outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/10 transition-all";
  const lc =
    "block text-[10px] font-bold uppercase tracking-[0.25em] text-[#0e4a6b] mb-1.5";
  const sc =
    "text-xs font-bold text-[#0e4a6b] uppercase tracking-widest mb-4 pb-2 border-b border-[#d4eef9]";

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
              <h1
                className="text-2xl font-bold text-[#0e2a3d]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Testimonios
              </h1>
            </div>
            <p className="ml-4 text-xs font-medium text-[#4a6170] uppercase tracking-widest mt-0.5">
              Gestiona las historias de la comunidad TIVO
            </p>
          </div>
          <button
            onClick={handleCrear}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0e4a6b] hover:bg-[#0d3d5a] text-white text-sm font-semibold rounded-xl shadow-md shadow-[#0e4a6b]/20 hover:-translate-y-0.5 transition-all"
          >
            <Plus className="h-4 w-4" /> Nuevo testimonio
          </button>
        </motion.div>

        {/* ESTADÍSTICAS */}
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              label: "Total",
              value: testimonios.length,
              bg: "bg-white",
              border: "border-[#d4eef9]",
              text: "text-[#0e2a3d]",
            },
            {
              label: "Activos",
              value: testimonios.filter((t) => t.active !== false).length,
              bg: "bg-[#f0f8fc]",
              border: "border-[#cfe7f4]",
              text: "text-[#0e4a6b]",
            },
            {
              label: "Inactivos",
              value: testimonios.filter((t) => t.active === false).length,
              bg: "bg-red-50",
              border: "border-red-200",
              text: "text-red-600",
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className={`${stat.bg} border ${stat.border} rounded-2xl p-5 shadow-sm`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#6b7c75] mb-1">
                {stat.label}
              </p>
              <p className={`text-3xl font-bold ${stat.text}`} style={{ fontFamily: "Georgia, serif" }}>
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* LISTA DE TESTIMONIOS */}
        {testimonios.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#d4eef9] p-16 text-center">
            <MessageSquareQuote className="h-14 w-14 mx-auto mb-4 text-[#cfe7f4]" />
            <p className="text-sm font-semibold text-[#4a6170] uppercase tracking-widest">
              No hay testimonios aún
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {testimonios.map((t, i) => (
              <motion.div
                key={t.id}
                className="group bg-white rounded-2xl border border-[#d4eef9] hover:border-[#1bb5e0] hover:shadow-lg overflow-hidden transition-all duration-300"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Foto */}
                  <div className="relative w-full sm:w-44 h-36 sm:h-auto flex-shrink-0 overflow-hidden bg-[#f5fbfe]">
                    {t.foto ? (
                      <img
                        src={t.foto}
                        alt={t.nombre}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#0e4a6b] to-[#1bb5e0] flex items-center justify-center min-h-[100px]">
                        <span
                          className="text-5xl font-bold text-white"
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          {t.nombre?.charAt(0).toUpperCase() || "T"}
                        </span>
                      </div>
                    )}
                    <div className="absolute top-2 left-2">
                      <span
                        className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          t.active !== false
                            ? "bg-[#f5fbfe] text-[#0e4a6b] border border-[#cfe7f4]"
                            : "bg-red-50 text-red-600 border border-red-200"
                        }`}
                      >
                        {t.active !== false ? "Activo" : "Inactivo"}
                      </span>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="flex-1 p-4 flex flex-col gap-3 min-w-0">
                    <div className="flex items-start gap-2 min-w-0">
                      <GripVertical className="h-4 w-4 text-[#cfe7f4] flex-shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-bold text-[#0e2a3d] truncate">
                            {t.nombre}
                          </p>
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, s) => (
                              <Star
                                key={s}
                                className={`h-3 w-3 ${
                                  s < (t.rating || 5)
                                    ? "text-[#0e4a6b] fill-[#0e4a6b]"
                                    : "text-[#cfe7f4]"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-[10px] text-[#1bb5e0] font-medium mt-0.5">
                          {t.rol}
                        </p>
                        <p className="text-xs text-[#4a6170] line-clamp-2 mt-1.5 italic">
                          &ldquo;{t.mensaje}&rdquo;
                        </p>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
                          <span className="text-[10px] text-[#8fb0c0]">
                            Orden: <span className="font-medium">{t.orden}</span>
                          </span>
                          <span className="text-[10px] text-[#8fb0c0]">
                            Rating: <span className="font-medium">{t.rating || 5}/5</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#f5fbfe]">
                      <button
                        onClick={() => handleEditar(t)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#f5fbfe] hover:bg-[#e8f6fb] text-[#0e4a6b] text-[10px] font-semibold uppercase tracking-wider transition-colors"
                      >
                        <Pencil className="h-3 w-3" /> Editar
                      </button>
                      <button
                        onClick={() => handleToggle(t)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                          t.active !== false
                            ? "bg-orange-50 hover:bg-orange-100 text-orange-600"
                            : "bg-[#f5fbfe] hover:bg-[#e8f6fb] text-[#0e4a6b]"
                        }`}
                      >
                        {t.active !== false ? (
                          <EyeOff className="h-3 w-3" />
                        ) : (
                          <Eye className="h-3 w-3" />
                        )}
                        {t.active !== false ? "Ocultar" : "Activar"}
                      </button>
                      <button
                        onClick={() => handleEliminar(t)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-[10px] font-semibold uppercase tracking-wider transition-colors"
                      >
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

      {/* MODAL */}
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
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl max-h-[92vh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-white rounded-2xl shadow-2xl border border-[#d4eef9]"
              initial={{ opacity: 0, scale: 0.95, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 24 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-7 py-5 border-b border-[#d4eef9]">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 rounded-full bg-[#0e4a6b]" />
                  <h2
                    className="text-lg font-bold text-[#0e2a3d]"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {editando ? "Editar testimonio" : "Nuevo testimonio"}
                  </h2>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-lg text-[#4a6170] hover:bg-[#f5fbfe] transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="px-7 py-6 flex flex-col gap-6">
                {/* DATOS DEL USUARIO */}
                <div>
                  <h3 className={sc}>Datos del usuario</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={lc}>Nombre *</label>
                      <input
                        type="text"
                        value={formData.nombre}
                        onChange={(e) => set("nombre", e.target.value)}
                        placeholder="María Fernández"
                        className={ic}
                      />
                    </div>
                    <div>
                      <label className={lc}>Rol</label>
                      <input
                        type="text"
                        value={formData.rol}
                        onChange={(e) => set("rol", e.target.value)}
                        placeholder="Usuaria TIVO · Lima"
                        className={ic}
                      />
                    </div>
                  </div>
                </div>

                {/* TESTIMONIO */}
                <div>
                  <h3 className={sc}>Contenido del testimonio</h3>
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className={lc}>Mensaje *</label>
                      <textarea
                        value={formData.mensaje}
                        onChange={(e) => set("mensaje", e.target.value)}
                        rows={5}
                        placeholder="Antes mi trayecto era aburrido y solitario. Hoy comparto el viaje con personas increíbles..."
                        className={`${ic} resize-none italic`}
                      />
                      <p className="text-[10px] text-[#8fb0c0] mt-1.5">
                        {formData.mensaje.length} caracteres · recomendado 100-250
                      </p>
                    </div>

                    <div>
                      <label className={lc}>Calificación (estrellas)</label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => set("rating", n)}
                            className="transition-transform hover:scale-110"
                          >
                            <Star
                              className={`h-7 w-7 ${
                                n <= formData.rating
                                  ? "text-[#0e4a6b] fill-[#0e4a6b]"
                                  : "text-[#cfe7f4]"
                              }`}
                            />
                          </button>
                        ))}
                        <span className="ml-2 text-sm font-semibold text-[#0e4a6b]">
                          {formData.rating}/5
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FOTO */}
                <div>
                  <h3 className={sc}>Foto (opcional)</h3>
                  {formData.foto ? (
                    <div className="relative w-fit">
                      <img
                        src={formData.foto}
                        alt="preview"
                        className="w-32 h-32 rounded-full object-cover border-4 border-[#d4eef9]"
                      />
                      <button
                        onClick={() => set("foto", "")}
                        className="absolute top-0 right-0 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <label
                      className={`flex h-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all ${
                        uploading
                          ? "border-[#0e4a6b] bg-[#f5fbfe]"
                          : "border-[#cfe7f4] bg-[#f5fbfe] hover:border-[#0e4a6b] hover:bg-[#e8f6fb]"
                      }`}
                    >
                      {uploading ? (
                        <Loader2 className="h-7 w-7 animate-spin text-[#0e4a6b]" />
                      ) : (
                        <>
                          <Upload className="h-7 w-7 text-[#cfe7f4] mb-2" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#4a6170]">
                            Subir foto del usuario
                          </span>
                          <span className="text-[10px] text-[#8fb0c0] mt-0.5">
                            PNG, JPG — máx. 3 MB — cuadrada recomendada
                          </span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                  )}
                  {!formData.foto && (
                    <p className="text-[10px] text-[#8fb0c0] mt-2">
                      Si no subes foto, se mostrarán las iniciales en un círculo de color.
                    </p>
                  )}
                </div>

                {/* ORDEN */}
                <div>
                  <label className={lc}>
                    Orden{" "}
                    <span className="normal-case text-[#8fb0c0] tracking-normal font-normal">
                      (menor = primero)
                    </span>
                  </label>
                  <input
                    type="number"
                    value={formData.orden}
                    onChange={(e) => set("orden", e.target.value)}
                    placeholder="0"
                    className={ic}
                  />
                </div>

                {/* ESTADO */}
                <label className="flex items-center gap-4 p-4 rounded-xl border border-[#cfe7f4] bg-[#f5fbfe] cursor-pointer hover:border-[#1bb5e0] transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => set("active", e.target.checked)}
                    className="h-4 w-4 accent-[#0e4a6b] rounded"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#0e4a6b] uppercase tracking-wider">
                      Testimonio activo
                    </p>
                    <p className="text-xs text-[#4a6170]">
                      Visible en el home y en /testimonios
                    </p>
                  </div>
                </label>
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
                  disabled={saving || uploading}
                  className="flex flex-1 items-center justify-center gap-2 py-3 rounded-xl bg-[#0e4a6b] hover:bg-[#0d3d5a] disabled:opacity-60 text-white text-sm font-bold shadow-lg shadow-[#0e4a6b]/20 transition-all"
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {saving
                    ? "Guardando..."
                    : editando
                    ? "Actualizar testimonio"
                    : "Crear testimonio"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}