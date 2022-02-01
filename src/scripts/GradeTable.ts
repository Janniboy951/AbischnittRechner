import { range } from "./helper";

const GRADETABLE: { [key: string]: number[] } = {
  "1,0": range(823, 900),
  "1,1": range(805, 822),
  "1,2": range(787, 804),
  "1,3": range(769, 786),
  "1,4": range(751, 768),
  "1,5": range(733, 750),
  "1,6": range(715, 732),
  "1,7": range(697, 714),
  "1,8": range(679, 696),
  "1,9": range(661, 678),
  "2,0": range(643, 660),
  "2,1": range(625, 642),
  "2,2": range(607, 624),
  "2,3": range(589, 606),
  "2,4": range(571, 588),
  "2,5": range(553, 570),
  "2,6": range(535, 552),
  "2,7": range(517, 534),
  "2,8": range(499, 516),
  "2,9": range(481, 498),
  "3,0": range(463, 480),
  "3,1": range(445, 462),
  "3,2": range(427, 444),
  "3,3": range(409, 426),
  "3,4": range(391, 408),
  "3,5": range(373, 390),
  "3,6": range(355, 372),
  "3,7": range(337, 354),
  "3,8": range(319, 336),
  "3,9": range(301, 318),
  "4,0": range(300, 300),
  "nicht bestanden": range(0, 299),
};

export function getAbiDurchschnitt(punktzahl: number) {
  let durchschnitt = "";
  Object.entries(GRADETABLE).forEach((v: [string, number[]]) => {
    if (v[1].includes(punktzahl)) {
      durchschnitt = v[0];
    }
  });
  return durchschnitt;
}
