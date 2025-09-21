const { Readable } = require("stream");
const csv = require("csv-parser");
const fs = require("fs/promises");
const { Students } = require("../models");

async function parseCsvString(csvString) {
  return new Promise((resolve, reject) => {
    const results = [];

    Readable.from([csvString]) // превращаем строку в поток
      .pipe(csv())
      .on("data", (row) => results.push(row))
      .on("end", () => resolve(results))
      .on("error", reject);
  });
}

module.exports = async ({ path, subjectID, semester, level, course }) => {
  const data = (await fs.readFile(path)).toString("utf8");
  const info = await parseCsvString(data);
  const arr = [];
  for (let i = 0; i < info.length; i++) {
    const student = await Students.findOne({
      name: info[i][`Ім'я`],
      sername: info[i][`Прізвище`],
      secondName: info[i][`Побатькові`],
      level,
      course,
    });
    if (!student) {
      continue;
    }
    student.subjects.find(
      (item) => item._id.toString() === subjectID
    ).semesters[semester - 1].mark = info[i][`Оцінка`];
    await student.save();
    arr.push(student);
  }
  return arr;
};

// Ім'я
// :
// "Катерина"
// Оцінка
// :
// "80"
// Побатькові
// :
// "Євгенівна"
// Прізвище
// :
// "Абдрахімова"
