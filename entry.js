import Vue from 'vue'
import plugins from './src/index'
Vue.use(plugins)

new Vue({
  template: `
  <div id="app">
    <h1>Notify test buttons</h1>
    <div>
      <button class="btn" @click.prevent.stop="info">Info</button>
      <button class="btn" @click.prevent.stop="error">Error</button>
      <button class="btn" @click.prevent.stop="primary">Primary</button>
    </div>
    <h1>Alert test buttons</h1>
    <div>
      <button class="btn" @click.prevent.stop="alert_info">Info</button>
      <button class="btn" @click.prevent.stop="alert_error">Error</button>
      <button class="btn" @click.prevent.stop="alert_primary">Primary</button>
    </div>
    <h1>Modal test buttons</h1>
    <div>
      <button class="btn" @click.prevent.stop="modalStatus=true">Active</button>
      <button class="btn" @click.prevent.stop="modalStatus=false">Deactive</button>
    </div>
    <cs-modal
      :active="modalStatus"
      @cancel="onCancel"
      @confirm="onConfirm"
    >
      <h1 slot="header">Question</h1>
      <div>Do you like it?</div>
      <p slot="footer">It's up to <em>you</em>.</p>
    </cs-modal>
  </div>
  `,
  data () {
    return {
      modalStatus: false
    }
  },
  methods: {
    info () {
      this.$notify('Info message', 'info', {permanent: true})
    },
    error () {
      this.$notify('Long long Long long Long long Long long Error message', 'error')
    },
    primary () {
      this.$notify('Primary message', 'primary')
    },
    alert_info () {
      this.$alert('Info message', 'info', {permanent: true})
    },
    alert_error () {
      this.$alert('Long long Long long Long long Long long Error message', 'error', {width: 500})
    },
    alert_primary () {
      this.$alert('Primary message', 'primary')
    },
    onCancel () {
      this.$alert('You don\'t like it.', 'error', {visibility: 3000})
      this.$notify('Tips: Click continually untill you like it.', 'info', {visibility: 4000})
      console.log('cancel', this.modalStatus)
      this.modalStatus = false
    },
    onConfirm () {
      this.$alert('Cool, you like it.', 'primary')
      console.log('confirm', this.modalStatus)
      this.modalStatus = false
    }
  }
}).$mount('#app')
