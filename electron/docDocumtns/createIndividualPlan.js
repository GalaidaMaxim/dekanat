const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const { createPlanForDepartment } = require("../service");
const { EducationPlan } = require("../models");
const path = require("path");
const fs = require("fs");

const createSemesterCell = (subject) => {
  let min;
  let max;
  for (let i = 0; i < 8; i++) {
    if (subject.semesters[i].include) {
      min = i + 1;
      break;
    }
  }
  for (let i = 7; i >= 0; i--) {
    if (subject.semesters[i].include) {
      max = i + 1;
      break;
    }
  }
  if (!min || !max) {
    return "";
  } else if (min === max) {
    return min;
  } else if (min + 1 === max) {
    return `${min}, ${max}`;
  } else {
    return `${min} - ${max}`;
  }
};

const calculateAssesmnetType = (subject = []) => {
  const types = subject.semesters
    .filter((item) => item.include)
    .reduce((acc, item) => {
      if (!acc.includes(item.assessmentType)) {
        acc.push(item.assessmentType);
      }
      return acc;
    }, []);
  return types
    .map((item) => {
      let formControl;
      switch (item) {
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
      return formControl;
    })
    .join(", ");
};

const prepareSubjects = (subjectList = [], studentSubjects = []) => {
  return subjectList.map((item) => ({
    code: item.internalCode,
    name: item.name,
    cred: item.credits,
    sem: createSemesterCell(item),
    type: calculateAssesmnetType(item),
  }));
};

const calculateTotalCredits = (subjects = []) => {
  return subjects.reduce((acc, item) => {
    acc += item.credits;
    return acc;
  }, 0);
};

module.exports = async ({ student, filePath }) => {
  const plan = await EducationPlan.findById(student.educationPlan);
  let educationPlan = (
    await createPlanForDepartment({
      educationPlan: student.educationPlan,
      department: student.department._id,
    })
  )
    .map((item) => {
      item.internalCode = item.internalCode || item.code;
      return item;
    })
    .filter((item) =>
      student.subjects.some((sub) => sub._id === item._id.toString())
    );

  const addSpec = educationPlan
    .filter((sub) => sub.code.charAt(0) === "3")
    .reduce((prev, item) => {
      if (!prev.includes(item.aditionalSpecialityName)) {
        prev.push(item.aditionalSpecialityName);
      }
      return prev;
    }, []);

  const first = educationPlan
    .filter((item) => item.code.startsWith(1))
    .sort((a, b) => a.sortNumber - b.sortNumber);
  const firstToRender = prepareSubjects(first);

  const second = educationPlan
    .filter((item) => item.code.startsWith(2))
    .sort((a, b) => a.sortNumber - b.sortNumber);
  const seccondToRender = prepareSubjects(second);

  const third = addSpec.map((spec) => {
    const sub = educationPlan
      .filter(
        (item) =>
          item.code.startsWith(3) && item.aditionalSpecialityName === spec
      )
      .sort((a, b) => a.sortNumber - b.sortNumber);
    return {
      addSpecName: spec,
      T: prepareSubjects(sub),
      total: calculateTotalCredits(sub),
    };
  });

  const fourth = educationPlan
    .filter((item) => item.code.startsWith(4))
    .sort((a, b) => a.sortNumber - b.sortNumber);
  const fourthToRender = prepareSubjects(fourth);

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
    F: firstToRender,
    totalOK: calculateTotalCredits(first),
    S: seccondToRender,
    totalV: calculateTotalCredits(second),
    prof: student.department.fullName,
    addSpec: third,
    C: fourthToRender,
    planCredits: plan.credits,
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
