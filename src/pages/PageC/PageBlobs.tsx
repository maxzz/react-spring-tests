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
    return (
        <div className="absolute inset-0 overflow-hidden border border-gray-900/20">
            <div
                className="blobs absolute inset-0"
                style={{ filter: 'url(#goo-filter)' }}
                onMouseMove={e => api.start({ xy: [e.clientX, e.clientY] })}
            >
                {trail.map((props, index) => (
                    <a.div
                        key={index}
                        style={{ transform: props.xy.to(interpolate) }}
                        className={classNames(
                            "bg-purple-700 opacity-60"
                        )}
                    />
                ))}
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

const useGooAtom = atom(false);

function PageContent() {
    const [useGoo, setUseGoo] = useAtom(useGooAtom);
    return (
        <Spring from={{ opacity: 0, scale: 0 }} to={{ opacity: 1, scale: 1 }} config={config.wobbly}>
            {(props) => (
                <a.div style={props}>
                    <div className="grid place-items-center">
                        <div className="text-7xl opacity-50">⚗</div>
                        <div className="mt-4 text-3xl opacity-50 font-black uppercase tracking-tighter">Goo Blobs</div>
                        <label className="flex items-center space-x-1">
                            <input type="checkbox" className="form-checkbox select-none" />
                            <div className="">Use filter</div>
                        </label>
                    </div>
                </a.div>
            )}
        </Spring>
    );
}

export function PageCBlobs() {
    return (
        <div className="page grid place-items-center relative bg-red-700/20">
            <FilterGoo />
            <Blobs />
            <PageContent />
        </div>
    );
}
