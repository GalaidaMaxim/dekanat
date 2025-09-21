const { createObjectCsvWriter } = require("csv-writer");
const path = require("path");

module.exports = async ({ filePath, students, subjectID, semester }) => {
  try {
    const subject = students[0].subjects.find((item) => item._id === subjectID);
    const csvWriter = createObjectCsvWriter({
      path: path.join(filePath, `${subject.name} відомість.csv`),
      header: [
        { id: "sername", title: "Прізвище" },
        { id: "name", title: "Ім'я" },
        { id: "secondName", title: "Побатькові" },
        { id: "mark", title: "Оцінка" },
      ],
    });

    const records = students.map((item) => {
      return {
        name: item.name,
        secondName: item.secondName,
        sername: item.sername,
        mark: item.subjects.find((sb) => sb._id === subjectID).semesters[
          semester - 1
        ].mark,
      };
    });
    await csvWriter.writeRecords(records);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
