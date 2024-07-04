const setLeftText = (worksheet, row, col, text) => {
  const cell = worksheet.getCell(row, col);
  cell.value = text;
  cell.alignment = { vertical: "middle", horizontal: "left" };
};

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

module.exports = {
  setLeftText,
  setCenterText,
  setCellColor,
  setCellTextColor,
};
