import './App.css';
import { AppHeader, HeaderProps } from '../Components/AppHeader/AppHeader';
import {
    useAppState,
    useAppStateDispatch,
} from '../Components/AppContext/AppContext';
import 'mapbox-gl/dist/mapbox-gl.css';
import { AppFooter } from '../Components/AppFooter/AppFooter';
import { useCallback, useLayoutEffect } from 'react';
import { AppLoader } from '../Components/AppLoader/appLoader';

type AppProps = {
    headerProps?: HeaderProps;
    children?: React.ReactNode;
};

function App(props?: AppProps): JSX.Element {
    const appState = useAppState();
    const AppStateDispatch = useAppStateDispatch();

    const onWindowResize = useCallback(() => {
        AppStateDispatch({
            type: 'changeMapViewState',
            viewState: appState.homeMapViewState,
        });
    }, [AppStateDispatch, appState.homeMapViewState]);

    useLayoutEffect(() => {
        window.addEventListener('resize', onWindowResize);
        return () => window.removeEventListener('resize', onWindowResize);
    }, [onWindowResize]);

    return (
        <>
            <AppHeader colorType={props?.headerProps?.colorType} />
            <div className='App'>{props?.children}</div>
            <AppFooter />
            <AppLoader />
        </>
    );
}

export default App;
