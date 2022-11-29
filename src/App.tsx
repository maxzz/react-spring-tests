import React from 'react';
import { useLocation } from 'react-use';
import { BrowserRouter as Router, Route, LinkProps, NavLink as NavLinkWState, } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { routes } from './pages/Routes';
import './App.css';

function NavLink(props: LinkProps & React.RefAttributes<HTMLAnchorElement>) {
    return (
        <NavLinkWState
            className={(isActive: boolean) => {
                return `px-4 py-2 rounded shadow ${isActive ? 'bg-red-300' : 'opacity-75 border-2 border-red-600/10 hover:bg-red-300/60 active:scale-[.97]'}`;
            }}
            exact={true}
            {...props}
        />
    );
}

function NavMenu() {
    return (
        <nav className="p-4 flex justify-end space-x-3">
            {routes.map((route, idx) => (
                <NavLink key={idx} to={route.path} children={route.name} />
            ))}
        </nav>
    );
}

function PageContent() {
    const loc = useLocation();
    const isMatch = React.useCallback((path: string): boolean => loc.pathname === path, [loc]);
    return (<>
        {routes.map(({ path, page: Component }, index) => {
            const transitionChildRef = React.useRef(null);
            return (
                <Route key={index} exact path={path}>
                    {() => (
                        <CSSTransition
                            nodeRef={transitionChildRef}
                            in={isMatch(path)}
                            timeout={300}
                            classNames="fade"
                            unmountOnExit
                        >
                            <div ref={transitionChildRef} className="absolute inset-0">
                                <Component />
                            </div>
                        </CSSTransition>
                    )}
                </Route>
            );
        })}
    </>);
}

export function App() {
    return (
        <Router>
            <div className="h-screen flex flex-col bg-[salmon] text-red-800">
                <NavMenu />
                <main className="flex-1 relative">
                    <PageContent />
                </main>
            </div>
        </Router>
    );
}
