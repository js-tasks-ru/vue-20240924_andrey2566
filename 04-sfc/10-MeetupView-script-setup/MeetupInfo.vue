<script>
import { computed, defineComponent } from 'vue'
import { UiIcon } from '@shgk/vue-course-ui'

export default defineComponent({
  name: 'MeetupInfo',

  components: {
    UiIcon,
  },

  props: {
    organizer: {
      type: String,
    },

    place: {
      type: String,
    },

    date: {
      type: Number,
    },
  },

  setup(props) {
    const isoDate = computed(() => new Date(props.date).toISOString().slice(0, 10))
    const localDate = computed(() =>
      new Date(props.date).toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    )
    return {
      isoDate,
      localDate,
    }
  },
})
</script>

<template>
  <ul class="meetup-info">
    <li>
      <UiIcon icon="user" class="meetup-info__icon" />
      {{ organizer }}
    </li>
    <li>
      <UiIcon icon="map" class="meetup-info__icon" />
      {{ place }}
    </li>
    <li>
      <UiIcon icon="cal-lg" class="meetup-info__icon" />
      <time :datetime="isoDate">{{ localDate }}</time>
    </li>
  </ul>
</template>

<style scoped>
.meetup-info {
  margin: 0;
  padding: 0;
}

.meetup-info li {
  list-style-type: none;
  position: relative;
  padding-left: 36px;
  font-size: 18px;
  line-height: 28px;
  margin: 0 0 8px;
}

.meetup-info li:last-child {
  margin: 0;
}

.meetup-info__icon {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
