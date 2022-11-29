interface IOptions {
    width?: number;
    height?: number;
    rectData?: IReacData[];
    lineHeight?: number;
    color?: string;
}
interface IReacData {
    serviceData: number[][];
    lineHeight?: number;
    color?: string;
}
declare class CanvasDraw {
    #private;
    id: string;
    options: IOptions;
    constructor(id: string, options: IOptions);
    setServiceData(data: IReacData[]): void;
    setData(listData: IReacData[]): void;
    remove(): void;
}
export default CanvasDraw;
