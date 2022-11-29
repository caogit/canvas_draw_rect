import CanvasDraw from './draw'
import DrawGraph from '../component/drawGraph/drawGraph.vue'
import {VueConstructor} from 'vue'

const components = [
    DrawGraph,
]
console.log('🤡 ~~ components', ...components)
// Vue.use的时候会自动调这个install方法，并传入Vue这个参数
const install = (Vue: VueConstructor) => {
  if ((install as any).installed) return
  ;(install as any).installed = true
  components.forEach((component: any) => {
      console.log('🤡 ~~ component', component)
    Vue.component(component.name, component)
  })
}


if (typeof window !== 'undefined' && (window as any).Vue) {
  install((window as any).Vue)
}

export default {install} 

export {
    CanvasDraw,
    DrawGraph
}
