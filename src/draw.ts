interface IOptions{
    width?:number
    height?:number
    rectData?:IReacData[]
    lineHeight?:number
    color?:string
    algWidthAndHeight?:number[]
}
interface IReacData{
        serviceData:number[]
        lineHeight?:number
        color?:string
}

type TFourCoord = number[][]
type TStandardCoord = number[]

enum EserviceDataType{
    StandardCoordinates, // 标准坐标数据格式 [x,y,width,height]
    FourCoordinates // 四个坐标点的数据格式 例如：[[21, 282],[21, 432],[90, 432],[90, 282]],
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
        this.options.color = this.options.color ?? "#000" //定义默认线颜色
        this.options.algWidthAndHeight = this.options.algWidthAndHeight ?? [1920,1080] //定义默认算法依据[1920,1080]后给我们的数据
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
    // 主动设置ServiceData
    setServiceData(data:IReacData[]){
        if(!data.length) return
        this.remove()
        data.forEach(i=>{
            this.#ctx.strokeStyle = i.color ?? this.options.color
            this.#ctx.lineWidth = i.lineHeight ?? this.options.lineHeight
                if(!i.serviceData|| i.serviceData.length!=4){
                    console.warn('必须传入x,y,width,height这种格式哦!');
                    return
                }
            const [x,y,width,height] = i.serviceData
            this.#ctx?.strokeRect(x,y,width,height)
            
        })
    }
    // 根据盒子的宽高计算出比例，得出真实展示在画布上的左边
    computeRationCoord(serviceData:any,type:EserviceDataType=EserviceDataType.StandardCoordinates){
        let handleData:TStandardCoord = []
        console.log('🤡 坐标数据类型是', type)
        switch (type) {
            // 将  [ [21, 282],[21, 432],[90, 432],[90, 282]] 处理成 [40, 40, 100, 100]
            case EserviceDataType.FourCoordinates:
                if(!serviceData.length) return
                const [x1,y1,y2,x2] = serviceData
                console.log('🤡 ~~ serviceData', serviceData)
                // handleData=  serviceData.map((item:any) => {
                //     console.log('🤡 ~~ item', item)
                //     const [x1,y1,y2,x2] = item 
                //     const [x,y,width,height] = [x1[0],x1[1],x2[0]-x1[0],y1[1]-x1[1]]
                //     return [x,y,width,height] 
                // });
                handleData = [x1[0],x1[1],x2[0]-x1[0],y1[1]-x1[1]]
                console.log('🤡 ~~ handleData', handleData)
                break;
            case EserviceDataType.StandardCoordinates:
                handleData = serviceData
                break;
        }
        return countBoxRatioData(handleData,this.options.algWidthAndHeight,[this.options.width,this.options.height])  
    }  
    // 删除所有的图形
     remove(){
        const {width,height} = this.options
        this.#ctx.clearRect(0,0,width,height)
    }
}

// 将标准坐标的格式按当前盒子宽高算出比例后return出去
function countBoxRatioData(corrdData:TStandardCoord,algWigthAndHeight:number[],canvasWidthAndHeight:number[]){
    const [algWidth,algHeight] = algWigthAndHeight
    const [width,height] = canvasWidthAndHeight
    const [widthRatio,heightRatio] = [width/algWidth,height/algHeight]
    const [x,y,w,h] = corrdData

    return [x*widthRatio,y*heightRatio,w*widthRatio,h*heightRatio] 
}

export default CanvasDraw