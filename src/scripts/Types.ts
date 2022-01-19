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
  | "Religion/ Ethik";

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
export interface SubjNames {
  "11_2": SubjName;
  "12_1": SubjName;
  "12_2": SubjName;
  "13_1": SubjName;
}
