import { MAP_STYLE } from "../Map/MapData";
import { getBuildingIconLayer } from "../Map/mapLayers/buildingIconLayer";
import { getLrtIconLayer } from "../Map/mapLayers/lrtIconLayer";
import { getMrtIconLayer } from "../Map/mapLayers/mrtIconLayer";
import { getPolygonLayer } from "../Map/mapLayers/polygonLayer";
import { getSchoolIconLayer } from "../Map/mapLayers/schoolIconLayer";
import { AppState, AppStateInitParams } from "./AppContext";

export function initAppState(initParams?: AppStateInitParams): AppState {
  const isLoading = initParams?.isLoading ?? false;
  const isActiveBurger = initParams?.isActiveBurger ?? false;
  const isActiveMrtMap = initParams?.isActiveMrtMap ?? false;
  const homeMapViewPort = initParams?.homeMapViewPort ?? {
    // latitude: 14.0583,
    // longitude: 108.2772,
    latitude: 1.35,
    longitude: 103.82,
    zoom: 10,
    bearing: 0,
    pitch: 0,
    searchKey: {
      value: "",
    },
    searchQuery: {
      query: '',
      searchByMrt: false,
    },
    selectedSingaporeBoundary: {
      region: "",
      area: "",
      subZone: "",
    },
    selectedSingaporeDistrict: {
      value: "",
    },
    selectedSingaporeHDB: {
      value: "",
      list: undefined,
    },
    selectedSingaporeSchool: {
      value: "",
      list: undefined,
    },
    selectedSingaporeMrt: {
      value: "",
      list: undefined,
    },
    selectedSingaporeLrt: {
      value: "",
      list: undefined,
    },
    selectedPinned: {
      isPinned: false,
      showRadiusOnly: false,
      radius: 1,
      lat: undefined,
      lng: undefined,
    }
  };
  const mapStyle =
    (initParams?.mapStyle && MAP_STYLE[initParams?.mapStyle]) ?? "street";

  const mapIconLayerVisibility = initParams?.mapIconLayerVisibility ?? [
    "all", // all
    "", // hdb
    "", // school
    "", // mrt
    "", // lrt
    "", // mrt path
    "", // lrt path
    "", // boundaries
  ];

  const mapLayer = initParams?.mapLayer ?? [
    // getIconLayer(
    //   "Nation_Capital",
    //   MAP_NATION_COORDINATE,
    //   mapIconLayerVisibility.indexOf("all") !== -1 ||
    //     mapIconLayerVisibility.indexOf("capital") !== -1
    // ),
    getPolygonLayer("Singapore_Boundaries", [], true),

    getBuildingIconLayer(
      "Singapore_HDB",
      [],
      mapIconLayerVisibility.indexOf("all") !== -1 ||
        mapIconLayerVisibility.indexOf("hdb") !== -1
    ),
    getSchoolIconLayer(
      "Singapore_School",
      [],
      mapIconLayerVisibility.indexOf("all") !== -1 ||
        mapIconLayerVisibility.indexOf("school") !== -1
    ),
    getMrtIconLayer(
      "Singapore_MRT",
      [],
      mapIconLayerVisibility.indexOf("all") !== -1 ||
        mapIconLayerVisibility.indexOf("mrt") !== -1
    ),
    getLrtIconLayer(
      "Singapore_LRT",
      [],
      mapIconLayerVisibility.indexOf("all") !== -1 ||
        mapIconLayerVisibility.indexOf("lrt") !== -1
    ),
  ];

  const mapData = initParams?.mapData ?? {};

  return {
    isLoading,
    isActiveBurger,
    isActiveMrtMap,
    homeMapViewState: homeMapViewPort,
    mapStyle,
    mapLayer,
    mapIconLayerVisibility,
    mapData,
  };
}
