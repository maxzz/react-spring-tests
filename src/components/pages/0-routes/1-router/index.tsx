import { createBrowserRouter } from 'react-router-dom';
import { routes } from './0-all-routes';
import { Root } from './1-root';
import { Page404 } from './error-page-404';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root routes={routes} />,
        errorElement: <Page404 />,
        children: routes.map((route) => ({
            index: route.path === '/',
            path: route.path,
            element: route.element,
        }))
    }
]);
