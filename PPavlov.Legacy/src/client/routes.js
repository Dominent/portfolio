import Spa from "./Spa";
import GalleryDetails from './components/gallery/GalleryDetails';

const routes = [
    {
        path: '/',
        exact: true,
        component: Spa
    },
    {
        path: '/gallery',
        exact: true,
        component: GalleryDetails
    }
]

export default routes;
