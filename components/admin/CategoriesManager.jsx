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
import { db } from "@/lib/firebase";
import Swal from "sweetalert2";
import { 
  X,
  Plus,
  Pencil,
  Trash2,
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  Save
} from "lucide-react";

export default function CategoriesManager({ onClose }) {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingPath, setEditingPath] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    parentPath: [],
    isSubcategory: false
  });

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "categorias"), orderBy("order", "asc"));
      const querySnapshot = await getDocs(q);
      const categoriasData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCategorias(categoriasData);
    } catch (error) {
      console.error("Error fetching categorias:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar las categorías",
        confirmButtonColor: "#2563eb",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleCreate = (parentPath = []) => {
    setEditingCategory(null);
    setEditingPath([]);
    setFormData({
      name: "",
      slug: "",
      parentPath,
      isSubcategory: parentPath.length > 0
    });
    setShowModal(true);
  };

  const handleEdit = (category, path) => {
    setEditingCategory(category);
    setEditingPath(path);
    setFormData({
      name: category.name,
      slug: category.slug,
      parentPath: path.slice(0, -1),
      isSubcategory: path.length > 1
    });
    setShowModal(true);
  };

  const updateNestedCategory = (categories, path, updatedData) => {
    if (path.length === 0) return categories;
    
    const newCategories = [...categories];
    let current = newCategories;
    
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
      if (i < path.length - 2) {
        current = current.children;
      }
    }
    
    const lastIndex = path[path.length - 1];
    if (path.length === 1) {
      newCategories[lastIndex] = { ...newCategories[lastIndex], ...updatedData };
    } else {
      current.children[lastIndex] = { ...current.children[lastIndex], ...updatedData };
    }
    
    return newCategories;
  };

  const addNestedCategory = (categories, path, newCategory) => {
    if (path.length === 0) {
      return [...categories, newCategory];
    }
    
    const newCategories = [...categories];
    let current = newCategories;
    
    for (let i = 0; i < path.length; i++) {
      if (i === path.length - 1) {
        if (!current[path[i]].children) {
          current[path[i]].children = [];
        }
        current[path[i]].children.push(newCategory);
      } else {
        current = current[path[i]].children;
      }
    }
    
    return newCategories;
  };

  const deleteNestedCategory = (categories, path) => {
    if (path.length === 0) return categories;
    
    const newCategories = [...categories];
    
    if (path.length === 1) {
      newCategories.splice(path[0], 1);
    } else {
      let current = newCategories;
      
      for (let i = 0; i < path.length - 1; i++) {
        if (i === path.length - 2) {
          current[path[i]].children.splice(path[path.length - 1], 1);
        } else {
          current = current[path[i]].children;
        }
      }
    }
    
    return newCategories;
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Nombre requerido",
        text: "Por favor ingresa el nombre de la categoría",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    try {
      const categoryData = {
        name: formData.name,
        slug: formData.slug || generateSlug(formData.name),
      };

      if (editingCategory) {
        // EDITAR CATEGORÍA EXISTENTE
        if (editingPath.length === 1) {
          // Es categoría principal
          const updatedCategories = updateNestedCategory(categorias, editingPath, categoryData);
          const mainCategory = updatedCategories[editingPath[0]];
          
          await updateDoc(doc(db, "categorias", mainCategory.id), {
            ...mainCategory,
            updatedAt: serverTimestamp()
          });
          
          setCategorias(updatedCategories);
        } else {
          // Es subcategoría - actualizar en la categoría padre
          const updatedCategories = updateNestedCategory(categorias, editingPath, categoryData);
          const mainCategoryIndex = editingPath[0];
          const mainCategory = updatedCategories[mainCategoryIndex];
          
          await updateDoc(doc(db, "categorias", mainCategory.id), {
            ...mainCategory,
            updatedAt: serverTimestamp()
          });
          
          setCategorias(updatedCategories);
        }

        Swal.fire({
          icon: "success",
          title: "¡Actualizado!",
          text: "La categoría se ha actualizado correctamente",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        // CREAR NUEVA CATEGORÍA
        if (formData.parentPath.length === 0) {
          // Crear categoría principal
          const newCategory = {
            ...categoryData,
            order: categorias.length,
            children: []
          };

          const docRef = await addDoc(collection(db, "categorias"), {
            ...newCategory,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });

          setCategorias([...categorias, { ...newCategory, id: docRef.id }]);
        } else {
          // Crear subcategoría
          const newSubcategory = {
            id: `sub_${Date.now()}`,
            ...categoryData,
            children: []
          };

          const updatedCategories = addNestedCategory(categorias, formData.parentPath, newSubcategory);
          const mainCategoryIndex = formData.parentPath[0];
          const mainCategory = updatedCategories[mainCategoryIndex];
          
          await updateDoc(doc(db, "categorias", mainCategory.id), {
            ...mainCategory,
            updatedAt: serverTimestamp()
          });
          
          setCategorias(updatedCategories);
        }

        Swal.fire({
          icon: "success",
          title: "¡Creado!",
          text: "La categoría se ha creado correctamente",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      setShowModal(false);
    } catch (error) {
      console.error("Error saving category:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo guardar la categoría",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  const handleDelete = async (category, path) => {
    const hasChildren = category.children && category.children.length > 0;
    
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      html: hasChildren 
        ? `Se eliminará "${category.name}" y todas sus subcategorías`
        : `Se eliminará la categoría "${category.name}"`,
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
        if (path.length === 1) {
          // Eliminar categoría principal
          await deleteDoc(doc(db, "categorias", category.id));
          const updatedCategories = deleteNestedCategory(categorias, path);
          setCategorias(updatedCategories);
        } else {
          // Eliminar subcategoría
          const updatedCategories = deleteNestedCategory(categorias, path);
          const mainCategoryIndex = path[0];
          const mainCategory = updatedCategories[mainCategoryIndex];
          
          await updateDoc(doc(db, "categorias", mainCategory.id), {
            ...mainCategory,
            updatedAt: serverTimestamp()
          });
          
          setCategorias(updatedCategories);
        }

        Swal.fire({
          icon: "success",
          title: "¡Eliminado!",
          text: "La categoría ha sido eliminada",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error deleting category:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar la categoría",
          confirmButtonColor: "#2563eb",
        });
      }
    }
  };

  const toggleExpand = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const renderCategory = (category, path, level = 0) => {
    const categoryId = path.join("-");
    const isExpanded = expandedCategories.has(categoryId);
    const hasChildren = category.children && category.children.length > 0;
    const indent = level * 24;

    return (
      <div key={categoryId}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="group mb-2 flex items-center gap-2 rounded-lg border-2 border-slate-200 bg-white p-3 transition-all hover:border-blue-300 hover:shadow-md"
          style={{ marginLeft: `${indent}px` }}
        >
          <div className="flex flex-1 items-center gap-3">
            {hasChildren && (
              <button
                onClick={() => toggleExpand(categoryId)}
                className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              >
                {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </button>
            )}
            
            {!hasChildren && <div className="w-[26px]" />}

            {hasChildren && isExpanded ? (
              <FolderOpen size={20} className="text-blue-500" />
            ) : (
              <Folder size={20} className="text-slate-400" />
            )}

            <div className="flex-1">
              <div className="font-bold text-slate-900">{category.name}</div>
              <div className="text-xs text-slate-500">{category.slug}</div>
            </div>

            {level < 2 && (
              <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-bold text-blue-700">
                Nivel {level + 1}
              </span>
            )}
          </div>

          <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={() => handleCreate(path)}
              className="rounded-lg bg-green-100 p-2 text-green-700 transition-colors hover:bg-green-200"
              title="Añadir subcategoría"
            >
              <Plus size={16} />
            </button>
            
            <button
              onClick={() => handleEdit(category, path)}
              className="rounded-lg bg-blue-100 p-2 text-blue-700 transition-colors hover:bg-blue-200"
              title="Editar"
            >
              <Pencil size={16} />
            </button>
            
            <button
              onClick={() => handleDelete(category, path)}
              className="rounded-lg bg-red-100 p-2 text-red-700 transition-colors hover:bg-red-200"
              title="Eliminar"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </motion.div>

        {hasChildren && isExpanded && (
          <div>
            {category.children.map((child, idx) => 
              renderCategory(child, [...path, idx], level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-full max-w-6xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black uppercase text-slate-900">
              Gestor de Categorías
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Gestiona la estructura jerárquica completa
            </p>
          </div>
          
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCreate([])}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-700"
            >
              <Plus size={20} />
              Nueva Categoría Principal
            </motion.button>
            
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          </div>
        ) : categorias.length === 0 ? (
          <div className="rounded-2xl bg-slate-50 p-16 text-center">
            <Folder size={64} className="mx-auto mb-4 text-slate-300" />
            <p className="text-xl font-bold text-slate-400">
              No hay categorías registradas
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Crea tu primera categoría principal
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="mb-4 rounded-lg bg-blue-50 p-4">
              <p className="text-sm font-medium text-blue-900">
                💡 <strong>Tip:</strong> Haz clic en el botón <Plus size={14} className="inline" /> verde para añadir subcategorías
              </p>
            </div>

            {categorias.map((categoria, idx) => renderCategory(categoria, [idx]))}
          </div>
        )}

        {/* MODAL CREAR/EDITAR CATEGORÍA */}
        <AnimatePresence>
          {showModal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowModal(false)}
                className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed left-1/2 top-1/2 z-[60] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-8 shadow-2xl"
              >
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-black uppercase text-slate-900">
                    {editingCategory ? "Editar Categoría" : formData.isSubcategory ? "Nueva Subcategoría" : "Nueva Categoría"}
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="mb-2 block text-sm font-bold uppercase text-slate-700">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        const name = e.target.value;
                        setFormData(prev => ({
                          ...prev,
                          name,
                          slug: generateSlug(name)
                        }));
                      }}
                      placeholder="Ej: Equipamiento Especializado"
                      className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 font-medium transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                      autoFocus
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold uppercase text-slate-700">
                      Slug (URL)
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="equipamiento-especializado"
                      className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 font-medium text-slate-600 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                    />
                  </div>

                  {formData.isSubcategory && (
                    <div className="rounded-lg bg-blue-50 p-4">
                      <p className="text-sm font-medium text-blue-900">
                        📁 Esta será una <strong>subcategoría</strong> de nivel {formData.parentPath.length + 1}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex gap-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 rounded-xl border-2 border-slate-200 bg-white px-6 py-3 font-bold text-slate-700 transition-all hover:bg-slate-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-700 hover:shadow-xl"
                  >
                    <Save size={20} />
                    {editingCategory ? "Actualizar" : "Crear"}
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}