import Sidebar from "../components/SideBar"
import AdminDashboard from "../components/Admin/DashboardAdmin";

export const AdminPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-0 transition-all duration-300">
        <AdminDashboard />
      </div>
    </div>
  );
};
