import Notify from './notify/notify'
import Alert from './alert/alert'
import Modal from './modal/modal.vue'

const components = {
  Notify,
  Alert
}

const install = (Vue, options = {}) => {
  for (const item in components) {
    if (components.hasOwnProperty(item)) {
      const component = components[item]
      component.install(Vue, options)
    }
  }
  Vue.component(Modal.name, Modal)
}

export default {
  install
}

export const notify = Notify
export const alert = Alert
export const modal = Modal
