interface IOptions{
    width?:number
    height?:number
    rectData?:IReacData[]
    lineHeight?:number
    color?:string
}
interface IReacData{
        serviceData:number[][]
        lineHeight?:number
        color?:string
}

type TserviceDataFormatF = number[][][]

enum EserviceDataType{
    StandardCoordinates,
    FourCoordinates

}

class CanvasDraw {
    id
    options
    #ctx:CanvasRenderingContext2D
    constructor(id:string,options:IOptions){
        console.log('🤡 ~~ options', options)
        this.options = options
        this.id = id
        this.#ctx 
        this.options.lineHeight = this.options.lineHeight ?? 2 //定义默认线粗
        this.options.color = this.options.color ?? "red" //定义默认线颜色
        this.#init()
    }
     #init(){
        console.log('init初始化');
        
        // 获取传入id的宽高
        const el = document.getElementById(this.id) as HTMLElement
        console.log('🤡 ~~ el', el)
       
        const {offsetWidth,offsetHeight} = el

      

        const canvas = document.createElement('canvas') 
        el.appendChild(canvas)
        // 设置默认的宽高
        if(!this.options?.width || !this.options?.height){
            canvas.width = offsetWidth
            canvas.height = offsetHeight
        }else{
            canvas.width = this.options.width
            canvas.height = this.options.height

        }
        this.options.width = canvas.width
        this.options.height = canvas.height
        this.#ctx = canvas.getContext('2d')
        // 有两种方法可以画矩形(路径和矩形)，我们直接采用矩形方法
        this.setServiceData(this.options.rectData)

    }
    setServiceData(data:IReacData[]){
        if(!data.length) return
        data.forEach(i=>{
            this.#ctx.strokeStyle = i.color ?? this.options.color
            this.#ctx.lineWidth = i.lineHeight ?? this.options.lineHeight
            i.serviceData.forEach(v=>{
                if(!v||v.length!=4){
                    console.warn('必须传入x,y,width,height这种格式哦!');
                    return
                }
            const [x,y,width,height] = v
            this.#ctx?.strokeRect(x,y,width,height)
            })
        })
    }
    // 根据盒子的宽高计算出比例，得出真实展示在画布上的左边
    computeRationCoord(serviceData:TserviceDataFormatF,type:EserviceDataType=EserviceDataType.StandardCoordinates){
        console.log('🤡 ~~ serviceData', serviceData)
        let handleData = []
        console.log('🤡 ~~ type', type)
        switch (type) {
            // 将  [ [21, 282],[21, 432],[90, 432],[90, 282]] 处理成 [40, 40, 100, 100]
            case EserviceDataType.FourCoordinates:
                if(!serviceData.length) return
                handleData=  serviceData.map(item => {
                    console.log('🤡 ~~ item', item)
                    const [x1,y1,y2,x2] = item 
                    const [x,y,width,height] = [x1[0],x1[1],x2[0]-x1[0],y1[1]-x1[1]]
                    console.log('🤡 ~~ [x,y,width,height]', [x,y,width,height])
                    return [x,y,width,height] 
                });
                break;
            case EserviceDataType.StandardCoordinates:
                handleData = serviceData
                break;
        }
        return handleData
    }
    // 主动设置ServiceData
     setData(listData:IReacData[]){
        this.remove()
        this.setServiceData(listData)
    }
    // 删除所有的图形
     remove(){
        const {width,height} = this.options
        this.#ctx.clearRect(0,0,width,height)
    }

}

export default CanvasDraw