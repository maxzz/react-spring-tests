import React from 'react';
import { a, config, useSpring } from '@react-spring/web';
import { useMeasure } from 'react-use';

export function Case02() {
    const [running, setRunning] = React.useState(false);
    const [auto, setAuto] = React.useState(false);

    const [containerRef, { width: containerWidth }] = useMeasure<HTMLDivElement>();
    const [elementRef, { width: elementWidth }] = useMeasure<HTMLDivElement>();

    const bind = useSpring({
        x: running ? containerWidth - elementWidth - 2 : 0,
        config: { ...config.wobbly, mass: .2, clamp: true },
        onRest: () => {
            auto && setRunning(!running);
        }
    });

    return (
        <div className="w-full h-96 grid grid-rows-[auto,minmax(0,1fr)] bg-red-400">
            <div className="flex justify-end space-x-4">
                <label className="self-end text-sm flex items-center space-x-1">
                    <input
                        className="w-4 h-4 form-checkbox text-red-600 bg-red-300 red-ring rounded"
                        type="checkbox" checked={auto} onChange={(event) => setAuto(event.target.checked)}
                    />
                    <span className="select-none">auto reset animation</span>
                </label>
                <button className="px-4 py-2 bg-red-400 border border-red-800 rounded active:scale-[.97]"
                    onClick={() => {
                        setRunning(!running);
                    }}
                >
                    Run
                </button>
            </div>
            <div ref={containerRef} className="mt-4 p-1 border border-dotted">
                <a.div
                    ref={elementRef}
                    style={{ 
                        ...bind,
                        width: bind.x.to({
                            range: [0, 1],
                            output: [.2, 3],
                        })
                     }}
                    className="w-32 h-20 border rounded-md bg-purple-400/50 border-purple-800"
                >
                </a.div>
            </div>
        </div>
    );
}