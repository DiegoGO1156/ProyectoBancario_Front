import { Auth } from '../src/pages/Auth';
import  HomePage  from '../src/pages/HomePage';
import {DashboardPageAdmin} from '../src/pages/Dashboards/DashboardPageAdmin';
import {MyAccountPage} from '../src/pages/ProfilePage';
import {AboutValmeriaPage} from '../src/pages/Contact';
import { Register } from './components/Register';
import { Transfer } from "../src/components/transfer/Transfer"
import { AddFavoriteUser } from './components/transfer/addFavoriteUser';
import { TransferForm } from './components/transfer/TransferForm';
import { TransferList } from './components/transfer/TransferList'
import { UserHistoryPage } from './pages/UserHistoryPage';
import BrandsPage from './pages/BrandsPage/BrandPage';
import { UpdateProfile } from './components/settings/UpdateProfile';
import { PrivateAdminBrands, PrivateAdminDashboard, PrivateAdminServices, PrivateAdminUserPending } from './components/PrivatePages';
import { PrivateAdminActiveUser } from './components/PrivatePages';
import { ServiceList } from './components/service/serviceList';
import { Productos } from "./components/product/ProductList"
import { UpdatePassword } from './components/settings/UpdatePassword';

const routes = [
    {path: '/auth', element: <Auth />},
    {path: '/', element: <HomePage />},
    {path: '/admin', element: <PrivateAdminDashboard />},
    {path: '/profile' , element: <MyAccountPage />},
    {path: '/contact', element: <AboutValmeriaPage />},
    {path: '/register', element: <Register />},
    {path: '/Transfers', element: <Transfer />},
    {path: '/Addfavorite', element: <AddFavoriteUser />},
    {path: '/TransferForm', element: <TransferForm />},
    {path: '/TransferList', element: <TransferList />},
    {path: '/userPending', element: <PrivateAdminUserPending />},
    {path: '/userActive', element: <PrivateAdminActiveUser />},
    {path: '/historyUser', element: <UserHistoryPage/>},
    {path: '/brands', element: <PrivateAdminBrands/>},
    {path: '/services', element: <PrivateAdminServices/>},
    {path: '/updateProfile', element: <UpdateProfile />},
    {path: '/Productos', element: <Productos />},
    {path: '/Service', element: <ServiceList />},
    {path: '/updatePassword', element: <UpdatePassword />},
]

export default routes