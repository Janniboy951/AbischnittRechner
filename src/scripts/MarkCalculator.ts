import { SubjectName } from "./Types";

function sum(array: number[]): number {
  let total = 0;
  let i = array.length;

  while (i--) {
    total += array[i];
  }

  return total;
}

class Subject {
  name: SubjectName;
  course_11_2: number;
  course_12_1: number;
  course_12_2: number;
  course_13_1: number;
  public isLK: boolean;

  constructor(name: SubjectName, marks: any, isLK: boolean) {
    this.name = name;
    this.course_11_2 = marks["11_2"][name];
    this.course_12_1 = marks["12_1"][name];
    this.course_12_2 = marks["12_2"][name];
    this.course_13_1 = marks["13_1"][name];
    this.isLK = isLK;
  }

  /**
   * getBestCourses
   */
  public getBestCoursesSum(amount: 1 | 2 | 3 | 4): number {
    // Liste aus allen vier halbjahren
    const courses = [
      this.course_11_2,
      this.course_12_1,
      this.course_12_2,
      this.course_13_1,
    ];
    // die summe von allen kursen zurueckgeben, wenn amount 4 betraegt
    if (amount == 4) {
      return sum(courses);
    }

    let result = 0;
    // wiederhole n mal
    for (let i = 0; i < amount; i++) {
      // nehme den besten kurs, addiere ihn auf result und entferne ihn aus der liste courses
      result += courses.splice(courses.indexOf(Math.max(...courses)), 1)[0];
    }
    // gebe result zurueck
    return result;
  }
}

function getSubject(subjects: Subject[], name: SubjectName): Subject | null {
  // get subjectNames
  const subjectNames = subjects.map((s) => s.name);
  if (subjectNames.indexOf(name) == -1) {
    return null;
  }

  return subjects[subjectNames.indexOf(name)];
}

export function calcMark(
  marks: any,
  subjectNames: SubjectName[]
): [number, number] {
  console.log(marks);

  // konvertierung
  const subjects: Subject[] = [];
  subjectNames.forEach((subject) => {
    subjects.push(
      new Subject(subject, marks, subjectNames.indexOf(subject) < 3)
    );
  });

  let gesamtPunktZahl = 0;
  let usedCoursesAmount = 0;
  const usedCourses: SubjectName[] = [];
  // -------------------------LKs----------------------------------
  // Berechnung Punktzahl durch LKs
  gesamtPunktZahl += getLKs(subjects);
  // 4 Kurse in 3 LKs
  usedCoursesAmount += 12;

  // -----------------------Deutsch--------------------------------
  // Deutsch in der Liste finden
  const deutsch = getSubject(subjects, "Deutsch");

  // Deutsch muss belegt sein
  if (deutsch == null) {
    return [0, 0];
  }

  // Deutsch nicht als lk
  if (!deutsch.isLK) {
    // exakt 4 Kurse Deutsch einbringen
    gesamtPunktZahl += deutsch.getBestCoursesSum(4);
    usedCoursesAmount += 4;
  }

  // ------------------------Mathe---------------------------------
  // Mathe in der Liste finden
  const mathe = getSubject(subjects, "Mathe");

  // Mathe muss belegt sein
  if (mathe == null) {
    return [0, 0];
  }

  // Mathe nicht als lk
  if (!mathe.isLK) {
    // exakt 4 Kurse Mathe einbringen
    gesamtPunktZahl += mathe.getBestCoursesSum(4);
    usedCoursesAmount += 4;
  }
  // -----------------Erste Fremdsprache---------------------------
  // Keine FS als LK
  const lkNames = getLKNames(subjects);
  if (
    !lkNames.includes("Englisch") &&
    !lkNames.includes("Französisch") &&
    !lkNames.includes("Latein") &&
    !lkNames.includes("Spanisch")
  ) {
    // exakt 4 Kurse der 1. FS einbringen
    gesamtPunktZahl += getFirstLanguage(subjects);
    usedCoursesAmount += 4;
  }

  return [gesamtPunktZahl, usedCoursesAmount];
}

function getLKNames(subjects: Subject[]): SubjectName[] {
  return [subjects[0].name, subjects[1].name, subjects[2].name];
}

function getLKs(subjects: Subject[]) {
  // Die LKs sind die ersten Drei in der Liste
  const LKs = [subjects[0], subjects[1], subjects[2]];
  // Je vier Halbjahre Pro LK sind einzubringen
  let markSums = [
    LKs[0].getBestCoursesSum(4),
    LKs[1].getBestCoursesSum(4),
    LKs[2].getBestCoursesSum(4),
  ];

  // LKs doppelt wichten
  markSums = markSums.map((x) => x * 2);

  // Der schlechteste LK wird nur einfach gewichtet
  const worstMarkIndex = markSums.indexOf(Math.min(...markSums));
  markSums[worstMarkIndex] = markSums[worstMarkIndex] / 2;

  return sum(markSums);
}

function getFirstLanguage(subjects: Subject[]) {
  // Alle Fremdsprachen
  let languages = [
    getSubject(subjects, "Englisch"),
    getSubject(subjects, "Französisch"),
    getSubject(subjects, "Latein"),
    getSubject(subjects, "Spanisch"),
  ];
  // Nuller (also nicht belegte Fremdsprachen) entfernen
  languages = languages.filter((a) => a);

  const languageSums = languages.map((x) => x!.getBestCoursesSum(4));
  const bestLanguageIndex = languageSums.indexOf(Math.max(...languageSums));
  console.log(languageSums[bestLanguageIndex]);
  return languageSums[bestLanguageIndex];
}
