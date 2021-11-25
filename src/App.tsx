import React from 'react';
import './App.css';
import { Case01 } from './pages/Case01';
import { Case01snapshot } from './pages/Case01snapshot';
import { Case02 } from './pages/Case02';
import { Case03 } from './pages/Case03';
import { Case04 } from './pages/Case04';
import { Case0X } from './pages/Case0X';

import { BrowserRouter as Router, Switch, Route, Redirect, Link, LinkProps, useLocation, NavLink as StateLink } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

function PageA() {
    return (
        <React.Fragment>
            <div className="grid place-items-center bg-[salmon] text-red-800">
                <div className="m-4 grid grid-cols-[repeat(2,minmax(400px,1fr))] gap-4">
                    <Case01 />
                    <Case02 />
                    <Case03 />
                    <Case04 />
                    {/* <Case01snapshot /> */}
                </div>
            </div>
        </React.Fragment>
    );
}

function PageB() {
    return (
        <React.Fragment>
            <div className="">Nothing here yet</div>
        </React.Fragment>
    );
}

function NavLink(props: LinkProps & React.RefAttributes<HTMLAnchorElement>) {
    return (
        <div className="">
            <StateLink className={(isActive: boolean) => `px-4 py-2 rounded shadow ${isActive ? 'bg-red-100' : 'opacity-75'}`} {...props} />
        </div>
    );
}

function AppRoutes() {
    let location = useLocation();
    return (
        <div className="h-screen flex flex-col bg-[salmon] text-red-800">
            <nav className="p-4 flex justify-end space-x-4">
                <NavLink to="/spring">Spring</NavLink>
                <NavLink to="/springs">Springs</NavLink>
                <NavLink to="/transitions">Transitions</NavLink>
                <NavLink to="/trails">Trails</NavLink>
            </nav>
            <div className="flex-1 w-full bg-[salmon]">
                <TransitionGroup>
                    <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
                        <Switch>
                            <Route path="/spring" children={PageA} />
                            <Route path="/springs" children={PageB} />
                            <Route path="/transitions" children={PageB} />
                            <Route path="/trails" children={PageB} />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            </div>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/spring" />
                </Route>
                <Route path="*">
                    <AppRoutes />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
