const ExelJS = require("exceljs");
const { setLeftText } = require("./service");
const { getDepartments } = require("../DBActions");

module.exports = async ({ tableData = [], filePath, depId, level }) => {
  const workbook = new ExelJS.Workbook();
  const worksheet = workbook.addWorksheet("Таблиця");
  setLeftText(worksheet, 1, 1, "Cтудент");
  setLeftText(worksheet, 1, 2, "Курс");
  setLeftText(worksheet, 1, 3, "Средній бал");
  tableData.forEach((item, index) => {
    setLeftText(worksheet, index + 2, 1, item.name);
    setLeftText(worksheet, index + 2, 2, item.course);
    setLeftText(worksheet, index + 2, 3, item.mark);
  });
  const department = await getDepartments({ id: depId });

  await workbook.xlsx.writeFile(
    filePath + `/Середні бали ${department.name} ${level}.xlsx`
  );
};
