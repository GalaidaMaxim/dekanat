const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");
const checkOutputDerectory = require("./checkOutputDerectory");
const filePath = path.join(require("os").homedir(), "Деканат Файли");
const replaseBracers = require("./replaseBracers");
const main = async (fileName) => {
  try {
    const workBook = new ExcelJS.Workbook();
    await workBook.xlsx.readFile(
      path.resolve(__dirname, "templates", "TempColedgVidom.xlsx")
    );
    replaseBracers(workBook.getWorksheet(1), "{OS}", "Магістр");
    console.log(workBook.getWorksheet(1).getCell("A4").set);
    checkOutputDerectory(filePath);
    workBook.xlsx.writeFile(path.resolve(filePath, fileName));
  } catch (err) {
    console.log(err);
  }
};
main("Vido.xlsx");
