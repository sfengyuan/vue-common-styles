<template>
  <div class="notify" :class="'notify-' + options.position">
    <transition-group name="notify" tag="div">
      <div v-for="(item, key) in items"
        :key="key"
        :class="'notify-item-' + item.type"
        class="notify-item"
        :style="'width:' + item.options.width"
      >
        <span class="notify-icon" :class="'notify-icon-' + item.type"></span>
        <div v-if="item.options.html" v-html="item.text"></div>
        <span v-else class="notify-text">{{ item.msg }}</span>
        <button type="button" aria-label="Close"
          v-if="item.options.closeButton || item.options.permanent"
          @click="remove(key)"
          class="notify-close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </transition-group>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  data () {
    return {
      options: {
        duration: 500,
        visibility: 2000,
        position: 'top-right',
        html: false,
        permanent: false,
        width: '300px'
      },
      items: {}
    }
  },
  methods: {
    add (msg, type = 'info', options) {
      const opt = {...this.options, ...options}
      const id = new Date().getTime()

      Vue.set(this.items, id, {type, msg, options: opt})
      if (!opt.permanent) {
        setTimeout(() => this.remove(id), opt.duration + opt.visibility)
      }
    },
    remove (id) {
      Vue.delete(this.items, id)
    }
  }
}
</script>
<style lang="stylus">
  .notify
    z-index 9999
    position fixed
  .notify-top-left
    top 0
    left 0
  .notify-top-right
    top 0
    right 0
  .notify-bottom-left
    bottom 0
    left 0
  .notify-bottom-right
    bottom 0
    right 0
  .notify-item
    position relative
    padding 15px
    border-radius 5px
    margin 5px
    color #fff
    box-shadow 3px 1px 3px 0px rgba(0,0,0,0.3)
  .notify-text
    text-shadow 1px 1px 0px rgba(0,0,0,0.2)
  .notify-close
    appearance none
    outline none
    background none
    border none
    padding none
    vertical-align baseline
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    position absolute
    top 0
    right 0
    color #666
    span
      font-size 30px
      line-height 1
      text-shadow: 2px 2px 3px rgba(255,255,255,0.1)
    span:hover
      cursor pointer
  .notify-item-info
    background #92C7A3
  .notify-item-error
    background #D74F33
  .notify-item-primary
    background #1E8C93
  .notify-icon
    position relative
    top 3px
    display inline-block
    background-size contain
    width 18px
    height 18px
    margin-right 5px
  .notify-icon-info
    background-image url(../assets/info.svg)
  .notify-icon-error
    background-image url(../assets/error.svg)
  .notify-item
    transition all 1s
  .notify-enter, .notify-leave-to
    opacity 0
    transform: translateY(-10px)
  .notify-leave-active
    position absolute
</style>
