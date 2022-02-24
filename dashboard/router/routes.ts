import { RouteRecordRaw } from 'vue-router'

const components = import.meta.glob('../pages/**/*.vue')

const pages = Object.entries(components)
  .filter(([filename]) => filename.split('/').pop()?.charAt(0) !== '-')
  .map(([filename, component]) => {
    let path = filename
      .replace('../pages', '')
      .replace(/index/i, '')
      .replace('.vue', '')
      .replace(/\[(.*?)\]/g, ':$1')
      .toLowerCase()

    if (path === '/404') {
      path = ':pathMatch(.*)*'
    }

    return {
      path,
      component,
      props: true,
    }
  })

const routes: RouteRecordRaw[] = pages

export default routes
