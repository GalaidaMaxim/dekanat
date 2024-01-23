const createViodomost = require("../exelTables/vidomist");

module.exports = async (event, params) => {
  try {
    const {
      fileName = "Table" + Date.now(),
      DEPARTMENT = "Коледж",
      OS = " ФАХОВИЙ МОЛОДШИЙ БАКАЛАВР",
      PROFILE = "",
      COURSE = "I",
      BEGIN_YEAR = "2023",
      END_YEAR = "2024",
      SUBJECT = "",
      SEMSTER = "",
      HOURS = "",
      COACH = "",
      COACHCONTROL = "",
      students = [],
      DECAN = "М.О. Вороніна",
      CONTROL_TYPE = "",
    } = params;
    createViodomost(`${fileName}.xlsx`, {
      DEPARTMENT,
      OS,
      PROFILE,
      COURSE,
      BEGIN_YEAR,
      END_YEAR,
      SUBJECT,
      SEMSTER,
      HOURS,
      COACH,
      COACHCONTROL,
      students,
      DECAN,
      CONTROL_TYPE,
    });
    return JSON.stringify(true);
  } catch (err) {
    console.log(err);
    return JSON.stringify(null);
  }
};
