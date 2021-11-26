import React from 'react';
import './App.css';
import { Case01 } from './pages/Case01';
import { Case01snapshot } from './pages/Case01snapshot';
import { Case02 } from './pages/Case02';
import { Case03 } from './pages/Case03';
import { Case04 } from './pages/Case04';
import { Case0X } from './pages/Case0X';

import { BrowserRouter as Router, Switch, Route, Redirect, Link, LinkProps, useLocation, NavLink as StateLink, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

function NavLink(props: LinkProps & React.RefAttributes<HTMLAnchorElement>) {
    return (
        <StateLink className={(isActive: boolean) => `px-4 py-2 rounded shadow ${isActive ? 'bg-red-100' : 'opacity-75'}`} exact={true} {...props} />
    );
}

function PageA() {
    return (
        <div className="page grid place-items-center bg-[salmon] text-red-800">
            <div className="m-4 grid grid-cols-[repeat(2,minmax(400px,1fr))] gap-4">
                <Case01 />
                <Case02 />
                <Case03 />
                <Case04 />
                {/* <Case01snapshot /> */}
            </div>
        </div>
    );
}

function PageB() {
    return (
        <div className="page">Nothing here yet B</div>
    );
}

const routes = [
    { path: '/', name: "Spring", Component: PageA, },
    { path: '/springs', name: "Springs", Component: PageB, },
    { path: '/transitions', name: "Home", Component: PageB, },
    { path: '/trails', name: "Home", Component: PageB, },
];

function NavMenu() {
    return (
        <nav className="p-4 flex justify-end space-x-4">
            {routes.map((route, idx) => <NavLink key={idx} to={route.path} children={route.name} />)}
        </nav>
    );
}

const PageContent = withRouter(({ location: loc }) => {
    const isMatch = React.useCallback((path: string): boolean => loc.pathname === path, [loc]);
    return (<>
        {routes.map(({ path, Component }, index) => {
            const rf = React.useRef(null);
            return (
                <Route key={index} exact path={path}>
                    {() => { // Route callback ensures the transitions are loaded correctly
                        return (
                            <CSSTransition
                                nodeRef={rf}
                                in={isMatch(path)}
                                timeout={300}
                                classNames="fade"
                                unmountOnExit
                                appear
                            >
                                <div ref={rf} className="fade">
                                    <Component />
                                </div>
                            </CSSTransition>
                        );
                    }}
                </Route>
            );
        })}
    </>);
});

function App() {
    return (
        <Router>
            <div className="h-screen flex flex-col bg-[salmon] text-red-800">
                <div className="flex-1 w-full bg-[salmon]">
                    <NavMenu />
                    <PageContent />
                </div>
            </div>
        </Router>
    );
}

export default App;
