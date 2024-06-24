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

const setCellTextColor = (worksheet, rowNumber, colNumber, color) => {
  const cell = worksheet.getCell(rowNumber, colNumber);
  cell.font = {
    color: { argb: color },
  };
};

const setCellColor = (worksheet, rowNumber, colNumber, color) => {
  const cell = worksheet.getCell(rowNumber, colNumber);
  cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: color },
  };
};

module.exports = async ({ subjects = [], filePath, course }) => {
  const workbook = new ExelJS.Workbook();
  const worksheet = workbook.addWorksheet("Вибіркові предмети");
  let columnGap = 1;
  subjects.forEach((subject, index) => {
    if (subject.spec) {
      mergeCellsByCoordinates(
        worksheet,
        1,
        index + columnGap,
        1,
        index + columnGap + 1
      );
      setCenterText(worksheet, 1, index + columnGap, subject.name);
      setCellColor(worksheet, 1, index + columnGap, "3d36f7");
      setCellTextColor(worksheet, 1, index + columnGap, "ffffff");
      mergeCellsByCoordinates(
        worksheet,
        2,
        index + columnGap,
        2,
        index + columnGap + 1
      );
      setCenterText(worksheet, 2, index + columnGap, subject.spec);
      setCellColor(worksheet, 2, index + columnGap, "8581fc");

      setCenterText(worksheet, 3, index + columnGap, "Предмет");
      setCenterText(worksheet, 3, index + columnGap + 1, "Кваліфікація");
      subject.students.forEach((student, indexS) => {
        setCenterText(worksheet, 4 + indexS, index + columnGap, student);
      });

      subject.specStudents.forEach((student, indexS) => {
        setCenterText(worksheet, 4 + indexS, index + columnGap + 1, student);
        setCellColor(worksheet, 4 + indexS, index + columnGap, "d3d1ff");
      });
      columnGap++;
    } else {
      setCenterText(worksheet, 1, index + columnGap, subject.name);
      setCellTextColor(worksheet, 1, index + columnGap, "ffffff");
      setCellColor(worksheet, 1, index + columnGap, "3d36f7");
      setCellColor(worksheet, 2, index + columnGap, "8581fc");
      setCenterText(worksheet, 3, index + columnGap, "Предмет");
      subject.students.forEach((student, indexS) => {
        setCenterText(worksheet, 4 + indexS, index + columnGap, student);
        setCellColor(worksheet, 4 + indexS, index + columnGap, "d3d1ff");
      });
    }
  });

  await workbook.xlsx.writeFile(
    filePath + `/Звіт вибіркових предметів ${course} за.xlsx`
  );
};
