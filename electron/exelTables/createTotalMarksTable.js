const ExelJS = require("exceljs");
const { setLeftText } = require("./service");
const { getDepartments } = require("../DBActions");

module.exports = async ({
  tableData = [],
  filePath,
  depId,
  course,
  semester,
}) => {
  const workbook = new ExelJS.Workbook();
  const worksheet = workbook.addWorksheet("Таблиця");
  tableData.forEach((item, index) => {
    setLeftText(worksheet, index + 1, 1, item.name);
    setLeftText(worksheet, index + 1, 2, item.mark);
  });
  const department = await getDepartments({ id: depId });

  await workbook.xlsx.writeFile(
    filePath +
      `/Середні бали ${department.name} ${course} курс за ${semester} семестр .xlsx`
  );
};
