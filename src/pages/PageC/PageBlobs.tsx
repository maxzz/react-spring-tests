import React from 'react';
import { a, useTrail, Spring, config } from "@react-spring/web";
import './PageBlobs.scss';

const configFast = { tension: 1200, friction: 40 };
const configSlow = { mass: 10, tension: 200, friction: 50 };

const trans = (x: any, y: any) => `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`;

const Main: React.FC = () => {
    const [trail, api] = useTrail(3, () => ({
        xy: [200, 200],
        config: (i) => {
            console.log({ i });
            return +i === 0 ? configFast : configSlow;
        },
    }));

    return (
        <>
            {/* <main className="w-full h-full flex flex-col items-center justify-center"> */}


            <Spring from={{ opacity: 0, scale: 0 }} to={{ opacity: 1, scale: 1 }} config={config.wobbly}>
                {(props) => (
                    <a.div style={props}>
                        <div className="text-5xl">Goo Blobs ⚗</div>
                    </a.div>
                )}
            </Spring>

            {/* <div className="w-full h-full"> */}

            <svg className="absolute w-0 h-0">
                <filter id="goo-filter">
                    <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="30" />
                    <feColorMatrix in="blur" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -7" />
                </filter>
            </svg>

            <div className="absolute inset-0 overflow-hidden border border-gray-900/20">
                <div
                    className="hooks-main absolute inset-0"
                    style={{ filter: 'url(#goo-filter)' }}
                    onMouseMove={e => api.start({ xy: [e.clientX, e.clientY] })}
                >
                    {trail.map((props, index) => (
                        <a.div
                            key={index}
                            style={{ transform: props?.xy?.to(trans) }}
                            className="bg-purple-700 opacity-60"
                        />
                    ))}
                </div>
            </div>
            {/* </div> */}
            {/* </main> */}
        </>
    );
};

export function PageCBlobs() {
    return (
        <div className="page grid place-items-center relative bg-red-700/20">
            <Main />
        </div>
    );
}
