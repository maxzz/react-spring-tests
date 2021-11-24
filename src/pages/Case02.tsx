import React from 'react';
import { a, config, useSpring } from '@react-spring/web';
import { useMeasure } from 'react-use';
import { SimpleCheckbox } from './Case01';

export function Case02() {
    const [running, setRunning] = React.useState(false);
    const [auto, setAuto] = React.useState(false);

    const [containerRef, { width: containerWidth }] = useMeasure<HTMLDivElement>();
    const [elementRef, { width: elementWidth }] = useMeasure<HTMLDivElement>();

    const bind = useSpring({
        x: running ? containerWidth - elementWidth - 2 : 0,
        config: {
            ...config.wobbly,
            mass: 2,
            clamp: true,
        },
        onRest: () => {
            auto && setRunning(!running);
        }
    });

    return (
        <div className="w-full h-96 grid grid-rows-[auto,minmax(0,1fr)] bg-red-400">

            {/* Controls */}
            <div className="flex justify-end space-x-4">
                <SimpleCheckbox label="auto reset animation" value={auto} onChange={setAuto} />
                <button className="px-4 py-2 w-16 bg-red-400 border border-red-800 rounded active:scale-[.97]"
                    onClick={() => {
                        setRunning(!running);
                    }}
                >
                    {running ? 'Stop' : 'Run'}
                </button>
            </div>

            {/* Scene */}
            <div ref={containerRef} className="mt-4 p-1 border border-dotted">
                <a.div
                    ref={elementRef}
                    style={{
                        ...bind,
                        width: bind.x.to({ range: [0, 1], output: [0.6, 2], })
                    }}
                    className="w-32 h-20"
                >
                    <div className="h-full border-4 rounded-md bg-purple-400/50 border-purple-800">aaa</div>
                </a.div>
            </div>
        </div>
    );
}
