import { RouterProvider } from 'react-router-dom';
import { router } from './1-router';
import './transitions-page.css';

export function MainRouter() {
    return (<>
        <RouterProvider router={router} />
    </>);
}
