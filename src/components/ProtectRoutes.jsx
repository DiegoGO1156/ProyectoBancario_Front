import { Navigate } from "react-router-dom";


export const ProtectRoute = ({element}) => {
  const token = localStorage.getItem('user');
  return token ? element : <Navigate to="/login" /> ;
}

 export const PrivateRoutesAdmin = ({element}) => {
    const token = localStorage.getItem('user');
    const role = localStorage.getItem('userRole');
    return token && role === 'ADMIN' ? element : <Navigate to="/DashboardUser" />;
}

export const PrivateRoutesAthorities = ({element}) => {
    const token = localStorage.getItem('user');
    const role = localStorage.getItem('userRole');
    return token && role === 'AUTHORITY'  ? element : <Navigate to="/DashboardUser" />;
}