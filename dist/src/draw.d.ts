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
type TserviceDataFormatF = number[][][];
declare enum EserviceDataType {
    StandardCoordinates = 0,
    FourCoordinates = 1
}
declare class CanvasDraw {
    #private;
    id: string;
    options: IOptions;
    constructor(id: string, options: IOptions);
    setServiceData(data: IReacData[]): void;
    computeRationCoord(serviceData: TserviceDataFormatF, type?: EserviceDataType): number[][] | TserviceDataFormatF;
    setData(listData: IReacData[]): void;
    remove(): void;
}
export default CanvasDraw;
