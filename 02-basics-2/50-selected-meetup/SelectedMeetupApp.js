import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { getMeetup } from './meetupsService.ts'

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const meetups = ref(null)
    const meetupId = ref(1)

    const calcMeetup = computed(() => {
      const result = {}
      if (!meetups.value) return result
      result.title = meetups.value.title || ''
      result.styleOjbect = {
        backgroundImage: `url(${meetups.value.image})`,
      }
      return result
    })

    onMounted(async () => {
      try {
        meetups.value = await getMeetup(meetupId.value)
      } catch (error) {
        console.error(error)
      }
    })

    watch(meetupId, async (newValue) => {
      meetups.value = await getMeetup(newValue)
    })

    return {
      meetups,
      meetupId,
      calcMeetup,
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button
          class="button button--secondary"
          type="button"
          :disabled="meetupId === 1"
          @click="meetupId--"
          >Предыдущий</button>

        <div class="radio-group" role="radiogroup">
          <div class="radio-group__button" v-for="n in 5" :key="n">
            <input
              v-model="meetupId"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="n"
              :id="'meetup-id-'+ n"
            />
            <label :for="'meetup-id-'+ n" class="radio-group__label">{{ n }}</label>
          </div>
        </div>

        <button
          class="button button--secondary"
          :disabled="meetupId === 5"
          type="button"
          @click="meetupId++"
          >Следующий</button>
      </div>

      <div class="meetup-selector__cover">
        <div class="meetup-cover" :style="calcMeetup.styleOjbect">
          <h1 class="meetup-cover__title">{{ calcMeetup.title }}</h1>
        </div>
      </div>

    </div>
  `,
})
