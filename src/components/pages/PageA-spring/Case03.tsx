import React from 'react';
import { a, config, useSpring } from '@react-spring/web';
import { useMeasure } from 'react-use';
import { ButtonRunTest } from '@ui/ButtonRunTest';

export function Case03() {
    const [running, setRunning] = React.useState(false);

    const [containerRef, { width: containerWidth }] = useMeasure<HTMLDivElement>();

    //const [elementRef, { width: elementWidth }] = useMeasure<HTMLDivElement>();
    //console.log('Case03. containerWidth', containerWidth.toFixed(0), 'childWidth', elementWidth.toFixed(0));

    console.log('Case03. containerWidth', containerWidth.toFixed(0));

    const bind = useSpring({
        // x: running ? containerWidth - elementWidth - 2 : 0,
        x: running ? 1 : 0,
        config: { ...config.wobbly, mass: 2, clamp: true, },
        // onRest: () => {}
    });

    return (
        <div className="w-full h-96 grid grid-rows-[auto,minmax(0,1fr)] grid-cols-1 bg-red-400">

            {/* Controls */}
            <div className="pt-1 pr-1 flex justify-end space-x-4">
                <ButtonRunTest running={running}
                    onClick={() => {
                        //console.log('Case03. containerWidth ---------- click', containerWidth.toFixed(0), elementWidth.toFixed(0));
                        console.log('Case03. containerWidth ---------- click', containerWidth.toFixed(0));
                        setRunning(!running);
                    }}
                />
            </div>

            {/* Scene */}
            <div ref={containerRef} className="relative mt-4 p-1 border-red-300 border border-dotted">
                <a.div
                    //ref={elementRef}
                    style={{
                        ...bind,
                        width: bind.x.to({ range: [0, 1], output: [0, 500], })
                    }}
                    className="w-32 h-20 absolute border rounded-md bg-purple-400/50 border-purple-800"
                >
                </a.div>
            </div>
        </div>
    );
}
