import { useCallback, useEffect, useState } from "react";
import { getListByDistrictFromFullData } from "../../../utils/getData";
import { useAppState, useAppStateDispatch } from "../../AppContext/AppContext";
import { oneMapRawData } from "../MapData";

export const SelectSingaporeSchool = (): JSX.Element => {
  const appState = useAppState();
  const AppStateDispatch = useAppStateDispatch();

  const [selectData, setSelectData] = useState<oneMapRawData[]>([]);

  const handleSelectedBoundary = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (
        e.currentTarget.value !== undefined &&
        e.currentTarget.value !==
          appState.homeMapViewState.selectedSingaporeSchool.value
      ) {
        AppStateDispatch({
          type: "changeMapLayer",
          layerData: {
            layerName: "icon",
            selectedSchoolValue: e.target.value,
          },
        });
      }
    },
    [appState.homeMapViewState.selectedSingaporeSchool, AppStateDispatch]
  );

  useEffect(() => {
    if (appState.homeMapViewState.selectedSingaporeDistrict.value === "") {
      setSelectData(appState.mapData["SCHOOL_ALL"]);
    } else {
      if (appState.homeMapViewState.selectedSingaporeSchool.value === "") {
        setSelectData(
          getListByDistrictFromFullData(
            appState.mapData["SCHOOL_ALL"],
            `${appState.homeMapViewState.selectedSingaporeDistrict.value}`
          )
        );
      }
    }
  }, [
    appState.mapData,
    appState.homeMapViewState.selectedSingaporeDistrict.value,
    appState.homeMapViewState.selectedSingaporeSchool.value,
  ]);

  return (
    <>
      <div className="field">
        <label className="label is-size-7 has-text-left">School</label>
        <div className="control is-expanded">
          <div className="select is-fullwidth">
            <select
              onChange={handleSelectedBoundary}
              value={
                appState.homeMapViewState.selectedSingaporeSchool.value || ""
              }
            >
              <option value={""}>All</option>
              {selectData &&
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
