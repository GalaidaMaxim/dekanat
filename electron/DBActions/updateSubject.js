const { Subjects, Departments, EducationPlan, Students } = require("../models");
const mongoose = require("mongoose");

const updateSubject = async ({
  id,
  name,
  code,
  department,
  level,
  credits,
  semesters,
  gos,
  mandatory,
  special,
  educationPlan,
  aditionalSpecialityName,
}) => {
  try {
    let subject = await Subjects.findById(id);
    const params = {
      name,
      code,
      department: department || null,
      level,
      credits,
      semesters,
      gos,
      mandatory,
      special,
      educationPlan,
      aditionalSpecialityName,
    };

    const students = await Students.find({
      subjects: {
        $elemMatch: {
          _id: id,
        },
      },
    });

    subject = await Subjects.findByIdAndUpdate(id, params, { new: true });
    for (let i = 0; i < students.length; i++) {
      const student = students.at(i);
      const index = student.subjects.findIndex(
        (sub) => sub._id.toString() === id
      );

      const semesters = student.subjects[index].semesters;
      student.subjects[index] = subject;
      console.log(subject.department, student.department);

      if (subject.department.toString() !== student.department.toString()) {
        console.log("fix plan");

        student.subjects = student.subjects.filter(
          (item) => item._id !== subject._id
        );
        await student.save();
        continue;
      }
      student.subjects[index].semesters.forEach((item, indexS) => {
        if (
          item.include &&
          (semesters[indexS].mark ||
            semesters[indexS].reDelivery ||
            semesters[indexS].ignore)
        ) {
          student.subjects[index].semesters[indexS].mark =
            semesters[indexS].mark;
          student.subjects[index].semesters[indexS].reDelivery =
            semesters[indexS].reDelivery;
          student.subjects[index].semesters[indexS].ignore =
            semesters[indexS].ignore;
          if (
            student.subjects[index].semesters[indexS].assessmentType !==
            semesters[indexS].assessmentType
          ) {
            if (
              student.subjects[index].semesters[indexS].assessmentType === 1
            ) {
              student.subjects[index].semesters[indexS].mark =
                student.subjects[index].semesters[indexS].mark > 59
                  ? "Зараховано"
                  : "Незараховано";
            } else if (semesters[indexS].assessmentType === 1) {
              student.subjects[index].semesters[indexS].mark =
                student.subjects[index].semesters[indexS].mark === "Зараховано"
                  ? 90
                  : 50;
            }
          }
        }
      });
      await student.save();
    }

    return subject;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = updateSubject;
