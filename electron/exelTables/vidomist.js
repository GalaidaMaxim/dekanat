const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");
const checkOutputDerectory = require("./checkOutputDerectory");
const filePath = path.join(require("os").homedir(), "Деканат Файли");
const replaseBracers = require("./replaseBracers");

const main = async (
  fileName,
  options = {
    DEPARTMENT: "",
    OS: "",
    PROFILE: "",
    COURSE: "I",
    BEGIN_YEAR: "2021",
    END_YEAR: "2022",
    SUBJECT: "",
    SEMSTER: "",
    HOURS: "",
    COACH: "",
    COACHCONTROL: "",
    students: [],
    DECAN: "",
  }
) => {
  try {
    const workBook = new ExcelJS.Workbook();
    options.DEPARTMENT = options.DEPARTMENT.toLocaleUpperCase();
    options.PROFILE = options.PROFILE.toLocaleUpperCase();
    options.OS = options.OS.toLocaleUpperCase();
    await workBook.xlsx.readFile(
      path.resolve(__dirname, "templates", "TempColedgVidom.xlsx")
    );
    Object.keys(options).forEach((item) => {
      replaseBracers(workBook.getWorksheet(1), `{${item}}`, options[item]);
    });
    checkOutputDerectory(filePath);
    options.students.forEach((item, index) => {
      if (index + 1 === options.students.length) {
        return;
      }
      workBook.getWorksheet(1).duplicateRow(29, 1, true);
    });
    options.students.forEach((item, index) => {
      workBook.getWorksheet(1).getCell(`A${index + 29}`).value = index + 1;
      workBook.getWorksheet(1).getCell(`B${index + 29}`).value = item;
    });
    workBook.xlsx.writeFile(path.resolve(filePath, fileName));
  } catch (err) {
    console.log(err);
  }
};

module.exports = main;
