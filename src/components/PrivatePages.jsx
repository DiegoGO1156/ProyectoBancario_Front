import { PrivateRoutesRole, PrivateRoutes} from "./PrivateRoutes"
import { DashboardPageAdmin } from "../pages/Dashboards/DashboardPageAdmin"
import {ActiveUsersPage}  from "../pages/ActiveUserPage"
import  ListUserPendingPage  from "../pages/ListUserPendingPage"
import BrandsPage from "../pages/BrandsPage/BrandPage"
import {ServicesPage} from "../pages/ServicesPage/ServicesPage"
import ProductsPage from "../pages/ProductAdminPage"
import CurrencyConverterPage from "../pages/Divisas"


export const PrivateAdminDashboard = () => {
    console.log(localStorage.getItem("user"));
    console.log(localStorage.getItem("roleUser"));
  return (
    <>
        <PrivateRoutesRole element={<DashboardPageAdmin />}/>
    </>
  )
}

export const PrivateAdminActiveUser = () => {
    console.log(localStorage.getItem("user"));
    console.log(localStorage.getItem("roleUser"));
  return (
    <>
        <PrivateRoutesRole element={<ActiveUsersPage />}/>
    </>
  )
}

export const PrivateAdminUserPending = () => {
    console.log(localStorage.getItem("user"));
    console.log(localStorage.getItem("roleUser"));
  return (
    <>
        <PrivateRoutesRole element={<ListUserPendingPage />}/>
    </>
  )
}

export const PrivateAdminBrands = () => {
    console.log(localStorage.getItem("user"));
    console.log(localStorage.getItem("roleUser"));
  return (
    <>
        <PrivateRoutesRole element={<BrandsPage />}/>
    </>
  )
}


export const PrivateAdminServices = () => {
    console.log(localStorage.getItem("user"));
    console.log(localStorage.getItem("roleUser"));
  return (
    <>
        <PrivateRoutesRole element={<ServicesPage />}/>
    </>
  )
}

export const PrivateAdminProducts = () => {
    console.log(localStorage.getItem("user"));
    console.log(localStorage.getItem("roleUser"));
  return (
    <>
        <PrivateRoutesRole element={<ProductsPage />}/>
    </>
  )
}

export const PrivateDivisas = () =>{
  return(
    <>
      <PrivateRoutesRole element={<CurrencyConverterPage/>}/>
    </>
  )
}


