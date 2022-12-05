import { PathLayer, RGBAColor } from "deck.gl";
import { oneMapRawData } from "../MapData";

export type IconMapData = oneMapRawData | undefined;

export const getMrtPathLayer = (
  id: string,
  data: IconMapData[],
  visible: boolean
): PathLayer<any, any> => {
  const getColor = (d: any): RGBAColor => {
    return d.color;
  };

  const getPath = (d: any) => {
    return d.path.map((item: any) => item.coordinates);
  };

  const getWidth = (d: any) => 4;

  const handleClickMRT = (e: any) => {
    console.log("MRT path", e);
  };

  return new PathLayer({
    id: `PathLayer_${id}`,
    data,

    /* props from PathLayer class */

    // billboard: false,
    // capRounded: false,
    getColor,
    getPath,
    getWidth,
    // jointRounded: false,
    // miterLimit: 4,
    // widthMaxPixels: Number.MAX_SAFE_INTEGER,
    widthMinPixels: 3,
    widthScale: 20,
    // widthUnits: 'meters',

    /* props inherited from Layer class */

    // autoHighlight: false,
    // coordinateOrigin: [0, 0, 0],
    // coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
    // highlightColor: [0, 0, 128, 128],
    // modelMatrix: null,
    // opacity: 1,
    parameters: {
      depthMask: false,
    },
    pickable: true,
    visible,
    // wrapLongitude: false,

    onClick: handleClickMRT,
  });
};
