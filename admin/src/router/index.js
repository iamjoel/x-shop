import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    scrollBehavior: () => ({y: 0}),
    routes: [
        {
            path: '/',
            name: 'dashboard',
            redirect: '/dashboard'
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: resolve => {lazyLoading(resolve, 'DashboardPage')},
            children: [
                {
                    path: '/',
                    name: 'welcome',
                    component: resolve => {lazyLoading(resolve, 'WelcomePage')}
                },
                {
                    path: 'goods',
                    name: 'goods',
                    component: resolve => {lazyLoading(resolve, 'Goods/GoodsPage')}
                },
                {
                    path: 'goods/add',
                    name: 'goods_add',
                    component: resolve => {lazyLoading(resolve, 'Goods/GoodsAddPage')}
                },
                {
                    path: 'category',
                    name: 'category',
                    component: resolve => {lazyLoading(resolve, 'Category/CategoryPage')}
                },
                {
                    path: 'category/add',
                    name: 'category_add',
                    component: resolve => {lazyLoading(resolve, 'Category/CategoryAddPage')}
                },
                {
                    path: 'brand',
                    name: 'brand',
                    component: resolve => {lazyLoading(resolve, 'Brand/BrandPage')}
                },
                {
                    path: 'brand/add',
                    name: 'brand_add',
                    component: resolve => {lazyLoading(resolve, 'Brand/BrandAddPage')}
                },
                {
                    path: 'order',
                    name: 'order',
                    component: resolve => {lazyLoading(resolve, 'Order/OrderPage')}
                },
                {
                    path: 'order/detail',
                    name: 'order_detail',
                    component: resolve => {lazyLoading(resolve, 'Order/OrderDetailPage')}
                },
                {
                    path: 'operate/topic',
                    name: 'topic',
                    component: resolve => {lazyLoading(resolve, 'Topic/TopicPage')}
                },
              {
                path: 'operate/topic/add',
                name: 'topic_add',
                component: resolve => {lazyLoading(resolve, 'Topic/TopicAddPage')}
              },
              {
                path: 'user',
                name: 'user',
                component: resolve => {lazyLoading(resolve, 'User/UserPage')}
              },
              {
                path: 'user/add',
                name: 'user_add',
                component: resolve => {lazyLoading(resolve, 'User/UserAddPage')}
              },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: resolve => {lazyLoading(resolve, 'LoginPage')}
        },
        {
            path: '*',
            redirect: '/dashboard'
        }
    ]
})

const lazyLoading = (resolve, name, index = false) => {
  require.ensure([], function(require) {
    resolve(require(`@/components/${name}${index ? '/Index' : ''}.vue`));
  })
}
