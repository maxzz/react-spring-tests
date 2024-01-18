import { LinkProps, NavLink } from 'react-router-dom';
import { routes } from '../all-routes';

function MenuButton(props: LinkProps & React.RefAttributes<HTMLAnchorElement>) {
    return (
        <NavLink
            className={
                ({ isActive }) => {
                    return `px-4 py-2 rounded shadow ${isActive ? 'bg-red-300' : 'opacity-75 border-2 border-red-600/10 hover:bg-red-300/60 active:scale-[.97]'}`;
                }
            }
            {...props}
        />
    );
}

export function TopMenu() {
    return (
        <nav className="p-4 flex justify-end space-x-3">
            {routes.map((route, idx) => (
                <MenuButton key={idx} to={route.path} children={route.name} />
            ))}
        </nav>
    );
}
