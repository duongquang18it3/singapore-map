import { useCallback, useEffect } from "react";
import { useAppState, useAppStateDispatch } from "../../AppContext/AppContext";

export const SelectBuildingByDistrict = (): JSX.Element => {
  const appState = useAppState();
  const AppStateDispatch = useAppStateDispatch();

  const handleSelectedBoundary = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (e.currentTarget.value !== undefined) {
        AppStateDispatch({
          type: "changeMapLayer",
          layerData: {
            layerName: "icon",
            selectedHDBType: "district",
            selectedHDBValue: e.target.value,
          },
        });
      }
    },
    [AppStateDispatch]
  );

  useEffect(() => {}, []);

  return (
    <>
      <div className="field">
        <label className="label is-size-7 has-text-left">By district</label>
        <div className="control is-expanded">
          <div className="select is-fullwidth">
            <select
              onChange={handleSelectedBoundary}
              value={
                appState.homeMapViewState.selectedSingaporeDistrict.value || ""
              }
            >
              <option value={""}>All</option>
              {Array.from(Array(28).keys()).map((item, index) => {
                return (
                  <option
                    key={index}
                    value={`${index < 9 ? "0" : ""}${index + 1}`}
                  >
                    {`${index < 9 ? "0" : ""}${index + 1}`}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};
