import { BoundaryParseData, oneMapRawData } from "../Components/Map/MapData";
import {
  getListByAreaFromFullData,
  getListByDistrictFromFullData,
  getListByRegionFromFullData,
  getListBySubZoneFromFullData,
} from "./getData";

type selectListProps = {
  fullData: BoundaryParseData[];
  keyType: string;
};

type boundaryProps = {
  fullData: BoundaryParseData[];
  filter: {
    region: string;
    area: string;
    subZone: string;
  };
};

type props = {
  fullData: any;
  district: string;
  searchKey: string;
  dataValue: {
    value: string;
    list?: any[];
  };
  boundaryFilter: {
    region: string;
    area: string;
    subZone: string;
  };
};

export type selectOptionProps = {
  name: string;
  code: string;
};

export const getListFilteredByKey = (
  props: selectListProps
): selectOptionProps[] => {
  let tempName: string[] = [];
  props.fullData.forEach((item: any) => {
    tempName.push(item[props.keyType]);
  });

  let tempCode: string[] = [];
  props.fullData.forEach((item: any) => {
    tempCode.push(item[props.keyType.replaceAll("_N", "_C")]);
  });

  const nameList = tempName.filter((v, i, a) => a.indexOf(v) === i);
  const codeList = tempCode.filter((v, i, a) => a.indexOf(v) === i);

  let result: selectOptionProps[] = [];
  nameList.forEach((item, index) => {
    result.push({
      name: item,
      code: codeList[index],
    });
  });

  return result;
};

export const getFilteredBoundaryData = (props: boundaryProps) => {
  return props.fullData.filter((item: BoundaryParseData) => {
    const filterRegion = item.REGION_C === props.filter.region;
    const filterArea = item.PLN_AREA_C === props.filter.area;
    const filterSubZone = item.SUBZONE_C === props.filter.subZone;

    if (props.filter.region !== "") {
      if (props.filter.area !== "") {
        if (props.filter.subZone !== "") {
          return filterRegion && filterArea && filterSubZone;
        } else {
          return filterRegion && filterArea;
        }
      } else {
        if (props.filter.subZone !== "") {
          return filterRegion && filterSubZone;
        } else {
          return filterRegion;
        }
      }
    }

    if (props.filter.area !== "") {
      if (props.filter.subZone !== "") {
        return filterArea && filterSubZone;
      } else {
        return filterArea;
      }
    }

    if (props.filter.subZone !== "") {
      return filterSubZone;
    }

    return true;
  });
};

export const getFilteredHDBData = (propsData: props) => {
  let filteredData = propsData.fullData;
  // propsData.district === ""
  //   ? propsData.searchKey === ""
  //     ? propsData.fullData
  //     : propsData.fullData.filter(
  //         (item: oneMapRawData) =>
  //           item.ADDRESS.toLowerCase().indexOf(
  //             propsData.searchKey.toLowerCase()
  //           ) !== -1 ||
  //           item.BUILDING.toLowerCase().indexOf(
  //             propsData.searchKey.toLowerCase()
  //           ) !== -1 ||
  //           item.SEARCHVAL.toLowerCase().indexOf(
  //             propsData.searchKey.toLowerCase()
  //           ) !== -1
  //       )
  //   : propsData.dataValue === ""
  //   ? propsData.searchKey === ""
  //     ? getListByDistrictFromFullData(propsData.fullData, propsData.district)
  //     : getListByDistrictFromFullData(
  //         propsData.fullData,
  //         propsData.district
  //       ).filter(
  //         (item: oneMapRawData) =>
  //           item.ADDRESS.toLowerCase().indexOf(
  //             propsData.searchKey.toLowerCase()
  //           ) !== -1 ||
  //           item.BUILDING.toLowerCase().indexOf(
  //             propsData.searchKey.toLowerCase()
  //           ) !== -1 ||
  //           item.SEARCHVAL.toLowerCase().indexOf(
  //             propsData.searchKey.toLowerCase()
  //           ) !== -1
  //       )
  //   : getListByDistrictFromFullData(
  //       propsData.fullData,
  //       propsData.district
  //     ).filter(
  //       (item: oneMapRawData) =>
  //         `${item.SEARCHVAL} - ${item.ADDRESS}` === propsData.dataValue
  //     );

  if (
    propsData.dataValue.list !== undefined &&
    propsData.dataValue.list.length >= 0
  ) {
    filteredData = propsData.dataValue.list;
  } else {
    if (propsData.searchKey !== "") {
      filteredData = filteredData.filter(
        (item: oneMapRawData) =>
          item.SEARCHVAL.toLowerCase().indexOf(
            propsData.searchKey.toLowerCase()
          ) !== -1
      );
    }

    if (propsData.district !== "") {
      filteredData = getListByDistrictFromFullData(
        propsData.fullData,
        propsData.district
      );
    }

    if (propsData.dataValue.value !== "") {
      filteredData = filteredData.filter(
        (item: oneMapRawData) => `${item.SEARCHVAL} - ${item.ADDRESS}` === propsData.dataValue.value
      );
    }

    if (propsData.boundaryFilter.region !== "") {
      filteredData = getListByRegionFromFullData(
        filteredData,
        propsData.boundaryFilter.region
      );
    }

    if (propsData.boundaryFilter.area !== "") {
      filteredData = getListByAreaFromFullData(
        filteredData,
        propsData.boundaryFilter.area
      );
    }

    if (propsData.boundaryFilter.subZone !== "") {
      filteredData = getListBySubZoneFromFullData(
        filteredData,
        propsData.boundaryFilter.subZone
      );
    }
  }

  return filteredData;
};

export const getFilteredData = (propsData: props) => {
  let filteredData = propsData.fullData;
  // propsData.district === ""
  //   ? propsData.searchKey === ""
  //     ? propsData.fullData
  //     : propsData.fullData.filter(
  //         (item: oneMapRawData) =>
  //           item.SEARCHVAL.toLowerCase().indexOf(
  //             propsData.searchKey.toLowerCase()
  //           ) !== -1
  //       )
  //   : propsData.dataValue === ""
  //   ? propsData.searchKey === ""
  //     ? getListByDistrictFromFullData(propsData.fullData, propsData.district)
  //     : getListByDistrictFromFullData(
  //         propsData.fullData,
  //         propsData.district
  //       ).filter(
  //         (item: oneMapRawData) =>
  //           item.SEARCHVAL.toLowerCase().indexOf(
  //             propsData.searchKey.toLowerCase()
  //           ) !== -1
  //       )
  //   : getListByDistrictFromFullData(
  //       propsData.fullData,
  //       propsData.district
  //     ).filter(
  //       (item: oneMapRawData) => item.SEARCHVAL === propsData.dataValue
  //     );

  if (
    propsData.dataValue.list !== undefined &&
    propsData.dataValue.list.length >= 0
  ) {
    filteredData = propsData.dataValue.list;
  } else {
    if (propsData.searchKey !== "") {
      filteredData = filteredData.filter(
        (item: oneMapRawData) =>
          item.SEARCHVAL.toLowerCase().indexOf(
            propsData.searchKey.toLowerCase()
          ) !== -1
      );
    }

    if (propsData.district !== "") {
      filteredData = getListByDistrictFromFullData(
        propsData.fullData,
        propsData.district
      );
    }

    if (propsData.dataValue.value !== "") {
      filteredData = filteredData.filter(
        (item: oneMapRawData) => item.SEARCHVAL === propsData.dataValue.value
      );
    }

    if (propsData.boundaryFilter.region !== "") {
      filteredData = getListByRegionFromFullData(
        filteredData,
        propsData.boundaryFilter.region
      );
    }

    if (propsData.boundaryFilter.area !== "") {
      filteredData = getListByAreaFromFullData(
        filteredData,
        propsData.boundaryFilter.area
      );
    }

    if (propsData.boundaryFilter.subZone !== "") {
      filteredData = getListBySubZoneFromFullData(
        filteredData,
        propsData.boundaryFilter.subZone
      );
    }
  }

  return filteredData;
};
