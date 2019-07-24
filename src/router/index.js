import Vue from 'vue'
import Router from 'vue-router'
import layout from '~/layout/index.vue'

Vue.use(Router)

export const routeList=[
    {
        path: '/redirect/:path*',
        component: layout,
        meta: {title: "重定向页面",icon: "",isHide: true},
        component: () => import('~/layout/redirect/index')
    },
    {
        path: '/',
        meta: {title: "首页",icon: "el-icon-setting"},
        component: () => import('~/views/index/index.vue'),
    },
    {
        path: '/components',
        meta: {title: "组件",icon: "el-icon-setting"},
        component: () => import('~/views/components/index.vue'),
        children: [
            {
                path: '/components/tree',
                meta: {title: "树形组件tree",icon: ""},
                component: () => import('~/views/components/tree/index.vue')
            },
            {
                path: '/components/cascader',
                meta: {title: "Cascader级联选择器",icon: ""},
                // meta: {title: "Cascader级联选择器",icon: "",isHide: true},
                component: () => import('~/views/components/cascader/index.vue')
            }
        ],
    },
    {
        path: '/menu',
        meta: {title: "多级菜单",icon: "el-icon-setting"},
        component: () => import('~/views/menu/index.vue'),
        children: [
            {
                path: '/menu/menu1',
                meta: {title: "第二层",icon: ""},
                component: () => import('~/views/menu/menu1/index.vue'),
                children: [
                    {
                        path: '/menu/menu1/menu2',
                        meta: {title: "第三层",icon: ""},
                        component: () => import('~/views/menu/menu1/menu2/index.vue')
                    },
                ],
            },
        ],
    },
    {
        path: '/about',
        meta: {title: "关于",icon: "el-icon-setting"},
        component: () => import('~/views/about/index.vue'),
    },
]


export default new Router({
    routes: [
        {
            path: '/',
            component: layout,
            meta: {title: "组件",icon: "el-icon-setting"},
            children: routeList
        },
    ]
})
