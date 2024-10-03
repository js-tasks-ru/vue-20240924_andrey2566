import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const mathOperations = {
      sum: function (x, y) { return x + y },
      subtract: function (x, y) { return x - y },
      multiply: function (x, y) { return x * y },
      divide: function (x, y) { return x / y },
    }
    const operand = ref({ first: 0, second: 0, })
    const operator = ref('')

    const sum = computed(() => {
      if (!operator.value) return 0
      return mathOperations[operator.value](operand.value.first, operand.value.second)
    })

    return {
      operand,
      operator,
      sum,
    }
  },

  template: `
    <div class="calculator">
      <input type="number" aria-label="First operand" v-model="operand.first" />

      <div class="calculator__operators">
        <label><input type="radio" name="operator" value="sum" v-model="operator"/>➕</label>
        <label><input type="radio" name="operator" value="subtract"  v-model="operator"/>➖</label>
        <label><input type="radio" name="operator" value="multiply"  v-model="operator"/>✖</label>
        <label><input type="radio" name="operator" value="divide"  v-model="operator"/>➗</label>
      </div>

      <input type="number" aria-label="Second operand" v-model="operand.second"/>

      <div>=</div>

      <output>{{ sum }}</output>
    </div>
  `,
})
