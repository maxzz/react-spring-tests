import { LinkProps, NavLink, useLocation, createBrowserRouter, RouterProvider, useOutlet } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { routes } from './Routes';
import './transitions-page.css';

function MenuButton(props: LinkProps & React.RefAttributes<HTMLAnchorElement>) {
    return (
        <NavLink
            className={
                ({ isActive }) => {
                    return `px-4 py-2 rounded shadow ${isActive ? 'bg-red-300' : 'opacity-75 border-2 border-red-600/10 hover:bg-red-300/60 active:scale-[.97]'}`;
                }
            }
            {...props}
        />
    );
}

function NavMenu() {
    return (
        <nav className="p-4 flex justify-end space-x-3">
            {routes.map((route, idx) => (
                <MenuButton key={idx} to={route.path} children={route.name} />
            ))}
        </nav>
    );
}

function RoutesSelector() {
    const location = useLocation();
    const currentOutlet = useOutlet();
    const { nodeRef } = routes.find((route) => route.path === location.pathname) ?? {};
    return (<>
        <div className="h-screen flex flex-col bg-[salmon] text-red-800">
            <NavMenu />

            <div className="flex-1 relative">
                <SwitchTransition mode="out-in">
                    <CSSTransition
                        key={location.pathname}
                        nodeRef={nodeRef}
                        //timeout={100} //timeout={300}
                        timeout={{
                            appear: 300,
                            enter: 200,
                            exit: 100,
                        }}
                        classNames="fade"
                        unmountOnExit
                    >
                        {(state) => (
                            <div ref={nodeRef} className="page">
                                {console.log(`transition state: ${state} page: "${location.pathname}"`)!}

                                {currentOutlet}
                            </div>
                        )}
                    </CSSTransition>
                </SwitchTransition>
            </div >

            <div className="">
                <a href="https://maxzz.github.io/react-spring-tests" target='_blank'>prev animations</a>
            </div>

        </div>
    </>);
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <RoutesSelector />,
        children: routes.map((route) => ({
            index: route.path === '/',
            path: route.path,
            element: route.element,
        }))
    }
]);

export function MainRouter() {
    return (<>
        <RouterProvider router={router} />
    </>);
}
