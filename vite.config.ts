import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  console.log('\x1B[34m%s\x1B[39m', '【admin-demo模板：vite3+vue3.2+ts+mock】')
  return {
    resolve: {
      //配置项目别名
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@comps': path.join(__dirname, 'src', 'components'),
      },
    },
    plugins: [
      vue(),
      viteMockServe({
        //详细配置见：https://github.com/vbenjs/vite-plugin-mock/blob/HEAD/README.zh_CN.md
        //mock文件夹路径
        mockPath: 'mock',
        //设置本地可用
        localEnabled: command === 'serve',
      }),
    ],
  }
})
