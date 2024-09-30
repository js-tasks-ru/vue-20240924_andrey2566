import { defineComponent, createApp } from 'vue'


const App = defineComponent({
  name: 'App',
  methods: {
    formatAsLocalDate () {
      return new Date().toLocaleDateString(navigator.language, { dateStyle: 'long' })
    }
  },

  template: `<div>Сегодня {{formatAsLocalDate()}}</div>`,
})

createApp(App).mount('#app')
