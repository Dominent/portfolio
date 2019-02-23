import Spa from "./Spa";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/admin/Dashboard";
import GalleryDetails from './components/gallery/GalleryDetails';

const routes = [
    {
        path: '/',
        exact: true,
        component: Spa
    },
    {
        path: '/login',
        exact: true,
        component: Login
    },
    {
        path: '/register',
        exact: true,
        component: Register
    },
    {
        path: '/gallery',
        exact: true,
        component: GalleryDetails
    },
    // TODO(PPavlov): Implement Authenticated Route, Refactor Private Route
    { 
        path: '/admin/dashboard',
        exact: true,
        component: Dashboard,
        authenticated: true
    }
]

export default routes;
