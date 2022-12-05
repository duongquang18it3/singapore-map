import { useCallback } from "react";
import { selectOptionProps } from "../../../utils/parsing";
import { useAppState, useAppStateDispatch } from "../../AppContext/AppContext";

export const SelectSingaporeBoundaryByRegion = (): JSX.Element => {
  const appState = useAppState();
  const AppStateDispatch = useAppStateDispatch();

  // const [selectData, setSelectData] = useState<BoundaryParseData[]>([]);

  const handleSelectedBoundary = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (
        e.target.value !== undefined &&
        e.target.value !==
          appState.homeMapViewState.selectedSingaporeBoundary.region
      ) {
        AppStateDispatch({
          type: "changeMapLayer",
          layerData: {
            layerName: "polygon",
            selectedBoundaryType: "REGION_C",
            selectedBoundaryValue: e.target.value,
          },
        });
      }
    },
    [appState.homeMapViewState.selectedSingaporeBoundary, AppStateDispatch]
  );

  // useEffect(() => {
  //   setSelectData(appState.mapData["MAP_SINGAPORE_REGION"]);
  // }, [appState.mapData]);

  return (
    <>
      <div className="field">
        <label className="label is-size-7 has-text-left">By region</label>
        <div className="control is-expanded">
          <div className="select is-fullwidth">
            <select
              onChange={handleSelectedBoundary}
              value={
                appState.homeMapViewState.selectedSingaporeBoundary.region || ""
              }
            >
              <option value={""}>All</option>
              {appState.mapData["MAP_SINGAPORE_REGION"].map(
                (item: selectOptionProps, index: number) => {
                  return (
                    <option key={index} value={item.code}>
                      {item.name}
                    </option>
                  );
                }
              )}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};
