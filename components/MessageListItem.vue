<template>
  <div
    :class="{ messages__item_me: my }"
    :title="presentDate"
    class="messages__item"
  >
    <el-card v-html="message.text" class="messages__item-text" />
    <span class="messages__item-date">{{ relativeDate }}</span>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      default: () => {}
    },
    my: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    originDate: '',
    relativeDate: '',
    presentDate: '',
    delay: 1000,
    iteration: 1,
    timer: 0
  }),
  mounted() {
    this.setDate()
    this.updateDate()
    this.startTimer()
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  methods: {
    startTimer() {
      const self = this
      this.timer = setTimeout(function update(_this) {
        self.updateDate()
        self.delay = self.updateDelay(self.iteration, self.delay)
        self.iteration++
        self.timer = setTimeout(update, self.delay)
      }, this.delay)
    },
    updateDelay(i, delay) {
      return Math.round(delay * Math.exp(i))
    },
    updateDate() {
      this.relativeDate = this.originDate.fromNow()
    },
    setDate() {
      this.originDate = this.$moment(this.message.date)
      this.presentDate = this.originDate.format('DD-MM-YYYY hh:mm')
    }
  }
}
</script>
