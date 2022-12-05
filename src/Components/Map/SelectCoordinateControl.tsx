import { createRef, useCallback } from "react";
import { useAppState, useAppStateDispatch } from "../AppContext/AppContext";
import { ViewState } from "./Map";
import { SelectRadius } from "./mapFilters/SelectRadius";

export function SelectCoordinateControl(): JSX.Element {
  const appState = useAppState();
  const AppStateDispatch = useAppStateDispatch();

  const latRef = createRef<HTMLInputElement>();
  const longRef = createRef<HTMLInputElement>();
  const zoomRef = createRef<HTMLInputElement>();
  const bearingRef = createRef<HTMLInputElement>();
  const pitchRef = createRef<HTMLInputElement>();

  const onChangeCoordinate = useCallback((): void => {
    let viewPort: ViewState = {
      // width: appState.homeMapViewPort.width,
      // height: appState.homeMapViewPort.height,
      latitude: latRef.current?.value
        ? Number(latRef.current.value)
        : appState.homeMapViewState.latitude,
      longitude: longRef.current?.value
        ? Number(longRef.current.value)
        : appState.homeMapViewState.longitude,
      zoom: zoomRef.current?.value
        ? Number(zoomRef.current.value)
        : appState.homeMapViewState.zoom,
      bearing: bearingRef.current?.value
        ? Number(bearingRef.current.value)
        : appState.homeMapViewState.bearing,
      pitch: pitchRef.current?.value
        ? Number(pitchRef.current.value)
        : appState.homeMapViewState.pitch,
      searchKey: appState.homeMapViewState.searchKey,
      searchQuery: appState.homeMapViewState.searchQuery,
      selectedSingaporeDistrict:
        appState.homeMapViewState.selectedSingaporeDistrict,
      selectedSingaporeBoundary:
        appState.homeMapViewState.selectedSingaporeBoundary,
      selectedSingaporeHDB: appState.homeMapViewState.selectedSingaporeHDB,
      selectedSingaporeSchool:
        appState.homeMapViewState.selectedSingaporeSchool,
      selectedSingaporeMrt: appState.homeMapViewState.selectedSingaporeMrt,
      selectedSingaporeLrt: appState.homeMapViewState.selectedSingaporeLrt,
      selectedPinned: appState.homeMapViewState.selectedPinned,
    };

    AppStateDispatch({ type: "changeMapViewState", viewState: viewPort });
  }, [
    AppStateDispatch,
    appState.homeMapViewState.bearing,
    appState.homeMapViewState.latitude,
    appState.homeMapViewState.longitude,
    appState.homeMapViewState.pitch,
    appState.homeMapViewState.zoom,
    appState.homeMapViewState.searchKey,
    appState.homeMapViewState.selectedSingaporeDistrict,
    appState.homeMapViewState.selectedSingaporeBoundary,
    appState.homeMapViewState.selectedSingaporeHDB,
    appState.homeMapViewState.selectedSingaporeSchool,
    appState.homeMapViewState.selectedSingaporeMrt,
    appState.homeMapViewState.selectedSingaporeLrt,
    appState.homeMapViewState.selectedPinned,
    bearingRef,
    latRef,
    longRef,
    pitchRef,
    zoomRef,
  ]);

  

  return (
    <>
      <div className="box">
        <div className="field">
          <label className="label is-size-7 has-text-left">Latitude</label>
          <div className="control">
            <input
              ref={latRef}
              value={appState.homeMapViewState.latitude}
              onChange={onChangeCoordinate}
              className="input"
              type="number"
              placeholder="latitude"
            />
          </div>
        </div>

        <div className="field">
          <label className="label is-size-7 has-text-left">Longtitude</label>
          <div className="control">
            <input
              ref={longRef}
              value={appState.homeMapViewState.longitude}
              onChange={onChangeCoordinate}
              className="input"
              type="number"
              placeholder="longitude"
            />
          </div>
        </div>

        <div className="field">
          <label className="label is-size-7 has-text-left">Zoom</label>
          <div className="control">
            <input
              ref={zoomRef}
              value={appState.homeMapViewState.zoom}
              onChange={onChangeCoordinate}
              className="input"
              type="number"
              placeholder="zoom"
            />
          </div>
        </div>

        <div className="field">
          <label className="label is-size-7 has-text-left">Bearing</label>
          <div className="control">
            <input
              ref={bearingRef}
              value={appState.homeMapViewState.bearing}
              onChange={onChangeCoordinate}
              className="input"
              type="number"
              placeholder="bearing"
            />
          </div>
        </div>

        <div className="field">
          <label className="label is-size-7 has-text-left">Pitch</label>
          <div className="control">
            <input
              ref={pitchRef}
              value={appState.homeMapViewState.pitch}
              onChange={onChangeCoordinate}
              className="input"
              type="number"
              placeholder="pitch"
            />
          </div>
        </div>

        
      </div>
    </>
  );
}
