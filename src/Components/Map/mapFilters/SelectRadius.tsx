import { useCallback, useEffect } from "react";
import { useAppState, useAppStateDispatch } from "../../AppContext/AppContext";

export const SelectRadius = (): JSX.Element => {
  const appState = useAppState();
  const AppStateDispatch = useAppStateDispatch();

  const handleSelectedRadius = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (e.currentTarget.value !== undefined) {
        AppStateDispatch({
          type: "changePinned",
          pinData: {
            isPinned: appState.homeMapViewState.selectedPinned.isPinned,
            data: {
              coordinate: [
                appState.homeMapViewState.selectedPinned.lng,
                appState.homeMapViewState.selectedPinned.lat,
              ],
              radius: e.currentTarget.value,
            },
          },
        });
      }
    },
    [AppStateDispatch, appState.homeMapViewState.selectedPinned]
  );

  useEffect(() => {}, []);

  return (
    <>
      <div className="field ">
        <label className="label is-size-7 has-text-left">Radius</label>
        <div className="control is-expanded">
          <div className="select is-fullwidth is-rounded">
            <select
              onChange={handleSelectedRadius}
              value={appState.homeMapViewState.selectedPinned.radius || 1}
            >
              <option value={1}>{`1 km`}</option>
              <option value={2}>{`2 km`}</option>
              <option value={3}>{`3 km`}</option>
              <option value={4}>{`4 km`}</option>
              <option value={5}>{`5 km`}</option>
              <option value={10}>{`10 km`}</option>
              );
            </select>
          </div>
        </div>
      </div>
    </>
  );
};
