<!--
 * @Description: 侧边栏
 * @Date: 2021-06-01 15:03:58 +0800
 * @Author: JackChou
 * @LastEditTime: 2022-10-11 00:51:32 +0800
 * @LastEditors : JackChou
-->
<template>
  <div class="aside-container">
    <!-- router 属性开启以 index 为路径的跳转 -->
    <el-menu default-active="/" :collapse="false" router :default-openeds="defaultOpeneds">
      <template v-for="menu in menuList">
        <el-submenu v-if="menu.type === 'menu'" :key="menu.id" :index="menu.id">
          <template #title>
            <span>{{ menu.name }}</span>
          </template>
          <template v-for="submenu in menu.children">
            <el-menu-item v-if="submenu.type === 'path'" :key="submenu.id" :index="submenu.path">
              {{ submenu.name }}
            </el-menu-item>
            <el-submenu v-if="submenu.type === 'menu'" :key="submenu.id" :index="submenu.id">
              <template #title>
                {{ submenu.name }}
              </template>
              <el-menu-item v-for="item in submenu.children" :key="item.id" :index="item.path">
                {{ item.name }}
              </el-menu-item>
            </el-submenu>
          </template>
        </el-submenu>
        <el-menu-item v-if="menu.type === 'path'" :key="menu.path" :index="menu.path">
          {{ menu.name }}
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script>
// 默认展开的子菜单的 index
import { Menu, MenuItem, Submenu } from 'element-ui'
import webComponentRoutes from '../../views/web-component/route'
// import { importRoutes } from '../../route'
// const routes = importRoutes()
// console.log(routes)

const webComponentMenus = webComponentRoutes.map(item => {
  const { path, name } = item
  return { path, name, type: 'path', id: `web-component-${Math.random()}` }
})

const defaultOpeneds = ['ajfakfkaf', 'a3easd43fakwer']
const menuList = [
  {
    type: 'path',
    name: '首页',
    path: '/',
    id: 'homeakfaketwrwr32',
  },
  {
    type: 'menu',
    id: 'ajfakfkaf',
    name: '系统设置',
    children: [
      {
        type: 'path',
        path: '/role',
        name: '角色管理',
        id: 'alfkjakfakwer',
      },
      {
        type: 'path',
        path: '/menu',
        name: '菜单配置',
        id: 'alfk343fakwer',
      },
      {
        type: 'menu',
        name: '二级菜单',
        id: 'a3easd43fakwer',
        children: [
          {
            type: 'path',
            path: '/test',
            name: '子菜单',
            id: 'a3e23fsfd43fakwer',
          },
        ],
      },
    ],
  },
  {
    type: 'path',
    path: '/settings',
    name: '其他菜单',
    id: 'yyte2alkfakfjakfj',
  },
  {
    type: 'path',
    path: '/store',
    name: 'my-vuex',
    id: 'store1213',
  },
  {
    type: 'path',
    path: '/my-router',
    name: 'my-http',
    id: 'router1213',
  },
  ...webComponentMenus,
  {
    type: 'path',
    path: '/canvas',
    name: 'canvas学习',
    id: 'router-canvas',
  },
]
export default {
  name: 'Aside',
  components: { ElMenu: Menu, ElMenuItem: MenuItem, ElSubmenu: Submenu },
  data() {
    return {
      menuList,
      defaultOpeneds,
    }
  },
}
</script>
<style lang="less">
.aside-container {
  min-height: 100vh;
  ul:first-child {
    min-height: 100vh;
  }
  ul {
    background-color: #ecedf1;
  }
  .el-menu {
    border: none;
  }
}
</style>
