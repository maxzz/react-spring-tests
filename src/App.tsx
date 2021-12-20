import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, LinkProps, NavLink as StateLink, withRouter } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { PageA } from './pages/PageA-spring/PageA';
import { PageB } from './pages/PageB/PageB';
import { PageCBlobs } from './pages/PageD-trails/PageBlobs';

const routes = [
    { path: '/', name: "Spring", Component: PageA, },
    { path: '/springs', name: "Springs", Component: PageB, },
    { path: '/transitions', name: "Transitions", Component: PageB, },
    { path: '/trails', name: "Trails", Component: PageCBlobs, },
];

function NavLink(props: LinkProps & React.RefAttributes<HTMLAnchorElement>) {
    return (
        <StateLink
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

const PageContent = withRouter(({ location: loc }) => {
    const isMatch = React.useCallback((path: string): boolean => loc.pathname === path, [loc]);
    return (<>
        {routes.map(({ path, Component }, index) => {
            const transitionChildRef = React.useRef(null);
            return (
                <Route key={index} exact path={path}>
                    {() => { // Route callback ensures the transitions are loaded correctly
                        return (
                            <CSSTransition
                                nodeRef={transitionChildRef}
                                in={isMatch(path)}
                                timeout={300}
                                classNames="fade"
                                unmountOnExit
                            //appear
                            >
                                <div ref={transitionChildRef} className="absolute inset-0">
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
                <NavMenu />
                <main className="flex-1 relative">
                    <PageContent />
                </main>
            </div>
        </Router>
    );
}

export default App;
