export function Counters({ nContainer, nElements }: { nContainer: number, nElements: number, }) {
    return (
        <div className="text-xs">
            container: {nContainer.toFixed(0)} element: {nElements.toFixed(0)}
        </div>
    );
}
