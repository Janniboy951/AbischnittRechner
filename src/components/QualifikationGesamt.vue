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
    <h2>Import/ Export (Nur Qualifikation Block 1)</h2>
    <a :href="exportToFile" :download="`Abischnitt-Rechner-Export.json`"
      ><button class="exportBTN">Exportieren</button></a
    >

    <input
      id="exportBTN"
      name="exportBTN"
      class="exportBTN"
      type="file"
      @change="onFileChange"
      title="Importieren"
    />
    <button class="exportBTN">
      <label for="exportBTN">Importieren</label>
    </button>
  </th>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getAbiDurchschnitt } from "@/scripts/GradeTable";
import { SubjectName } from "@/scripts/Types";

export default defineComponent({
  name: "QualifikationGesamt",
  props: {
    gesamtpunktzahl: { type: Number, default: 0, required: true },
    ownSubjects: { required: true },
    marks: { required: true },
  },
  emits: ["imported"],
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
  methods: {
    onFileChange(e: any) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      const reader = new FileReader();
      console.log(files[0]);
      if (files[0].name.slice(-5) == ".json") {
        reader.onload = (res) => {
          if (res != null && res.target != null && res.target.result != null) {
            const parsedJSON = JSON.parse(res.target.result.toString());
            this.$emit("imported", parsedJSON);
          }
        };
        reader.readAsText(files[0], "utf-8");
      }
    },
  },
  computed: {
    exportToFile() {
      const contentType = "application/json";
      const dData = JSON.stringify({
        marks: this.marks,
        ownSubjects: this.ownSubjects,
      });
      const blob = new Blob([dData], { type: contentType });
      const url = window.URL.createObjectURL(blob);
      return url;
    },
  },
});
</script>
<style scoped>
.resTable th {
  font-size: xx-large;
}
.exportBTN {
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  font-weight: normal;
  background-color: #aa0404;
  border: none;
  height: 98%;
  margin: 3px;
  margin-top: 10px;
}
label {
  cursor: pointer;
}
h1,
h2,
h3,
h4 {
  display: inline-block;
  margin-right: 25px;
}
.exportBTN:hover {
  background-color: #cc0303;
  cursor: pointer;
}
input[type="file"] {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
</style>