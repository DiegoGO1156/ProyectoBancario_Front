import { Auth } from '../src/pages/Auth';
import  HomePage  from '../src/pages/HomePage';
import {DashboardPageAdmin} from '../src/pages/Dashboards/DashboardPageAdmin';
import {MyAccountPage} from '../src/pages/ProfilePage';
import {AboutValmeriaPage} from '../src/pages/Contact';
import { Register } from './components/Register';

const routes = [
    {path: '/auth', element: <Auth />},
    {path: '/', element: <HomePage />},
    {path: '/admin', element: <DashboardPageAdmin />},
    {path: '/profile' , element: <MyAccountPage />},
    {path: '/contact', element: <AboutValmeriaPage />},
    {path: '/register', element: <Register />},
]

export default routes