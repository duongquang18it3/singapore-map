import classNames from "classnames";
import { useAppState } from "../AppContext/AppContext";
import "./appLoader.css";

export const AppLoader = (): JSX.Element => {
  const appState = useAppState();

  return (
    <>
      {appState.isLoading && (
        <>
          <div className={classNames("wrapper")}></div>
          <div
            className={classNames("box", "has-text-centered", "loadingNotice")}
          >
            <p className="title is-size-5">Loading map data, please wait...</p>
            <button
              className={classNames(
                "button",
                "is-large",
                "is-loading",
                "is-white",
                "is-fullwidth"
              )}
            ></button>
          </div>
        </>
      )}
    </>
  );
};
