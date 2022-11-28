import React from 'react';
import { a, config, useSpring } from '@react-spring/web';
import { useMeasure } from 'react-use';
import SVGCatmullRomSpline from 'svg-catmull-rom-spline';
import { SimpleCheckbox } from '../../components/UI/SimpleCheckbox';
import { ButtonRunTest } from '../../components/UI/ButtonRunTest';

function mapValueFromRangeToRange({ value, from, to }: { value: number; from: { min: number; max: number; }; to: { min: number; max: number; }; }): number {
    return (value - from.min) / (from.max - from.min) * (to.max - to.min) + to.min;
}

type MappedPoints = {
    points: [number, number][];
    path: string;
    minValue: number;
    maxValue: number;
    yFrom: number;
    yto: number;
};

function mapValuesToContainerPoints(yValues: number[], containerWidth: number, containerHeight: number): MappedPoints {
    const minValue = Math.min(...yValues);
    const maxValue = Math.max(...yValues);

    const points = yValues.map<[number, number]>((y, idx) => [idx / (yValues.length - 1) * (containerWidth - 16), mapValueToYCoord(y)]);

    const tolerance = 0.01;
    const highestQuality = true;
    const path = points.length ? SVGCatmullRomSpline.toPath(points, tolerance, highestQuality) : '';

    return {
        points,
        path,
        minValue,
        maxValue,
        yFrom: mapValueToYCoord(0),
        yto: mapValueToYCoord(1),
    };

    function mapValueToYCoord(value: number): number {
        return containerHeight - mapValueFromRangeToRange({
            value,
            from: { min: minValue, max: maxValue },
            to: { min: containerHeight * 0.1, max: containerHeight * 0.99 }
        });
    }
}

function Counters({ nContainer, nElements }: { nContainer: number, nElements: number, }) {
    return (
        <div className="text-xs">
            container: {nContainer.toFixed(0)} element: {nElements.toFixed(0)}
        </div>
    );
}

function Controls({
    running, setRunning,
    auto, setAuto,
    wobbly, setWobbly,
    nContainer,
    nElements,
}: {
    running: boolean, setRunning: () => void,
    auto: boolean, setAuto: (v: boolean) => void,
    wobbly: boolean, setWobbly: (v: boolean) => void,
    nContainer: number,
    nElements: number,
}) {
    return (
        <div className="flex justify-between space-x-4">
            <div className="ml-4 mt-2 flex flex-col">
                <Counters nContainer={nContainer} nElements={nElements} />

                <div className="flex items-center space-x-4">
                    <SimpleCheckbox label="wobbly" value={wobbly} onChange={setWobbly} />
                    <SimpleCheckbox label="auto reset animation" value={auto} onChange={setAuto} />
                </div>
            </div>

            <ButtonRunTest running={running} onClick={setRunning} />
        </div>
    );
}

export function Case01() {
    const [started, setStarted] = React.useState(false);
    const [auto, setAuto] = React.useState(false);
    const [wobbly, setWobbly] = React.useState(false);

    const [fromLeftToRight, setFromLeftToRight] = React.useState(false);

    const [dots, setDots] = React.useState<number[]>([]);
    const dotsRaw = React.useRef<number[]>([]);

    const [containerRef, { width: containerWidth }] = useMeasure<HTMLDivElement>();
    const [elementRef, { width: elementWidth }] = useMeasure<HTMLDivElement>();
    const [displayRef, { width: displayWidth, height: displayHeight }] = useMeasure<HTMLDivElement>();

    const display: MappedPoints = React.useMemo(() => {
        console.log('Case01.MappedPoints memo update', displayWidth, displayHeight);

        return mapValuesToContainerPoints(dots, displayWidth, displayHeight);
    }, [dots, displayWidth, displayHeight]);

    const bind = useSpring({
        x: fromLeftToRight ? containerWidth - elementWidth - 2 : 0,
        loop: { reverse: true },
        config: {
            ...config.wobbly,
            //mass: .2,
            mass: wobbly ? 2 : .2, // this change will not have effect during running animation
            //clamp: true,
            //duration: 2000
        },
        onStart: (value, ctrl) => {
            //console.log('start', value, ctrl);
            dotsRaw.current = [];
        },
        onChange: ({ value }) => {
            //!auto && console.log('frame value', value.x.toFixed(0), dotsRaw.current.map(_ => _.toFixed(0)));
            dotsRaw.current.push(value.x);
        },
        // onProps: (...args) => {
        //     console.log('props', args)
        // },
        onRest: () => {
            if (auto) {
                setFromLeftToRight(!fromLeftToRight);
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
            <Controls
                running={started} setRunning={() => {
                    setFromLeftToRight(!fromLeftToRight);
                    if (started) {
                        setStarted(false);
                        setAuto(false);
                    } else {
                        setStarted(true);
                    }
                }}
                auto={auto} setAuto={setAuto}
                wobbly={wobbly} setWobbly={setWobbly}
                nContainer={containerWidth}
                nElements={elementWidth}
            />

            {/* Scene */}
            <div ref={containerRef} className="mt-4 p-1 border border-dotted flex flex-col">
                <a.div
                    ref={elementRef}
                    style={{ ...bind }}
                    className="w-32 h-20 border rounded-md bg-purple-400/50 border-purple-800"
                >
                </a.div>

                <div ref={displayRef} className="mt-1 relative h-full bg-gray-50/20">

                    <svg className="bg-red-100/50 w-full h-full">
                        <path className="" fill="none" stroke="red" strokeWidth="1.2" d={display.path} />
                    </svg>

                    {display.points.map(([x, y], idx) => (
                        <div
                            className={`absolute w-4 h-4 border border-gray-700 rounded-full bg-gray-400/50`}
                            style={{ left: `${x}px`, top: `${y}px` }}
                            key={idx}
                        >
                            <div className="text-[.55rem] text-center">{idx}
                                <div className="text-[.47rem]">{y.toFixed(0)}</div>
                            </div>
                        </div>
                    ))}
                    {/* {dots.map((dot, idx) => (
                        <div
                            className={`absolute w-4 h-4 border border-gray-700 rounded-full bg-gray-400/50`}
                            style={{ left: `${idx * 14}px`, top: `${dot}px` }}
                            key={idx}
                        >
                            <div className="text-[.55rem] text-center">{idx}
                                <div className="text-[.47rem]">{dot.toFixed(0)}</div>
                            </div>
                        </div>
                    ))} */}
                </div>
            </div>
        </div>
    );
}
