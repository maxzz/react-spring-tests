import { useLocation, useOutlet } from 'react-router-dom';
import { CSSTransition, SwitchTransition, TransitionStatus } from 'react-transition-group';
import { RouteType } from './0-all-routes';
import { TopMenu } from '../0-top-menu';

function traceState(path: string, state: string): undefined {
    const color =
        state === 'exiting'
            ? 'darkcyan'
            : state === 'exited'
                ? 'cyan'
                : state === 'entering'
                    ? 'saddlebrown'
                    : state === 'entered'
                        ? 'chocolate'
                        : 'black';
    console.log(`page: "${path}" %c${state}`, `background-color: #252525; color: ${color}`);
}

export function Root({ routes }: { routes: RouteType[]; }) {
    const location = useLocation();
    const currentOutlet = useOutlet();
    const { nodeRef } = routes.find((route) => route.path === location.pathname) ?? {};
    return (<>
        <div className="h-screen flex flex-col bg-[salmon] text-red-800">
            <TopMenu />

            <div className="flex-1 relative">
                <SwitchTransition mode="out-in">
                    <CSSTransition
                        key={location.pathname}
                        nodeRef={nodeRef}
                        //timeout={100} //timeout={300}
                        timeout={{
                            appear: 300,
                            enter: 200,
                            exit: 100,
                        }}
                        classNames="fade"
                        unmountOnExit
                    >
                        {(state: TransitionStatus) => (
                            <div ref={nodeRef} className="page">
                                {/* {console.log(`page: "${location.pathname}" transition state: %c${state}`, 'background-color: #333333; color: yellow')!} */}
                                {traceState(location.pathname, state)}

                                {currentOutlet}
                            </div>
                        )}
                    </CSSTransition>
                </SwitchTransition>
            </div >

            <div className="">
                <a href="https://maxzz.github.io/react-spring-tests" target='_blank'>prev animations</a>
            </div>

        </div>
    </>);
}
