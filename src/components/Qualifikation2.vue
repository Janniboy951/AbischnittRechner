<template>
  <tr>
    <th class="largeTitle" colspan="4">Qualifikation Block II</th>
    <th class="largeTitle" colspan="3">Gesamtqualifikation</th>
  </tr>
  <tr>
    <th>Fach</th>
    <th>schriftlich</th>
    <th>mündlich</th>
    <th>
      Gewichtung {{ subjectsMuendlich.length == 1 ? "fünffach" : "vierfach" }}
    </th>
    <slot></slot>
  </tr>
  <tr v-for="i in 3" :key="i">
    <td>{{ ownSubjects[i - 1] }}</td>
    <td><MarkInputComponent v-model="singlePointsQuali2[i - 1]" /></td>
    <td></td>
    <td>
      {{
        subjectsMuendlich.length == 1
          ? singlePointsQuali2[i - 1] * 5
          : singlePointsQuali2[i - 1] * 4
      }}
    </td>
  </tr>
  <tr v-for="(subject, i) in subjectsMuendlich" :key="i">
    <td>{{ subject }}</td>
    <td class="unusedField"></td>
    <td><MarkInputComponent v-model="singlePointsQuali2[i + 3]" /></td>
    <td>
      {{
        subjectsMuendlich.length == 1
          ? singlePointsQuali2[i + 3] * 5
          : singlePointsQuali2[i + 3] * 4
      }}
    </td>
  </tr>
  <tr>
    <td class="resultField"></td>
    <td class="resultField"></td>
    <td class="resultField"></td>
    <td class="resultField">Summe: {{ getTotalQuali2() }}</td>
  </tr>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import MarkInputComponent from "@/components/MarkInputComponent.vue";
import { SubjectName } from "@/scripts/Types";
import { sum } from "@/scripts/helper";

export default defineComponent({
  name: "Qualifikation2",
  components: {
    MarkInputComponent,
  },
  props: ["subjectsMuendlich", "ownSubjects"],
  data() {
    return {
      singlePointsQuali2: [0, 0, 0, 0, 0],
    };
  },
  watch: {},
  methods: {
    getTotalQuali2() {
      let res;
      if (this.subjectsMuendlich.length == 1) {
        this.singlePointsQuali2[4] = 0;
      }
      if (this.subjectsMuendlich.length == 1) {
        res = sum(this.singlePointsQuali2.map((x) => x * 5));
      } else {
        res = sum(this.singlePointsQuali2.map((x) => x * 4));
      }
      this.$emit("pointsChange", res);
      return res;
    },
  },
});
</script>
<style scoped>
.unusedField {
  background-color: #ccc;
}
</style>