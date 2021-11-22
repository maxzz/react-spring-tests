import React from 'react';
import { a, useSpring } from '@react-spring/web';
import { useMeasure } from 'react-use';

export function Case01() {
    const [run, setRun] = React.useState(false);
    const [containerRef, { width: containerWidth }] = useMeasure<HTMLDivElement>();
    const [elementRef, { width: elementWidth }] = useMeasure<HTMLDivElement>();
    const bind = useSpring({
        x: run ? containerWidth - elementWidth : 0
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
            <div ref={containerRef} className="mt-4">
                <a.div ref={elementRef} style={{ ...bind }} className="w-32 h-20 border rounded-md bg-purple-400/50 border-purple-800">
                </a.div>
            </div>
        </div>
    );
}
