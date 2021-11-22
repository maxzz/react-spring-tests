import React, { useState } from 'react';
import './App.css';

function Case01() {
    const [open, setOpen] = useState(false);
    const className="px-4 py-2 bg-red-400 border border-red-800 rounded";
    return (
        <div className="h-96 grid grid-rows-[auto,minmax(0,1fr)] bg-red-400">
            <button className={className} onClick={() => setOpen(!open)}>
                Open case 01
            </button>
            {open &&
                <div className="">11</div>

            }
        </div>
    );
}

function App() {
    return (
        <React.Fragment>
            <div className="h-screen grid place-items-center bg-[salmon] text-red-800">
                <Case01 />
            </div>
        </React.Fragment>
    );
}

export default App;
