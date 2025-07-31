import { PrivateRoutesAdmin, PrivateRoutesAthorities } from './ProtectRoutes'
import { Authorities } from '../pages/Authorities'
import AdminDashboard from './Admin/DashboardAdmin'

export const DashAthorities = () => {
  return (
    <PrivateRoutesAthorities element={<Authorities/>}/>
  )
}

export const DashAdmin = () =>{
  return(
    <PrivateRoutesAdmin element={<AdminDashboard/>}/>
  )
}
