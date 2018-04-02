// 路由配置
var routes = [
  {
    path: '/',
    meta: {
      activeTypeIndex: 0,
    },
    component: resolve => {
      lazyLoading(resolve, 'index')
    },
  },
  {
    path: '/goods/:id',
    meta: {
      title: '',
      activeTypeIndex: 1,
    },
    component: resolve => {
      lazyLoading(resolve, 'goods')
    },
  },
  {
    path: '/brandDetail/:id',
    meta: {
      title: '',
      activeTypeIndex: 2,
      isShowFooter: false
    },
    component: resolve => {
      lazyLoading(resolve, 'brandDetail')
    },
  },
  {
    path: '/category/:id',
    meta: {
      title: '',
      activeTypeIndex: 3,
    },
    component: resolve => {
      lazyLoading(resolve, 'category')
    },
  },
  {
    path: '/topicDetail/:id',
    meta: {
      title: '',
      activeTypeIndex: 4,
    },
    component: resolve => {
      lazyLoading(resolve, 'topicDetail')
    },
  },
]



const lazyLoading = (resolve, name, index = true) => {
  require.ensure([], function(require) {
    resolve(require(`@/views/${name}${index ? '/Index' : ''}.vue`));
  })
}

export default routes
