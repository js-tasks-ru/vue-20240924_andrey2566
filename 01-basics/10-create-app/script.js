import { defineComponent, createApp } from 'vue'


const App = defineComponent({
  name: 'App',
  setup() {
    function formatAsLocalDate () {
      return new Date().toLocaleDateString(navigator.language, { dateStyle: 'long' })
    }

    return {
      formatAsLocalDate
    }
  },

  template: `<div>Сегодня {{formatAsLocalDate()}}</div>`,
})

createApp(App).mount('#app')
