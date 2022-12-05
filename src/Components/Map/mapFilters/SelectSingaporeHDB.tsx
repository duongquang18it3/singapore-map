import { useCallback, useEffect, useState } from "react";
import { getListByDistrictFromFullData } from "../../../utils/getData";
import { useAppState, useAppStateDispatch } from "../../AppContext/AppContext";
import { oneMapRawData } from "../MapData";

export const SelectSingaporeHDB = (): JSX.Element => {
  const appState = useAppState();
  const AppStateDispatch = useAppStateDispatch();

  const [selectData, setSelectData] = useState<oneMapRawData[]>([]);

  const handleSelectedBoundary = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (
        e.currentTarget.value !== undefined &&
        e.currentTarget.value !==
          appState.homeMapViewState.selectedSingaporeHDB.value
      ) {
        AppStateDispatch({
          type: "changeMapLayer",
          layerData: {
            layerName: "icon",
            selectedHDBType: "building",
            selectedHDBValue: e.target.value,
          },
        });
      }
    },
    [appState.homeMapViewState.selectedSingaporeHDB, AppStateDispatch]
  );

  useEffect(() => {
    if (appState.homeMapViewState.selectedSingaporeDistrict.value === "") {
      setSelectData(appState.mapData["HDB_ALL"]);
    } else {
      if (appState.homeMapViewState.selectedSingaporeHDB.value === "") {
        setSelectData(
          getListByDistrictFromFullData(
            appState.mapData["HDB_ALL"],
            `${appState.homeMapViewState.selectedSingaporeDistrict.value}`
          )
        );
      }
    }
  }, [
    appState.mapData,
    appState.homeMapViewState.selectedSingaporeDistrict.value,
    appState.homeMapViewState.selectedSingaporeHDB.value,
  ]);

  return (
    <>
      <div className="field">
      <label className="label is-size-7 has-text-left">HDB name - address</label>
        <div className="control is-expanded">
          <div className="select is-fullwidth">
            <select
              onChange={handleSelectedBoundary}
              value={appState.homeMapViewState.selectedSingaporeHDB.value || ""}
            >
              <option value={""}>All</option>
              {appState.homeMapViewState.selectedSingaporeDistrict.value !== "" &&
                selectData &&
                selectData.length > 0 &&
                selectData.map((item, index) => {
                  return (
                    <option
                      key={index}
                      value={`${item.SEARCHVAL} - ${item.ADDRESS}`}
                    >
                      {`${item.SEARCHVAL} - ${item.ADDRESS}`}
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
