const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const { createPlanForDepartment } = require("../service");
const path = require("path");
const fs = require("fs");

module.exports = async ({ student, filePath }) => {
  let educationPlan = (
    await createPlanForDepartment({
      educationPlan: student.educationPlan,
      department: student.department._id,
    })
  ).map((item) => {
    item.internalCode = item.internalCode || item.code;
    return item;
  });

  let first = educationPlan.filter((item) => item.code.startsWith(1));
  first = first.map((item) => ({
    code: item.internalCode,
    name: item.name,
    cred: item.credits,
    sem: "",
    type: "",
  }));

  const content = fs.readFileSync(
    path.resolve(__dirname, "templates", "personalPlanTemplate.docx"),
    "binary"
  );
  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  doc.render({
    studentName: `${student.sername} ${student.name} ${student.secondName}`,
    OS: student.level,
    prof: student.department.name,
    F: first,
  });

  const buf = doc.getZip().generate({
    type: "nodebuffer",
    compression: "DEFLATE",
  });

  const fileName = `${student.sername} ${student.name} ${student.secondName}.docx`;
  // buf is a nodejs Buffer, you can either write it to a
  // file or res.send it with express for example.

  fs.writeFileSync(path.resolve(filePath, fileName), buf);

  return true;
};
