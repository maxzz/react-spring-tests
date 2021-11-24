declare module 'svg-catmull-rom-spline' {
    export function toPoints(points: [number, number][], tolerance: number, highestQuality: boolean): [number, number, number, number, number, number][];
    export function toPath(points: [number, number][], tolerance: number, highestQuality: boolean): string;
}
