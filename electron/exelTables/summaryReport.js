const ExelJS = require("exceljs");
const { intToABC, intToNational } = require("../service/formulas");
const { calculateAvarage } = require("../service/calculateAvarage");
const { getDepartments } = require("../DBActions");
const { roundTo } = require("../service/mathFunctions");

const grayColor = "c5c5c5";

const redColor = "ff7d7d";
const ignoreColor = "39ffbd";
const whiteColor = "ffffff";

const getColor = (ignore, reDelivery) => {
  if (ignore) {
    return ignoreColor;
  } else if (reDelivery) {
    return redColor;
  }
  return whiteColor;
};

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

const setCellColor = (cell, color) => {
  cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: color },
  };
};

const setCellColorCoords = (worksheet, rowNumber, colNumber, color) => {
  const cell = worksheet.getCell(rowNumber, colNumber);
  cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: color },
  };
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

  subjects.forEach((item, subjectIndex) => {
    setLeftText(worksheet, 5 + subjectIndex, 2, item.name);
    students.forEach((student, studentIndex) => {
      const subject = student.subjects.find((sub) => sub._id === item._id);

      if (subject) {
        const value = subject.semesters[semester - 1].mark || "Н/А";
        const ignore = subject.semesters[semester - 1].ignore;
        const reDelivery = subject.semesters[semester - 1].reDelivery;
        setCellColorCoords(
          worksheet,
          5 + subjectIndex,
          5 + studentIndex * 3,
          getColor(ignore, reDelivery)
        );
        setCellColorCoords(
          worksheet,
          5 + subjectIndex,
          6 + studentIndex * 3,
          getColor(ignore, reDelivery)
        );
        setCellColorCoords(
          worksheet,
          5 + subjectIndex,
          7 + studentIndex * 3,
          getColor(ignore, reDelivery)
        );
        if (subject.semesters[semester - 1].assessmentType !== 1) {
          setCenterText(
            worksheet,
            5 + subjectIndex,
            5 + studentIndex * 3,
            intToABC(value)
          );
          setCenterText(
            worksheet,
            5 + subjectIndex,
            6 + studentIndex * 3,
            value
          );
          setCenterText(
            worksheet,
            5 + subjectIndex,
            7 + studentIndex * 3,
            intToNational(value, student.level)
          );
        } else {
          setCenterText(
            worksheet,
            5 + subjectIndex,
            6 + studentIndex * 3,
            value
          );
        }
      } else {
        setCellColor(
          worksheet.getCell(5 + subjectIndex, 5 + studentIndex * 3),
          grayColor
        );
        setCellColor(
          worksheet.getCell(5 + subjectIndex, 6 + studentIndex * 3),
          grayColor
        );
        setCellColor(
          worksheet.getCell(5 + subjectIndex, 7 + studentIndex * 3),
          grayColor
        );
      }
    });
  });

  students.forEach((item, studentIndex) => {
    setCenterText(
      worksheet,
      5 + subjects.length,
      6 + studentIndex * 3,
      roundTo(calculateAvarage(item.subjects, semester, item.contract), 2)
    );
  });

  const department = await getDepartments({ id: students[0].department });

  await workbook.xlsx.writeFile(
    path +
      `/Зведена відомість ${department.name} ${students[0].course} курс за ${semester} семестр .xlsx`
  );
};
