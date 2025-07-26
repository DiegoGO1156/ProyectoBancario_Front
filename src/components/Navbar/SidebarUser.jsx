import { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink  } from "../ui/sidebar";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "motion/react";
import { cn } from "../ui/lib/utils";

export const SidebarUsers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const profileLink = {
    href: "/profile",
    label: "Perfil",
    icon: <img
      src="https://assets.aceternity.com/manu.png"
      alt="Avatar"
      className="h-7 w-7 rounded-full"
    />
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("roleUser");
    navigate("/auth");
  };

  // Menú principal
  const menuItems = [
    {
      title: "HOME PAGE",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      ),
      path: "/",
    },
     {
      title: "USUARIO",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 6V3M12 21V18M18 12H21M3 12H6M16.5 7.5L19 5M5 19L7.5 16.5M7.5 7.5L5 5M19 19L16.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      path: "/DashboardUser",
    },
    {
      title: "Servicios",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      ),
      path: "/service",
    },
    {
      title: "Productos",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      ),
      path: "/Productos",
    },
    {
      title: "Transferencias",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      submenu: [
        { title: "Lista", path: "/TransferList" },
        { title: "Agregar usuario", path: "/Addfavorite" },
        { title: "Transferencia", path: "/TransferForm" },
        { title: "Cartera", path: "/Transfers" },
      ],
    }
  ];

  // Efecto para cerrar submenús al cambiar de ruta
  useEffect(() => {
    setActiveSubmenu(null);
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsTransitioning(true);
    setIsOpen(!isOpen);
    setTimeout(() => setIsTransitioning(false), 300); // Duración de la transición
  };

  const toggleSubmenu = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      // En móvil, forzar el cierre del sidebar si no está hover
      if (window.innerWidth < 768 && !isHovered) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isHovered]);

  // Efecto para cerrar el sidebar después de un tiempo sin hover (solo en desktop)
  useEffect(() => {
    let timer;
    if (!isMobile && isOpen && !isHovered) {
      timer = setTimeout(() => {
        setIsOpen(false);
      }, 1000); // 1 segundo después de salir del sidebar
    }
    return () => clearTimeout(timer);
  }, [isHovered, isOpen, isMobile]);

  return (
    <div
      className={`bg-blue-900 text-white h-screen fixed flex flex-col z-50 shadow-xl transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-20"
      }`}
      onMouseEnter={() => {
        setIsHovered(true);
        if (!isMobile) setIsOpen(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo y botón de toggle */}
      <div className="p-4 flex items-center justify-between border-b border-blue-800">
        {isOpen && (
          <div className="flex items-center">
            <div className="bg-white p-1 rounded-lg mr-3 flex items-center justify-center">
              {/* Reemplaza con la ruta correcta a tu imagen */}
              <img
                src="valmeriaBlue.png"
                alt="Logo Banco Valmeria"
                className="w-8 h-8 object-contain" // Ajusta el tamaño según necesites
              />
            </div>
            <span className="text-xl font-bold whitespace-nowrap">
              Valmeria
            </span>
          </div>
        )}

        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-blue-800 transition"
        >
          {isOpen ? (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Menú principal */}
      <div className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <div
                className={`relative rounded-lg transition-all ${
                  (item.path && location.pathname.includes(item.path)) ||
                  (item.submenu &&
                    item.submenu.some((sub) =>
                      location.pathname.includes(sub.path)
                    ))
                    ? "bg-blue-700"
                    : "hover:bg-blue-800"
                }`}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <button
                  onClick={() => {
                    if (item.path) {
                      navigate(item.path);
                    } else if (item.submenu) {
                      toggleSubmenu(index);
                    }
                  }}
                  className="w-full flex items-center p-3 text-left transition hover:scale-[1.02]"
                >
                  <div
                    className={`p-2 rounded-lg ${
                      (item.path && location.pathname.includes(item.path)) ||
                      (item.submenu &&
                        item.submenu.some((sub) =>
                          location.pathname.includes(sub.path)
                        ))
                        ? "bg-blue-600 text-white"
                        : "bg-blue-900 text-blue-300"
                    }`}
                  >
                    {item.icon}
                  </div>

                  {isOpen && (
                    <span className="ml-3 whitespace-nowrap">{item.title}</span>
                  )}

                  {item.submenu && isOpen && (
                    <div className="ml-auto transition-transform">
                      <svg
                        className={`w-5 h-5 transform ${
                          activeSubmenu === index ? "rotate-90" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  )}
                </button>

                {/* Efecto de hover para el tooltip cuando el sidebar está cerrado */}
                {!isOpen && hoveredItem === index && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-blue-800 rounded-lg shadow-lg z-50 whitespace-nowrap transition-opacity">
                    {item.title}
                    {item.submenu && (
                      <div className="mt-1 ml-2 border-l-2 border-blue-600 pl-2">
                        {item.submenu.map((sub, i) => (
                          <div key={i} className="py-1 text-sm text-blue-200">
                            {sub.title}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Submenú */}
              {item.submenu && isOpen && (
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    activeSubmenu === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <ul className="pl-2">
                    {item.submenu.map((subItem, subIndex) => (
                      <li
                        key={subIndex}
                        className="hover:scale-[1.01] transition-transform"
                      >
                        <button
                          onClick={() => navigate(subItem.path)}
                          className={`w-full flex items-center pl-12 pr-3 py-2 text-sm rounded-lg transition-colors ${
                            location.pathname.includes(subItem.path)
                              ? "bg-blue-600 text-white"
                              : "hover:bg-blue-800 text-blue-200"
                          }`}
                        >
                          {subItem.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer del sidebar */}

      <div className="p-4 border-t border-blue-800">
      <Sidebar>
      <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
        <div className="mt-8 flex flex-col gap-2">
          <SidebarLink link={profileLink} />
        </div>
      </div>

      <div className="p-4 border-t border-blue-800">
        <button
          onClick={handleLogout}
          className="mt-4 flex items-center w-full p-2 rounded-lg hover:bg-blue-800 transition"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span className="ml-2">Cerrar sesión</span>
        </button>
      </div>
    </Sidebar>
      </div>
    </div>
  );
};

export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
      <div
        className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white">
        Acet Labs
      </motion.span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
      <div
        className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </a>
  );
};
