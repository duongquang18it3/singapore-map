import { useCallback, useEffect, useState } from "react";
import { getListByDistrictFromFullData } from "../../../utils/getData";
import { useAppState, useAppStateDispatch } from "../../AppContext/AppContext";
import { oneMapRawData } from "../MapData";

export const SelectSingaporeLrt = (): JSX.Element => {
  const appState = useAppState();
  const AppStateDispatch = useAppStateDispatch();

  const [selectData, setSelectData] = useState<oneMapRawData[]>([]);

  const handleSelectedBoundary = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (
        e.currentTarget.value !== undefined &&
        e.currentTarget.value !==
          appState.homeMapViewState.selectedSingaporeLrt.value
      ) {
        AppStateDispatch({
          type: "changeMapLayer",
          layerData: {
            layerName: "icon",
            selectedLRTValue: e.target.value,
          },
        });
      }
    },
    [appState.homeMapViewState.selectedSingaporeLrt, AppStateDispatch]
  );

  useEffect(() => {
    if (appState.homeMapViewState.selectedSingaporeDistrict.value === "") {
      setSelectData(appState.mapData["LRT_ALL"]);
    } else {
      if (appState.homeMapViewState.selectedSingaporeLrt.value === "") {
        setSelectData(
          getListByDistrictFromFullData(
            appState.mapData["LRT_ALL"],
            `${appState.homeMapViewState.selectedSingaporeDistrict.value}`
          )
        );
      } 
    }
  }, [
    appState.mapData,
    appState.homeMapViewState.selectedSingaporeDistrict.value,
    appState.homeMapViewState.selectedSingaporeLrt.value,
  ]);

  return (
    <>
      <div className="field">
      <label className="label is-size-7 has-text-left">LRT</label>
        <div className="control is-expanded">
          <div className="select is-fullwidth">
            <select
              onChange={handleSelectedBoundary}
              value={appState.homeMapViewState.selectedSingaporeLrt.value || ""}
            >
              <option value={""}>All</option>
              {appState.homeMapViewState.selectedSingaporeDistrict.value !== "" &&
                selectData &&
                selectData.length > 0 &&
                selectData.map((item: oneMapRawData, index: number) => {
                  return (
                    <option key={index} value={item.SEARCHVAL}>
                      {item.SEARCHVAL}
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
