import React from 'react';
import { a, useTrail, Spring, config } from "@react-spring/web";
import './PageBlobs.scss';
import { classNames } from '../../utils/classnames';
import { atom, useAtom } from 'jotai';

const configFast = { tension: 1200, friction: 40 };
const configSlow = { mass: 10, tension: 200, friction: 50 };

const interpolate = (x: number, y: number) => `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`;

const BlogAPos = [
    {
        width: 120,
        height: 120,
    },
    {
        width: 250,
        height: 250,
    },
    {
        width: 150,
        height: 150,
    },
];

const BlogBPos = [
    {
        top: 20,
        left: 20,
        width: 40,
        height: 40,
    },
    {
        top: 70,
        left: 70,
        width: 70,
        height: 70,
    },
    {
        top: 50,
        left: 50,
        width: 50,
        height: 50,
    },
];

function Blobs() {
    const [trail, api] = useTrail(3, () => ({
        xy: [200, 200],
        config: configSlow,
    }));
    const [useGoo] = useAtom(useGooAtom);
    return (
        <div className="absolute inset-0 overflow-hidden border border-gray-900/20">
            <div
                className="blobs absolute inset-0"
                style={{ filter: `${useGoo ? 'url(#goo-filter)' : 'none'}` }}
                onMouseMove={e => api.start({ xy: [e.clientX, e.clientY] })}
            >
                {trail.map((props, index) => (
                    <a.div
                        key={index}
                        style={{ transform: props.xy.to(interpolate) }}
                        className={classNames(
                            "bg-purple-700 opacity-60"
                        )}
                    >
                        {index}
                    </a.div>
                ))}
            <div className="w-96 h-96 rounded-none bg-pink-500" style={{ filter: `${useGoo ? 'url(#goo-filter)' : 'none'}` }}></div>
            <div className="top-24 w-24 h-24 rounded-none bg-pink-500" style={{ filter: `${useGoo ? 'url(#goo-filter)' : 'none'}` }}></div>
            </div>
            
        </div>
    );
}

function FilterGoo() {
    return (
        <svg className="absolute w-0 h-0"> {/* Firefox does not like display: none */}
            <filter id="goo-filter">
                <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="30" />
                <feColorMatrix in="blur" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -7" />
            </filter>
        </svg>
    );
}

const useGooAtom = atom(true);

function PageContent() {
    const [useGoo, setUseGoo] = useAtom(useGooAtom);
    return (
        <Spring from={{ opacity: 0, scale: 0 }} to={{ opacity: 1, scale: 1 }} config={config.wobbly}>
            {(props) => (
                <a.div style={props}>
                    <div className="my-4 grid place-items-center">
                        <div className="text-7xl opacity-50">⚗</div>
                        <label className="mt-2 flex items-center justify-center space-x-2 select-none">
                            <input
                                type="checkbox" className="w-7 h-7 form-checkbox text-red-600 bg-red-300 red-ring rounded border-red-900/40"
                                checked={useGoo} onChange={(event) => setUseGoo(event.target.checked)}
                            />
                            <div className="text-3xl opacity-50 font-black uppercase tracking-tighter">Goo Blobs</div>
                        </label>
                    </div>
                </a.div>
            )}
        </Spring>
    );
}

export function PageCBlobs() {
    return (
        <div className="page grid grid-rows-[1fr,auto] bg-red-700/20">
            <div className="relative">
                <FilterGoo />
                <Blobs />
            </div>
            <div className="grid overflow-hidden">
                <PageContent />
                {/* <label className="flex items-center space-x-1">
                    <input type="checkbox" className="form-checkbox select-none" />
                    <div className="">Use filter</div>
                </label> */}
            </div>
        </div>
    );
}
