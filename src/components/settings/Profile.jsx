import { useState } from 'react';
import { useUserProfile } from '../../shared/hooks';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../shared/hooks';
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import { PasswordSettings } from "./PasswordSettings";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconArrowWaveRightUp,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
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
      <h2>Perfil de {usuario.name}</h2>
      <p>Email: {usuario.email}</p>
      <p>Estado de cuenta: {usuario.statusAccount}</p>
      <PasswordSettings />
    </div>
  );
};


export default Profile;
