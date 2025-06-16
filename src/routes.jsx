import { Auth } from '../src/pages/Auth';
import { Register } from './components/Register';
import { User } from '../src/pages/User'
import { Profile } from "../src/components/settings/Profile"


const routes = [
    {path: '/auth', element: <Auth />},
    {path: '/register', element: <Register />},
    {path: '/User', element: <User />},
    {path: '/Profile', element: <Profile />},
]

export default routes