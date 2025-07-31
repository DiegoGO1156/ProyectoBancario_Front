import ComplaintsAuthorities from "../components/ComplaintsAuthorities"
import Sidebar from "../components/SideBar"

export const Authorities = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-0 transition-all duration-300">
        <ComplaintsAuthorities />
      </div>
    </div>
  );
};
