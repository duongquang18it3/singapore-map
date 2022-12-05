import { apiService } from "../services/apiService";
// import buildingByDistrict from "../json/singapore/raw/buildings-district-group.json";

export const crawlPaginationSchoolData = async () => {
  let fullData = [];
  for (let pageNum = 1; pageNum <= 22; pageNum++) {
    const data: any = await apiService({
      base: "https://developers.onemap.sg/commonapi/search?searchVal=primary%20school&returnGeom=Y&getAddrDetails=Y&pageNum=",
      url: `${pageNum}`,
    });

    console.log(data);
    fullData.push(...data.results);
  }

  console.log(fullData);

  return fullData;
};

export const crawlPaginationMRTData = async () => {
  let fullData = [];
  for (let pageNum = 1; pageNum <= 91; pageNum++) {
    const data: any = await apiService({
      base: "https://developers.onemap.sg/commonapi/search?searchVal=MRT&returnGeom=Y&getAddrDetails=Y&pageNum=",
      url: `${pageNum}`,
    });

    console.log(data);
    fullData.push(...data.results);
  }

  console.log(fullData);

  return fullData;
};

export const crawlPaginationLRTData = async () => {
  let fullData = [];
  for (let pageNum = 1; pageNum <= 1; pageNum++) {
    const data: any = await apiService({
      base: "https://developers.onemap.sg/commonapi/search?searchVal=LRT&returnGeom=Y&getAddrDetails=Y&pageNum=",
      url: `${pageNum}`,
    });

    console.log(data);
    fullData.push(...data.results);
  }

  console.log(fullData);

  return fullData;
};

export const saveBuildingJson = async () => {
  let fullData: any[] = [];
  for (let pageNum = 1; pageNum <= 1; pageNum++) {
    const data: any = await apiService({
      base: "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/71d1adba-3492-4126-a86d-e10d8fa1da33/buildings.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220803%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220803T100905Z&X-Amz-Expires=86400&X-Amz-Signature=62bd30aa18079ce0fdb079ad90d6621584b77dafc55361791fc89b8707a9bcf6&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22buildings.json%22&x-id=GetObject",
      url: `${""}`,
    });

    console.log(data);
  }

  console.log(fullData);

  return fullData;
};

// const byDistrict = async () => {
//   const data = buildingByDistrict as any;

//   for (let index = 1; index <= 28; index++) {
//     console.log(index);
//     console.log(
//       data[`${index < 10 ? "0" : ""}${index}`].sort((item1: any, item2: any) =>
//         item1.BUILDING.toString().localeCompare(item2.BUILDING.toString())
//       )
//     );
//   }
// };
