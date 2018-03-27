const Application = require('thinkjs');
const babel = require('think-babel');
const watcher = require('think-watcher');
const notifier = require('node-notifier');

const instance = new Application({
  ROOT_PATH: __dirname,
  watcher: watcher,
  transpiler: [babel, {
    presets: ['think-node']
  }],
  notifier: notifier.notify.bind(notifier),
  env: 'development'
});

instance.run();


// 上传图片的路径，如果不存在，则创建。
const uploadImgDictory  = './www/static/upload/brand'
const fs = require('fs-extra')
fs.ensureDir(uploadImgDictory) 
.then(() => {
  console.log('success!')
})
.catch(err => {
  console.error(err)
})
