<template>
    <div id="drawGrpahBox">
    </div>
</template>

<script>
import CanvasDraw from '../../src/draw'

    export default {
        name:'DrawGraph',
        props:{
            listData:Array
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
                     this.instance.setServiceData(v)
                    
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
}
</style>