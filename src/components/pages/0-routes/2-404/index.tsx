import { Link } from "react-router-dom";

export function Page404() {
    return (
        <div className="h-screen bg-sky-400 grid place-items-center">
            <div className="flex flex-col items-center gap-y-2">
                <div className="text-2xl">404</div>
                <div className="mb-8 text-2xl">Page not found</div>
                <Link to="/" className="px-3 py-2 border-sky-600 border rounded shadow">Go Home</Link>
            </div>
        </div>
    );
}
