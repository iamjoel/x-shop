import Vue from 'vue'

// 获取资源服务器的图片
import {IMGS_PREFIX, BASIC_CONFIG} from '@/setting'
Vue.filter('img', function (value, size) {
  return `${IMGS_PREFIX}/${size === 'small' ? 'thumb_img/' : ''}${value}`
})

import moment from 'moment'
Vue.filter('time', function (value, format="YYYY-MM-DD") {
  return moment(value).format(format)
})

Vue.filter('money', function (value) {
  if(value === null) {
    return 0
  }
  var res = value / 100
  return isNaN(res) ? '非法金额' : res
})

import * as dict from '@/dict'
Vue.filter('dict', function (value, key) {
  if(!dict[key]) {
    return `未知key: ${key}`
  }
  var res = dict[key].filter(item => item.id == value)[0]
  return res ? res.name : `未知id: ${value}`
})