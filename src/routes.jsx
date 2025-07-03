import { Auth } from '../src/pages/Auth';
import  HomePage  from '../src/pages/HomePage';
import {DashboardPageAdmin} from '../src/pages/Dashboards/DashboardPageAdmin';
import {MyAccountPage} from '../src/pages/ProfilePage';
import {AboutValmeriaPage} from '../src/pages/Contact';
import { Register } from './components/Register';
import { PendingUsersPage } from './pages/LIstUserPendingPage';
import { ActiveUsersPage } from './pages/ActiveUserPage';
import { UserHistoryPage } from './pages/UserHistoryPage';
import BrandsPage from './pages/BrandsPage/BrandPage';
import { PrivateAdminDashboard } from './components/PrivatePages';
import ServicesPage from './pages/ServicesPage/ServicesPage';

const routes = [
    {path: '/auth', element: <Auth />},
    {path: '/', element: <HomePage />},
    {path: '/admin', element: <PrivateAdminDashboard />},
    {path: '/profile' , element: <MyAccountPage />},
    {path: '/contact', element: <AboutValmeriaPage />},
    {path: '/register', element: <Register />},
    {path: '/userPending', element: <PendingUsersPage />},
    {path: '/userActive', element: <ActiveUsersPage />},
    {path: '/historyUser', element: <UserHistoryPage/>},
    {path: '/brands', element: <BrandsPage/>},
    {path: '/services', element: <ServicesPage/>},
]

export default routes