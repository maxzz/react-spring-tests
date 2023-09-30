import React from 'react';
import { a, useSpring } from '@react-spring/web';

export function Case0X() {
    const [open, setOpen] = React.useState(false);
    return (
        <div className="w-full h-96 grid grid-rows-[auto,minmax(0,1fr)] bg-red-400">

            <button className="px-4 py-2 bg-red-400 border border-red-800 rounded" onClick={() => setOpen(!open)}>
                Open case 01
            </button>
            
            {open && (
                <div className="">11</div>
            )}
        </div>
    );
}
