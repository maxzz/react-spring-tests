import React from 'react';
import { a, useTrail, Spring, config } from "@react-spring/web";
import { useAtom } from 'jotai';
import styled from 'styled-components';
import { useKey } from 'react-use';
import { useGooAtom } from '../../store/store';
import { Bubbles } from './Bowl';

const BLOBPOS = [{
    width: 120,
    height: 120,
}, {
    width: 250,
    height: 250,
}, {
    width: 150,
    height: 150,
},
];

const configFast = { tension: 1200, friction: 40 };
const configSlow = { mass: 10, tension: 200, friction: 50 };
const interpolate = (x: number, y: number) => `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`;

const BlobsParent = styled.div<{ $useGoo: boolean; }>`
    position: absolute;
    inset: 0;
    filter: ${props => props.$useGoo ? 'url(#goo-filter)' : 'none'};
`;

const BlobChild = styled(a.div) <{ $width: number; $height: number; }>`
    position: absolute;
    --width: ${props => props.$width};
    --height: ${props => props.$height};
    width: calc(var(--width) * 1px);
    height: calc(var(--height) * 1px);
    border-radius: 50%;
    background: #7e22ce; //bg-purple-700 //background: lightcoral;
    box-shadow: 12px 12px 4px 7px #c9f80c;
    opacity: .6;
    will-change: transform;

    &::after {
        content: '';
        position: absolute;
        left: calc(var(--width) * 0.22px);
        top: calc(var(--height) * 0.22px);
        width: calc(var(--width) * 0.33px);
        height: calc(var(--height) * 0.33px);
        border-radius: 50%;
        background: #ffffffcc;
    }
`;

function Blobs() {
    const [trail, api] = useTrail(3, () => ({
        xy: [335, 185],
        config: configSlow,
    }));
    const [useGoo] = useAtom(useGooAtom);
    return (
        <div className="absolute inset-0 overflow-hidden border border-gray-900/20">
            <BlobsParent $useGoo={useGoo} onMouseMove={(event) => api.start({ xy: [event.clientX, event.clientY] })}>
                {trail.map((props, index) => (
                    <BlobChild
                        key={index}
                        $width={BLOBPOS[index].width}
                        $height={BLOBPOS[index].height}
                        style={{ transform: props.xy.to(interpolate), }}
                    >
                        {useGoo ? null : <div className="font-bold">{index}</div>}
                    </BlobChild>
                ))}
                <div
                    className="absolute left-[2%] top-[1%] w-96 h-96 rounded-full bg-[transparent]"
                    style={{ filter: `${useGoo ? 'url(#goo-filter)' : 'none'}`, boxShadow: '12px 12px 4px 7px #c9f80c' }}
                />
                <div
                    className="absolute left-[60%] top-[8rem] w-24 h-24 rounded-full bg-[lightcoral]"
                    style={{ filter: `${useGoo ? 'url(#goo-filter)' : 'none'}`, boxShadow: '12px 12px 4px 7px #c9f80c' }}
                />
            </BlobsParent>
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

function PageContent() {
    const [useGoo, setUseGoo] = useAtom(useGooAtom);
    useKey((event) => event.altKey && event.key === 'g', (event) => { event.preventDefault(); setUseGoo(prev => !prev); });
    return (
        <Spring from={{ opacity: 0, scale: 0 }} to={{ opacity: 1, scale: 1 }} config={config.wobbly}>
            {(props: any) => (
                <a.div style={props}>
                    <div className="my-4 grid place-items-center">
                        <div className="relative text-7xl">
                            <span className="opacity-50">⚗</span>
                            <Bubbles />
                        </div>
                        <label className="mt-2 flex items-center justify-center space-x-2 select-none">
                            <input
                                type="checkbox" className="w-7 h-7 form-checkbox text-red-600 bg-red-300 red-ring rounded border-red-900/40"
                                checked={useGoo} onChange={(event) => setUseGoo(event.target.checked)}
                            />
                            <div className="text-3xl opacity-50 font-black uppercase tracking-tighter">Goo Blobs
                                <div className="ml-1 -mt-2 px-1 pb-0.5 text-red-900 bg-red-300 border border-red-800 rounded inline-block align-text-top text-sm font-normal normal-case opacity-70">
                                    Alt+G
                                </div>
                            </div>
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
            </div>
        </div>
    );
}
