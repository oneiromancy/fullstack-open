export const isArrayPopulated = (arr: any) => {
    return Array.isArray(arr) && arr.length > 0;
};

export const isObjectPopulated = (obj: any) => {
    return typeof obj === 'object' && Object.keys(obj).length > 0;
};
