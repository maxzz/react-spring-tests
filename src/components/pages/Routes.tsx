import { ReactNode, RefObject, createRef } from 'react';
import { Page1_Spring } from './Page1_Spring';
import { Page2_Springs } from './Page2_Springs';
import { Page4_Trails } from './Page4_Trails';

export type RouteType = { path: string; name: string; element: ReactNode; nodeRef: RefObject<HTMLDivElement> };

export const routes: RouteType[] = [
    { path: '/', name: "Spring", element: <Page1_Spring />, nodeRef: createRef() },
    { path: '/springs', name: "Springs", element: <Page2_Springs />, nodeRef: createRef() },
    { path: '/transitions', name: "Transitions", element: <Page2_Springs />, nodeRef: createRef() },
    { path: '/trails', name: "Trails", element: <Page4_Trails />, nodeRef: createRef() },
];

