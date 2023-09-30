import { ReactNode, RefObject, createRef } from 'react';
import { Page1_Spring } from './1-spring';
import { Page2_Springs } from './2-springs';
import { Page4_Trails } from './4-trails';

export type RouteType = { path: string; name: string; element: ReactNode; nodeRef: RefObject<HTMLDivElement> };

export const routes: RouteType[] = [
    { path: '/', name: "Spring", element: <Page1_Spring />, nodeRef: createRef() },
    { path: '/springs', name: "Springs", element: <Page2_Springs />, nodeRef: createRef() },
    { path: '/transitions', name: "Transitions", element: <Page2_Springs />, nodeRef: createRef() },
    { path: '/trails', name: "Trails", element: <Page4_Trails />, nodeRef: createRef() },
];
