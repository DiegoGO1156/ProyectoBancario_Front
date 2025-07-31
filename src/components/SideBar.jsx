import { useState, useRef, useEffect } from "react";
import {
  Home,
  Users,
  DollarSign,
  Settings,
  LogOut,
  PanelLeftOpen,
  PanelLeftClose,
} from "lucide-react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [zoomIn, setZoomIn] = useState(true);
  const sidebarRef = useRef(null);
  const triggerRef = useRef(null);

  const handleMouseEnter = () => {
    if (!fixed) setOpen(true);
  };

  const handleMouseLeave = () => {
    if (!fixed) setOpen(false);
  };

  const toggleFixed = () => {
    setFixed((prev) => !prev);
    setOpen((prev) => (fixed ? false : true));
  };

  // Zoom continuo para el botón de Brigada Virtual
  useEffect(() => {
    const interval = setInterval(() => {
      setZoomIn((prev) => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Hover control para el sidebar
  useEffect(() => {
    const sidebar = sidebarRef.current;
    const trigger = triggerRef.current;

    if (sidebar && trigger) {
      sidebar.addEventListener("mouseenter", handleMouseEnter);
      sidebar.addEventListener("mouseleave", handleMouseLeave);
      trigger.addEventListener("mouseenter", handleMouseEnter);
      trigger.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (sidebar && trigger) {
        sidebar.removeEventListener("mouseenter", handleMouseEnter);
        sidebar.removeEventListener("mouseleave", handleMouseLeave);
        trigger.removeEventListener("mouseenter", handleMouseEnter);
        trigger.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [fixed]);

  return (
    <>
      {/* Fuentes */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Poppins:wght@300;400;500&display=swap"
        rel="stylesheet"
      />

      <div className="relative h-screen">
        {/* Botón lateral de apertura */}
        <div
          ref={triggerRef}
          className="fixed top-1/2 -translate-y-1/2 left-0 z-50 w-10 h-16 bg-[#217074] border border-white shadow-lg shadow-[#00000044] flex items-center justify-center rounded-r-md cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-[#1a5c5c] group"
          onClick={toggleFixed}
        >
          <div className="transition-transform duration-300 ease-in-out group-hover:scale-110">
            {open ? (
              <PanelLeftClose size={28} className="text-white" />
            ) : (
              <PanelLeftOpen size={28} className="text-white" />
            )}
          </div>
        </div>

        {/* Sidebar principal */}
        <div
          ref={sidebarRef}
          className={`fixed top-0 left-0 h-full transition-all duration-300 ease-in-out shadow-xl z-40 overflow-hidden text-white ${
            open ? "w-[300px]" : "w-0"
          }`}
          style={{
            backgroundColor: "#217074",
            backgroundImage: "linear-gradient(135deg, #1a5c5c 0%, #217074 100%)",
          }}
        >
          {/* Contenedor con scroll exclusivo */}
          <div className="pl-16 pr-6 pt-8 pb-6 space-y-8 max-h-screen overflow-y-auto">
            {/* Logo y título animado */}
            <div className="flex flex-col items-center mb-6">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20 mb-4">
                <div className="bg-gradient-to-r from-[#8B9D77] to-[#37745b] w-16 h-16 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white text-2xl font-bold">BV</span>
                </div>
              </div>

              <button
                style={{
                  transform: zoomIn ? "scale(1.1)" : "scale(1)",
                  transition: "transform 500ms ease-in-out",
                }}
                className="flex items-center gap-3 w-full bg-white/10 backdrop-blur-sm text-white font-serif text-lg
                  px-6 py-3 rounded-lg shadow-lg shadow-[#00000044]
                  select-none cursor-default
                  transition-all duration-300 hover:bg-white/15 hover:shadow-[#00000066]
                  font-['Playfair Display'] font-bold tracking-wide"
              >
                <span className="whitespace-nowrap">Brigada Virtual</span>
              </button>
            </div>

            {/* Separador decorativo */}
            <div className="relative py-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-[#217074] px-3 text-sm text-white/60">Menu</span>
              </div>
            </div>

            {/* Navegación */}
            <nav className="flex flex-col gap-3">
              {[
                { label: "Inicio", icon: <Home size={22} />, href: "/" },
                { label: "Denuncias", icon: <Users size={22} />, href: "/Complaint" },
                { label: "Estado Denuncias", icon: <Users size={22} />, href: "/ComplaintState" },
                { label: "Transacciones", icon: <DollarSign size={22} />, href: "/" },
                { label: "Configuración", icon: <Settings size={22} />, href: "/" },
              ].map(({ label, icon, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-3 px-6 py-3 bg-white/5 text-white
                    hover:bg-white/15 hover:shadow-md
                    rounded-lg shadow-sm shadow-[#00000033]
                    transition-all duration-200 group hover:rotate-7"
                >
                  <div className="text-[#8B9D77] group-hover:text-white transition-colors">
                    {icon}
                  </div>
                  <span className="whitespace-nowrap font-medium font-['Poppins'] tracking-wide">
                    {label}
                  </span>
                </a>
              ))}
            </nav>

            {/* Separador decorativo */}
            <div className="relative py-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-[#217074] px-3 text-sm text-white/60">Log out</span>
              </div>
            </div>

            {/* Cierre de sesión */}
            <a
              href="/logout"
              className="flex items-center gap-3 px-6 py-3 bg-[#8B9D77]/30 text-white
                hover:bg-[#8B9D77]/50 hover:shadow-md
                rounded-lg shadow-sm shadow-[#00000033]
                transition-all duration-200
                group"
            >
              <LogOut size={20} className="text-[#ff7b7b]" />
              <span className="whitespace-nowrap font-medium font-['Poppins'] tracking-wide">
                Cerrar sesión
              </span>
            </a>
          </div>
          <div className="absolute bottom-0 w-full py-4 px-6 bg-[#1a5c5c]/80 text-center text-xs text-white/60">
            © 2025 Brigada Virtual
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
