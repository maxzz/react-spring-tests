import React from 'react';
import { a, config, useSpring } from '@react-spring/web';
import { useMeasure } from 'react-use';

export function Case01() {
    const [moving, setMoving] = React.useState(false);
    const [started, setStarted] = React.useState(false);
    const [auto, setAuto] = React.useState(false);

    const [containerRef, { width: containerWidth }] = useMeasure<HTMLDivElement>();
    const [elementRef, { width: elementWidth }] = useMeasure<HTMLDivElement>();

    const bind = useSpring({
        x: moving ? containerWidth - elementWidth - 2 : 0,
        config: { ...config.wobbly, mass: .2, clamp: true },
        onRest: () => {
            auto && setMoving(!moving);
            !auto && setStarted(false);
        }
    });

    return (
        <div className="w-full h-96 grid grid-rows-[auto,minmax(0,1fr)] bg-red-400">
            <div className="flex justify-end space-x-4">
                <label className="self-end text-sm flex items-center space-x-1">
                    <input
                        className="w-4 h-4 form-checkbox text-red-600 bg-red-300 red-ring rounded"
                        type="checkbox"
                        checked={auto}
                        onChange={(event) => {
                            setMoving(event.target.checked);
                            setAuto(event.target.checked);
                            setStarted(event.target.checked);
                        }}
                    />
                    <span className="select-none">auto reset animation</span>
                </label>
                <button className="px-4 py-2 w-16 bg-red-400 border border-red-800 rounded active:scale-[.97]"
                    onClick={() => {
                        if (auto) {
                            if (started) {
                                setMoving(false);
                            }
                        } else {
                            if (!started) {
                                setMoving(true);
                            }
                        }
                        // setMoving(!moving);
                        // auto && setStarted(!started);
                    }}
                >
                    {started && auto ? 'Stop' : 'Run'}
                </button>
            </div>
            <div ref={containerRef} className="mt-4 p-1 border border-dotted">
                <a.div ref={elementRef} style={{ ...bind }} className="w-32 h-20 border rounded-md bg-purple-400/50 border-purple-800">
                </a.div>
            </div>
        </div>
    );
}
