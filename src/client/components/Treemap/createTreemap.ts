import FoamTree from '@carrotsearch/foamtree';
import { Options } from '../../../interfaces/Foamtree';

export function createTreemap(props: Options) {
  return new FoamTree({
    fadeDuration: 0,
    groupExposureZoomMargin: 0.2,
    groupFillGradientCenterLightnessShift: 0,
    groupFillGradientRimLightnessShift: 0,
    groupLabelVerticalPadding: 0.2,
    groupMinDiameter: 0,
    groupSelectionOutlineWidth: 3,
    groupStrokeWidth: 0,
    layout: 'squarified',
    maxGroupLabelLevelsDrawn: Infinity,
    maxGroupLevelsAttached: Infinity,
    maxGroupLevelsDrawn: Infinity,
    maxGroups: 3000, // TODO make this an option
    openCloseDuration: 200,
    pixelRatio: window.devicePixelRatio || 1,
    pullbackDuration: 0,
    rolloutDuration: 0,
    stacking: 'flattened',
    titleBarDecorator(_opts: any, _props: any, vars: any) {
      vars.titleBarShown = false;
    },
    wireframeLabelDrawing: 'always',
    zoomMouseWheelDuration: 300,
    ...props,
  } as Options);
}
