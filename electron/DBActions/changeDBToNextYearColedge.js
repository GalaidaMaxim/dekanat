const { Students } = require("../models");

/*цей функціонал має бути об'єднаний з основним файлом зміни 
бази на наступий рік
це ксиль для коледжу*/

module.exports = async () => {
  const students = await Students.find({ status: "навчається" });
  for (let i = 0; i < students.length; i++) {
    if (students[i].level === "молодший бакалавр") {
      if (students[i].course === 4) {
        students[i].status = "випустився";
      } else {
        students[i].course = students[i].course + 1;
      }
    }
    await students[i].save();
  }
  console.log("Process done, chage to next year");
};
