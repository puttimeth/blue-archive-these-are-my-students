// en students.json file from https://github.com/SchaleDB/SchaleDB/tree/main
// th students.json
import thData from "./students-th.json" assert { type: "json" };
import data from "./students.json" assert { type: "json" };
import fs from "fs";

let students = {};

for (let item of data) {
  students[item["Id"]] = {
    defaultOrder: item["DefaultOrder"],
    nameEn: item["Name"],
    school: item["School"],
    defaultStar: item["StarGrade"],
    squadType: item["SquadType"],
    tacticRole: item["TacticRole"],
    bulletType: item["BulletType"],
    armorType: item["ArmorType"],
    availability:
      item["IsLimited"] === 0
        ? "Permanent"
        : item["IsLimited"] === 1
          ? "Unique"
          : "Event",
  };
}

for (let item of thData) {
  students[item["Id"]] = {
    ...students[item["Id"]],
    nameTh: item["Name"],
  };
}

fs.writeFile(
  "./src/utils/student-data.txt",
  JSON.stringify(students),
  () => {},
);
console.log(Object.keys(students).length);
