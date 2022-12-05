import { BoundaryParseData, oneMapRawData } from "../Components/Map/MapData";
import { selectOptionProps } from "./parsing";

export const getListFromPublic = async (
  url: string
): Promise<selectOptionProps[]> => {
  let result: selectOptionProps[] = [];

  if (url !== "") {
    result = await fetch(`${url}`).then((response) => {
      return response.json().then((data) => {
        return data;
      });
    });
  }

  return result;
};

export const getBoundaryListFromPublic = async (): Promise<
  BoundaryParseData[]
> => {
  return (await getListFromPublic(`./json/singapore/boundaryInfo.json`)) as any;
};

export const getRailLineListFromPublic = async (): Promise<
BoundaryParseData[]
> => {
return (await getListFromPublic(`./json/singapore/rail-line.json`)) as any;
};

export const getSelectListFromPublic = async (
  type: string
): Promise<selectOptionProps[]> => {
  if (type !== "") {
    return (await getListFromPublic(
      `./json/singapore/singapore${type}.json`
    )) as any;
  } else {
    return [];
  }
};

export const getRawDataListFromPublic = async (
  type: string
): Promise<oneMapRawData[]> => {
  if (type !== "") {
    return (await getListFromPublic(
      `./json/singapore/raw/${type}Data-onemap.json`
    )) as any;
  } else {
    return [];
  }
};

export const getDataListByDistrict = async (
  type: string
): Promise<oneMapRawData[]> => {
  if (type !== "") {
    return (await getListFromPublic(
      `./json/singapore/dataByDistrict/${type}-group.json`
    )) as any;
  } else {
    return [];
  }
};

export const getDataList = async (
  type: string
): Promise<oneMapRawData[]> => {
  if (type !== "") {
    return (await getListFromPublic(
      `./json/singapore/dataByDistrict/${type}-district-add-coordinates-add-missing-field.json`
    )) as any;
  } else {
    return [];
  }
};

export const getRailData = async (
  type: string
): Promise<oneMapRawData[]> => {
  if (type !== "") {
    return (await getListFromPublic(
      `./json/singapore/railLineRoute/${type}.json`
    )) as any;
  } else {
    return [];
  }
};



export const getMrtRouteData = async (
  type: string
): Promise<oneMapRawData[]> => {
  if (type !== "") {
    return (await getListFromPublic(
      `./json/singapore/mrtRoute/${type}.json`
    )) as any;
  } else {
    return [];
  }
};

export const getLrtRouteData = async (
  type: string
): Promise<oneMapRawData[]> => {
  if (type !== "") {
    return (await getListFromPublic(
      `./json/singapore/lrtRoute/${type}.json`
    )) as any;
  } else {
    return [];
  }
};

export const getBuildingListByDistrictFromPublic = async (
  district: string
): Promise<oneMapRawData[]> => {
  if (district !== "") {
    return (await getListFromPublic(
      `./json/singapore/buildingByDistrict/${district}.json`
    )) as any;
  } else {
    return [];
  }
};

export const getCapitalListFromPublic = async (): Promise<oneMapRawData[]> => {
  return (await getListFromPublic(`./json/country-capitals.json`)) as any;
};

export const getBuildingListByDistrict = async (
  allData: { [key: string]: any[] },
  district: string
): Promise<oneMapRawData[]> => {
  if (allData[`BUILDING_BY_DISTRICT_${district}`] !== undefined) {
    return allData[`BUILDING_BY_DISTRICT_${district}`];
  } else {
    return (await getListFromPublic(
      `./json/singapore/buildingByDistrict/${district}.json`
    )) as any;
  }
};

export const generateDistrictList = async (): Promise<{
  [key: string]: any[];
}> => {
  let result: { [key: string]: any[] } = {};

  for (let index = 1; index <= 28; index++) {
    result[`BUILDING_BY_DISTRICT_${index < 10 ? "0" : ""}${index}`] =
      (await getListFromPublic(
        `./json/singapore/buildingByDistrict/${
          index < 10 ? "0" : ""
        }${index}.json`
      )) as any;
  }

  return result;
};

export const getSingaporeBuildingListFromPublic = async (): Promise<
  BoundaryParseData[]
> => {
  return (await getListFromPublic(`./json/singapore/raw/building.json`)) as any;
};

// generate list
export const getFullList = (fullData: any) => {
  let result: any = [];

  Object.values(fullData).forEach((element: any) => {
    result.push(...element);
  });

  return result;
};

export const getListByDistrict = (fullData: any, districtValue: string) => {
  return Object.values(fullData[districtValue]).map((element: any) => {
    return element;
  });
};

export const getListByDistrictFromFullData = (fullData: any[], districtValue: string) => {
  return fullData.filter((item: any) => item["DISTRICT"] === districtValue);
};

export const getListByRegionFromFullData = (fullData: any[], regionValue: string) => {
  return fullData.filter((item: any) => item["REGION_C"] === regionValue);
};

export const getListByAreaFromFullData = (fullData: any[], areaValue: string) => {
  return fullData.filter((item: any) => item["PLN_AREA_C"] === areaValue);
};

export const getListBySubZoneFromFullData = (fullData: any[], subZoneValue: string) => {
  return fullData.filter((item: any) => item["SUBZONE_C"] === subZoneValue);
};

export const generateImport = () => {
  let data = "";
  for (let index = 1; index <= 28; index++) {
    data =
      data +
      `import district${
        index <= 9 ? "0" : ""
      }${index} from "../json/singapore/buildingByDistrict/${
        index <= 9 ? "0" : ""
      }${index}.json";
        `;
  }

  // console.log(data);
};

export const getRegionByDistrict = (data: any[]) => {

  console.log(data.filter((item: any) => item["DISTRICT"] === "01"));
}
