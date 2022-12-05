interface IOptions {
    width?: number;
    height?: number;
    rectData?: IReacData[];
    lineHeight?: number;
    color?: string;
    algWidthAndHeight?: number[];
}
interface IReacData {
    serviceData: number[];
    lineHeight?: number;
    color?: string;
}
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
    computeRationCoord(serviceData: any, type?: EserviceDataType): number[];
    remove(): void;
}
export default CanvasDraw;
