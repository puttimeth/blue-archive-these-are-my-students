import { studentData } from "../data/student.data.js";

// mapping between student's name and student id; will be used in sorting algorithm below
const enNames = {};
const thNames = {};

for (let [studentId, student] of Object.entries(studentData)) {
  enNames[student["nameEn"]] = studentId;
  thNames[student["nameTh"]] = studentId;
}

// the sort order to be used in student.data.js/studentEnSortData and student.data.js/studentThSortData
const enIdOrder = [];
const thIdOrder = [];

// sort en
for (let name of Object.keys(enNames).sort()) {
  enIdOrder.push(enNames[name]);
}

// sort th
// custom order that should be used in Thai
const thCustomOrder = { เ: 0, แ: 1, โ: 2, ใ: 3, ไ: 4 };
const customSortKey = (word) => {
  return Array.from(word).map(
    (char) => thCustomOrder[char] ?? char.charCodeAt(0),
  );
};

for (let name of Object.keys(thNames).sort((a, b) => {
  const aKey = customSortKey(a);
  const bKey = customSortKey(b);

  // Compare the arrays character by character
  for (let i = 0; i < Math.min(aKey.length, bKey.length); i++) {
    const aChar = aKey[i];
    const bChar = bKey[i];
    if (aChar !== bChar) return aChar - bChar;
  }
  return a.length - b.length;
})) {
  thIdOrder.push(thNames[name]);
}

console.log("EN\n", JSON.stringify(enIdOrder, undefined, " "));
console.log("TH\n", JSON.stringify(thIdOrder, undefined, " "));
