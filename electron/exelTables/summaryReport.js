const ExelJS = require("exceljs");

const setCenterText = (worksheet, row, col, text) => {
  const cell = worksheet.getCell(row, col);
  cell.value = text;
  cell.alignment = { vertical: "middle", horizontal: "center" };
};

const createSutudent = (worksheet, student, startColumn) => {
  let a = worksheet.getCell(1, startColumn).address;
  let b = worksheet.getCell(1, startColumn + 2).address;
  worksheet.mergeCells(a, b);
  a = worksheet.getCell(2, startColumn).address;
  b = worksheet.getCell(2, startColumn + 2).address;
  worksheet.mergeCells(a, b);
  a = worksheet.getCell(3, startColumn).address;
  b = worksheet.getCell(3, startColumn + 2).address;
  worksheet.mergeCells(a, b);
  setCenterText(worksheet, 1, startColumn, student.sername);
  setCenterText(worksheet, 2, startColumn, student.name);
  setCenterText(worksheet, 3, startColumn, student.secondName);
  worksheet.getColumn(startColumn).width = 5 * 4.21;
};

const createHeader = (worksheet) => {
  worksheet.getColumn(2).width = 8 * 4.21;

  setCenterText(worksheet, 1, 2, "Дисципліна");
  setCenterText(worksheet, 2, 2, "музичний інструмент");
  setCenterText(worksheet, 3, 2, "вибіркоа кваліфікація");
  setCenterText(worksheet, 4, 2, "шкала перефоду сумми балів");
  worksheet.mergeCells("A1", "A4");
  worksheet.mergeCells("C1", "C4");
  worksheet.mergeCells("D1", "D4");
  setCenterText(worksheet, 1, 3, "Форма\n Контролю");
  setCenterText(worksheet, 1, 4, "Номер\n Відомості");
  worksheet.getCell(1, 3).alignment = {
    textRotation: 90,
    vertical: "middle",
    horizontal: "center",
  };
  worksheet.getCell(1, 4).alignment = {
    textRotation: 90,
    vertical: "middle",
    horizontal: "center",
  };
};

module.exports = createSummaryReportTable = async ({
  semester,
  subjects,
  students = [],
  path,
}) => {
  const workbook = new ExelJS.Workbook();
  const worksheet = workbook.addWorksheet("Зведена відомість");
  createHeader(worksheet);
  students.forEach((item, index) => {
    createSutudent(worksheet, item, 5 + index * 3);
  });

  await workbook.xlsx.writeFile(path + "/Table.xlsx");
};
