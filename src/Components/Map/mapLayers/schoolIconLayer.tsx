import { IconLayer, RGBAColor } from "deck.gl";
import { oneMapRawData } from "../MapData";

export type IconMapData = oneMapRawData | undefined;

export const getSchoolIconLayer = (
  id: string,
  data: IconMapData[],
  visible: boolean
): IconLayer<any, any> => {

  const iconAtlas = `${process.env.PUBLIC_URL}/image/school-2.png`;

  const getIcon = (d: IconMapData): string => "marker";

  const getColor = (d: IconMapData): RGBAColor => [255, 221, 87];

  const iconMapping = {
    marker: {
      x: 0,
      y: 0,
      width: 512,
      height: 512,
      anchorY: 512,
      mask: false,
    },
  };

  const getPosition = (d: IconMapData): [number, number] => [
    Number(d?.LONGTITUDE),
    Number(d?.LATITUDE),
  ];

  const getSize = (d: IconMapData): number => 5;

  const handleClickSchool = (e: any) => {
    console.log("School", e);
  }

  return new IconLayer({
    id: `IconLayer_${id}`,
    data,

    // alphaCutoff: 0.05,
    // billboard: true,
    // getAngle: 0,
    getColor,
    getIcon,
    // getPixelOffset: [0, 0],
    getPosition,
    getSize,
    iconAtlas,
    iconMapping,
    // onIconError: null,
    // sizeMaxPixels: Number.MAX_SAFE_INTEGER,
    // sizeMinPixels: 0,
    sizeScale: 6,
    // sizeUnits: 'pixels',

    // autoHighlight: false,
    // coordinateOrigin: [0, 0, 0],
    // coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
    // highlightColor: [0, 0, 128, 128],
    // modelMatrix: null,
    opacity: 1,
    pickable: true,
    visible,
    // wrapLongitude: false,

    parameters: { depthTest: false },

    onClick: handleClickSchool,
  });
};
