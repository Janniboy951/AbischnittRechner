<template>
  <table class="mainTable">
    <tr>
      <th class="largeTitle" colspan="7">Qualifikation Block I</th>
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
        {{ index &lt; 3 ? "LK" : "GK" }}
        {{ subject }}
        <input
          type="checkbox"
          name="muendlich"
          v-if="index &gt; 2"
          title="Mündliches ABI?"
          @input="(e) => muendlichChange(e, subject)"
        />
      </td>
      <td>
        <MarkInputComponent
          :courseUsed="usedCourses[index][0] != 0"
          v-model="marks[subject]['11_2']"
        />
      </td>
      <td>
        <MarkInputComponent
          :courseUsed="usedCourses[index][1] != 0"
          v-model="marks[subject]['12_1']"
        />
      </td>
      <td>
        <MarkInputComponent
          :courseUsed="usedCourses[index][2] != 0"
          v-model="marks[subject]['12_2']"
        />
      </td>
      <td>
        <MarkInputComponent
          :courseUsed="usedCourses[index][3] != 0"
          v-model="marks[subject]['13_1']"
        />
      </td>
      <td class="leftBorder">{{ getUsedCourseNum(index) }}</td>
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
      <td class="leftBorder resultField">{{ getTotalUsedCourseNum() }}</td>
      <td class="resultField">
        {{ Math.round((getTotalPointSum() / 44) * 40) }}
      </td>
    </tr>
    <Qualifikation2Component
      :subjectsMuendlich="subjectsMuendlich"
      :ownSubjects="ownSubjects"
      @pointsChange="(res) => (this.pointsQuali2 = res)"
    >
      <QualifikationGesamtComponent
        :gesamtpunktzahl="pointsQuali1 + pointsQuali2"
    /></Qualifikation2Component>
  </table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  ersteFremdsprache,
  ersteGesellschaftwissenschaft,
  ersteNaturwissenschaft,
  fillCourses,
  kuenstlerischesFach,
  lks,
  muendlich,
  pflichtfach,
  zweitesFach,
} from "@/scripts/MarkCalculator";
import { SubjectName, Marks } from "@/scripts/Types";
import { sum } from "@/scripts/helper";
import MarkInputComponent from "@/components/MarkInputComponent.vue";
import QualifikationGesamtComponent from "@/components/QualifikationGesamt.vue";
import Qualifikation2Component from "@/components/Qualifikation2.vue";
import { getAbiDurchschnitt } from "@/scripts/GradeTable";

export default defineComponent({
  name: "HelloWorld",
  props: {},
  components: {
    MarkInputComponent,
    QualifikationGesamtComponent,
    Qualifikation2Component,
  },
  data() {
    return {
      newSubject: "",
      abiDurchschnitt: "nicht bestanden",
      pointsQuali1: 0,
      pointsQuali2: 0,

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
        "Religion_Ethik",
      ] as SubjectName[],
      ownSubjects: [] as SubjectName[],
      marks: {
        Deutsch: {
          "11_2": 0,
          "12_1": 0,
          "12_2": 0,
          "13_1": 0,
        },
        Englisch: {
          "11_2": 0,
          "12_1": 0,
          "12_2": 0,
          "13_1": 0,
        },
        Latein: {
          "11_2": 0,
          "12_1": 0,
          "12_2": 0,
          "13_1": 0,
        },
        Französisch: {
          "11_2": 0,
          "12_1": 0,
          "12_2": 0,
          "13_1": 0,
        },
        Spanisch: {
          "11_2": 0,
          "12_1": 0,
          "12_2": 0,
          "13_1": 0,
        },
        Mathe: {
          "11_2": 0,
          "12_1": 0,
          "12_2": 0,
          "13_1": 0,
        },
        Chemie: {
          "11_2": 0,
          "12_1": 0,
          "12_2": 0,
          "13_1": 0,
        },
        Physik: {
          "11_2": 0,
          "12_1": 0,
          "12_2": 0,
          "13_1": 0,
        },
        Biologie: {
          "11_2": 0,
          "12_1": 0,
          "12_2": 0,
          "13_1": 0,
        },
        Informatik: {
          "11_2": 0,
          "12_1": 0,
          "12_2": 0,
          "13_1": 0,
        },
        Musik: {
          "11_2": 0,
          "12_1": 0,
          "12_2": 0,
          "13_1": 0,
        },
        Kunst: {
          "11_2": 0,
          "12_1": 0,
          "12_2": 0,
          "13_1": 0,
        },
        DS: {
          "11_2": 0,
          "12_1": 0,
          "12_2": 0,
          "13_1": 0,
        },
        Sport: {
          "11_2": 0,
          "12_1": 0,
          "12_2": 0,
          "13_1": 0,
        },
        Geschichte: {
          "11_2": 0,
          "12_1": 0,
          "12_2": 0,
          "13_1": 0,
        },
        Sozialkunde: {
          "11_2": 0,
          "12_1": 0,
          "12_2": 0,
          "13_1": 0,
        },
        Erdkunde: {
          "11_2": 0,
          "12_1": 0,
          "12_2": 0,
          "13_1": 0,
        },
        Religion_Ethik: {
          "11_2": 0,
          "12_1": 0,
          "12_2": 0,
          "13_1": 0,
        },
      } as Marks,
      mean: 0,
      usedCourses_1: 0,
      subjectsMuendlich: [] as SubjectName[],
      usedCourses: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      singlePointsQuali2: [0, 0, 0, 0, 0],
    };
  },
  watch: {
    pointsQuali1() {
      this.abiDurchschnitt = getAbiDurchschnitt(
        this.pointsQuali1 + this.pointsQuali2
      );
    },
    pointsQuali2() {
      this.abiDurchschnitt = getAbiDurchschnitt(
        this.pointsQuali1 + this.pointsQuali2
      );
    },
    marks: {
      handler() {
        this.usedCourses = [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ];
        [this.usedCourses[0], this.usedCourses[1], this.usedCourses[2]] = lks(
          this.ownSubjects,
          this.marks
        );
        this.usedCourses = pflichtfach(
          this.ownSubjects,
          this.usedCourses,
          "Deutsch"
        );
        this.usedCourses = pflichtfach(
          this.ownSubjects,
          this.usedCourses,
          "Mathe"
        );
        this.usedCourses = muendlich(
          this.ownSubjects,
          this.subjectsMuendlich,
          this.usedCourses
        );
        kuenstlerischesFach(this.ownSubjects, this.usedCourses, this.marks);
        ersteFremdsprache(
          this.ownSubjects,
          this.usedCourses,
          this.marks,
          this.subjectsMuendlich
        );
        ersteNaturwissenschaft(
          this.ownSubjects,
          this.usedCourses,
          this.marks,
          this.subjectsMuendlich
        );
        ersteGesellschaftwissenschaft(
          this.ownSubjects,
          this.usedCourses,
          this.marks,
          this.subjectsMuendlich
        );
        zweitesFach(this.ownSubjects, this.usedCourses, this.marks);
        fillCourses(this.ownSubjects, this.usedCourses, this.marks);
      },
      deep: true,
    },
  },
  methods: {
    getTotalUsedCourseNum() {
      let res = 0;
      for (let i = 0; i < this.usedCourses.length; i++) {
        res += this.getUsedCourseNum(i);
      }
      return res;
    },
    getTotalPointSum() {
      let res = 0;
      for (let i = 0; i < this.ownSubjects.length; i++) {
        const name = this.ownSubjects[i];

        if (this.marks[name] == undefined) {
          return 0;
        }
        const pointSum: number =
          this.usedCourses[i][0] * this.marks[name]!["11_2"] +
          this.usedCourses[i][1] * this.marks[name]!["12_1"] +
          this.usedCourses[i][2] * this.marks[name]!["12_2"] +
          this.usedCourses[i][3] * this.marks[name]!["13_1"];

        res += pointSum;
      }
      this.pointsQuali1 = Math.round((res / 44) * 40);
      return res;
    },
    getUsedCourseNum(index: number) {
      return this.usedCourses[index].filter((x: number) => x > 0).length;
    },
    getSubjectPoints(index: number, name: SubjectName): string {
      if (this.marks[name] == undefined) {
        return "0";
      }
      const pointSum: number =
        this.usedCourses[index][0] * this.marks[name]!["11_2"] +
        this.usedCourses[index][1] * this.marks[name]!["12_1"] +
        this.usedCourses[index][2] * this.marks[name]!["12_2"] +
        this.usedCourses[index][3] * this.marks[name]!["13_1"];
      if (sum(this.usedCourses[index]) == 8) {
        return (pointSum / 2).toString() + " * 2 = " + pointSum.toString();
      }
      return pointSum.toString();
    },
    muendlichChange(e: any, subject: SubjectName) {
      if (e.target.checked) {
        if (this.subjectsMuendlich.length >= 2) {
          e.target.checked = false;
          return;
        }
        this.subjectsMuendlich.push(subject);
      } else {
        this.subjectsMuendlich = this.subjectsMuendlich.filter(
          (item) => item != subject
        );
      }
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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
.leftBorder {
  border-left: 1px solid black;
}
.resultField {
  border-top: 1px solid black;
  background-color: #999;
}
</style>
