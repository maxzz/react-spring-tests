import React from 'react';
import './App.css';
import { Case01 } from './pages/Case01';
import { Case01snapshot } from './pages/Case01snapshot';
import { Case02 } from './pages/Case02';
import { Case03 } from './pages/Case03';
import { Case04 } from './pages/Case04';
import { Case0X } from './pages/Case0X';

import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';

function PageA() {
    return (
        <React.Fragment>
            <div className="h-full grid place-items-center bg-[salmon] text-red-800">
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
            111
        </React.Fragment>
    );
}

function AppWithRoutes() {
    return (
        <div className="h-screen flex flex-col bg-[tomato] text-red-800">
            <nav className="p-4 flex justify-end space-x-4">
                <div className="px-4 py-2 bg-gray-100/20">
                    <Link to="/spring">Spring</Link>
                </div>
                <div className="px-4 py-2 bg-gray-100/20">
                    <Link to="/springs">Springs</Link>
                </div>
            </nav>
            <div className="flex-1 w-full h-full">
                <Switch>
                    <Route path="/spring" children={PageA} />
                    <Route path="/springs" children={PageB} />
                </Switch>
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
                    <AppWithRoutes />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
