import React from 'react';
import './App.css';
import { Case01 } from './pages/Case01';
import { Case01snapshot } from './pages/Case01snapshot';
import { Case02 } from './pages/Case02';
import { Case03 } from './pages/Case03';
import { Case04 } from './pages/Case04';
import { Case0X } from './pages/Case0X';

function App() {
    return (
        <React.Fragment>
            <div className="h-screen grid place-items-center bg-[salmon] text-red-800">
                <div className="mx-4 grid grid-cols-[repeat(2,minmax(400px,1fr))] gap-4">
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

export default App;
