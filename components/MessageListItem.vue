<template>
  <div :class="{ messages__item_me: my }" :title="presentDate" class="messages__item">
    <el-card v-html="text" class="messages__item-text" />
    <span class="messages__item-date">{{ relativeDate }}</span>
    <!--    {{ iteration }}-->
    <!--    {{ $moment.duration(delay).asSeconds() }}-->
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
  computed: {
    text() {
      return this.message.parts.find(part => part.partType === 'inline').payload.content
    }
  },
  mounted() {
    this.setDate()
    this.updateDate()
    this.startTimer()
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    startTimer() {
      this.delay = this.updateDelay(+this.$moment() - +this.originDate)
      this.timer = setInterval(this.update, this.delay)
    },
    update() {
      this.updateDate()
      // function updateDelay(delay) {
      //   if (delay < 60000) {
      //     return 1000
      //   } else if (delay < 3600000) {
      //     return 60000
      //   } else if (delay < 43200000) {
      //     return 3600000
      //   } else {
      //     return 86400000
      //   }
      // }
      this.delay = this.updateDelay(this.delay, this.iteration)

      this.iteration++
    },
    updateDelay(delay) {
      if (delay < 60000) {
        return 1000 / 3
      } else if (delay < 3600000) {
        return 60000 / 4
      } else if (delay < 43200000) {
        return 3600000
      } else {
        return 86400000
      }
    },
    updateDate() {
      this.relativeDate = this.originDate.fromNow()
    },
    setDate() {
      this.originDate = this.$moment(this.message.createdAt)
      this.presentDate = this.originDate.format('dddd MMM DD-MM-YYYY HH:mm:ss Z')
    }
  }
}
</script>
