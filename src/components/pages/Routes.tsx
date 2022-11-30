import { PageA } from './PageA-spring';
import { PageB } from './PageB';
import { PageCBlobs } from './PageD-trails';

export type RouteType = { path: string; name: string; page: () => JSX.Element; };

export const routes: RouteType[] = [
    { path: '/', name: "Spring", page: PageA, },
    { path: '/springs', name: "Springs", page: PageB, },
    { path: '/transitions', name: "Transitions", page: PageB, },
    { path: '/trails', name: "Trails", page: PageCBlobs, },
];

