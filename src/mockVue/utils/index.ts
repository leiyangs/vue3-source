export const isObject = (val: any) => typeof val === "object" && val !== null;
export const isSymbol = (val: any) => typeof val === "symbol";
export const isInteger = (val: any) => "" + parseInt(val, 10) === val;
export const hasChanged = (val: any, oldVal: any) => val == oldVal;