import { defineComponent, onMounted, ref, onUnmounted } from 'vue'
function formatAsLocalDate() {
  return new Date().toLocaleTimeString(navigator.language, { timeStyle: 'medium' })
}

export default defineComponent({
  name: 'UiClock',

  setup() {
    const date = ref(formatAsLocalDate())
    let interval

    onMounted(() => {
      interval = setInterval(function () {
        date.value = formatAsLocalDate()
      }, 1000)
    })

    onUnmounted(() => clearInterval(interval))

    return {
      date,
    }
  },

  template: `<div class="clock">{{ date }}</div>`,
})
