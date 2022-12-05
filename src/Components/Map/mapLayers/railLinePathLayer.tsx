import { PathStyleExtension } from "@deck.gl/extensions";
import { PathLayer, RGBAColor } from "deck.gl";

export const getRailLinePathLayer = (
  id: string,
  data: any[],
  sortData: any[],
  visible: boolean
): PathLayer<any, any> => {
  const getColor = (d: any): RGBAColor => {
    if (id.indexOf("MRT") !== -1) {
      let color: RGBAColor = [201, 201, 201, 0];
      sortData.forEach((item: any) => {
        const exist = item.path.filter((item: any) => {
          return item.name === d.name;
        });
        if (exist.length > 0) {
          color = item.color;
        }
      });
      return color;
    } else if (id.indexOf("LRT") !== -1) {
      return [128, 128, 128];
    } else {
      return [0, 0, 0];
    }
  };

  const getPath = (d: any) => {
    // console.log(d.coordinates);
    return d.coordinates;
  };

  const getWidth = (d: any) => 4;

  const handleClickMRT = (e: any) => {
    console.log("rail line path", e.object.name);
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
    widthMinPixels: 2,
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

    // getDashArray: [4, 3],
    // dashJustified: true,
    // dashGapPickable: false,
    // extensions: [new PathStyleExtension({ dash: true })],

    onClick: handleClickMRT,
  });
};
