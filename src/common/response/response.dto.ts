

export interface IResponseDto<T> {
    status?: number,
    data?: T | T[] | null | any;
    message?: string;
    [key: string]: any;
}

export const ResponseFunc = <T>(status: number, data: T | T[] | any, message?: string): IResponseDto<T> => ({ status, data, message })