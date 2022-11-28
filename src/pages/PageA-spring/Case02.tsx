import React from 'react';
import { a, config, useSpring, useSpringRef } from '@react-spring/web';
import { useMeasure } from 'react-use';
import { SimpleCheckbox } from '../../components/UI/SimpleCheckbox';
import { ButtonRunTest } from '../../components/UI/ButtonRunTest';
import { Counters } from '../../components/UI/Counters';

function Controls({
    running, onClickRun,
    auto, setAuto,
    wobbly, setWobbly,
    nContainer,
    nElements,
}: {
    running: boolean, onClickRun: () => void,
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

            <ButtonRunTest running={running} onClick={onClickRun} />
        </div>
    );
}

export function Case02() {
    const [running, setRunning] = React.useState(false);
    const [auto, setAuto] = React.useState(false);
    const [wobbly, setWobbly] = React.useState(false);

    const [containerRef, { width: containerWidth }] = useMeasure<HTMLDivElement>();
    const [elementRef, { width: elementWidth }] = useMeasure<HTMLDivElement>();

    const springRef = useSpringRef();

    const bind = useSpring({
        x: running ? containerWidth - elementWidth - 2 : 0,
        //ref: springRef, // as soon as we use springRef we switch to manual control.
        config: {
            ...config.wobbly,
            mass: wobbly ? 2 : .2, // this change will not have effect during running animation
            clamp: true,
        },
        onRest: () => {
            auto && setRunning(!running);
        }
    });

    return (
        <div className="w-full h-96 grid grid-rows-[auto,minmax(0,1fr)] bg-red-400">

            <Controls
                running={running} onClickRun={() => setRunning(!running)}
                auto={auto} setAuto={setAuto}
                wobbly={wobbly} setWobbly={setWobbly}
                nContainer={containerWidth}
                nElements={elementWidth}
            />

            {/* Scene */}
            <div ref={containerRef} className="mt-4 p-1 border border-dotted">
                <a.div
                    ref={elementRef}
                    style={{
                        ...bind,
                        width: bind.x.to({ range: [0, 1], output: [0, 2], })
                    }}
                    className="w-32 h-20"
                >
                    <div className="h-full border-4 rounded-md bg-purple-400/50 border-purple-800">
                        aaa
                    </div>
                </a.div>
            </div>
        </div>
    );
}
