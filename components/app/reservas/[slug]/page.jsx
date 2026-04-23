import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { 
  ChevronRight, 
  Phone, 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  BadgeCheck, 
  FileText,
  Users,
  Gauge,
  Fuel,
  MessageCircle,
  Calendar,
  Shield,
  Clock,
  MapPin
} from "lucide-react";
import { carros } from "@/data/carros";

export default async function VehiculoDetalle({ params }) {
  // Importante: await params en Next.js 15
  const { slug } = await params;
  
  // Buscar vehículo por ID
  const vehiculo = carros.find(c => c.id === parseInt(slug));
  
  if (!vehiculo) {
    return notFound();
  }

  // Vehículos relacionados de la misma marca
  const relacionados = carros
    .filter(c => c.marca === vehiculo.marca && c.id !== vehiculo.id)
    .slice(0, 4);

  const whatsappNumber = "51921785028"; 
  const whatsappMessage = encodeURIComponent(
    `Hola, estoy interesado en rentar el ${vehiculo.nombre}. ¿Podrían brindarme más información sobre disponibilidad y tarifas?`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="bg-[#fcfcfc] min-h-screen">
      <div className="relative h-[45vh] w-full bg-slate-900 overflow-hidden flex items-end pb-20">
        <Image 
          src="/heros/hero-interior.jpg" 
          alt="Background" 
          fill 
          className="object-cover opacity-40 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fcfcfc] via-transparent to-transparent" />
        
        <div className="relative mx-auto max-w-7xl px-6 w-full">
          <Link href="/reservas" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 hover:text-white mb-6 transition-all group">
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" /> Volver a la flota
          </Link>
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-white/90 leading-[0.8]">
            {vehiculo.marca}
            <span className="block text-[#1e3a8a] text-4xl md:text-6xl mt-2 tracking-normal">
              {vehiculo.nombre.replace(vehiculo.marca, '').trim()}
            </span>
          </h1>
        </div>
      </div>

      {/* 2. CUERPO DEL VEHÍCULO */}
      <section className="-mt-16 relative z-10 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col lg:flex-row bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] border border-slate-100">
            
            {/* COLUMNA IZQUIERDA: Visual */}
            <div className="lg:w-3/5 p-8 md:p-16 border-r border-slate-100 relative">
              <div className="sticky top-24">
                <div className="absolute top-0 left-0 bg-[#1e3a8a] text-white px-4 py-1 text-[10px] font-black uppercase tracking-widest z-20">
                  {vehiculo.marca} Rentals
                </div>
                
                {/* Imagen del vehículo */}
                <div className="relative pt-12">
                  <div className="relative aspect-[4/3] w-full bg-slate-50 rounded-sm overflow-hidden">
                    <Image
                      src={vehiculo.imagen}
                      alt={vehiculo.nombre}
                      fill
                      className="object-contain p-8"
                    />
                  </div>
                  <div className="absolute top-8 left-[-10px] w-20 h-[1px] bg-slate-200" />
                  <div className="absolute top-[-10px] left-8 w-[1px] h-20 bg-slate-200" />
                </div>

                {/* Especificaciones técnicas */}
                <div className="mt-16 grid grid-cols-3 gap-8 border-t border-slate-50 pt-10">
                  <div className="text-center">
                    <div className="flex justify-center mb-3">
                      <Users className="h-8 w-8 text-[#1e3a8a]" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Pasajeros</p>
                    <p className="text-2xl font-black text-slate-900">{vehiculo.pasajeros}</p>
                  </div>
                  <div className="text-center border-x border-slate-100">
                    <div className="flex justify-center mb-3">
                      <Gauge className="h-8 w-8 text-[#1e3a8a]" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Transmisión</p>
                    <p className="text-sm font-black text-slate-900 uppercase">{vehiculo.transmision}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-3">
                      <Fuel className="h-8 w-8 text-[#1e3a8a]" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Combustible</p>
                    <p className="text-sm font-black text-slate-900 uppercase">{vehiculo.combustible}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMNA DERECHA: Información y Reserva */}
            <div className="lg:w-2/5 flex flex-col bg-slate-50/50">
              <div className="p-8 md:p-12 flex-1">
                {/* Precio destacado */}
                <div className="mb-12 bg-slate-900 p-8 -mx-8 md:-mx-12 -mt-8 md:-mt-12">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 block mb-2">
                    Tarifa Diaria
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-white">S/ {vehiculo.precio}</span>
                    <span className="text-sm font-black uppercase text-slate-400">/día</span>
                  </div>
                  <div className="h-1 w-16 bg-[#1e3a8a] mt-4" />
                </div>
                
                <div className="mb-12">
                  <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-6">Descripción del Vehículo</h3>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    {vehiculo.detalle}
                  </p>
                </div>

                {/* Beneficios incluidos */}
                <div className="space-y-3 mb-12">
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-900 mb-4">
                    Incluye en el Servicio
                  </h4>
                  {[
                    { icon: <ShieldCheck className="h-5 w-5"/>, t: "Seguro Completo", d: "Cobertura total incluida" },
                    { icon: <Clock className="h-5 w-5"/>, t: "Entrega 24/7", d: "Disponibilidad inmediata" },
                    { icon: <Shield className="h-5 w-5"/>, t: "Asistencia Vial", d: "Soporte en carretera" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-5 p-5 bg-white border border-slate-200 hover:border-[#1e3a8a] transition-all group">
                      <div className="text-[#1e3a8a] group-hover:scale-110 transition-transform">{item.icon}</div>
                      <div>
                        <p className="text-[11px] font-black uppercase text-slate-900">{item.t}</p>
                        <p className="text-[10px] text-slate-400 uppercase">{item.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* BLOQUE DE ACCIÓN WHATSAPP */}
              <div className="bg-slate-900 p-8 md:p-12">
                <h4 className="text-white text-xl font-black uppercase tracking-tighter mb-8 italic leading-tight">
                  ¿Listo para iniciar <br/> tu viaje?
                </h4>
                <div className="space-y-4">
                  {/* Botón Principal de WhatsApp */}
                  <a 
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full bg-[#25D366] px-8 py-5 text-white font-black uppercase text-xs tracking-widest hover:bg-white hover:text-[#25D366] transition-all group shadow-lg"
                  >
                    <span className="flex items-center gap-3">
                       <MessageCircle className="h-5 w-5 fill-current" /> Reservar por WhatsApp
                    </span>
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  
                  {/* Información de contacto secundaria */}
                  <div className="flex flex-col gap-3 pt-4 border-t border-white/10 mt-4">
                    <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Atención personalizada</p>
                    <a href="tel:+51921785028" className="flex items-center gap-3 text-[10px] font-bold uppercase text-slate-400 hover:text-[#1e3a8a] transition-colors">
                      <Phone className="h-3 w-3" /> Central: 51 921 785 028
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* 3. VEHÍCULOS RELACIONADOS */}
          {relacionados.length > 0 && (
            <div className="mt-40">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                <div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter text-slate-900">
                    Más Vehículos <span className="text-[#1e3a8a]">{vehiculo.marca}</span>
                  </h3>
                  <p className="text-sm text-slate-400 uppercase font-bold tracking-widest mt-2">Explora otras opciones de la misma marca</p>
                </div>
                <Link href="/reservas" className="text-[10px] font-black uppercase tracking-[0.3em] bg-slate-100 px-6 py-3 hover:bg-[#1e3a8a] hover:text-white transition-all">
                  Ver toda la flota
                </Link>
              </div>

              <div className="grid gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-4 border border-slate-200">
                {relacionados.map((v) => (
                  <Link
                    key={v.id}
                    href={`/reservas/${v.id}`}
                    className="group bg-white p-8 transition-all hover:bg-slate-50 relative overflow-hidden"
                  >
                    <div className="relative aspect-[4/3] w-full mb-8">
                      <Image
                        src={v.imagen}
                        alt={v.nombre}
                        fill
                        className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-[#1e3a8a] mb-2">
                        {v.marca} • RENTALS
                      </p>
                      <h4 className="text-sm font-bold uppercase tracking-tight text-slate-900 group-hover:text-[#1e3a8a] transition-colors line-clamp-2 mb-3">
                        {v.nombre}
                      </h4>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-black text-slate-900">S/ {v.precio}</span>
                        <span className="text-[9px] font-black uppercase text-slate-400">/día</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}