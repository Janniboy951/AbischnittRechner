export type SubjectName =
  | "Deutsch"
  | "Englisch"
  | "Latein"
  | "Französisch"
  | "Spanisch"
  | "Mathe"
  | "Chemie"
  | "Physik"
  | "Biologie"
  | "Informatik"
  | "Musik"
  | "Kunst"
  | "DS"
  | "Sport"
  | "Geschichte"
  | "Sozialkunde"
  | "Erdkunde"
  | "Religion_Ethik";

export interface SubjName {
  Deutsch?: any;
  Englisch?: any;
  Latein?: any;
  Französisch?: any;
  Spanisch?: any;
  Mathe?: any;
  Chemie?: any;
  Physik?: any;
  Biologie?: any;
  Informatik?: any;
  Musik?: any;
  Kunst?: any;
  DS?: any;
  Sport?: any;
  Geschichte?: any;
  Sozialkunde?: any;
  Erdkunde?: any;
  Religion?: any;
}

export type SubjMarks = {
  "11_2": number;
  "12_1": number;
  "12_2": number;
  "13_1": number;
};

export const SubjMarksKeys = ["11_2", "12_1", "12_2", "13_1"];

export type Marks = {
  Deutsch: SubjMarks;
  Englisch: SubjMarks;
  Latein: SubjMarks;
  Französisch: SubjMarks;
  Spanisch: SubjMarks;
  Mathe: SubjMarks;
  Chemie: SubjMarks;
  Physik: SubjMarks;
  Biologie: SubjMarks;
  Informatik: SubjMarks;
  Musik: SubjMarks;
  Kunst: SubjMarks;
  DS: SubjMarks;
  Sport: SubjMarks;
  Geschichte: SubjMarks;
  Sozialkunde: SubjMarks;
  Erdkunde: SubjMarks;
  Religion_Ethik: SubjMarks;
};
