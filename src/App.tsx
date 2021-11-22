import React, { useState } from 'react';
import './App.css';
import { a, useSpring } from '@react-spring/web';

function Case01() {
    const [run, setRun] = useState(false);
    const bind = useSpring({
        x: run ? 100 : 0
    });
    return (
        <div className="w-full h-96 grid grid-rows-[auto,minmax(0,1fr)] bg-red-400">
            <div className="flex justify-end">
                <button className="px-4 py-2 bg-red-400 border border-red-800 rounded active:scale-[.97]"
                    onClick={() => {
                        setRun(!run);
                    }}
                >
                    Run
                </button>
            </div>
            <div className="">
                <a.div style={{ ...bind }} className="w-32 h-20 border rounded-md bg-purple-400/50 border-purple-800">
                </a.div>
            </div>
        </div>
    );
}

function Case02() {
    const [open, setOpen] = useState(false);
    return (
        <div className="w-full h-96 grid grid-rows-[auto,minmax(0,1fr)] bg-red-400">
            <button className="px-4 py-2 bg-red-400 border border-red-800 rounded" onClick={() => setOpen(!open)}>
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
                <div className="mx-4 grid grid-cols-[repeat(2,minmax(400px,1fr))] gap-4">
                    <Case01 />
                    <Case02 />
                    <Case02 />
                    <Case02 />
                </div>
            </div>
        </React.Fragment>
    );
}

export default App;
