import {
  createContext,
  useContext,
  useLayoutEffect,
  useReducer,
  useState,
} from "react";
import { ViewState } from "../Map/Map";
import { appStateReducer, AppStateDispatch } from "./AppStateReducer";
import { initAppState } from "./InitAppState";

export type AppState = {
  isLoading: boolean;
  isActiveBurger: boolean;
  isActiveMrtMap: boolean;
  homeMapViewState: ViewState;
  mapStyle: string;
  mapLayer: any[];
  mapIconLayerVisibility: string[];
  mapData: { [key: string]: any };
};

export type AppStateInitParams =
  | {
      isLoading: boolean;
      isActiveBurger: boolean;
      isActiveMrtMap: boolean;
      homeMapViewPort: ViewState;
      mapStyle: string;
      mapLayer: any[];
      mapIconLayerVisibility: string[];
      mapData: { [key: string]: any };
    }
  | undefined;

export type AppStateProviderProps = {
  children: React.ReactNode;
  appStateInitParams?: AppStateInitParams;
};

export const AppContext = createContext<AppState | undefined>(undefined);
const AppStateDispatchContext = createContext<AppStateDispatch | undefined>(
  undefined
);

export function AppContextProvider({
  children,
  appStateInitParams,
}: AppStateProviderProps): JSX.Element {
  const [state, dispatch] = useReducer<
    typeof appStateReducer,
    AppStateInitParams
  >(appStateReducer, appStateInitParams, initAppState);

  const [appState, setAppState] = useState(state);

  useLayoutEffect(() => {
    // Only queue new update if previous is finished.
    setAppState(state);
  }, [state]);

  return (
    <AppContext.Provider value={appState}>
      <AppStateDispatchContext.Provider value={dispatch}>
        {children}
      </AppStateDispatchContext.Provider>
    </AppContext.Provider>
  );
}

export function useAppState(): AppState {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within a AppStateProvider");
  }
  return context;
}

export function useAppStateDispatch(): AppStateDispatch {
  const context = useContext(AppStateDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useAppStateDispatch must be used within a AppStateProvider"
    );
  }
  return context;
}
