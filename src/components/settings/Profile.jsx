import { useState } from 'react';
import { useUserProfile } from '../../shared/hooks';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../shared/hooks';
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import { BackgroundGradient } from "../ui/background-gradient";
import { Perfil } from "../Perfil"
import { PasswordSettings } from "./PasswordSettings";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "../ui/lib/utils";

export const Profile = () => {
  const { usuario, loading, error } = useUserProfile();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (loading) return <p>Cargando datos del usuario...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleNavigateToSettingPage = () => navigate("/settings");
  const handleLogout = () => logout();

  const links = [
    { label: "Dashboard", href: "#", icon: <IconBrandTabler />, onClick: () => { } },
    { label: "Profile", href: "#", icon: <IconUserBolt />, onClick: () => { } },
    { label: "Settings", href: "#", icon: <IconSettings />, onClick: handleNavigateToSettingPage },
    { label: "Logout", href: "#", icon: <IconArrowLeft />, onClick: handleLogout },
  ];

  return (
    <div
      className={cn(
        "flex w-full h-screen flex-col overflow-hidden md:flex-row",
        "bg-white"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Perfil",
                href: "#",
                icon: (
                  <img
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard usuario={usuario} />
    </div>
  );
}


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

const Dashboard = ({ usuario }) => {
  return (
    <div className="flex-1 flex justify-center items-center min-h-screen px-8 bg-white">
      <div className="w-full max-w-[400px]">
        <BackgroundGradient className="rounded-[22px] p-8 sm:p-12 bg-white shadow-2xl">
          <Perfil/>

          <h2 className="text-3xl font-bold text-black mb-6">
            Perfil de {usuario.name}
          </h2>

          <div className="text-base text-black space-y-2">
            <p>Email: {usuario.email}</p>
            <p>Username: {usuario.username}</p>
            <p>DPI: {usuario.dpi}</p>
            <p>Phone: {usuario.phone}</p>
            <p>Company: {usuario.companyName}</p>
            <p>Estado de cuenta: {usuario.statusAccount}</p>
          </div>
        </BackgroundGradient>
      </div>
    </div>
  );
};

const footer = ({}) => {
  return(
    <div className='max-w-[900px]'>
          <footer className="bg-gray-900 pt-12 pb-6 px-10 tracking-wide">
            <div className="max-w-screen-xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Logo */}
                <div className="lg:flex lg:items-center">
                  <a href="#">
                    <img src="https://readymadeui.com/readymadeui-light.svg" alt="logo" className="w-48" />
                  </a>
                </div>

                {/* Redes sociales */}
                <div className="lg:flex lg:items-center">
                  <ul className="flex space-x-6">
                    {/* Icons omitidos por brevedad, mantenlos si quieres */}
                  </ul>
                </div>

                {/* Enlaces útiles */}
                <div>
                  <h4 className="mb-6 text-white">Useful links</h4>
                  <ul className="space-y-4 pl-2 text-sm text-gray-400 hover:text-white">
                    <li><a href="#">Featured</a></li>
                    <li><a href="#">New Arrivals</a></li>
                  </ul>
                </div>

                {/* Información */}
                <div>
                  <h4 className="mb-6 text-white">Information</h4>
                  <ul className="space-y-4 pl-2 text-sm text-gray-400 hover:text-white">
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Terms & Conditions</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                  </ul>
                </div>
              </div>

              <p className="text-gray-400 text-sm mt-10 text-center">
                © ReadymadeUI. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
  );
}


export default Profile;
