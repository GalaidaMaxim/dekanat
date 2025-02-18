const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const { Subjects, Departments, Facultet } = require("../models");

const fs = require("fs");
const path = require("path");

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function deleteSlash(line = "") {
  let arr = line.split("");
  arr = arr.filter((item) => item !== "/");
  return arr.join("");
}

module.exports = async (
  event,
  {
    subject,
    students,
    OOP,
    OS,
    c,
    S,
    teacher = "",
    decan = "",
    filePath = "output.docx",
    facultet,
    number,
    year,
    remoteType,
  }
) => {
  // Load the docx file as binary content
  const content = fs.readFileSync(
    path.resolve(__dirname, "templates", "statmenTemplate.docx"),
    "binary"
  );
  fc = (await Facultet.findById(facultet)).name.toUpperCase();
  rtp = remoteType === "online" ? "ЗАОЧНЕ ВІДДІЛЕННЯ" : "ДЕННЕ ВІДДІЛЕННЯ";
  OOP = (await Departments.findById(OOP)).fullName;
  OOP = capitalizeFirstLetter(OOP);
  subject = await Subjects.findById(subject);

  let formControl = "";
  switch (subject.semesters[S - 1].assessmentType) {
    case 1:
      formControl = "залік";
      break;
    case 2:
      formControl = "диф-залік";
      break;
    case 3:
      formControl = "іспит";
      break;
    case 4:
      formControl = "підсумкова оцінка";
      break;
  }

  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  console.log(number, year);

  students = students.map((item, index) => {
    if (item.foreigner) {
      return {
        name: `${item.sername}`,
        s: index + 1,
      };
    }
    return {
      name: `${item.sername} ${item.name.charAt(0)}. ${item.secondName.charAt(
        0
      )}.`,
      s: index + 1,
    };
  });

  doc.render({
    OS,
    m: students,
    decan,
    OOP,
    c,
    S: S % 2 === 0 ? "II" : "I",
    controlForm: formControl,
    teacher,
    decan,
    SUBJECT: subject.name,
    rtp,
    fc,
    num: number,
    year,
  });

  const buf = doc.getZip().generate({
    type: "nodebuffer",
    // compression: DEFLATE adds a compression step.
    // For a 50MB output document, expect 500ms additional CPU time
    compression: "DEFLATE",
  });
  const fileName = `${c} ${OOP} ${OS} ${subject.name} ${new Date(
    Date.now()
  ).getFullYear()}.docx`;
  // buf is a nodejs Buffer, you can either write it to a
  // file or res.send it with express for example.

  fs.writeFileSync(path.resolve(filePath, deleteSlash(fileName)), buf);
};
