<template>
  <th colspan="3" rowspan="7">
    <table class="resTable">
      <tr>
        <th>Summe</th>
        <th>&Oslash;</th>
      </tr>
      <tr>
        <th>{{ gesamtpunktzahl }}</th>
        <th>{{ abiDurchschnitt }}</th>
      </tr>
    </table>
  </th>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getAbiDurchschnitt } from "@/scripts/GradeTable";

export default defineComponent({
  name: "QualifikationGesamt",
  props: {
    gesamtpunktzahl: { type: Number, default: 0, required: true },
  },
  data() {
    return {
      abiDurchschnitt: "nicht bestanden",
    };
  },
  watch: {
    gesamtpunktzahl() {
      if (this.gesamtpunktzahl != undefined) {
        this.abiDurchschnitt = getAbiDurchschnitt(this.gesamtpunktzahl);
      }
    },
  },
});
</script>
<style scoped>
.resTable th {
  font-size: xx-large;
}
</style>