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
            widthAndHeightRatio:{
                type:Array,
                default:()=>{
                    return [1920,1080]
                }
            },
            serviceDataType:{
                type:Number,
                default:0
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
                    const serviceData  = v.map(item=>{
                        return {...v,serviceData:this.instance.computeRationCoord(item.serviceData,this.serviceDataType)}
                    })
                     this.instance.setServiceData(serviceData)
                }
            }
        },
        mounted(){
            console.log('canvas初始化');
            this.instance = new CanvasDraw('drawGrpahBox',{
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