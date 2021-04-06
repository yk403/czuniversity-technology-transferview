import ElementUI from 'element-ui'
import Vue from 'vue'

import { Message } from 'element-ui'

Message.duration = 3000

Vue.use(ElementUI)

const v = new Vue()

export const success = message => {
  Message.success(message)
  // v.$notify({
  //   title: '成功',
  //   message: message,
  //   type: 'success',
  //   duration: 2000
  // })
}

export const warning = message => {
  v.$message({
   // title: '警告',
    message: message,
    type: 'warning'
   // duration: 2000
  })
}

export const failed = message => {
  v.$notify.info({
    title: '消息',
    message: message,
    duration: 2000
  })
}

export const error = msg => {
  Message.error(msg)

  // v.$notify.error({
  //   title: '错误',
  //   message: msg,
  //   duration: 2000
  // })
}

export const warn = msg =>{
  Message.warn(msg)
}

