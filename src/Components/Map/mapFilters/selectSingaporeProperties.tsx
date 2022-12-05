import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useAppState, useAppStateDispatch } from "../../AppContext/AppContext";

const listAllIconType = ["all", "hdb", "school", "mrt", "lrt", "mrt_line", "lrt_line", "boundary"];

export const SelectSingaporeProperties = (): JSX.Element => {
  const appState = useAppState();
  const AppStateDispatch = useAppStateDispatch();

  const allRef = useRef<HTMLInputElement>(null);
  const capitalRef = useRef<HTMLInputElement>(null);
  const schoolRef = useRef<HTMLInputElement>(null);
  const mrtRef = useRef<HTMLInputElement>(null);
  const lrtRef = useRef<HTMLInputElement>(null);
  const mrtLineRef = useRef<HTMLInputElement>(null);
  const lrtLineRef = useRef<HTMLInputElement>(null);
  const boundaryLineRef = useRef<HTMLInputElement>(null);

  const [listRef, setListRef] = useState<RefObject<HTMLInputElement>[]>([]);

  useEffect(() => {
    setListRef([allRef, capitalRef, schoolRef, mrtRef, lrtRef, mrtLineRef, lrtLineRef, boundaryLineRef]);
  }, [
    appState.mapIconLayerVisibility,
    allRef,
    capitalRef,
    schoolRef,
    mrtRef,
    lrtRef,
    mrtLineRef,
    lrtLineRef,
    boundaryLineRef,
  ]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      if (listRef && listRef.length > 0) {
        let result: string[] = appState.mapIconLayerVisibility;

        if (e.currentTarget.checked) {
          result[index] = listAllIconType[index];
        } else {
          result[index] = "";
        }

        AppStateDispatch({
          type: "changeMapLayer",
          layerData: {
            layerName: "icon",
            listVisibility: result,
          },
        });
      }
    },
    [appState.mapIconLayerVisibility, listRef, AppStateDispatch]
  );

  useEffect(() => {}, []);

  return (
    <>
      <div className="field">
        <label className="label is-size-7">Display option</label>
        <div className="columns is-multiline">
        {listAllIconType.length > 0 &&
            listAllIconType.map((item, index) => {
              return (
                <div key={index} className="column is-narrow pb-0">
                  <label className="checkbox">
                    <input
                      ref={capitalRef}
                      type="checkbox"
                      checked={
                        appState.mapIconLayerVisibility.indexOf(item) !== -1
                      }
                      onChange={(e) => handleChange(e, index)}
                    />
                    <span className="pl-2">{item.toUpperCase()}</span>
                  </label>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
