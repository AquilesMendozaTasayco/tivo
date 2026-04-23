import PageHero from "@/components/PageHero";
import About from "@/components/nosotros/About";
import MisionVision from "@/components/nosotros/MisionVision";
import WhyChooseUs from "@/components/nosotros/WhyChooseUs";

export default function NosotrosPage() {
  return (
    <main className="bg-white">
      {/* 🏎️ Hero con imagen de impacto automotriz */}
      <PageHero 
        image="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80" 
        title="Nuestra Esencia" 
        breadcrumb="Nosotros" 
      />
      
      {/* 🔵 Secciones de contenido con estilo industrial */}
      <section className="relative">
        <About />
        
        <div className="bg-slate-50">
          <MisionVision />
        </div>
        
        <WhyChooseUs />
      </section>

      {/* Franja de cierre CAMANX */}
      <div className="h-2 w-full flex">
        <div className="flex-1 bg-[#1e3a8a]"></div>
        <div className="flex-1 bg-slate-900"></div>
        <div className="flex-1 bg-[#1e3a8a]"></div>
      </div>
    </main>
  );
}