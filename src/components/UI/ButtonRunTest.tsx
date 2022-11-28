export function ButtonRunTest({ running, setRunning }: { running: boolean, setRunning: (v: boolean) => void; }) {
    return (
        <button className="px-4 py-2 w-16 bg-red-400 border border-red-800 rounded active:scale-[.97]"
            onClick={() => setRunning(!running)}
        >
            {running ? 'Stop' : 'Run'}
        </button>
    );
}
