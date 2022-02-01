/* import { SubjectName } from "./Types";

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

// function getLKs(subjects: Subject[]) {
//   // Die LKs sind die ersten Drei in der Liste
//   const LKs = [subjects[0], subjects[1], subjects[2]];
//   // Je vier Halbjahre Pro LK sind einzubringen
//   let markSums = [
//     LKs[0].getBestCoursesSum(4),
//     LKs[1].getBestCoursesSum(4),
//     LKs[2].getBestCoursesSum(4),
//   ];

//   // LKs doppelt wichten
//   markSums = markSums.map((x) => x * 2);

//   // Der schlechteste LK wird nur einfach gewichtet
//   const worstMarkIndex = markSums.indexOf(Math.min(...markSums));
//   markSums[worstMarkIndex] = markSums[worstMarkIndex] / 2;

//   return sum(markSums);
// }

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

export function calcLKs(params:type) {
  
}*/

import { arrayEquals, findCommonElements, getLargest, sum } from "./helper";
import { SubjectName, Marks, SubjMarksKeys } from "./Types";

export function lks(usedCourses: any[], ownSubjects: SubjectName[], marks: Marks) {
  const returnValue = [
    [2, 2, 2, 2],
    [2, 2, 2, 2],
    [2, 2, 2, 2],
  ];
  const markSums = [
    sum(Object.values(marks[ownSubjects[0]])),
    sum(Object.values(marks[ownSubjects[1]])),
    sum(Object.values(marks[ownSubjects[2]])),
  ];
  const indexOfWorst = markSums.indexOf(Math.min(...markSums));
  usedCourses[0] = [2, 2, 2, 2];
  usedCourses[1] = [2, 2, 2, 2];
  usedCourses[2] = [2, 2, 2, 2];
  usedCourses[indexOfWorst] = [1, 1, 1, 1];
  return returnValue;
}

export function pflichtfach(
  ownSubjects: SubjectName[],
  usedCourses: number[][],
  subject: SubjectName
) {
  const subjectIndex = ownSubjects.indexOf(subject);
  if (!arrayEquals(usedCourses[subjectIndex], [2, 2, 2, 2])) {
    usedCourses[subjectIndex] = [1, 1, 1, 1];
  }
  return usedCourses;
}

export function kuenstlerischesFach(
  ownSubjects: SubjectName[],
  usedCourses: number[][],
  marks: Marks
) {
  const kuenstlerischeFaecher: SubjectName[] = ["DS", "Musik", "Kunst"];
  if (!findCommonElements(ownSubjects.slice(0, 3), kuenstlerischeFaecher)) {
    const subjectIndex = ownSubjects.indexOf("Musik");
    const keyList = getLargest(marks["Musik"], 2).chosenYears;
    usedCourses[subjectIndex][SubjMarksKeys.indexOf(keyList[0])] = 1;
    usedCourses[subjectIndex][SubjMarksKeys.indexOf(keyList[1])] = 1;
  }

  // if (!arrayEquals(usedCourses[subjectIndex], [2, 2, 2, 2])) {
  //   usedCourses[subjectIndex] = [1, 0, 1, 1];
  // }
  return usedCourses;
}

export function ersteFremdsprache(
  ownSubjects: SubjectName[],
  usedCourses: number[][],
  marks: Marks,
  subjectsMuendlich: SubjectName[]
) {
  const fremdSprachen: SubjectName[] = ["Englisch", "Französisch", "Latein", "Spanisch"];
  if (
    !findCommonElements(ownSubjects.slice(0, 3), fremdSprachen) &&
    !findCommonElements(subjectsMuendlich, fremdSprachen)
  ) {
    const sums: number[] = [];
    fremdSprachen.forEach((v) => {
      sums.push(sum(Object.values(marks[v])));
    });
    const subject = fremdSprachen[sums.indexOf(Math.max(...sums))];
    return pflichtfach(ownSubjects, usedCourses, subject);
  }
  return usedCourses;
}

export function ersteNaturwissenschaft(
  ownSubjects: SubjectName[],
  usedCourses: number[][],
  marks: Marks,
  subjectsMuendlich: SubjectName[]
) {
  const naturwissenschaften: SubjectName[] = ["Chemie", "Physik", "Biologie"];
  if (
    !findCommonElements(ownSubjects.slice(0, 3), naturwissenschaften) &&
    !findCommonElements(subjectsMuendlich, naturwissenschaften)
  ) {
    const sums: number[] = [];
    naturwissenschaften.forEach((v) => {
      sums.push(sum(Object.values(marks[v])));
    });
    const subject = naturwissenschaften[sums.indexOf(Math.max(...sums))];
    return pflichtfach(ownSubjects, usedCourses, subject);
  }
  return usedCourses;
}

export function ersteGesellschaftwissenschaft(
  ownSubjects: SubjectName[],
  usedCourses: number[][],
  marks: Marks,
  subjectsMuendlich: SubjectName[]
) {
  const gesellschaftwissenschaft: SubjectName[] = ["Geschichte", "Sozialkunde", "Erdkunde"];
  if (
    !findCommonElements(ownSubjects.slice(0, 3), gesellschaftwissenschaft) &&
    !findCommonElements(subjectsMuendlich, gesellschaftwissenschaft)
  ) {
    const sums: number[] = [];
    gesellschaftwissenschaft.forEach((v) => {
      sums.push(sum(Object.values(marks[v])));
    });
    const subject = gesellschaftwissenschaft[sums.indexOf(Math.max(...sums))];
    return pflichtfach(ownSubjects, usedCourses, subject);
  }
  return usedCourses;
}
// 2. FS oder 2. NW oder Informatik
export function zweitesFach(ownSubjects: SubjectName[], usedCourses: number[][], marks: Marks) {
  const zweiteFaecher: SubjectName[] = [
    "Latein",
    "Englisch",
    "Französisch",
    "Spanisch",
    "Physik",
    "Chemie",
    "Biologie",
    "Informatik",
  ];
  let zweitesFachVorhanden = 0;
  const usedSubjects: SubjectName[] = [];
  zweiteFaecher.forEach((v) => {
    if (ownSubjects.indexOf(v) != -1 && sum(usedCourses[ownSubjects.indexOf(v)]) > 0) {
      zweitesFachVorhanden++;
      usedSubjects.push(v);
    }
  });
  if (zweitesFachVorhanden <= 2) {
    let currentMaxMark = 0;
    let currentChosen: { subject: SubjectName; half_year: number } | undefined = undefined;
    zweiteFaecher.forEach((v) => {
      if (!usedSubjects.includes(v)) {
        const subjectMax = Math.max(...Object.values(marks[v]));
        if (subjectMax >= currentMaxMark) {
          currentMaxMark = subjectMax;
          currentChosen = { subject: v, half_year: Object.values(marks[v]).indexOf(subjectMax) };
        }
      }
    });

    usedCourses[ownSubjects.indexOf(currentChosen!.subject)][currentChosen!.half_year] = 1;
  }
}
export function fillCourses(ownSubjects: SubjectName[], usedCourses: number[][], marks: Marks) {
  while (getTotalUsedCourseNum(usedCourses) < 35) {
    let currentMaxMark = 0;
    let currentChosen: { subject: SubjectName; half_year: number } | undefined = undefined;
    ownSubjects.slice(3).forEach((v) => {
      for (let i = 0; i < usedCourses[0].length; i++) {
        const mark = Object.values(marks[v])[i];
        if (mark >= currentMaxMark) {
          if (usedCourses[ownSubjects.indexOf(v)][i] != 1) {
            currentMaxMark = mark;
            currentChosen = { subject: v, half_year: i };
          }
        }
      }
    });
    usedCourses[ownSubjects.indexOf(currentChosen!.subject)][currentChosen!.half_year] = 1;
  }
}

function getTotalUsedCourseNum(usedCourses: number[][]) {
  let res = 0;
  for (let i = 0; i < usedCourses.length; i++) {
    for (let j = 0; j < usedCourses[i].length; j++) {
      if (usedCourses[i][j] > 0) {
        res++;
      }
    }
  }
  return res;
}

export function muendlich(
  ownSubjects: SubjectName[],
  subjectsMuendlich: SubjectName[],
  usedCourses: number[][]
) {
  subjectsMuendlich.forEach((subject) => {
    const subjectIndex = ownSubjects.indexOf(subject);
    usedCourses[subjectIndex] = [1, 1, 1, 1];
  });
  return usedCourses;
}
