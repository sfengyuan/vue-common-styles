# Vue common styles/component

Alert, notification and modal component.

## Demo

[Demo Link][1]

[1]:https://sfengyuan.github.io/vue-common-styles/

## Install

```shell
yarn add vue-common-styles
//or
npm install vue-common-styles
```

## Usages

```js
import Vue from 'vue'
import vcs from 'vue-common-styles'
// or
// import {alert, notify, modal} from 'vue-common-styles'
Vue.use(vcs)

new Vue ({
  template: `
    <cs-modal
      :active="modalStatus"
      :options="options"
      @cancel="onCancel"
      @confirm="onConfirm"
    >
      <div>Do you like it?</div>
    </cs-modal>
  `,
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
})
```

## License

MIT
