import React from 'react';
import { a, useSpring } from '@react-spring/web';

export function Case01() {
    const [run, setRun] = React.useState(false);
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
