import { IconLayer, RGBAColor } from "deck.gl";
import { CapitalData } from "../MapData";

export type IconMapData = CapitalData | undefined;

export const getIconLayer = (
  id: string,
  data: IconMapData[],
  visible: boolean
): IconLayer<any, any> => {
  const iconAtlas =
    "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png";
  const getColor = (d: IconMapData): RGBAColor => [
    Number(d?.CapitalLongitude),
    Math.abs(Number(d?.CapitalLatitude)),
    Math.sqrt(
      Math.abs(Number(d?.CapitalLongitude) + Number(d?.CapitalLatitude))
    ),
  ];
  const getIcon = (d: IconMapData): string => "marker";
  const getPosition = (d: IconMapData): [number, number] => [
    Number(d?.CapitalLongitude),
    Number(d?.CapitalLatitude),
  ];
  const getSize = (d: IconMapData): number => 5;
  const iconMapping = {
    marker: {
      x: 0,
      y: 0,
      width: 128,
      height: 128,
      anchorY: 128,
      mask: true,
    },
  };

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
    sizeScale: 4,
    // sizeUnits: 'pixels',

    // autoHighlight: false,
    // coordinateOrigin: [0, 0, 0],
    // coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
    // highlightColor: [0, 0, 128, 128],
    // modelMatrix: null,
    // opacity: 1,
    pickable: true,
    visible,
    // wrapLongitude: false,
  });
};
