<template>
  <table>
    <tr>
      <th class="largeTitle" colspan="7">Quali Block 1</th>
    </tr>
    <tr>
      <th>Fach</th>
      <th>11 / 2</th>
      <th>12 / 1</th>
      <th>12 / 2</th>
      <th>13 / 1</th>
      <th>Anzahl eingebr. Kurse</th>
      <th>Eingebr. Punktzahl</th>
    </tr>
    <tr v-for="(subject, index) in ownSubjects" :key="index">
      <td>
        {{ index &lt; 3 ? "LK" : (index &lt; 10 ? "GK" :"Freiwillig")}}
        {{ subject }}
      </td>
      <td>
        <input
          type="number"
          min="0"
          max="15"
          v-model="marks['11_2'][subject]"
          :class="usedCourses[index][0] != 0 && 'usedMark'"
        />
      </td>
      <td>
        <input
          type="number"
          min="0"
          max="15"
          v-model="marks['12_1'][subject]"
          :class="usedCourses[index][1] != 0 && 'usedMark'"
        />
      </td>
      <td>
        <input
          type="number"
          min="0"
          max="15"
          v-model="marks['12_2'][subject]"
          :class="usedCourses[index][2] != 0 && 'usedMark'"
        />
      </td>
      <td>
        <input
          type="number"
          min="0"
          max="15"
          v-model="marks['13_1'][subject]"
          :class="usedCourses[index][3] != 0 && 'usedMark'"
        />
      </td>
      <td>{{ getUsedCourseNum(index) }}</td>
      <td>{{ getSubjectPoints(index, subject) }}</td>
    </tr>
    <tr>
      <td>
        <select name="subject" id="subject" v-model="newSubject">
          <option
            v-for="(subject, index) in subjects"
            :key="index"
            :name="subject"
          >
            {{ subject }}
          </option>
        </select>
        <button @click="ownSubjects.push(newSubject)">Fach hinzufügen</button>
      </td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </table>
  <h1>Durchschnitt: {{ mean }}</h1>
  <h1>Anzahl Kurse: {{ usedCourses }}</h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { calcMark } from "@/scripts/MarkCalculator";
import { SubjectName, SubjName, SubjNames } from "@/scripts/Types";
import { sum } from "@/scripts/helper";

export default defineComponent({
  name: "HelloWorld",
  props: {},
  data() {
    return {
      newSubject: "",
      subjects: [
        "Deutsch",
        "Englisch",
        "Latein",
        "Französisch",
        "Spanisch",
        "Mathe",
        "Chemie",
        "Physik",
        "Biologie",
        "Informatik",
        "Musik",
        "Kunst",
        "DS",
        "Sport",
        "Geschichte",
        "Sozialkunde",
        "Erdkunde",
        "Religion/ Ethik",
      ] as SubjectName[],
      ownSubjects: [
        "Physik",
        "Mathe",
        "Sozialkunde",
        "Deutsch",
        "Latein",
        "Informatik",
        "Musik",
        "Sport",
        "Geschichte",
        "Religion/ Ethik",
        "Englisch",
      ] as SubjectName[],
      marks: {
        "11_2": {
          Physik: 15,
          Mathe: 15,
          Sozialkunde: 15,
          Deutsch: 14,
          Latein: 12,
          Informatik: "",
        },
        "12_1": {
          Physik: 15,
          Mathe: 15,
          Sozialkunde: 15,
          Deutsch: 14,
          Latein: 12,
        },
        "12_2": {
          Physik: 15,
          Mathe: 15,
          Sozialkunde: 15,
          Deutsch: 14,
          Latein: 12,
        },
        "13_1": {
          Physik: 15,
          Mathe: 15,
          Sozialkunde: 15,
          Deutsch: 14,
          Latein: 12,
        },
      } as SubjNames,
      mean: 0,
      usedCourses_1: 0,
      usedCourses: [
        [2, 2, 2, 2],
        [0, 1, 1, 1],
        [1, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    };
  },
  watch: {
    marks: {
      handler(val) {
        [this.mean, this.usedCourses_1] = calcMark(
          this.marks,
          this.ownSubjects
        );
      },
      deep: true,
    },
  },
  methods: {
    getUsedCourseNum(index: number) {
      return this.usedCourses[index].filter((x: number) => x > 0).length;
    },
    getSubjectPoints(index: number, name: keyof SubjName): string {
      const pointSum: number =
        this.usedCourses[index][0] * this.marks["11_2"][name] +
        this.usedCourses[index][1] * this.marks["12_1"][name] +
        this.usedCourses[index][2] * this.marks["12_2"][name] +
        this.usedCourses[index][3] * this.marks["13_1"][name];
      if (sum(this.usedCourses[index]) == 8) {
        return (pointSum / 2).toString() + " * 2 = " + pointSum.toString();
      }
      return pointSum.toString();
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  width: 100%;
  border: 1px solid black;
  border-collapse: collapse;
}

td,
th {
  width: 14.2%;
  border: none;
  padding: 10px;
  background-color: #ddd;
}
th {
  background-color: #333;
  color: #f00;
  text-align: center;
  font-weight: bold;
  font-size: large;
  border: none;
}
.largeTitle {
  font-size: x-large;
}
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
  width: 3ch;
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
</style>
