export function defaultValue(value: string): number {
    if(value.trim() === '') {
        return 10;
    } else {
        return Number(value);
    }
}

export function deleteObject(value: string) {
    const objParse = JSON.parse(value);
    Object.keys(objParse).forEach((item: any) => !objParse[item] && delete objParse[item]);
    return objParse;
}