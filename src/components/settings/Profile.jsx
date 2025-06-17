import { useState } from 'react';
import { useUserProfile } from '../../shared/hooks';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../shared/hooks';
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import { BackgroundGradient } from "../ui/background-gradient";
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
    { label: "Dashboard", href: "#", icon: <IconBrandTabler />, onClick: () => {} },
    { label: "Profile", href: "#", icon: <IconUserBolt />, onClick: () => {} },
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
                label: "Manu Arora",
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
    <div>
      <div>
      <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
        <img
          src={`/jordans.webp`}
          alt="jordans"
          height="400"
          width="400"
          className="object-contain"
        />
        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
          <h2>Perfil de {usuario.name}</h2>
        </p>
 
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          <p>Email: {usuario.email}</p>
          <p>Estado de cuenta: {usuario.statusAccount}</p>
        </p>
        <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
          <span>Buy now </span>
          <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
            $100
          </span>
        </button>
      </BackgroundGradient>
    </div>
      <PasswordSettings />
    </div>
  );
};


export default Profile;
