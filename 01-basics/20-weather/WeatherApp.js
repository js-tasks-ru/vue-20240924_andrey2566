import { defineComponent, ref, computed } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

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
          <div v-if="weather.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ weather.alert.sender_name }}: {{ weather.alert.description }}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
            {{ weather.geographic_name }}
            </h2>
            <div class="weather-card__time">
            {{ weather.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="weather.current.weather.description">{{ weather.current.calcIcon }}</div>
            <div class="weather-conditions__temp">{{ weather.current.temp }}</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ weather.current.pressure }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ weather.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ weather.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ weather.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
