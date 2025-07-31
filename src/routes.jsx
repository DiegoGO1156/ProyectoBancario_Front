import { ComplaintForm } from "./components/complaint/ComplaintForm"
import { ComplaintState } from "./components/complaint/ComplaintState"
import { AdminPage } from "./pages/AdminPage";
import { HomePageR }  from "./pages/HomePage";
import { AdminComplaintsPage } from "./pages/AdminComplaintsPage";
import LoginPage from "./pages/LoginPage";
import { DashAdmin, DashAthorities } from "./components/ProtectedPages";
import { GraphicsPage } from "./pages/GraphicPage";



const routes = [
    {path: '/authorities', element: <DashAthorities/>},
    {path: '/admin', element: <DashAdmin/>},
    {path: '/Complaint', element: <ComplaintForm/>},
    {path: '/ComplaintState', element: <ComplaintState/>},
    {path: '/admin', element: <AdminPage/>},
    {path: '/', element: <HomePageR/>},
    {path: '/active', element: <AdminComplaintsPage/>},
    {path: '/login', element: <LoginPage/>},
    {path: '/graficos', element: <GraphicsPage/>},
]
export default routes
