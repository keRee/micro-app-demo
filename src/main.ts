import './public-path'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import routes from './routes'
import store from './store'

interface IProps {
  container: string
  globalStore: any
  registry: any
}

const $root = '#app'
let instance: any = null
let router = null

function render (props?: IProps) {
  console.log('[app will render]:', props)
  router = createRouter({
    history: createWebHistory(props?.registry?.activeRule || process.env.BASE_URL),
    routes
  })

  instance = createApp(App)
  instance
    .use(store)
    .use(router)
    .mount(props?.container || $root)
}

export async function bootstrap () {
  console.log('[app is bootstraped!]')
}

/**
 * 主应用会通过props向下传递必要的属性和方法供子应用使用
 * globalStore会存储企业、城市、项目等信息
 */
export async function mount (props: IProps) {
  console.log('[app is mount]:', props)

  // props?.globalStore?.onChange(([newData, oldData]: any) => {
  //   console.log('[globalStore change]', newData, oldData)
  // })

  render(props)
}

export async function unmount () {
  console.log('[app is unmount!]')
  /** reset data */
  instance?.unmount()
  instance = null
  router = null
  // ...others
}

/**
 * __POWERED_BY_QIANKUN__ 全局变量
 */
if (!(window as any).__POWERED_BY_QIANKUN__) {
  render()
}
