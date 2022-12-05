import { useCallback } from 'react';
import { useAppState, useAppStateDispatch } from '../AppContext/AppContext';
import { MAP_STYLE } from './MapData';

export function SelectMapControl(): JSX.Element {
    const appState = useAppState();
    const AppStateDispatch = useAppStateDispatch();

    const listMapStyle = Object.keys(MAP_STYLE).map(
        (keyName: string): JSX.Element => {
            return (
                <button
                    key={keyName}
                    className={`button is-dark ${
                        keyName === appState.mapStyle ? '' : 'is-outlined'
                    }`}
                    onClick={() => onSelectMapStyle(keyName)}
                >
                    {keyName}
                </button>
            );
        },
    );

    const onSelectMapStyle = useCallback(
        (mapStyle: string): void => {
            AppStateDispatch({ type: 'selectMapStyle', mapStyle: mapStyle });
        },
        [AppStateDispatch],
    );

    return (
        <>
            <div className='column'>
                <h1>Select map style :</h1>
                <div className='buttons is-centered'>{listMapStyle}</div>
            </div>
        </>
    );
}
