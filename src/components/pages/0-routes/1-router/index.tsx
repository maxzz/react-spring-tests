import { useLocation, createBrowserRouter, useOutlet } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { routes } from '../all-routes';
import { TopMenu } from '../0-top-menu';
import { Page404 } from '../2-404';

function traceState(path: string, state: string): undefined {
    console.log(`page: "${path}" transition state: %c${state}`, 'background-color: #333333; color: yellow');
}

function Root() {
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
                        {(state) => (
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

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <Page404 />,
        children: routes.map((route) => ({
            index: route.path === '/',
            path: route.path,
            element: route.element,
        }))
    }
]);
