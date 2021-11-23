import React from 'react';
import { a, config, useSpring } from '@react-spring/web';
import { useMeasure } from 'react-use';

export function Case01() {
    const [fromStart, setFromStart] = React.useState(false);
    const [started, setStarted] = React.useState(false);
    const [auto, setAuto] = React.useState(false);
    const [dots, setDots] = React.useState<number[]>([]);
    const dotsRaw = React.useRef<number[]>([]);

    const [containerRef, { width: containerWidth }] = useMeasure<HTMLDivElement>();
    const [elementRef, { width: elementWidth }] = useMeasure<HTMLDivElement>();

    const bind = useSpring({
        x: fromStart ? containerWidth - elementWidth - 2 : 0,
        loop: { reverse: true },
        config: {
            ...config.wobbly,
            //mass: .2,
            clamp: true,
            //duration: 2000
        },
        onStart: () => {
            console.log('start');

            dotsRaw.current = [];
        },
        onChange: ({ value }) => {
            //!auto && console.log('frame', value.x.toFixed(0));
            console.log('dots', dotsRaw);

            dotsRaw.current.push(value.x);
        },
        onRest: () => {
            if (auto) {
                setFromStart(!fromStart);
                setStarted(true);
            } else {
                setStarted(false);
                setDots(dotsRaw.current);
            }
        }
    });

    return (
        <div className="w-full h-96 grid grid-rows-[auto,minmax(0,1fr)] bg-red-400">

            {/* Controls */}
            <div className="flex justify-end space-x-4">
                <label className="self-end text-sm flex items-center space-x-1">
                    <input
                        className="w-4 h-4 form-checkbox text-red-600 bg-red-300 red-ring rounded"
                        type="checkbox"
                        checked={auto}
                        onChange={(event) => setAuto(event.target.checked)}
                    />
                    <span className="select-none">auto reset animation</span>
                </label>
                <button
                    className="px-4 py-2 w-16 bg-red-400 border border-red-800 rounded active:scale-[.97]"
                    onClick={() => {
                        if (started) {
                            setFromStart(!fromStart);
                            setStarted(false);
                            setAuto(false);
                        } else {
                            setFromStart(!fromStart);
                            setStarted(true);
                        }
                    }}
                >
                    {started ? 'Stop' : 'Run'}
                </button>
            </div>

            {/* Scene */}
            <div ref={containerRef} className="mt-4 p-1 border border-dotted">
                <a.div
                    ref={elementRef}
                    style={{ ...bind }}
                    className="w-32 h-20 border rounded-md bg-purple-400/50 border-purple-800"
                >
                </a.div>

                <div className="relative">
                    {dots.map((dot, idx) => (
                        <div className={`absoulte left-[${dot}] top-0 w-4 h-4 border border-gray-700 rounded-full bg-gray-400/50`} key={idx}></div>
                    ))}
                </div>
            </div>
        </div>
    );
}
