import notifyVue from './notify.vue'

export default {
  install (Vue, options) {
    const VueExtended = Vue.extend(notifyVue)
    const Notify = new VueExtended()
    Notify.options = Object.assign({}, Notify.options, options)
    document.querySelector('body').appendChild(Notify.$mount().$el)
    Vue.prototype.$notify = Notify.add
  }
}
