// import { Fp64Extension } from "@deck.gl/extensions";
import { RGBAColor, ScatterplotLayer } from "deck.gl";

export type ScatterplotMapData = any | undefined;

export const getPinScatterplotLayer = (
  id: string,
  data: any[],
  radius: number,
  visible: boolean
): ScatterplotLayer<any, any> => {
  const getFillColor = (d: any): RGBAColor => [255, 140, 0, 150];

  const getLineColor = (d: any): RGBAColor => [0, 0, 0];

  const getPosition = (d: any): [number, number] => [
    Number(d?.LONGTITUDE),
    Number(d?.LATITUDE),
  ];

  const getRadius = (d: any): number => radius * 1000;

  return new ScatterplotLayer({
    id: `ScatterplotLayer_${id}`,
    data,

    // antialiasing: true,
    // billboard: false,
    filled: false,
    getFillColor,
    getLineColor,
    // getLineWidth: 1,
    getPosition: getPosition,
    getRadius,
    // lineWidthMaxPixels: Number.MAX_SAFE_INTEGER,
    lineWidthMinPixels: 1,
    // lineWidthScale: 1,
    lineWidthUnits: 'pixels',
    // radiusMaxPixels: 100,
    // radiusMinPixels: 1,
    // radiusScale: 6,
    // radiusUnits: 'meters',
    stroked: true,

    /* props inherited from Layer class */

    // autoHighlight: false,
    // coordinateOrigin: [0, 0, 0],
    // coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
    // highlightColor: [0, 0, 128, 128],
    // modelMatrix: null,
    opacity: 1,
    pickable: true,
    visible,
    // wrapLongitude: false,
    // fp64: true,
    // extensions: [new Fp64Extension()],
  });
};
