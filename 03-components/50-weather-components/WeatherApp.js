import { defineComponent, ref, computed } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'
import WeatherCard from './WeatherCard.js'
import './WeatherApp.css'

export default defineComponent({
  name: 'WeatherApp',
  components: {
    WeatherCard,
  },

  setup() {
    const weather = ref(getWeatherData())
    const weatherConditionIcons = WeatherConditionIcons

    // Функция для получения иконки погоды по id
    const getIcon = id => {
      return weatherConditionIcons[id]
    }

    const calculationWeather = computed(() => {
      return weather.value.map(item => {
        if (item.current.temp) {
          let temp = (item.current.temp - 273.15).toFixed(1)
          item.current.temp = `${temp} °C`
        }
        item.current.calcIcon = getIcon(item.current.weather.id)
        if (item.current.pressure) {
          item.current.pressure = (item.current.pressure * 0.75).toFixed(0)
        }
        if (item.current.dt) {
          item.current.isNight = item.current.dt < item.current.sunrise && item.current.dt < item.current.sunset
        }

        return item
      })
    })

    return {
      calculationWeather,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li v-for="weather in calculationWeather" class="weather-card"
          :class="{ 'weather-card--night': weather.current.isNight }">
          <WeatherCard :weather="weather"/>
        </li>
      </ul>

    </div>
  `,
})
