<template>
  <div class="alert" ref="alert">
    <transition-group name="alert" tag="div">
      <div v-for="(item, key) in items"
        :key="key"
        :class="'alert-item-' + item.type"
        class="alert-item"
        :style="'width:' + options.width + 'px'"
      >
        <span class="alert-icon" :class="'alert-icon-' + item.type"></span>
        <span class="alert-text">{{ item.msg }}</span>
        <button type="button" aria-label="Close"
          v-if="item.options.closeButton || item.options.permanent"
          @click="remove(key)"
          class="alert-close"
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
        permanent: false,
        width: '300'
      },
      items: {}
    }
  },
  methods: {
    add (msg, type = 'info', options) {
      const opt = Object.assign({}, this.options, options)
      const id = new Date().getTime()

      Vue.set(this.items, id, {type, msg, options: opt})
      if (!opt.permanent) {
        setTimeout(() => this.remove(id), opt.duration + opt.visibility)
      }
    },
    remove (id) {
      Vue.delete(this.items, id)
    }
  },
  mounted () {
    const alert = this.$refs.alert
    alert.style.left = ((window.innerWidth - this.options.width) / 2) + 'px'
  }
}
</script>
<style lang="stylus">
  .alert
    // transition all
    position fixed
    top 0
    z-index 9999
  .alert-item
    position relative
    margin 5px auto
    padding 15px
    border-radius 3px
    color #fff
    box-shadow 0px 3px 3px 0px rgba(0,0,0,0.3)
  .alert-text
    text-shadow 1px 1px 0px rgba(0,0,0,0.2)
  .alert-close
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
  .alert-item-info
    background #92C7A3
  .alert-item-error
    background #D74F33
  .alert-item-primary
    background #1E8C93
  .alert-icon
    position relative
    top 3px
    display inline-block
    background-size contain
    width 18px
    height 18px
    margin-right 5px
  .alert-icon-info
    background-image url(../assets/info.svg)
  .alert-icon-error
    background-image url(../assets/error.svg)
  .alert-item
    transition all 1s
  .alert-enter, .alert-leave-to
    opacity 0
  .alert-leave-active
    position absolute
</style>
