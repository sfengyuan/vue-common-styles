<template>
  <div class="cs-modal">
    <transition-group name="modal" tag="div">
      <div key="mask" class="mask" v-show="isShow" @click="clickMask"></div>
      <div key="modal" class="modal" v-show="isShow" ref="modal">
        <header class="header" v-if="!opt.noHeader">
          {{ opt.title }}
        </header>
        <main class="body">
          <slot>Use slot to pass content to modal.</slot>
        </main>
        <div class="buttons" v-if="!opt.noButton">
          <button class="btn-cancel"
            @click.stop.prevent="onClick('cancel')"
            v-if="!opt.noCancel"
          >
            {{opt.cancelText}}
          </button>
          <button class="btn-confirm"
            @click.stop.prevent="onClick('confirm')"
            v-if="!opt.noConfirm"
          >
            {{opt.confirmText}}
          </button>
        </div>
        <footer class="footer" v-if="!opt.noFooter">
          {{ opt.footer }}
        </footer>
      </div>
    </transition-group>
  </div>
</template>
<script>
export default {
  name: 'cs-modal',
  props: {
    active: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    opt () {
      const defaults = {
        noHeader: false,
        noFooter: false,
        noButton: false,
        noCancel: false,
        noConfirm: false,
        cancelText: 'Cancel',
        confirmText: 'Confirm',
        title: 'Tip',
        footer: 'Check this out.'
      }
      return Object.assign({}, defaults, this.options)
    }
  },
  methods: {
    onClick (btn) {
      this.close(btn)
    },
    close (btn) {
      this.isShow = false
      this.$emit(btn)
    },
    clickMask () {
      if (!this.options.noCancel) {
        this.close('cancel')
      }
    },
    onKeydown (evt) {
      if (this.isShow && !this.options.noCancel && evt.keyCode === 27) {
        this.close('cancel')
      }
    }
  },
  data () {
    return {
      isShow: false
    }
  },
  watch: {
    active (val) {
      this.isShow = val
    }
  },
  mounted () {
    document.addEventListener('keydown', this.onKeydown)
  },
  beforeDestory () {
    document.removeEventListener('keydown', this.onKeydown)
  }
}
</script>
<style lang="stylus">
.cs-modal
  position fixed
  top 0
  left 0
  right 0
  .mask
    z-index 2000
    transition opacity 500ms ease
    background #333
    opacity .5
    position fixed
    top 0
    left 0
    right 0
    bottom 0
  .modal
    transition opacity 500ms ease
    box-shadow 0px 3px 13px 1px rgba(0,0,0,0.3)
    position relative
    max-width 350px
    margin 30px auto
    z-index 9999
    background #FFF
    border-radius 3px
  .header
    background #eee
    border-bottom 1px solid #ddd
    border-top-left-radius 3px
    border-top-right-radius 3px
    padding 14px
    font-size 14px
    color #666
  .body
    color #333
    padding 0 14px
    margin 14px 0
  .buttons
    text-align right
    padding 0 14px
    margin 16px 0 14px 0
  .footer
    border-bottom-left-radius 3px
    border-bottom-right-radius 3px
    border-top 1px solid #ddd
    padding 14px
    font-size 12px
    color #666
  button
    appearance none
    outline none
    background none
    border none
    padding none
    vertical-align baseline
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    border 1px solid #eee
    padding 8px 12px
    color #FFF
    border-radius 3px
  button:hover
    cursor pointer
  .btn-cancel
    background #666
  .btn-confirm
    background #1E8C93
  .modal-enter
    opacity 0
  .modal-leave-active
    opacity 0
</style>
