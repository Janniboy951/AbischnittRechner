<template>
  <input
    type="number"
    min="0"
    max="15"
    :value="modelValue"
    @keypress="preventNonNumValues"
    @input="$emit('update:modelValue', parseInt($event.target.value))"
    :class="{ usedMark: courseUsed, error: !valid }"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "MarksInputComponent",
  props: {
    modelValue: {
      type: Number,
      default: 0,
      required: true,
    },
    courseUsed: Boolean,
  },
  data() {
    return { valid: true };
  },
  emits: ["update:modelValue"],
  watch: {
    modelValue() {
      //Validate
      if (this.modelValue > 15 || this.modelValue < 0) {
        this.valid = false;
      } else {
        this.valid = true;
      }
    },
  },
  methods: {
    preventNonNumValues(e: KeyboardEvent) {
      if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
      }
    },
  },
});
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
  text-align: center;
  font-family: "Century Gothic", sans-serif;
  outline: 0;
  background: none;
  width: 4ch;
  border: none;
  padding: 5px;
  box-sizing: border-box;
  font-size: 18px;
}
input[type="number"]:focus {
  background: #f2f2f2;
}
.usedMark {
  border: 1px solid black !important;
}
.error {
  color: red;
  font-weight: bold;
}
</style>