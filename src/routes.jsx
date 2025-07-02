import { Auth } from '../src/pages/Auth';
import  HomePage  from '../src/pages/HomePage';
import {DashboardPageAdmin} from '../src/pages/Dashboards/DashboardPageAdmin';
import {MyAccountPage} from '../src/pages/ProfilePage';
import {AboutValmeriaPage} from '../src/pages/Contact';
import { Register } from './components/Register';
import { User } from '../src/pages/User'
import { Transfer } from "../src/components/transfer/Transfer"
import { AddFavoriteUser } from './components/transfer/addFavoriteUser';
import { TransferForm } from './components/transfer/TransferForm';
import { TransferList } from './components/transfer/TransferList';
import { PendingUsersPage } from './pages/LIstUserPendingPage';
import { ActiveUsersPage } from './pages/ActiveUserPage';
import { UserHistoryPage } from './pages/UserHistoryPage';
import BrandsPage from './pages/BrandsPage/BrandPage';
import { UpdateProfile } from './components/settings/UpdateProfile';
import { PrivateAdminDashboard } from './components/PrivatePages';

const routes = [
    {path: '/auth', element: <Auth />},
    {path: '/', element: <HomePage />},
    {path: '/admin', element: <PrivateAdminDashboard />},
    {path: '/profile' , element: <MyAccountPage />},
    {path: '/contact', element: <AboutValmeriaPage />},
    {path: '/register', element: <Register />},
    {path: '/User', element: <User />},
    {path: '/Transfers', element: <Transfer />},
    {path: '/Addfavorite', element: <AddFavoriteUser />},
    {path: '/TransferForm', element: <TransferForm />},
    {path: '/TransferList', element: <TransferList />},
    {path: '/userPending', element: <PendingUsersPage />},
    {path: '/userActive', element: <ActiveUsersPage />},
    {path: '/historyUser', element: <UserHistoryPage/>},
    {path: '/brands', element: <BrandsPage/>},
    {path: '/updateProfile', element: <UpdateProfile />},
]

export default routes