import { PageA } from './PageA_Spring';
import { PageB } from './PageB_Springs';
import { PageD_Blobs } from './PageD_Trails';

export type RouteType = { path: string; name: string; page: () => JSX.Element; };

export const routes: RouteType[] = [
    { path: '/', name: "Spring", page: PageA, },
    { path: '/springs', name: "Springs", page: PageB, },
    { path: '/transitions', name: "Transitions", page: PageB, },
    { path: '/trails', name: "Trails", page: PageD_Blobs, },
];

