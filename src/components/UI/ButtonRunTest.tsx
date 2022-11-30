import { HTMLAttributes } from "react";
import { classNames } from "@/utils/classnames";

export function ButtonRunTest({ running, className, ...rest }: { running: boolean; } & HTMLAttributes<HTMLButtonElement>) {
    return (
        <button className={classNames("px-4 py-2 w-16 bg-red-400 border border-red-800 rounded active:scale-[.97]", className)} {...rest}>
            {running ? 'Stop' : 'Run'}
        </button>
    );
}
