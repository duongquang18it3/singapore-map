type mapStyleList = {
  [key: string]: string;
};

export type CapitalData = {
  CountryName: string;
  CapitalName: string;
  CapitalLatitude: string;
  CapitalLongitude: string;
  CountryCode: string;
  ContinentName: string;
};

export type BoundaryRawData = {
  type: string;
  properties: {
    Name: string;
    Description: string;
  };
  geometry: {
    type: string;
    coordinates: any[];
  };
};

export type BoundaryParseData = {
  SUBZONE_NO: string;
  SUBZONE_N: string;
  SUBZONE_C: string;
  CA_IND: string;
  PLN_AREA_N: string;
  PLN_AREA_C: string;
  REGION_N: string;
  REGION_C: string;
  INC_CRC: string;
  FMEL_UPD_D: string;
  keyName: string;
  coordinates: any[];
};

export type oneMapRawData = {
  SEARCHVAL: string;
  BLK_NO: string;
  ROAD_NAME: string;
  BUILDING: string;
  ADDRESS: string;
  POSTAL: string;
  X: string;
  Y: string;
  LATITUDE: string;
  LONGITUDE: string;
  LONGTITUDE: string;
};

export type oneMapRawDataWithDistrict = {
  SEARCHVAL: string;
  BLK_NO: string;
  ROAD_NAME: string;
  BUILDING: string;
  ADDRESS: string;
  POSTAL: string;
  X: string;
  Y: string;
  LATITUDE: string;
  LONGITUDE: string;
  LONGTITUDE: string;
  DISTRICT: string;
};

// type listRawDataWithDistrict = {
//   [key: string]: oneMapRawDataWithDistrict[];
// };

export const MAP_STYLE: mapStyleList = {
  street: "mapbox://styles/mapbox/streets-v11",
  outdoor: "mapbox://styles/mapbox/outdoors-v11",
  light: "mapbox://styles/mapbox/light-v10",
  dark: "mapbox://styles/mapbox/dark-v10",
  satellite: "mapbox://styles/mapbox/satellite-v9",
  satelliteStreet: "mapbox://styles/mapbox/satellite-streets-v11",
  navigationDay: "mapbox://styles/mapbox/navigation-day-v1",
  navigationNight: "mapbox://styles/mapbox/navigation-night-v1",
};

export const NAV_CONTROL_STYLE = {
  position: "absolute",
  top: 10,
  left: 10,
};
