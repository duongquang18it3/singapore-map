type objectString = { [x: string]: string | any[] };
export type selectOptionProps = {
  name: string;
  code: string;
};

export const parseBoundaryDataName = (value: string): string[] => {
  const list = value.replaceAll("> <", "><").split("<td>");

  const rawResult = list.map((text) => {
    return text.split("</td>")[0];
  });

  return rawResult.slice(1);
};

export const parseDescriptionToJson = (value: string): objectString => {
  const listData = value.replaceAll("> <", "><").split("<td>");

  const rawResultData = listData.map((text) => {
    return text.split("</td>")[0];
  });

  const listHead = value.replaceAll("> <", "><").split("<th>");

  const rawResultHead = listHead.map((text) => {
    return text.split("</th>")[0];
  });

  let result: objectString = {};
  rawResultHead.slice(1).map((item, index) => {
    result[item] = rawResultData.slice(1)[index];
  });

  return result;
};

// export const parseRawDataToJson = (): objectString[] => {
//   let result: objectString[] = [];
//   MAP_SINGAPORE_BOUNDARY_RAW.map((item, index) => {
//     let resultItem: objectString = parseDescriptionToJson(
//       item.properties.Description
//     );

//     resultItem["keyName"] = item.properties.Name;
//     resultItem["coordinates"] = item.geometry.coordinates;

//     result.push(resultItem);
//   });

//   // console.log(
//   //   result.sort((item1, item2) =>
//   //     item1.SUBZONE_N.toString().localeCompare(item2.SUBZONE_N.toString())
//   //   )
//   // );

//   return result;
// };

// export const getListFilteredByKey = (keyType: string): selectOptionProps[] => {
//   let tempName: string[] = [];
//   MAP_SINGAPORE_BOUNDARY.forEach((item: any) => {
//     tempName.push(item[keyType]);
//   });

//   let tempCode: string[] = [];
//   MAP_SINGAPORE_BOUNDARY.forEach((item: any) => {
//     tempCode.push(item[keyType.replaceAll("_N", "_C")]);
//   });

//   const nameList = tempName.filter((v, i, a) => a.indexOf(v) === i);
//   const codeList = tempCode.filter((v, i, a) => a.indexOf(v) === i);

//   let result: selectOptionProps[] = [];
//   nameList.forEach((item, index) => {
//     result.push({
//       name: item,
//       code: codeList[index],
//     });
//   });

//   console.log(result);

//   return result;
// };

export const svgToDataURL = (svg: any) => {
  // console.log(svg);
  // console.log(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`);
  // console.log(`data:image/svg+xml;base64,${btoa(svg)}`);

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  // return `data:image/svg+xml;base64,${btoa(svg)}`;
};

export const getMRTLine = (data: any[], line: string) => {
  return data.filter((item: any) => item.Station.indexOf(line) === 0);
};

export const parseRaiLine = async (plainText: any) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(plainText, "text/xml");

  // let listRailType = []; // RAIL_TYPE
  // let listRailLevel = []; // GRND_LEVEL
  // let listInc = []; // INC_CRC
  // let listFmel = []; // FMEL_UPD_D
  // let coor = []; // Coordinates

  let final = [];

  if (xmlDoc.documentElement.nodeName === "kml") {
    for (const item of xmlDoc.getElementsByTagName("Placemark") as any) {
      const placeMarkName = item
        .getElementsByTagName("name")[0]
        .childNodes[0].nodeValue.trim();
      const placeMarkCoordinates = item
        .getElementsByTagName("coordinates")[0]
        .childNodes[0].nodeValue.trim();
      const placeMarkLevel = item
        .getElementsByTagName("SimpleData")[0]
        .childNodes[0].nodeValue.trim();
      const placeMarkType = item
        .getElementsByTagName("SimpleData")[1]
        .childNodes[0].nodeValue.trim();
      const placeMarkInc = item
        .getElementsByTagName("SimpleData")[2]
        .childNodes[0].nodeValue.trim();
      const placeMarkFmel = item
        .getElementsByTagName("SimpleData")[3]
        .childNodes[0].nodeValue.trim();

      let points = placeMarkCoordinates.split(" ");

      // let coorJson = [];
      let coorList = [];
      for (const point of points) {
        let coord = point.split(",");
        // coorJson.push({ lng: +coord[0], lat: +coord[1] });
        coorList.push([+coord[0], +coord[1]]);
      }

      final.push({
        name: placeMarkName,
        coordinates: coorList,
        // coordinatesJson: coorJson,
        RAIL_TYPE: placeMarkType,
        GRND_LEVEL: placeMarkLevel,
        INC_CRC: placeMarkInc,
        FMEL_UPD_D: placeMarkFmel,
      });
    }
  }
  
  return final;
};
