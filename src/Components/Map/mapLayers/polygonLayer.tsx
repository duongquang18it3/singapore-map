import { PolygonLayer, RGBAColor } from "deck.gl";
import { BoundaryParseData } from "../MapData";

export type PolygonMapData = BoundaryParseData | undefined;
export type PolygonFilterProps = {
  type: string;
  value: string;
};

export const getPolygonLayer = (
  id: string,
  data: PolygonMapData[],
  visible: boolean
): PolygonLayer<any, any> => {
  const getFillColor = (d: PolygonMapData): RGBAColor => [235, 255, 252];

  const getPolygon = (d: PolygonMapData): any => {
    return d?.coordinates[0];
  };

  return new PolygonLayer({
    id: `PolygonLayer_${id}`,
    data: data,
    // data: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf-zipcodes.json",

    /* props from PolygonLayer class */

    // elevationScale: 1,
    extruded: true,
    filled: true,
    getElevation: (d: PolygonMapData) => 0,
    getFillColor,
    getLineColor: [80, 80, 80],
    getLineWidth: (d: PolygonMapData) => 1,
    getPolygon,
    // lineJointRounded: false,
    // lineMiterLimit: 4,
    // lineWidthMaxPixels: Number.MAX_SAFE_INTEGER,
    lineWidthMinPixels: 1,
    // lineWidthScale: 1,
    // lineWidthUnits: 'meters',
    // material: true,
    stroked: true,
    wireframe: true,

    /* props inherited from Layer class */

    // autoHighlight: false,
    // coordinateOrigin: [0, 0, 0],
    // coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
    // highlightColor: [0, 0, 128, 128],
    // modelMatrix: null,
    opacity: 0.5,
    pickable: true,
    visible,
    // wrapLongitude: false,
  });
};
