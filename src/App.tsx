import React from 'react';
import { BrowserRouter, Route, LinkProps, NavLink, useLocation, Routes, createBrowserRouter, RouterProvider, useOutlet } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { routes } from './components/pages/Routes';
import './App.css';
import { Page0_Home } from './components/pages/Page0_Home';

function MenuButton(props: LinkProps & React.RefAttributes<HTMLAnchorElement>) {
    return (
        <NavLink
            className={
                ({ isActive }) => {
                    return `px-4 py-2 rounded shadow ${isActive ? 'bg-red-300' : 'opacity-75 border-2 border-red-600/10 hover:bg-red-300/60 active:scale-[.97]'}`;
                }
            }
            // exact={true}
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

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <PageContent />,
            children: routes.map((route) => ({
                index: route.path === '/',
                path: route.path,
                element: route.element,
            }))
        }
    ]

    //     [
    //     {
    //         path: '/',
    //         element: <Example />,
    //         children: routes.map((route) => ({
    //             index: route.path === '/',
    //             path: route.path === '/' ? undefined : route.path,
    //             element: route.element,
    //         })),
    //     },
    // ]
);


function PageContent() {
    const location = useLocation();
    const currentOutlet = useOutlet();
    //const cssProps = useCSSTransitionProps();
    const { nodeRef } = routes.find((route) => route.path === location.pathname) ?? {};

    return (
        <>
            <div className="h-screen flex flex-col bg-[salmon] text-red-800">
                <NavMenu />
                {/* <main className="flex-1 relative">
                    <PageContent />
                </main> */}

                <div className="flex-1 relative">
                    <SwitchTransition mode="out-in">
                        {/* <CSSTransition {...cssProps}> */}
                        <CSSTransition
                            key={location.pathname}
                            nodeRef={nodeRef}
                            timeout={300}
                            classNames="fade"
                            unmountOnExit
                        >
                            {(state) => (
                                <div ref={nodeRef} className="page">
                                    {currentOutlet}
                                </div>
                            )}
                        </CSSTransition>
                    </SwitchTransition>

                </div >

            </div>

        </>
    );
}

export function App() {
    return (<>
        <RouterProvider router={router} />
        {/* <BrowserRouter> */}
        {/* <div className="h-screen flex flex-col bg-[salmon] text-red-800">
            <NavMenu />
            <main className="flex-1 relative">
                <PageContent />
            </main>
        </div> */}
        {/* </BrowserRouter> */}
    </>);
}

// export function App() {
//     return (<>
//         <RouterProvider router={router} />
//         {/* <BrowserRouter> */}
//         <div className="h-screen flex flex-col bg-[salmon] text-red-800">
//             <NavMenu />
//             <main className="flex-1 relative">
//                 <PageContent />
//             </main>
//         </div>
//         {/* </BrowserRouter> */}
//     </>);
// }

// v5
// function PageContent() {
//     const loc = useLocation();
//     const isMatch = React.useCallback((path: string): boolean => loc.pathname === path, [loc]);
//     return (<>
//         {routes.map(({ path, page: Component }, index) => {
//             const transitionChildRef = React.useRef(null);
//             return (
//                 <Route key={index} exact path={path}>
//                     {() => (
//                         <CSSTransition
//                             nodeRef={transitionChildRef}
//                             in={isMatch(path)}
//                             timeout={300}
//                             classNames="fade"
//                             unmountOnExit
//                         >
//                             <div ref={transitionChildRef} className="absolute inset-0">
//                                 <Component />
//                             </div>
//                         </CSSTransition>
//                     )}
//                 </Route>
//             );
//         })}
//     </>);
// }

// v6 no animation
// function PageContent() {
//     const location = useLocation();
//     //const cssProps = useCSSTransitionProps();
//     const { nodeRef } = routes.find((route) => route.path === location.pathname) ?? {}

//     return (
//         <>
//             <div className="container">
//                 <SwitchTransition mode="out-in">
//                     {/* <CSSTransition {...cssProps}> */}
//                     <CSSTransition 
//                         key={location.pathname}
//                         nodeRef={nodeRef}
//                         timeout={300}
//                         classNames="fade"
//                         unmountOnExit
//                     >
//                         <Routes location={location}>
//                             {routes.map(({ path, element: Page }) => (
//                                 <Route
//                                     key={path}
//                                     path={path}
//                                     element={<Page />}
//                                 />
//                             ))}
//                         </Routes>
//                     </CSSTransition>
//                 </SwitchTransition>

//             </div>
//         </>
//     );
// }


{/* <Navbar bg="light">
                <Nav className="mx-auto">
                    {routes.map((route) => (
                        <Nav.Link
                            key={route.path}
                            as={NavLink}
                            to={route.path}
                            className={({ isActive }) => (isActive ? 'active' : undefined)}
                            end
                        >
                            {route.name}
                        </Nav.Link>
                    ))}
                </Nav>
            </Navbar> */}


{/* <SwitchTransition>
                    <>
                    {/* <CSSTransition>
                        11
                    </CSSTransition> */}
{/* <CSSTransition
                        key={location.pathname}
                        nodeRef={nodeRef}
                        timeout={300}
                        classNames="page"
                        unmountOnExit
                    >
                        {(state) => (
                            <div ref={nodeRef} className="page">
                                {currentOutlet}
                            </div>
                        )}
                    </CSSTransition> * /}

                    </>
                </SwitchTransition> */}

{/* <SwitchTransition mode="out-in">
                    <CSSTransition
                        key={location.pathname}
                        timeout={300}
                        classNames="fade"
                        unmountOnExit
                    >
                        <div className="absolute inset-0">
                            {routes.map(({ path, page: Component }, index) => {
                                return (
                                    <Route key={index} exact path={path}>
                                        {() => (
                                            <div className="absolute inset-0">
                                                <Component />
                                            </div>
                                        )}
                                    </Route>
                                );
                            })}
                        </div>
                    </CSSTransition>
                </SwitchTransition> */}

{/* <SwitchTransition mode="out-in">
                    <CSSTransition
                        key={loc.pathname}
                        timeout={300}
                        classNames="fade"
                        unmountOnExit
                    >
                        <div className="absolute inset-0">
                            {routes.map(({ path, page: Component }, index) => {
                                return (
                                    <Route key={index} exact path={path}>
                                        {() => (
                                            <div className="absolute inset-0">
                                                <Component />
                                            </div>
                                        )}
                                    </Route>
                                );
                            })}
                        </div>
                    </CSSTransition>
                </SwitchTransition> */}
