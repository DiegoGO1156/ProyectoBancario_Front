import { Auth } from '../src/pages/Auth';
import { Register } from './components/Register';
import { User } from '../src/pages/User'


const routes = [
    {path: '/auth', element: <Auth />},
    {path: '/register', element: <Register />},
    {path: '/User', element: <User />},
]

export default routes