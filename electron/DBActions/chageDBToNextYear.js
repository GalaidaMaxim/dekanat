const { Students } = require("../models");

module.exports = async () => {
  const students = await Students.find({ status: "навчається" });
  for (let i = 0; i < students.length; i++) {
    if (students[i].level === "бакалавр") {
      if (students[i].course === 4) {
        students[i].status = "випустився";
      } else {
        students[i].course = students[i].course + 1;
      }
    } else if (students[i].level === "магістр") {
      if (students[i].course === 2) {
        students[i].status = "випустився";
      } else {
        students[i].course = students[i].course + 1;
      }
    }
    await students[i].save();
  }
  console.log("Process done, chage to next year");
};
