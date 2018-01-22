import alertVue from './alert.vue'

export default {
  install (Vue, options) {
    const VueExtended = Vue.extend(alertVue)
    const Alert = new VueExtended()
    Alert.options = Object.assign({}, Alert.options, options)
    document.querySelector('body').appendChild(Alert.$mount().$el)
    Vue.prototype.$alert = Alert.add
  }
}
