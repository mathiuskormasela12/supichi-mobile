// ========== Percentage Dimensions Type

type Type = 'width' | 'height';

export type PercentageDimensions = (size: number, type?: Type) => number;
