import { Auth } from '../src/pages/Auth';
import { Register } from './components/Register';


const routes = [
    {path: '/auth', element: <Auth />},
    {path: '/register', element: <Register />},
]

export default routes