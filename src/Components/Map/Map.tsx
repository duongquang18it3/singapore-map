import { ChangeEvent, useCallback, useEffect, useState } from "react";
import DeckGL from "@deck.gl/react";
import ReactMapGL, { MapContext, NavigationControl } from "react-map-gl";
import { useAppState, useAppStateDispatch } from "../AppContext/AppContext";
import { MAP_STYLE, NAV_CONTROL_STYLE } from "./MapData";
import { SelectMapControl } from "./SelectMapControl";
import { SelectCoordinateControl } from "./SelectCoordinateControl";
import { MapFilterControl } from "./mapFilterControl";
import {
  getBoundaryListFromPublic,
  getCapitalListFromPublic,
  getDataList,
  getLrtRouteData,
  getMrtRouteData,
  getRailData,
  getRailLineListFromPublic,
  getRegionByDistrict,
  getSelectListFromPublic,
} from "../../utils/getData";
import Content from "../SchoolComponent/ContentSchool";
import { Configure, InstantSearch } from "react-instantsearch-dom";
import { indexNameSchool, searchClient } from "../../lib/algoliaClient";
import ContentSchool from "../SchoolComponent/ContentSchool";
import ContentMrt from "../SchoolComponent/ContentMrt";
import ContentLrt from "../SchoolComponent/ContentLrt";
import ContentHdb from "../SchoolComponent/ContentHdb";
import { SelectRadius } from "./mapFilters/SelectRadius";
import { getMRTLine, parseRaiLine } from "../../utils/parsing";
import algoliasearch from "algoliasearch";
import { MrtMAp } from "./mrtPopUpMap/mrtMap";

export type ViewState = {
  latitude: number;
  longitude: number;
  zoom: number;
  bearing: number;
  pitch: number;
  searchKey: {
    value: string;
  };
  searchQuery: {
    query: string;
    searchByMrt: boolean;
  };
  selectedSingaporeDistrict: {
    value: string;
  };
  selectedSingaporeBoundary: {
    region: string;
    area: string;
    subZone: string;
  };
  selectedSingaporeHDB: {
    value: string;
    list?: any[];
  };
  selectedSingaporeSchool: {
    value: string;
    list?: any[];
  };
  selectedSingaporeMrt: {
    value: string;
    list?: any[];
  };
  selectedSingaporeLrt: {
    value: string;
    list?: any[];
  };
  selectedPinned: {
    isPinned: boolean;
    showRadiusOnly: boolean;
    radius: number;
    lat?: number;
    lng?: number;
  };
};

export type SearchState = {
  query: string;
  searchByMrt: boolean;
};

export type InteractionState = {
  inTransition?: boolean | undefined;
  isDragging?: boolean | undefined;
  isPanning?: boolean | undefined;
  isRotating?: boolean | undefined;
  isZooming?: boolean | undefined;
};

export type DeckViewPort = {
  viewState: ViewState;
  interactionState: InteractionState;
  oldViewState: ViewState;
};

export function Map(): JSX.Element {
  const appState = useAppState();
  const appStateDispatch = useAppStateDispatch();

  const mapContainerStyle: React.CSSProperties = {
    position: "relative",
    minHeight: "75vh",
  };

  useEffect(() => {
    if (Object.keys(appState.mapData).length === 0) {
      const getData = async () => {
        const MAP_NATION_COORDINATE = await getCapitalListFromPublic();
        const MAP_SINGAPORE_BOUNDARY = await getBoundaryListFromPublic();
        const MAP_SINGAPORE_SUBZONE = await getSelectListFromPublic("Subzones");
        const MAP_SINGAPORE_REGION = await getSelectListFromPublic("Regions");
        const MAP_SINGAPORE_AREA = await getSelectListFromPublic("Areas");
        // const MAP_SINGAPORE_SCHOOL_RAW = await getRawDataListFromPublic(
        //   "school"
        // );
        // const SCHOOL_BY_DISTRICT = await getDataListByDistrict("schoolData");
        const SCHOOL_ALL = await getDataList("schoolData");

        // const RAIL_ALL = await getRailData("sg-rail");

        // const RAIL_LINE = await getRailLineListFromPublic();
        const RAIL_LINE_MRT = await getMrtRouteData("mrtRailLine");
        const EW_MRT = await getMrtRouteData("ew_rail");
        const CC_MRT = await getMrtRouteData("cc_rail");
        const NS_MRT = await getMrtRouteData("ns_rail");
        const DT_MRT = await getMrtRouteData("dt_rail");
        const NE_MRT = await getMrtRouteData("ne_rail");
        const CE_MRT = await getMrtRouteData("ce_rail");
        const CG_MRT = await getMrtRouteData("cg_rail");

        const RAIL_LINE_LRT = await getLrtRouteData("lrtRailLine");

        // const MAP_SINGAPORE_MRT_RAW = await getRawDataListFromPublic("mrt");
        // const MRT_BY_DISTRICT = await getDataListByDistrict("mrt_stations");
        const MRT_ALL = await getDataList("mrt_stations");
        const MRT_NS_ROUTE = await getMrtRouteData("NS");
        const MRT_EW_ROUTE = await getMrtRouteData("EW");
        const MRT_DT_ROUTE = await getMrtRouteData("DT");
        const MRT_CC_ROUTE = await getMrtRouteData("CC");
        const MRT_CE_ROUTE = await getMrtRouteData("CE");
        const MRT_NE_ROUTE = await getMrtRouteData("NE");
        const MRT_CG_ROUTE = await getMrtRouteData("CG");

        // const LRT_BY_DISTRICT = await getDataListByDistrict("lrt_stations");
        const LRT_ALL = await getDataList("lrt_stations");
        const LRT_BP_ROUTE = await getLrtRouteData("BP");
        const LRT_PE_ROUTE = await getLrtRouteData("PE");
        const LRT_PW_ROUTE = await getLrtRouteData("PW");
        const LRT_SE_ROUTE = await getLrtRouteData("SE");
        const LRT_SW_ROUTE = await getLrtRouteData("SW");

        // const MAP_SINGAPORE_BUILDING_RAW =
        //   await getSingaporeBuildingListFromPublic();
        // const HDB_BY_DISTRICT = await getDataListByDistrict("postalCodeHDB");
        const HDB_ALL = await getDataList("postalCodeHDB");

        // const listBuildingByDistrict = await generateDistrictList();

        let result = {
          MAP_NATION_COORDINATE: MAP_NATION_COORDINATE,
          MAP_SINGAPORE_BOUNDARY: MAP_SINGAPORE_BOUNDARY,
          MAP_SINGAPORE_SUBZONE: MAP_SINGAPORE_SUBZONE,
          MAP_SINGAPORE_REGION: MAP_SINGAPORE_REGION,
          MAP_SINGAPORE_AREA: MAP_SINGAPORE_AREA,
          // MAP_SINGAPORE_SCHOOL_RAW: MAP_SINGAPORE_SCHOOL_RAW,
          // MAP_SINGAPORE_MRT_RAW: MAP_SINGAPORE_MRT_RAW,
          // SCHOOL_BY_DISTRICT: SCHOOL_BY_DISTRICT,
          SCHOOL_ALL: SCHOOL_ALL,

          RAIL_LINE_MRT: RAIL_LINE_MRT,
          RAIL_LINE_MRT_SORTED: [
            EW_MRT,
            CC_MRT,
            NS_MRT,
            DT_MRT,
            NE_MRT,
            CE_MRT,
            CG_MRT,
          ],

          RAIL_LINE_LRT: RAIL_LINE_LRT,

          // MRT_BY_DISTRICT: MRT_BY_DISTRICT,
          MRT_ALL: MRT_ALL,
          MRT_NS_ROUTE: MRT_NS_ROUTE,
          MRT_EW_ROUTE: MRT_EW_ROUTE,
          MRT_DT_ROUTE: MRT_DT_ROUTE,
          MRT_CC_ROUTE: MRT_CC_ROUTE,
          MRT_CE_ROUTE: MRT_CE_ROUTE,
          MRT_NE_ROUTE: MRT_NE_ROUTE,
          MRT_CG_ROUTE: MRT_CG_ROUTE,

          // LRT_BY_DISTRICT: LRT_BY_DISTRICT,
          LRT_ALL: LRT_ALL,
          LRT_BP_ROUTE: LRT_BP_ROUTE,
          LRT_PE_ROUTE: LRT_PE_ROUTE,
          LRT_PW_ROUTE: LRT_PW_ROUTE,
          LRT_SE_ROUTE: LRT_SE_ROUTE,
          LRT_SW_ROUTE: LRT_SW_ROUTE,

          // HDB_BY_DISTRICT: HDB_BY_DISTRICT,
          HDB_ALL: HDB_ALL,

          // MAP_SINGAPORE_BUILDING_RAW: MAP_SINGAPORE_BUILDING_RAW,
          // ...listBuildingByDistrict,
        };

        return result;
      };

      appStateDispatch({
        type: "toggleLoading",
        value: true,
      });

      getData().then((final) => {
        appStateDispatch({
          type: "loadMapData",
          data: final,
        });

        appStateDispatch({
          type: "toggleLoading",
          value: false,
        });
      });
    }
  }, [appState.mapData, appStateDispatch]);

  const onViewStateChangeFunc = useCallback(
    (args: DeckViewPort): ViewState => {
      appStateDispatch({
        type: "changeMapViewState",
        viewState: {
          ...args.viewState,
        },
      });

      return args.viewState;
    },
    [appStateDispatch]
  );

  const closeNotification = useCallback(() => {
    // const key = "PE";
    // const ew = getMRTLine(appState.mapData["LRT_ALL"], key);
    // console.log(
    //   ew.sort((a: any, b: any) => {
    //     return (
    //       Number(a.Station.replace(key, "")) -
    //       Number(b.Station.replace(key, ""))
    //     );
    //   })
    // );
  }, [appState.mapData]);

  // const uploadFile = useCallback(
  //   async (e: React.ChangeEvent<HTMLInputElement>) => {
  //     if (e.target.files && e.target.files.length > 0) {
  //       let fileReader = new FileReader();
  //       fileReader.onload = async (e: any) => {
  //         let result = await parseRaiLine(e.target.result);

  //         //Do something with result object here
  //         console.log(result);
  //       };

  //       fileReader.readAsText(e.target.files[0]);
  //     }
  //   },
  //   []
  // );

  const getTooltip = useCallback(({ object }: any): any => {
    // console.log(object);

    let result: any;

    if (object) {
      if (object.SUBZONE_N !== undefined) {
        result = `${object.SUBZONE_N}`;
      }

      if (object.SEARCHVAL !== undefined) {
        result = `${object.SEARCHVAL}`;
      }

      if (
        object.SEARCHVAL !== undefined &&
        object.ADDRESS !== undefined &&
        object.year_completed !== undefined
      ) {
        result = {
          html: `<h2>${object.SEARCHVAL}</h2><div><p>Address: ${object.ADDRESS}</p><p>Year completed : ${object.year_completed}</p></div>`,
          style: {
            maxWidth: "250px",
            fontSize: "0.75m",
          },
        };
      }

      if (
        object.Station !== undefined &&
        object["Station Name"] !== undefined &&
        object.ADDRESS !== undefined
      ) {
        result = {
          html: `<h2>${object.Station}</h2><div><p>Station name: ${object["Station Name"]}</p><p>Address: ${object.ADDRESS}</p></div>`,
          style: {
            textAlign: "left",
            maxWidth: "250px",
            fontSize: "0.75m",
          },
        };
      }

      if (object.LrtPathName !== undefined) {
        result = {
          html: `<h2>LRT line: ${object.LrtPathName}</h2>`,
          style: {
            textAlign: "left",
            maxWidth: "250px",
            fontSize: "0.75m",
          },
        };
      }

      if (object.MrtPathName !== undefined) {
        result = {
          html: `<h2>MRT line: ${object.MrtPathName}</h2>`,
          style: {
            textAlign: "left",
            maxWidth: "250px",
            fontSize: "0.75m",
          },
        };
      }
    } else {
      result = undefined;
    }

    return result;
  }, []);
  const [searchKey, setSearchKey] = useState<string>("map_school");

  const handleChangeSearchKey = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (e.target.value !== undefined && e.target.value !== searchKey) {
        setSearchKey(e.target.value);
      }
    },
    [searchKey]
  );

  const pinMarker = useCallback(
    (event: any) => {
      appStateDispatch({
        type: "changePinned",
        pinData: {
          isPinned: true,
          showOnlyRadius: false,
          data: event,
        },
      });

      const circleRadius =
        appState.homeMapViewState.selectedPinned.radius * 1000;
      const client = algoliasearch(
        "GDCB38XISD",
        "f170736b40f37641b3bbae2c402deab9"
      );
      const indexMrt = client.initIndex("map_mrt");
      const indexHdb = client.initIndex("map_hdb");
      const indexSchool = client.initIndex("map_school");
      const indexLrt = client.initIndex("map_lrt");

      const currentPin = String(
        event.coordinate[1] + "," + event.coordinate[0]
      );

      indexMrt
        .search("", {
          aroundLatLng: currentPin,
          aroundRadius: circleRadius, // 100km
        })
        .then(({ hits }) => {
          console.log(hits);
          appStateDispatch({
            type: "changeMapLayer",
            layerData: {
              layerName: "icon",
              selectedMRTList: hits,
            },
          });
        });
      indexHdb
        .search("", {
          aroundLatLng: currentPin,
          aroundRadius: circleRadius,
        })
        .then(({ hits }) => {
          console.log(hits);
          appStateDispatch({
            type: "changeMapLayer",
            layerData: {
              layerName: "icon",
              selectedHDBList: hits,
            },
          });
        });
      indexLrt
        .search("", {
          aroundLatLng: currentPin,
          aroundRadius: circleRadius,
        })
        .then(({ hits }) => {
          console.log(hits);
          appStateDispatch({
            type: "changeMapLayer",
            layerData: {
              layerName: "icon",
              selectedLrtList: hits,
            },
          });
        });
      indexSchool
        .search("", {
          aroundLatLng: currentPin,
          aroundRadius: circleRadius,
        })
        .then(({ hits }) => {
          console.log(hits);
          appStateDispatch({
            type: "changeMapLayer",
            layerData: {
              layerName: "icon",
              selectedSchoolList: hits,
            },
          });
        });
    },
    [appStateDispatch]
  );
  const removeMarker = useCallback(() => {
    if (appState.homeMapViewState.selectedPinned.isPinned) {
      appStateDispatch({
        type: "changePinned",
        pinData: {
          isPinned: false,
          data: undefined,
        },
      });
      appStateDispatch({
        type: "changeMapLayer",
        layerData: {
          layerName: "icon",
          selectedSchoolValue: "",
          selectedMRTValue: "",
          selectedLRTValue: "",
          selectedHDBType: "building",
          selectedHDBValue: "",
        },
      });
    }
  }, [appState.homeMapViewState.selectedPinned]);

  const handleTogglePopUp = useCallback(() => {
    appStateDispatch({
      type: "toggleActiveMrtMap",
      value: true
  });
  }, [appStateDispatch])

  return (
    <>
      <div className="column">
        <SelectMapControl />
        <InstantSearch searchClient={searchClient} indexName={searchKey}>
          <Configure hitsPerPage={6} />
          {/* <Hits<GeoHit>
            hitComponent={(hit) => (
              <SchoolComponent
                school={hit.hit}
                onClick={(school) => setCurrentSchool(school)}
                currentSchool={currentSchool}
                key={hit.hit.objectID}
              />
            )}
          /> */}
          <div className="column">
            <div className="columns">
              <MapFilterControl />
            </div>
            <div className="columns is-mobile">
              <div className="column pt-1">
                <label className="label is-size-7 ">Search by</label>
                <div className=" select is-rounded">
                  <select onChange={handleChangeSearchKey}>
                    <option value={"map_school"}>School</option>
                    <option value={"map_mrt"}>MRT</option>
                    <option value={"map_lrt"}>LRT</option>
                    <option value={"map_hdb"}>HDB</option>
                  </select>
                </div>
              </div>

              <div className="column is-narrow">
                <div className="button" onClick={handleTogglePopUp}>Search by MRT map</div>
              </div>

              <div className="column">
                {appState.homeMapViewState.selectedPinned.isPinned && (
                  <>
                    <div className="columns">
                      <SelectRadius />
                      <div className="column">
                        <button
                          className="button is-outlined is-rounded mt-3"
                          onClick={removeMarker}
                        >
                          Remove marker
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="column">
            <div className="columns">
              <div className="column is-3">
                <div
                  className="column p-0"
                  style={{
                    overflowY: "scroll",
                    height: "300px",
                  }}
                >
                  {searchKey === "map_school" && <ContentSchool />}
                  {searchKey === "map_mrt" && <ContentMrt />}
                  {searchKey === "map_lrt" && <ContentLrt />}
                  {searchKey === "map_hdb" && <ContentHdb />}
                </div>

                <SelectCoordinateControl />
                <button className="delete" onClick={closeNotification}></button>
                {/* <div className="file">
                  <label className="file-label">
                    <input
                      className="file-input"
                      type="file"
                      name="resume"
                      onChange={uploadFile}
                    />
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="fas fa-upload"></i>
                      </span>
                      <span className="file-label">Choose a file…</span>
                    </span>
                  </label>
                </div> */}

                {/* <div className="notification is-primary">
                <button className="delete" onClick={closeNotification}></button>
                Primar lorem ipsum dolor sit amet, consectetur adipiscing elit
                lorem ipsum dolor. <strong>Pellentesque risus mi</strong>,
                tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac
                ex sit amet fringilla. Nullam gravida purus diam, et dictum
                felis venenatis efficitur.
              </div> */}
              </div>
              <div className="column" style={mapContainerStyle}>
                <DeckGL
                  initialViewState={appState.homeMapViewState}
                  controller={true}
                  layers={appState.mapLayer}
                  ContextProvider={MapContext.Provider}
                  onViewStateChange={onViewStateChangeFunc}
                  getTooltip={getTooltip}
                  onClick={pinMarker}
                >
                  <ReactMapGL
                    {...appState.homeMapViewState}
                    mapboxApiAccessToken={process.env.REACT_APP_MAP_API_TOKEN}
                    mapStyle={MAP_STYLE[appState.mapStyle]}
                  />
                  <NavigationControl style={NAV_CONTROL_STYLE} />
                </DeckGL>
              </div>
            </div>
          </div>
          {appState.isActiveMrtMap && <MrtMAp />}
        </InstantSearch>
      </div>
    </>
  );
}
