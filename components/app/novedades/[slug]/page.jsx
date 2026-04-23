"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Calendar,
  Share2,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Hash,
} from "lucide-react";

export default function NovedadDetalle() {
  const params = useParams();
  const slug = params?.slug;

  const [post, setPost] = useState(null);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "novedades"),
          where("active", "!=", false),
          orderBy("active"),
          orderBy("fecha", "desc")
        );
        const snap = await getDocs(q);
        const all = snap.docs.map(d => ({ id: d.id, ...d.data() }));

        const currentIndex = all.findIndex(n => n.slug === slug);
        if (currentIndex !== -1) {
          setPost(all[currentIndex]);
          setPrev(currentIndex > 0 ? all[currentIndex - 1] : null);
          setNext(currentIndex < all.length - 1 ? all[currentIndex + 1] : null);
          setRelated(all.filter((_, i) => i !== currentIndex).slice(0, 3));
        }
      } catch (e) {
        console.error("Error fetching novedad:", e);
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    };

    fetchData();
  }, [slug]);

  // Funciones de compartir
  const shareUrl = currentUrl || (typeof window !== "undefined" ? window.location.href : "");
  const shareTitle = post?.titulo || "";

  const handleShareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      "_blank", "width=600,height=400"
    );
  };

  const handleShareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
      "_blank", "width=600,height=400"
    );
  };

  const handleShareLinkedin = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      "_blank", "width=600,height=400"
    );
  };

  const handleShareEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`Te comparto este artículo de CAMANX:\n\n${shareTitle}\n\n${shareUrl}`)}`;
  };

  if (loading) return <div className="min-h-screen bg-white" />;

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white p-6 text-center">
        <h2 className="text-4xl font-black uppercase tracking-tighter text-slate-900">Reporte no encontrado</h2>
        <Link href="/novedades" className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#1e3a8a]">
          <ArrowLeft size={14} /> Volver al índice
        </Link>
      </div>
    );
  }

  return (
    <>
      <PageHero
        image={post.imagenPrincipal}
        title="Reporte Técnico"
        breadcrumb={post.titulo}
      />

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-16 lg:flex-row">

            {/* COLUMNA PRINCIPAL */}
            <main className="flex-1">
              <header className="mb-12">
                <div className="mb-6 flex items-center gap-6">
                  <span className="bg-[#1e3a8a] px-4 py-1 text-[9px] font-black uppercase tracking-[0.3em] text-white">
                    {post.categoria}
                  </span>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <Calendar size={12} className="text-[#1e3a8a]" />
                    {post.fecha}
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <Hash size={12} className="text-[#1e3a8a]" />
                    REF-{(post.id || "").toString().slice(-4).toUpperCase()}
                  </div>
                </div>

                <h1 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter text-slate-900 md:text-7xl">
                  {post.titulo}
                </h1>
              </header>

              {/* Contenido dinámico */}
              <div className="space-y-12">
                {post.contenido?.map((block, index) => {
                  if (block.tipo === "parrafo") {
                    return (
                      <p key={index} className="text-lg leading-relaxed text-slate-600 font-medium">
                        {block.texto}
                      </p>
                    );
                  }
                  if (block.tipo === "imagen") {
                    return (
                      <figure key={index} className="space-y-4">
                        <div className="relative aspect-video w-full overflow-hidden bg-slate-100 border border-slate-100">
                          <Image src={block.url} alt={block.caption || ""} fill className="object-cover" />
                        </div>
                        {block.caption && (
                          <figcaption className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-l-2 border-[#1e3a8a] pl-4">
                            // {block.caption}
                          </figcaption>
                        )}
                      </figure>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Navegación anterior/siguiente */}
              <div className="mt-20 grid grid-cols-2 border-t border-slate-100 pt-12">
                {prev ? (
                  <Link href={`/novedades/${prev.slug}`} className="group flex flex-col items-start text-left">
                    <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">
                      <ChevronLeft size={12} /> Anterior
                    </span>
                    <span className="text-xs font-black uppercase tracking-tight text-slate-900 group-hover:text-[#1e3a8a] transition-colors line-clamp-1">
                      {prev.titulo}
                    </span>
                  </Link>
                ) : <div />}

                {next && (
                  <Link href={`/novedades/${next.slug}`} className="group flex flex-col items-end text-right">
                    <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">
                      Siguiente <ChevronRight size={12} />
                    </span>
                    <span className="text-xs font-black uppercase tracking-tight text-slate-900 group-hover:text-[#1e3a8a] transition-colors line-clamp-1">
                      {next.titulo}
                    </span>
                  </Link>
                )}
              </div>
            </main>

            {/* BARRA LATERAL */}
            <aside className="w-full lg:w-80">
              <div className="sticky top-28 space-y-8">

                {/* Difusión Técnica - Botones funcionales */}
                <div className="bg-slate-900 p-8 text-white shadow-xl">
                  <div className="mb-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]">
                    <Share2 size={14} className="text-blue-500" />
                    Difusión Técnica
                  </div>
                  <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10">
                    <SocialBtn
                      icon={<Facebook size={16} />}
                      label="Facebook"
                      color="hover:bg-[#1877F2]"
                      onClick={handleShareFacebook}
                    />
                    <SocialBtn
                      icon={<Twitter size={16} />}
                      label="Twitter / X"
                      color="hover:bg-[#1DA1F2]"
                      onClick={handleShareTwitter}
                    />
                    <SocialBtn
                      icon={<Linkedin size={16} />}
                      label="LinkedIn"
                      color="hover:bg-[#0A66C2]"
                      onClick={handleShareLinkedin}
                    />
                    <SocialBtn
                      icon={<Mail size={16} />}
                      label="Email"
                      color="hover:bg-[#1e3a8a]"
                      onClick={handleShareEmail}
                    />
                  </div>
                </div>

                {/* Newsletter */}
                <div className="border border-slate-100 bg-slate-50 p-8">
                  <h4 className="text-lg font-black uppercase tracking-tighter text-slate-900 leading-none">
                    Camanx <br /> <span className="text-[#1e3a8a]">Newsletter</span>
                  </h4>
                  <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 leading-relaxed">
                    Recibe actualizaciones de flota y tecnología en tu correo.
                  </p>
                  <form className="mt-6 space-y-3" onSubmit={(e) => e.preventDefault()}>
                    <input
                      type="email"
                      placeholder="EMAIL ADDRESS"
                      className="w-full bg-white border border-slate-200 px-4 py-3 text-[10px] font-bold uppercase tracking-widest outline-none focus:border-[#1e3a8a]"
                    />
                    <button className="w-full bg-[#1e3a8a] py-4 text-[9px] font-black uppercase tracking-[0.2em] text-white hover:bg-slate-900 transition-colors">
                      Suscribirme
                    </button>
                  </form>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* MÁS NOVEDADES */}
      {related.length > 0 && (
        <section className="bg-slate-50 py-24 border-t border-slate-100">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 flex items-end justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1e3a8a]">
                  Explorar más reportes
                </span>
                <h2 className="mt-2 text-3xl font-black uppercase tracking-tighter text-slate-900">
                  Otras <span className="text-[#1e3a8a]">Novedades</span>
                </h2>
              </div>
              <Link
                href="/novedades"
                className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#1e3a8a] transition-colors"
              >
                Índice completo <ChevronRight size={14} />
              </Link>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/novedades/${item.slug}`}
                  className="group bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={item.imagenPrincipal}
                      alt={item.titulo}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md px-3 py-1 text-[8px] font-black uppercase tracking-widest text-white">
                      {item.categoria}
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="mb-4 flex items-center gap-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                      <Calendar size={10} className="text-[#1e3a8a]" />
                      {item.fecha}
                    </div>
                    <h3 className="text-sm font-black uppercase tracking-tight text-slate-900 group-hover:text-[#1e3a8a] transition-colors line-clamp-2 leading-snug">
                      {item.titulo}
                    </h3>
                    <div className="mt-8 flex items-center justify-between border-t border-slate-50 pt-4">
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#1e3a8a]">
                        Ver Análisis
                      </span>
                      <ChevronRight size={14} className="text-slate-200 group-hover:text-[#1e3a8a] group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function SocialBtn({ icon, label, color, onClick }) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`group flex aspect-square items-center justify-center bg-slate-900 ${color} transition-all duration-300`}
    >
      {icon}
    </button>
  );
}