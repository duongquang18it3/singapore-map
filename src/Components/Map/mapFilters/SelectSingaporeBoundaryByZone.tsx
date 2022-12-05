import { useCallback, useEffect, useState } from "react";
import { useAppState, useAppStateDispatch } from "../../AppContext/AppContext";
import { BoundaryParseData } from "../MapData";

export const SelectSingaporeBoundaryByZone = (): JSX.Element => {
  const appState = useAppState();
  const AppStateDispatch = useAppStateDispatch();

  const [selectData, setSelectData] = useState<BoundaryParseData[]>([]);

  const handleSelectedBoundary = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (
        e.target.value !== undefined &&
        e.target.value !==
          appState.homeMapViewState.selectedSingaporeBoundary.subZone
      ) {
        AppStateDispatch({
          type: "changeMapLayer",
          layerData: {
            layerName: "polygon",
            selectedBoundaryType: "SUBZONE_C",
            selectedBoundaryValue: e.target.value,
          },
        });
      }
    },
    [appState.homeMapViewState.selectedSingaporeBoundary, AppStateDispatch]
  );

  useEffect(() => {
    let data = appState.mapData["MAP_SINGAPORE_BOUNDARY"];

    if (appState.homeMapViewState.selectedSingaporeBoundary.region !== "") {
      if (appState.homeMapViewState.selectedSingaporeBoundary.area !== "") {
        data = appState.mapData["MAP_SINGAPORE_BOUNDARY"].filter(
          (item: BoundaryParseData) =>
            item["REGION_C"] ===
              appState.homeMapViewState.selectedSingaporeBoundary.region &&
            item["PLN_AREA_C"] ===
              appState.homeMapViewState.selectedSingaporeBoundary.area
        );
      } else {
        data = appState.mapData["MAP_SINGAPORE_BOUNDARY"].filter(
          (item: BoundaryParseData) =>
            item["REGION_C"] ===
            appState.homeMapViewState.selectedSingaporeBoundary.region
        );
      }
    }

    if (appState.homeMapViewState.selectedSingaporeBoundary.area !== "") {
      data = appState.mapData["MAP_SINGAPORE_BOUNDARY"].filter(
        (item: BoundaryParseData) =>
          item["PLN_AREA_C"] ===
          appState.homeMapViewState.selectedSingaporeBoundary.area
      );
    }

    setSelectData(data);
  }, [
    appState.mapData,
    appState.homeMapViewState.selectedSingaporeBoundary.region,
    appState.homeMapViewState.selectedSingaporeBoundary.area,
  ]);

  return (
    <>
      <div className="field">
        <label className="label is-size-7 has-text-left">By zone</label>
        <div className="control is-expanded">
          <div className="select is-fullwidth">
            <select
              onChange={handleSelectedBoundary}
              value={
                appState.homeMapViewState.selectedSingaporeBoundary.subZone ||
                ""
              }
            >
              <option value={""}>All</option>

              {selectData.map((item: BoundaryParseData, index: number) => {
                return (
                  <option key={index} value={item.SUBZONE_C}>
                    {item.SUBZONE_N}
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
