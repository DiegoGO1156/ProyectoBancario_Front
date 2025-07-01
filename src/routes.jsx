import { Auth } from '../src/pages/Auth';
import { Register } from './components/Register';
import { User } from '../src/pages/User'
import { Profile } from "../src/components/settings/Profile"
import { Transfer } from "../src/components/transfer/Transfer"
import { AddFavoriteUser } from './components/transfer/addFavoriteUser';
import { TransferForm } from './components/transfer/TransferForm';
import { TransferList } from './components/transfer/TransferList';


const routes = [
    {path: '/auth', element: <Auth />},
    {path: '/register', element: <Register />},
    {path: '/User', element: <User />},
    {path: '/Profile', element: <Profile />},
    {path: '/Transfers', element: <Transfer />},
    {path: '/Addfavorite', element: <AddFavoriteUser />},
    {path: '/TransferForm', element: <TransferForm />},
    {path: '/TransferList', element: <TransferList />},
]

export default routes