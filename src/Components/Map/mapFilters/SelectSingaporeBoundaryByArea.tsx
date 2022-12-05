import { useCallback, useEffect, useState } from "react";
import { getListFilteredByKey } from "../../../utils/filterData";
import { selectOptionProps } from "../../../utils/parsing";
import { useAppState, useAppStateDispatch } from "../../AppContext/AppContext";
import { BoundaryParseData } from "../MapData";

export const SelectSingaporeBoundaryByArea = (): JSX.Element => {
  const appState = useAppState();
  const AppStateDispatch = useAppStateDispatch();

  const [selectData, setSelectData] = useState<selectOptionProps[]>([]);

  const handleSelectedBoundary = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (
        e.target.value !== undefined &&
        e.target.value !==
          appState.homeMapViewState.selectedSingaporeBoundary.area
      ) {
        AppStateDispatch({
          type: "changeMapLayer",
          layerData: {
            layerName: "polygon",
            selectedBoundaryType: "PLN_AREA_C",
            selectedBoundaryValue: e.target.value,
          },
        });
      }
    },
    [appState.homeMapViewState.selectedSingaporeBoundary, AppStateDispatch]
  );

  useEffect(() => {
    let data = appState.mapData["MAP_SINGAPORE_AREA"];

    if (appState.homeMapViewState.selectedSingaporeBoundary.region !== "") {
      data = getListFilteredByKey({
        fullData: appState.mapData["MAP_SINGAPORE_BOUNDARY"].filter(
          (item: BoundaryParseData) =>
            item["REGION_C"] ===
            appState.homeMapViewState.selectedSingaporeBoundary.region
        ),
        keyType: "PLN_AREA_N",
      });
    }

    setSelectData(data);
  }, [appState.mapData ,appState.homeMapViewState.selectedSingaporeBoundary.region]);

  return (
    <>
      <div className="field">
        <label className="label is-size-7 has-text-left">By area</label>
        <div className="control is-expanded">
          <div className="select is-fullwidth">
            <select
              onChange={handleSelectedBoundary}
              value={
                appState.homeMapViewState.selectedSingaporeBoundary.area || ""
              }
            >
              <option value={""}>All</option>
              {
                // appState.mapData["MAP_SINGAPORE_AREA"]
                selectData.map((item: selectOptionProps, index: number) => {
                  return (
                    <option key={index} value={item.code}>
                      {item.name}
                    </option>
                  );
                })
              }
            </select>
          </div>
        </div>
      </div>
    </>
  );
};
