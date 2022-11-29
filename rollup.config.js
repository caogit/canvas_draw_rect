import typescript from 'rollup-plugin-typescript2' // Rollup plugin for typescript with compiler errors.
import commonjs from 'rollup-plugin-commonjs' //  将 CommonJS 模块转换为 ES6 供 rollup 处理
import { terser } from 'rollup-plugin-terser' // 压缩 js 代码，包括 ES6 代码压缩
import nodeResolve from 'rollup-plugin-node-resolve' // rollup 无法识别 node_modules 中的包，帮助 rollup 查找外部模块，然后导入
import vue from 'rollup-plugin-vue' //  Compile Vue components.
import filesize from 'rollup-plugin-filesize' // Display the file size of the bundle in the console.
import replace from 'rollup-plugin-replace' // Replace occurrences of a set of strings.
import babel from 'rollup-plugin-babel' // 用于将rollup与bable之间的无缝集成


const config = {
  input: "./src/index.ts", // 必须，入口文件
  output: { // 必须，输出文件 (如果要输出多个，可以是一个数组)
    name:'version',
    exports: "named", // 输出多个文件
    globals: {
      vue: "Vue" // 告诉rollup全局变量Vue即是vue
    }
  },
  plugins: [ // 引入的插件在这里配置
    nodeResolve(),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    vue({
      css: true,
      compileTemplate: true
    }),
    typescript({
      objectHashIgnoreUnknownHack: true
    }),
    terser(),
    filesize(),
    babel({
      exclude: "**/node_modules/**"
    }),
  ]
}

export default config
