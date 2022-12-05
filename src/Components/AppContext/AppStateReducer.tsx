import {
  getFilteredBoundaryData,
  getFilteredData,
  getFilteredHDBData,
} from "../../utils/filterData";
import { SearchState, ViewState } from "../Map/Map";
import { MAP_STYLE } from "../Map/MapData";
import { getBuildingIconLayer } from "../Map/mapLayers/buildingIconLayer";
import { getLrtIconLayer } from "../Map/mapLayers/lrtIconLayer";
import { getMrtIconLayer } from "../Map/mapLayers/mrtIconLayer";
import { getPinIconLayer } from "../Map/mapLayers/pinIconLayer";
import { getPinScatterplotLayer } from "../Map/mapLayers/pinScatterplotLayer";
import { getPolygonLayer } from "../Map/mapLayers/polygonLayer";
import { getRailLinePathLayer } from "../Map/mapLayers/railLinePathLayer";
import { getSchoolIconLayer } from "../Map/mapLayers/schoolIconLayer";
import { AppState } from "./AppContext";

export type AppStateDispatch = (action: AppStateAction) => void;
export type AppStateAction =
  | { type: "toggleLoading"; value?: boolean }
  | { type: "toggleActiveBurger"; value?: boolean }
  | { type: "toggleActiveMrtMap"; value?: boolean }
  | { type: "loadMapData"; data: any }
  | { type: "changeSearchKey"; searchKey: string }
  | { type: "changeSearchQuery"; searchQuery: SearchState }
  | { type: "changeMapViewState"; viewState: ViewState }
  | { type: "selectMapStyle"; mapStyle: string }
  | { type: "changeMapLayer"; layerData: any }
  | { type: "changePinned"; pinData: any };

export function appStateReducer(
  state: AppState,
  action: AppStateAction
): AppState {
  switch (action.type) {
    case "toggleLoading":
      return toggleLoading(state, action.value);
    case "toggleActiveBurger":
      return toggleActiveBurger(state, action.value);
    case "toggleActiveMrtMap":
      return toggleActiveMrtMap(state, action.value);
    case "loadMapData":
      return loadMapData(state, action.data);
    case "changeSearchKey":
      return changeSearchKey(state, action.searchKey);
    case "changeSearchQuery":
      return changeSearchQuery(state, action.searchQuery);
    case "changeMapViewState":
      return changeMapViewState(state, action.viewState);
    case "selectMapStyle":
      return selectMapStyle(state, action.mapStyle);
    case "changeMapLayer":
      return changeMapLayer(state, action.layerData);
    case "changePinned":
      return changePinned(state, action.pinData);
    default:
      console.error("invalid action");
      return state;
  }
}

const toggleLoading = (state: AppState, value?: boolean): AppState => {
  const result = { ...state };

  if (value === undefined) {
    result.isLoading = !result.isLoading;
  } else {
    result.isLoading = value;
  }

  return result;
};

const toggleActiveBurger = (state: AppState, value?: boolean): AppState => {
  const result = { ...state };

  if (value === undefined) {
    result.isActiveBurger = !result.isActiveBurger;
  } else {
    result.isActiveBurger = value;
  }

  return result;
};

const toggleActiveMrtMap = (state: AppState, value?: boolean): AppState => {
  const result = { ...state };

  if (value === undefined) {
    result.isActiveMrtMap = !result.isActiveMrtMap;
  } else {
    result.isActiveMrtMap = value;
  }

  return result;
};

const loadMapData = (state: AppState, data: any): AppState => {
  const result = { ...state };

  result.mapData = data;

  result.mapLayer = [
    // getIconLayer(
    //   "Nation_Capital",
    //   result.mapData["MAP_NATION_COORDINATE"],
    //   mapIconLayerVisibility.indexOf("all") !== -1 ||
    //     mapIconLayerVisibility.indexOf("capital") !== -1
    // ),
    getPolygonLayer(
      "Singapore_Boundaries",
      result.mapData["MAP_SINGAPORE_BOUNDARY"],
      result.mapIconLayerVisibility.indexOf("all") !== -1 ||
        result.mapIconLayerVisibility.indexOf("boundary") !== -1
    ),
    getRailLinePathLayer(
      "Singapore_Rail_line_MRT",
      result.mapData["RAIL_LINE_MRT"],
      result.mapData["RAIL_LINE_MRT_SORTED"],
      result.mapIconLayerVisibility.indexOf("all") !== -1 ||
        result.mapIconLayerVisibility.indexOf("mrt_line") !== -1
    ),
    getRailLinePathLayer(
      "Singapore_Rail_line_LRT",
      result.mapData["RAIL_LINE_LRT"],
      [],
      result.mapIconLayerVisibility.indexOf("all") !== -1 ||
        result.mapIconLayerVisibility.indexOf("lrt_line") !== -1
    ),
    // getMrtPathLayer(
    //   "MRT_Path",
    //   [
    //     result.mapData["MRT_NS_ROUTE"],
    //     result.mapData["MRT_EW_ROUTE"],
    //     result.mapData["MRT_DT_ROUTE"],
    //     result.mapData["MRT_CC_ROUTE"],
    //     result.mapData["MRT_CE_ROUTE"],
    //     result.mapData["MRT_NE_ROUTE"],
    //     result.mapData["MRT_CG_ROUTE"],
    //   ],
    //   result.mapIconLayerVisibility.indexOf("all") !== -1 ||
    //     result.mapIconLayerVisibility.indexOf("mrt_line") !== -1
    // ),
    // getLrtPathLayer(
    //   "LRT_Path",
    //   [
    //     result.mapData["LRT_BP_ROUTE"],
    //     result.mapData["LRT_PW_ROUTE"],
    //     result.mapData["LRT_PE_ROUTE"],
    //     result.mapData["LRT_SE_ROUTE"],
    //     result.mapData["LRT_SW_ROUTE"],
    //   ],
    //   result.mapIconLayerVisibility.indexOf("all") !== -1 ||
    //     result.mapIconLayerVisibility.indexOf("lrt_line") !== -1
    // ),
    getBuildingIconLayer(
      "Singapore_HDB",
      getFilteredHDBData({
        fullData: result.mapData["HDB_ALL"],
        district: result.homeMapViewState.selectedSingaporeDistrict.value,
        searchKey: result.homeMapViewState.searchKey.value,
        dataValue: result.homeMapViewState.selectedSingaporeHDB,
        boundaryFilter: result.homeMapViewState.selectedSingaporeBoundary,
      }),
      result.mapIconLayerVisibility.indexOf("all") !== -1 ||
        result.mapIconLayerVisibility.indexOf("hdb") !== -1
    ),
    getSchoolIconLayer(
      "Singapore_School",
      getFilteredData({
        fullData: result.mapData["SCHOOL_ALL"],
        district: result.homeMapViewState.selectedSingaporeDistrict.value,
        searchKey: result.homeMapViewState.searchKey.value,
        dataValue: result.homeMapViewState.selectedSingaporeSchool,
        boundaryFilter: result.homeMapViewState.selectedSingaporeBoundary,
      }),
      result.mapIconLayerVisibility.indexOf("all") !== -1 ||
        result.mapIconLayerVisibility.indexOf("school") !== -1
    ),

    getMrtIconLayer(
      "Singapore_MRT",
      getFilteredData({
        fullData: result.mapData["MRT_ALL"],
        district: result.homeMapViewState.selectedSingaporeDistrict.value,
        searchKey: result.homeMapViewState.searchKey.value,
        dataValue: result.homeMapViewState.selectedSingaporeMrt,
        boundaryFilter: result.homeMapViewState.selectedSingaporeBoundary,
      }),
      result.mapIconLayerVisibility.indexOf("all") !== -1 ||
        result.mapIconLayerVisibility.indexOf("mrt") !== -1
    ),

    getLrtIconLayer(
      "Singapore_LRT",
      getFilteredData({
        fullData: result.mapData["LRT_ALL"],
        district: result.homeMapViewState.selectedSingaporeDistrict.value,
        searchKey: result.homeMapViewState.searchKey.value,
        dataValue: result.homeMapViewState.selectedSingaporeLrt,
        boundaryFilter: result.homeMapViewState.selectedSingaporeBoundary,
      }),
      result.mapIconLayerVisibility.indexOf("all") !== -1 ||
        result.mapIconLayerVisibility.indexOf("lrt") !== -1
    ),
  ];

  return result;
};

const changeSearchKey = (state: AppState, searchKey: string): AppState => {
  let result = { ...state };

  result.homeMapViewState.searchKey.value = searchKey;

  result = changeMapLayer(result, undefined);

  return result;
};

const changeSearchQuery = (state: AppState, searchQuery: SearchState): AppState => {
  let result = { ...state };

  result.homeMapViewState.searchQuery = searchQuery;

  result = changeMapLayer(result, undefined);

  return result;
};

const changeMapViewState = (
  state: AppState,
  viewState: ViewState
): AppState => {
  const result = { ...state };

  result.homeMapViewState = viewState;

  if (viewState.searchKey === undefined) {
    result.homeMapViewState.searchKey = state.homeMapViewState.searchKey;
  }

  if (viewState.searchQuery === undefined) {
    result.homeMapViewState.searchQuery = state.homeMapViewState.searchQuery;
  }

  if (viewState.selectedSingaporeDistrict === undefined) {
    result.homeMapViewState.selectedSingaporeDistrict =
      state.homeMapViewState.selectedSingaporeDistrict;
  }

  if (viewState.selectedSingaporeBoundary === undefined) {
    result.homeMapViewState.selectedSingaporeBoundary =
      state.homeMapViewState.selectedSingaporeBoundary;
  }

  if (viewState.selectedSingaporeHDB === undefined) {
    result.homeMapViewState.selectedSingaporeHDB =
      state.homeMapViewState.selectedSingaporeHDB;
  }

  if (viewState.selectedSingaporeSchool === undefined) {
    result.homeMapViewState.selectedSingaporeSchool =
      state.homeMapViewState.selectedSingaporeSchool;
  }

  if (viewState.selectedSingaporeMrt === undefined) {
    result.homeMapViewState.selectedSingaporeMrt =
      state.homeMapViewState.selectedSingaporeMrt;
  }

  if (viewState.selectedSingaporeLrt === undefined) {
    result.homeMapViewState.selectedSingaporeLrt =
      state.homeMapViewState.selectedSingaporeLrt;
  }

  if (viewState.selectedPinned === undefined) {
    result.homeMapViewState.selectedPinned =
      state.homeMapViewState.selectedPinned;
  }

  return result;
};

const selectMapStyle = (state: AppState, mapStyle: string): AppState => {
  const result = { ...state };

  if (MAP_STYLE[mapStyle]) {
    result.mapStyle = mapStyle;
  }

  return result;
};

const changeMapLayer = (state: AppState, layerData: any): AppState => {
  const result = { ...state };

  if (layerData !== undefined && layerData.layerName !== undefined) {
    if (layerData.layerName === "polygon") {
      if (layerData.selectedBoundaryType === "REGION_C") {
        result.homeMapViewState.selectedSingaporeBoundary = {
          region: layerData.selectedBoundaryValue,
          area: "",
          subZone: "",
        };
      } else if (layerData.selectedBoundaryType === "PLN_AREA_C") {
        result.homeMapViewState.selectedSingaporeBoundary.area =
          layerData.selectedBoundaryValue;
        result.homeMapViewState.selectedSingaporeBoundary.subZone = "";
      } else if (layerData.selectedBoundaryType === "SUBZONE_C") {
        result.homeMapViewState.selectedSingaporeBoundary.subZone =
          layerData.selectedBoundaryValue;
      }
    } else if (layerData.layerName === "icon") {
      if (layerData.listVisibility !== undefined) {
        result.mapIconLayerVisibility = layerData.listVisibility;
      }

      if (
        layerData.selectedHDBType !== undefined &&
        layerData.selectedHDBValue !== undefined
      ) {
        if (
          result.mapIconLayerVisibility.indexOf("all") === -1 &&
          result.mapIconLayerVisibility.indexOf("hdb") === -1
        ) {
          result.mapIconLayerVisibility = [
            "all",
            "hdb",
            "school",
            "mrt",
            "lrt",
            "mrt_line",
          ];
        }

        if (layerData.selectedHDBType === "district") {
          result.homeMapViewState.selectedSingaporeDistrict.value =
            layerData.selectedHDBValue;
        } else if (layerData.selectedHDBType === "building") {
          result.homeMapViewState.selectedSingaporeHDB = {
            value: layerData.selectedHDBValue,
            list: undefined,
          };
        }
      }

      if (layerData.listVisibility !== undefined) {
        result.mapIconLayerVisibility = layerData.listVisibility;
      }

      if (layerData.selectedSchoolValue !== undefined) {
        if (
          result.mapIconLayerVisibility.indexOf("all") === -1 &&
          result.mapIconLayerVisibility.indexOf("school") === -1
        ) {
          result.mapIconLayerVisibility[2] = "school";
        }

        result.homeMapViewState.selectedSingaporeSchool = {
          value: layerData.selectedSchoolValue,
          list: undefined,
        };
      }

      if (layerData.selectedMRTValue !== undefined) {
        if (
          result.mapIconLayerVisibility.indexOf("all") === -1 &&
          result.mapIconLayerVisibility.indexOf("mrt") === -1
        ) {
          result.mapIconLayerVisibility[3] = "mrt";
        }

        result.homeMapViewState.selectedSingaporeMrt = {
          value: layerData.selectedMRTValue,
          list: undefined,
        };
      }

      if (layerData.selectedLRTValue !== undefined) {
        if (
          result.mapIconLayerVisibility.indexOf("all") === -1 &&
          result.mapIconLayerVisibility.indexOf("lrt") === -1
        ) {
          result.mapIconLayerVisibility[4] = "lrt";
        }

        result.homeMapViewState.selectedSingaporeLrt = {
          value: layerData.selectedLRTValue,
          list: undefined,
        };
      }

      if (layerData.selectedMRTList !== undefined) {
        if (
          result.mapIconLayerVisibility.indexOf("all") === -1 &&
          result.mapIconLayerVisibility.indexOf("mrt") === -1
        ) {
          result.mapIconLayerVisibility[3] = "mrt";
        }
        result.homeMapViewState.selectedSingaporeMrt = {
          value: "",
          list: layerData.selectedMRTList,
        };
      }
      if (layerData.selectedHDBList !== undefined) {
        if (
          result.mapIconLayerVisibility.indexOf("all") === -1 &&
          result.mapIconLayerVisibility.indexOf("hdb") === -1
        ) {
          result.mapIconLayerVisibility[1] = "hdb";
        }
        result.homeMapViewState.selectedSingaporeHDB = {
          value: "",
          list: layerData.selectedHDBList,
        };
      }
      if (layerData.selectedSchoolList !== undefined) {
        if (
          result.mapIconLayerVisibility.indexOf("all") === -1 &&
          result.mapIconLayerVisibility.indexOf("school") === -1
        ) {
          result.mapIconLayerVisibility[2] = "school";
        }
        result.homeMapViewState.selectedSingaporeSchool = {
          value: "",
          list: layerData.selectedSchoolList,
        };
      }
      if (layerData.selectedLrtList !== undefined) {
        if (
          result.mapIconLayerVisibility.indexOf("all") === -1 &&
          result.mapIconLayerVisibility.indexOf("lrt") === -1
        ) {
          result.mapIconLayerVisibility[4] = "lrt";
        }
        result.homeMapViewState.selectedSingaporeLrt = {
          value: "",
          list: layerData.selectedLrtList,
        };
      }
    }
  }

  const filteredBoundaryData = getFilteredBoundaryData({
    fullData: result.mapData["MAP_SINGAPORE_BOUNDARY"],
    filter: result.homeMapViewState.selectedSingaporeBoundary,
  });

  const filteredHDBData = getFilteredHDBData({
    fullData: result.mapData["HDB_ALL"],
    district: result.homeMapViewState.selectedSingaporeDistrict.value,
    searchKey: result.homeMapViewState.searchKey.value,
    dataValue: result.homeMapViewState.selectedSingaporeHDB,
    boundaryFilter: result.homeMapViewState.selectedSingaporeBoundary,
  });

  const filteredSchoolData = getFilteredData({
    fullData: result.mapData["SCHOOL_ALL"],
    district: result.homeMapViewState.selectedSingaporeDistrict.value,
    searchKey: result.homeMapViewState.searchKey.value,
    dataValue: result.homeMapViewState.selectedSingaporeSchool,
    boundaryFilter: result.homeMapViewState.selectedSingaporeBoundary,
  });

  const filteredMrtData = getFilteredData({
    fullData: result.mapData["MRT_ALL"],
    district: result.homeMapViewState.selectedSingaporeDistrict.value,
    searchKey: result.homeMapViewState.searchKey.value,
    dataValue: result.homeMapViewState.selectedSingaporeMrt,
    boundaryFilter: result.homeMapViewState.selectedSingaporeBoundary,
  });

  const filteredLrtData = getFilteredData({
    fullData: result.mapData["LRT_ALL"],
    district: result.homeMapViewState.selectedSingaporeDistrict.value,
    searchKey: result.homeMapViewState.searchKey.value,
    dataValue: result.homeMapViewState.selectedSingaporeLrt,
    boundaryFilter: result.homeMapViewState.selectedSingaporeBoundary,
  });

  result.mapLayer = [
    // getIconLayer(
    //   "Nation_Capital",
    //   MAP_NATION_COORDINATE,
    //   result.mapIconLayerVisibility.indexOf("all") !== -1 ||
    //     result.mapIconLayerVisibility.indexOf("capital") !== -1
    // ),

    getPolygonLayer(
      "Singapore_Boundaries",
      filteredBoundaryData,
      result.mapIconLayerVisibility.indexOf("all") !== -1 ||
        result.mapIconLayerVisibility.indexOf("boundary") !== -1
    ),
    getPinScatterplotLayer(
      "Pinned",
      [
        {
          LONGTITUDE: result.homeMapViewState.selectedPinned.lng,
          LATITUDE: result.homeMapViewState.selectedPinned.lat,
        },
      ],
      result.homeMapViewState.selectedPinned.radius,
      result.homeMapViewState.selectedPinned.isPinned
    ),
    getRailLinePathLayer(
      "Singapore_Rail_line_MRT",
      result.mapData["RAIL_LINE_MRT"],
      result.mapData["RAIL_LINE_MRT_SORTED"],
      result.mapIconLayerVisibility.indexOf("all") !== -1 ||
        result.mapIconLayerVisibility.indexOf("mrt_line") !== -1
    ),
    getRailLinePathLayer(
      "Singapore_Rail_line_LRT",
      result.mapData["RAIL_LINE_LRT"],
      [],
      result.mapIconLayerVisibility.indexOf("all") !== -1 ||
        result.mapIconLayerVisibility.indexOf("lrt_line") !== -1
    ),
    // getMrtPathLayer(
    //   "MRT_Path",
    //   [
    //     result.mapData["MRT_NS_ROUTE"],
    //     result.mapData["MRT_EW_ROUTE"],
    //     result.mapData["MRT_DT_ROUTE"],
    //     result.mapData["MRT_CC_ROUTE"],
    //     result.mapData["MRT_CE_ROUTE"],
    //     result.mapData["MRT_NE_ROUTE"],
    //     result.mapData["MRT_CG_ROUTE"],
    //   ],
    //   result.mapIconLayerVisibility.indexOf("all") !== -1 ||
    //     result.mapIconLayerVisibility.indexOf("mrt_line") !== -1
    // ),
    // getLrtPathLayer(
    //   "LRT_Path",
    //   [
    //     result.mapData["LRT_BP_ROUTE"],
    //     result.mapData["LRT_PW_ROUTE"],
    //     result.mapData["LRT_PE_ROUTE"],
    //     result.mapData["LRT_SE_ROUTE"],
    //     result.mapData["LRT_SW_ROUTE"],
    //   ],
    //   result.mapIconLayerVisibility.indexOf("all") !== -1 ||
    //     result.mapIconLayerVisibility.indexOf("lrt_line") !== -1
    // ),
    getBuildingIconLayer(
      "Singapore_HDB",
      filteredHDBData,
      result.mapIconLayerVisibility.indexOf("all") !== -1 ||
        result.mapIconLayerVisibility.indexOf("hdb") !== -1
    ),
    getSchoolIconLayer(
      "Singapore_School",
      filteredSchoolData,
      result.mapIconLayerVisibility.indexOf("all") !== -1 ||
        result.mapIconLayerVisibility.indexOf("school") !== -1
    ),

    getMrtIconLayer(
      "Singapore_MRT",
      filteredMrtData,
      result.mapIconLayerVisibility.indexOf("all") !== -1 ||
        result.mapIconLayerVisibility.indexOf("mrt") !== -1
    ),

    getLrtIconLayer(
      "Singapore_LRT",
      filteredLrtData,
      result.mapIconLayerVisibility.indexOf("all") !== -1 ||
        result.mapIconLayerVisibility.indexOf("lrt") !== -1
    ),
    getPinIconLayer(
      "Pinned",
      [
        {
          LONGTITUDE: result.homeMapViewState.selectedPinned.lng,
          LATITUDE: result.homeMapViewState.selectedPinned.lat,
        },
      ],
      result.homeMapViewState.selectedPinned.isPinned &&
        !result.homeMapViewState.selectedPinned.showRadiusOnly
    ),
  ];

  return result;
};

const changePinned = (state: AppState, pinData: any): AppState => {
  let result = { ...state };

  if (pinData.isPinned !== undefined) {
    result.homeMapViewState.selectedPinned.isPinned = pinData.isPinned;
  }

  if (pinData.showOnlyRadius !== undefined) {
    if (pinData.showOnlyRadius) {
      result.homeMapViewState.selectedPinned.isPinned = true;
    }

    result.homeMapViewState.selectedPinned.showRadiusOnly =
      pinData.showOnlyRadius;
  }

  if (pinData.data !== undefined) {
    result.homeMapViewState.selectedPinned.lng = pinData.data.coordinate[0];
    result.homeMapViewState.selectedPinned.lat = pinData.data.coordinate[1];
  } else {
    result.homeMapViewState.selectedPinned.lng = undefined;
    result.homeMapViewState.selectedPinned.lat = undefined;
  }

  if (pinData.data !== undefined && pinData.data.radius !== undefined) {
    result.homeMapViewState.selectedPinned.radius = pinData.data.radius;
  }

  const pinnedLayerIndex = result.mapLayer.findIndex(
    (item: any) => item.id === "IconLayer_Pinned"
  );
  if (pinnedLayerIndex === -1) {
  } else {
    result.mapLayer.splice(pinnedLayerIndex, 1);
  }

  const pinnedRadiusLayerIndex = result.mapLayer.findIndex(
    (item: any) => item.id === "ScatterplotLayer_Pinned"
  );
  if (pinnedRadiusLayerIndex === -1) {
  } else {
    result.mapLayer.splice(pinnedRadiusLayerIndex, 1);
  }

  // add above boundary and bellow all icon
  result.mapLayer.splice(
    1,
    0,
    getPinScatterplotLayer(
      "Pinned",
      [
        {
          LONGTITUDE: result.homeMapViewState.selectedPinned.lng,
          LATITUDE: result.homeMapViewState.selectedPinned.lat,
        },
      ],
      result.homeMapViewState.selectedPinned.radius,
      result.homeMapViewState.selectedPinned.isPinned
    )
  );

  result.mapLayer = [
    ...result.mapLayer,
    getPinIconLayer(
      "Pinned",
      [
        {
          LONGTITUDE: result.homeMapViewState.selectedPinned.lng,
          LATITUDE: result.homeMapViewState.selectedPinned.lat,
        },
      ],
      result.homeMapViewState.selectedPinned.isPinned &&
        !result.homeMapViewState.selectedPinned.showRadiusOnly
    ),
  ];

  return result;
};
