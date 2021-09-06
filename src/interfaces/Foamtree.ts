export type Color = RgbaColor | HslaColor;

export type DataHandler = (data: DataObject) => unknown;

export interface DataObject {
  groups: Group[];
}
export type Easing =
  | 'bounce'
  | 'cubicIn'
  | 'cubicInOut'
  | 'cubicOut'
  | 'linear'
  | 'quadIn'
  | 'quadInOut'
  | 'quadOut'
  | 'squareIn'
  | 'squareInOut'
  | 'squareOut';

export interface Event {
  altKey: boolean;
  bottommostOpenGroup: Group;
  ctrlKey: boolean;
  delta: number;
  group: Group;
  metaKey: boolean;
  scale: number;
  secondary: boolean;
  shiftKey: boolean;
  topmostClosedGroup: Group;
  touches: number;
  type: string;
  x: number;
  xAbsolute: number;
  y: number;
  yAbsolute: number;
  allowOriginalEventDefault(): void;
  preventDefault(): void;
  preventOriginalEventDefault(): void;
}

export type EventHandler = (event: Event) => unknown;

interface Geometry {
  polygonCenterX: number;
  polygonCenterY: number;
  polygonArea: number;
  boxLeft: number;
  boxTop: number;
  boxWidth: number;
  boxHeight: number;
  labelFontSize: number;
  labelBoxLeft: number;
  labelBoxTop: number;
  labelBoxWidth: number;
  labelBoxHeight: number;
  polygon: Record<string, unknown>[];
  neighbors: Group[];
}

export interface Group {
  description?: boolean;
  id?: string;
  initialPosition?: {
    distanceFromCenter: number;
    position: number;
  };
  label: string;
  groups?: Group[];
  open?: boolean;
  exposed?: boolean;
  selected?: boolean;
  weight?: number;
}

export type GroupColorDecoratorFunction = (
  options: Options & ReadOnlyOptions,
  properties: Geometry & Hierarchy & State,
  variables: {
    groupColor: Color;
    labelColor: Color | 'auto';
  }
) => unknown;

export type GroupContentDecoratorFunction = (
  options: Options & ReadOnlyOptions,
  properties: Geometry &
    Hierarchy &
    State & {
      context: CanvasRenderingContext2D;
      labelContext: { replay(): void };
      polygonContext: { replay(): void };
      shapeDirty: boolean;
      viewportScale: number;
    },
  variables: {
    groupLabelDrawn: boolean;
    groupPolygonDrawn: boolean;
  }
) => unknown;

export type GroupExposureChangedHandler = (properties: {
  groups: Group[];
  indirect: boolean;
}) => unknown;

export type GroupExposureChangingHandler = (properties: {
  exposed: boolean;
  group: Group;
  indirect: boolean;
}) => unknown;

export type GroupLabelDecoratorFunction = (
  options: Options & ReadOnlyOptions,
  properties: Geometry & Hierarchy & State,
  variables: { labelText: string }
) => unknown;

export type GroupLabelLayoutDecoratorFunction = (
  options: Options & ReadOnlyOptions,
  properties: Geometry & Hierarchy & State,
  variables: {
    fontFamily: string;
    fontStyle: string;
    fontVariant: string;
    fontWeight: number;
    horizontalPadding: number;
    lineHeight: number;
    maxFontSize: number;
    maxTotalTextHeight: number;
    verticalPadding: number;
  }
) => unknown;

export type GroupOpenOrCloseChangedHandler = (properties: {
  groups: Group[];
  indirect: boolean;
}) => unknown;

export type GroupOpenOrCloseChangingHandler = (properties: {
  group: Group;
  indirect: boolean;
  open: boolean;
}) => unknown;

export type GroupSelectionChangedHandler = (properties: {
  groups: Group[];
}) => unknown;

export type GroupSelectionChangingHandler = (properties: {
  group: Group;
  selected: boolean;
}) => unknown;

interface Hierarchy {
  attribution: boolean;
  description: boolean;
  group: Group;
  hasChildren: boolean;
  index: number;
  indexByWeight: number;
  level: number;
  parent: Group | null;
  siblingCount: number;
  weightNormalized: number;
}

export interface HslaColor {
  a: number;
  h: number;
  l: number;
  model: 'hsla';
  s: number;
}

export interface Options {
  androidStockBrowserWorkaround?: boolean;
  attributionDistanceFromCenter?: number;
  attributionLogo?: string | null | undefined;
  attributionLogoScale?: number;
  attributionPosition?: number | Position;
  attributionText?: string | null | undefined;
  attributionTheme?: 'light' | 'dark';
  attributionUrl?: string | null | undefined;
  attributionWeight?: number;
  dataObject?: DataObject;
  descriptionGroup?: 'always' | 'auto';
  descriptionGroupDistanceFromCenter?: number;
  descriptionGroupMaxHeight?: number;
  descriptionGroupMinHeight?: number;
  descriptionGroupPolygonDrawn?: boolean;
  descriptionGroupPosition?: number;
  descriptionGroupSize?: number;
  descriptionGroupType?: 'floating' | 'stab';
  element?: HTMLElement;
  exposeDuration?: number;
  exposeEasing?: Easing;
  exposure?: any;
  fadeDuration?: number;
  fadeEasing?: Easing;
  finalCompleteDrawMaxDuration?: number;
  finalIncrementalDrawMaxDuration?: number;
  finalToWireframeFadeDuration?: number;
  groupBorderRadius?: number;
  groupBorderRadiusCorrection?: number;
  groupBorderWidth?: number;
  groupBorderWidthScaling?: number;
  groupColorDecorator?: GroupColorDecoratorFunction;
  groupContentDecorator?: GroupContentDecoratorFunction;
  groupContentDecoratorTriggering?: 'onShapeDirty' | 'onSurfaceDirty';
  groupExposureScale?: number;
  groupExposureShadowColor?: string;
  groupExposureShadowSize?: number;
  groupExposureZoomMargin?: number;
  groupFillGradientCenterHueShift?: number;
  groupFillGradientCenterLightnessShift?: number;
  groupFillGradientCenterSaturationShift?: number;
  groupFillGradientRadius?: number;
  groupFillGradientRimHueShift?: number;
  groupFillGradientRimLightnessShift?: number;
  groupFillGradientRimSaturationShift?: number;
  groupFillType?: 'gradient' | 'none' | 'plain';
  groupGrowingDrag?: number;
  groupGrowingDuration?: number;
  groupGrowingEasing?: Easing;
  groupHoverFillHueShift?: number;
  groupHoverFillLightnessShift?: number;
  groupHoverFillSaturationShift?: number;
  groupHoverStrokeHueShift?: number;
  groupHoverStrokeLightnessShift?: number;
  groupHoverStrokeSaturationShift?: number;
  groupInsetWidth?: number;
  groupLabelColorThreshold?: number;
  groupLabelDarkColor?: string;
  groupLabelDecorator?: GroupLabelDecoratorFunction;
  groupLabelFontFamily?: string;
  groupLabelFontStyle?: string;
  groupLabelFontVariant?: string;
  groupLabelFontWeight?: string;
  groupLabelHorizontalPadding?: number;
  groupLabelLayoutDecorator?: GroupLabelLayoutDecoratorFunction;
  groupLabelLightColor?: string;
  groupLabelLineHeight?: number;
  groupLabelMaxFontSize?: number;
  groupLabelMaxTotalHeight?: number;
  groupLabelMinFontSize?: number;
  groupLabelUpdateThreshold?: number;
  groupLabelVerticalPadding?: number;
  groupMinDiameter?: number;
  groupResizingBudget?: number;
  groupSelectionFillHueShift?: number;
  groupSelectionFillLightnessShift?: number;
  groupSelectionFillSaturationShift?: number;
  groupSelectionOutlineColor?: string;
  groupSelectionOutlineShadowColor?: string;
  groupSelectionOutlineShadowSize?: number;
  groupSelectionOutlineWidth?: number;
  groupSelectionStrokeHueShift?: number;
  groupSelectionStrokeLightnessShift?: number;
  groupSelectionStrokeSaturationShift?: number;
  groupStrokeGradientAngle?: number;
  groupStrokeGradientLowerHueShift?: number;
  groupStrokeGradientLowerLightnessShift?: number;
  groupStrokeGradientLowerSaturationShift?: number;
  groupStrokeGradientRadius?: number;
  groupStrokeGradientUpperHueShift?: number;
  groupStrokeGradientUpperLightnessShift?: number;
  groupStrokeGradientUpperSaturationShift?: number;
  groupStrokePlainHueShift?: number;
  groupStrokePlainLightnessShift?: number;
  groupStrokePlainSaturationShift?: number;
  groupStrokeType?: 'gradient' | 'none' | 'plain';
  groupStrokeWidth?: number;
  groupUnexposureLabelColorThreshold?: number;
  groupUnexposureLightnessShift?: number;
  groupUnexposureSaturationShift?: number;
  id?: string;
  incrementalDraw?: 'accurate' | 'fast' | 'none';
  interactionHandler?: 'builtin' | 'external' | 'hammerjs';
  layout?: 'ordered' | 'relaxed' | 'squarified';
  layoutByWeightOrder?: boolean;
  logging?: boolean;
  maxGroupLabelLevelsDrawn?: number;
  maxGroupLevelsAttached?: number;
  maxGroupLevelsDrawn?: number;
  maxGroups?: number;
  maxLabelSizeForTitleBar?: number;
  onGroupClick?: OneOrArray<EventHandler>;
  onGroupDoubleClick?: OneOrArray<EventHandler>;
  onGroupDrag?: OneOrArray<EventHandler>;
  onGroupDragEnd?: OneOrArray<EventHandler>;
  onGroupDragStart?: OneOrArray<EventHandler>;
  onGroupExposureChanged?: OneOrArray<GroupExposureChangedHandler>;
  onGroupExposureChanging?: OneOrArray<GroupExposureChangingHandler>;
  onGroupHold?: OneOrArray<EventHandler>;
  onGroupHover?: OneOrArray<EventHandler>;
  onGroupMouseDown?: OneOrArray<EventHandler>;
  onGroupMouseMove?: OneOrArray<EventHandler>;
  onGroupMouseUp?: OneOrArray<EventHandler>;
  onGroupMouseWheel?: OneOrArray<EventHandler>;
  onGroupOpenOrCloseChanged?: OneOrArray<GroupOpenOrCloseChangedHandler>;
  onGroupOpenOrCloseChanging?: OneOrArray<GroupOpenOrCloseChangingHandler>;
  onGroupSelectionChanged?: OneOrArray<GroupSelectionChangedHandler>;
  onGroupSelectionChanging?: OneOrArray<GroupSelectionChangingHandler>;
  onGroupTransform?: OneOrArray<EventHandler>;
  onGroupTransformEnd?: OneOrArray<EventHandler>;
  onGroupTransformStart?: OneOrArray<EventHandler>;
  onKeyUp?: OneOrArray<EventHandler>;
  onModelChanged?: OneOrArray<DataHandler>;
  onModelChanging?: OneOrArray<DataHandler>;
  onRedraw?: OneOrArray<() => unknown>;
  onRelaxationStep?: OneOrArray<RelaxationStepHandler>;
  onRolloutComplete?: OneOrArray<() => unknown>;
  onRolloutStart?: OneOrArray<() => unknown>;
  onViewReset?: OneOrArray<() => unknown>;
  open?: any;
  openCloseDuration?: number;
  parentFillOpacity?: number;
  parentLabelOpacity?: number;
  parentOpacityBalancing?: boolean;
  parentStrokeOpacity?: number;
  pixelRatio?: number;
  pullbackChildGroupsDelay?: number;
  pullbackChildGroupsDrag?: number;
  pullbackDuration?: number;
  pullbackEasing?: Easing;
  pullbackLabelDelay?: number;
  pullbackLabelDrag?: number;
  pullbackLabelDuration?: number;
  pullbackMethod?: 'groups' | 'individual';
  pullbackPolygonDrag?: number;
  pullbackPolygonDuration?: number;
  pullbackRotationStrength?: number;
  pullbackScalingStrength?: number;
  pullbackStartPoint?: 'bottomright' | 'center' | 'random' | 'topleft';
  pullbackTransformationCenter?: number;
  pullbackTranslationXStrength?: number;
  pullbackTranslationYStrength?: number;
  rainbowColorDistribution?: 'linear' | 'radial';
  rainbowColorDistributionAngle?: number;
  rainbowEndColor?: string;
  rainbowLightnessCorrection?: number;
  rainbowLightnessDistributionAngle?: number;
  rainbowLightnessShift?: number;
  rainbowLightnessShiftCenter?: number;
  rainbowSaturationCorrection?: number;
  rainbowStartColor?: string;
  rectangleAspectRatioPreference?: number;
  relaxationInitializer?:
    | 'blackhole'
    | 'fisheye'
    | 'ordered'
    | 'random'
    | 'squarified';
  relaxationMaxDuration?: number;
  relaxationQualityThreshold?: number;
  relaxationVisible?: boolean;
  rolloutChildGroupsDelay?: number;
  rolloutChildGroupsDrag?: number;
  rolloutDuration?: number;
  rolloutEasing?: Easing;
  rolloutLabelDelay?: number;
  rolloutLabelDrag?: number;
  rolloutLabelDuration?: number;
  rolloutMethod?: 'groups' | 'individual';
  rolloutPolygonDrag?: number;
  rolloutPolygonDuration?: number;
  rolloutRotationStrength?: number;
  rolloutScalingStrength?: number;
  rolloutStartPoint?: 'bottomright' | 'center' | 'random' | 'topleft';
  rolloutTransformationCenter?: number;
  rolloutTranslationXStrength?: number;
  rolloutTranslationYStrength?: number;
  selection?: any;
  showZeroWeightGroups?: boolean;
  stacking?: 'flattened' | 'hierarchical';
  titleBarBackgroundColor?: string;
  titleBarDecorator?: TitleBarDecoratorFunction;
  titleBarFontFamily?: string;
  titleBarFontStyle?: string;
  titleBarFontVariant?: string;
  titleBarFontWeight?: string;
  titleBarMaxFontSize?: number;
  titleBarMinFontSize?: number;
  titleBarTextColor?: string;
  titleBarTextPaddingLeftRight?: number;
  titleBarTextPaddingTopBottom?: number;
  wireframeContentDecorationDrawing?: 'always' | 'auto' | 'never';
  wireframeDrawMaxDuration?: number;
  wireframeLabelDrawing?: 'always' | 'auto' | 'never';
  wireframePixelRatio?: number;
  wireframeToFinalFadeDelay?: number;
  wireframeToFinalFadeDuration?: number;
  zoomMouseWheelDuration?: number;
  zoomMouseWheelEasing?: Easing;
  zoomMouseWheelFactor?: number;
}

export type Position =
  | 'bottom'
  | 'bottomleft'
  | 'bottomright'
  | 'left'
  | 'random'
  | 'right'
  | 'top'
  | 'topleft'
  | 'topright';

export interface ReadOnlyOptions {
  containerCoordinates: { x: number; y: number };
  geometry: Geometry;
  hierarchy: Hierarchy;
  imageData: 'backgroundColor' | 'format' | 'pixelRatio' | 'quality';
  state: State;
  supported: boolean;
  times: any;
  viewport: { scale: number; x: number; y: number };
  // TODO add remaining methods
}

export type RelaxationStepHandler = (
  relaxationProgress: number,
  relaxationComplete: boolean,
  relaxationTimeout: boolean
) => unknown;

export interface RgbaColor {
  a: number;
  g: number;
  model: 'rgba';
  r: number;
  v: number;
}

export interface State {
  browseable: boolean | undefined;
  exposed: boolean;
  exposure: number;
  hovered: boolean;
  open: boolean;
  openness: number;
  revealed: boolean;
  selected: boolean;
  transitionProgress: number;
}

export type TitleBarDecoratorFunction = (
  options: Options & ReadOnlyOptions,
  properties: Geometry &
    Hierarchy &
    State & {
      labelFontSize: number;
      titleBarHeight: number;
      titleBarWidth: number;
      viewportScale: number;
    },
  variables: {
    titleBarMaxFontSize: number;
    titleBarShown: boolean;
    titleBarText: string | null | undefined;
  }
) => unknown;

// Helpers

type OneOrArray<T> = T | T[];
