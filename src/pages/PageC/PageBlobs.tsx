import React from 'react';
import { a, useTrail, Spring, config } from "@react-spring/web";
import './PageBlobs.scss';

const configFast = { tension: 1200, friction: 40 };
const configSlow = { mass: 10, tension: 200, friction: 50 };

const trans = (x: any, y: any) => `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`;

const Main: React.FC = () => {
    const [trail, api] = useTrail(3, () => ({
        xy: [200, 200],
        config: configSlow,
    }));
    return (
        <>
            <PageContent />
            <FilterGoo />

            <div className="absolute inset-0 overflow-hidden border border-gray-900/20">
                <div
                    className="blobs absolute inset-0"
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
        </>
    );
};

function PageContent() {
    return (
        <Spring from={{ opacity: 0, scale: 0 }} to={{ opacity: 1, scale: 1 }} config={config.wobbly}>
            {(props) => (
                <a.div style={props}>
                    <div className="grid place-items-center gap-4">
                        <div className="text-7xl opacity-50">⚗</div>
                        <div className="text-3xl opacity-50 font-black uppercase tracking-tighter">Goo Blobs</div>
                    </div>
                </a.div>
            )}
        </Spring>
    );
}

function FilterGoo() {
    return (
        <svg className="absolute w-0 h-0">
            <filter id="goo-filter">
                <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="30" />
                <feColorMatrix in="blur" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -7" />
            </filter>
        </svg>
    );
}

export function PageCBlobs() {
    return (
        <div className="page grid place-items-center relative bg-red-700/20">
            <Main />
        </div>
    );
}
