const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");
const checkOutputDerectory = require("./checkOutputDerectory");
const filePath = path.join(require("os").homedir(), "Деканат Файли");
const replaseBracers = require("./replaseBracers");
const { log } = require("console");

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
    COACH2: "",
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
    console.log(workBook.getWorksheet(1).getCell("A43").value);
    checkOutputDerectory(filePath);
    workBook.xlsx.writeFile(path.resolve(filePath, fileName));
  } catch (err) {
    console.log(err);
  }
};
main("Vido.xlsx", {
  DEPARTMENT: "Коледж",
  OS: "Молодший бакалавр",
  PROFILE: "ФЛЕЙТА",
  COURSE: "II",
  BEGIN_YEAR: "2024",
  END_YEAR: "2025",
  SEMSTER: 3,
  SUBJECT: "Оркестр",
  CONTROL_TYPE: "екзамен",
  COACH: "Бодіна В. В.",
  HOURS: 16,
});
