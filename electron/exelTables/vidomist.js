const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");
const main = async () => {
  const workBook = new ExcelJS.Workbook();
  await workBook.xlsx.readFile(
    path.resolve(__dirname, "templates", "TempColedgVidom.xlsx")
  );
  console.log(workBook.getWorksheet(1).getCell("A7").value);
  console.log(
    path.resolve(require("os").homedir(), "Desktop", "TempColedgVidom.xlsx")
  );
  await workBook.xlsx.writeFile(
    path.join(
      require("os").homedir(),
      "Documents",
      "Деканат Файли",
      "TempColedgVidom.xlsx"
    )
  );
};
main();
