<template>
    <div id="drawGrpahBox">
    </div>
</template>

<script>
import CanvasDraw from '../../src/draw'

    export default {
        name:'DrawGraph',
        props:{
            listData:Array,
            algWidthAndHeight:{
                type:Array,
                default:()=>{
                    return [1920,1080]
                }
            },
            serviceDataType:{
                type:Number,
                default:0
            },
            color:{
                type:String,
                default:'red'
            }

        },
        data(){
            return {
                instance:''
            }
        },
        watch:{
            listData:{
                handler:function(v,oldv){
                    console.log('🤡 ~~ v', v)
                    if(!v.length) return
                    this.$nextTick(()=>{
                    const serviceData  = v.map(item=>{
                        return {...item,serviceData:this.instance.computeRationCoord(item.serviceData,this.serviceDataType)}
                    })
                     console.log('🤡 ~~ serviceData', serviceData)
                     this.instance.setServiceData(serviceData)
                    })
                },
                immediate:true
            }
        },
        mounted(){
            console.log('canvas初始化');
            this.instance = new CanvasDraw('drawGrpahBox',{
                algWidthAndHeight:this.algWidthAndHeight,
                color:this.color,
                rectData:[
                    
                ]
            })
        },
    }
</script>

<style  scoped>
#drawGrpahBox{
    width: 100%;
    height: 100%;
    position: absolute;
  top: 0;
  left: 0;
}
</style>