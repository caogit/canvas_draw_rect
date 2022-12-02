# 使用 canvas 绘制矩形框

### 使用参数：

```js
import Zksy from 'test_cao_utils'

const marker = new Zksy('box',{
    	color:'red'， // 设置所有框的颜色，默认红色
    	lineHeight:2 // 设置所有框的线宽，默认2
        rectData:[
          {
    		color:'', // 设置单独框的颜色
    		lineHeight：0 // 设置单独框的线宽
            serviceData:[[40,40,100,100],[80,80,100,100]] // 设置数据格式[[x坐标，y坐标，宽，高]]
        },
        ]
    })

 方法：
 marker.setData([{serviceData:[[120,120,100,100]]}]) // 绘制矩形框
 marker.remove() // 删除所欲绘制的矩形框
```

​ 使用技术:

- 项目使用 `rollup` 打包，没用采用`webpack`是因为前者体积更小，并且输出 esm 包，0 配置 0 依赖支持按需引入和完整引入，不需要使用`.d.ts`文件就可以智能提示

## 1.8 版本

1.  新增 set 和 remove 功能

## 1.9 版本

1.  修改名字，优化私有属性和方法

## 2.0 版本

1.  新增 DrawGraph 组件，支持按需和全局导入，传入参数 listData 就可以画实时框

## 2.1 版本

1.  新增 computeRationCoord 方法，可以根据盒子的宽高计算出比例，得出真实展示在画布上的左边
