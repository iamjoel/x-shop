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
    path: '/topic',
    meta: {
      activeTypeIndex: 1,
    },
    component: resolve => {
      lazyLoading(resolve, 'topic')
    },
  },
  {
    path: '/catalog',
    meta: {
      activeTypeIndex: 2,
    },
    component: resolve => {
      lazyLoading(resolve, 'catalog')
    },
  },
  {
    path: '/cart',
    meta: {
      activeTypeIndex: 3,
    },
    component: resolve => {
      lazyLoading(resolve, 'cart')
    },
  },
  {
    path: '/goods/:id',
    meta: {
      title: '',
      activeTypeIndex: 4,
    },
    component: resolve => {
      lazyLoading(resolve, 'goods')
    },
  },
  {
    path: '/brandDetail/:id',
    meta: {
      title: '',
      activeTypeIndex: 5,
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
      activeTypeIndex: 6,
    },
    component: resolve => {
      lazyLoading(resolve, 'category')
    },
  },
  {
    path: '/topicDetail/:id',
    meta: {
      title: '',
      activeTypeIndex: 7,
    },
    component: resolve => {
      lazyLoading(resolve, 'topicDetail')
    },
  },
  {
    path: '/ucenter',
    meta: {
      activeTypeIndex: 8,
    },
    component: resolve => {
      lazyLoading(resolve, 'ucenter/index')
    },
  },
  {
    path: '/commentPost/:id',
    meta: {
      activeTypeIndex: 8,
    },
    component: resolve => {
      lazyLoading(resolve, 'commentPost')
    },
  },
]



const lazyLoading = (resolve, name, index = true) => {
  require.ensure([], function(require) {
    resolve(require(`@/views/${name}${index ? '/Index' : ''}.vue`));
  })
}

export default routes
