import { Navigate } from "react-router-dom";


export const PrivateRoutes = ({element}) => {
  const token = localStorage.getItem('user');
  return token ? element : <Navigate to="/auth" /> ;
}

 export const PrivateRoutesRole = ({element}) => {
    const token = localStorage.getItem('user');
    const role = localStorage.getItem('roleUser');
    return token && role === 'ADMIN' ? element : <Navigate to="/auth" />;
}