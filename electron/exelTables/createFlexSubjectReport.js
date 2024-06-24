const ExelJS = require("exceljs");

function mergeCellsByCoordinates(
  worksheet,
  startRow,
  startCol,
  endRow,
  endCol
) {
  const startCell = worksheet.getCell(startRow, startCol).address;
  const endCell = worksheet.getCell(endRow, endCol).address;
  const mergeRange = `${startCell}:${endCell}`;

  worksheet.mergeCells(mergeRange);
}

const setCenterText = (worksheet, row, col, text) => {
  const cell = worksheet.getCell(row, col);
  cell.value = text;
  cell.alignment = { vertical: "middle", horizontal: "center" };
};

const setLeftText = (worksheet, row, col, text) => {
  const cell = worksheet.getCell(row, col);
  cell.value = text;
  cell.alignment = { vertical: "middle", horizontal: "left" };
};

module.exports = createSummaryReportTable = async ({
  subjects = [],
  filePath,
  course,
}) => {
  const workbook = new ExelJS.Workbook();
  const worksheet = workbook.addWorksheet("Вибіркові предмети");
  console.log(subjects, filePath, course);
  let colum = 1;
  subjects.forEach((subject) => {
    if (subject.spec) {
    }
  });
};
