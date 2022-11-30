import { Page1_Spring } from './Page1_Spring';
import { Page2_Springs } from './Page2_Springs';
import { Page4_Trails } from './Page4_Trails';

export type RouteType = { path: string; name: string; page: () => JSX.Element; };

export const routes: RouteType[] = [
    { path: '/', name: "Spring", page: Page1_Spring, },
    { path: '/springs', name: "Springs", page: Page2_Springs, },
    { path: '/transitions', name: "Transitions", page: Page2_Springs, },
    { path: '/trails', name: "Trails", page: Page4_Trails, },
];

