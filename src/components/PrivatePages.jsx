import { PrivateRoutesRole } from "./PrivateRoutes"
import { DashboardPageAdmin } from "../pages/Dashboards/DashboardPageAdmin"

export const PrivateAdminDashboard = () => {
    console.log(localStorage.getItem("user"));
    console.log(localStorage.getItem("roleUser"));
  return (
    <>
        <PrivateRoutesRole element={<DashboardPageAdmin />}/>
    </>
  )
}
