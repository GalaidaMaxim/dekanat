const getSubjectLastMark = (subject) => {
  for (let i = subject.semesters.length - 1; i >= 0; i--) {
    if (subject.semesters[i].include) {
      return subject.semesters[i].mark;
    }
  }
  return "";
};

module.exports = async ({ student, pathToSave }) => {
  const { name, sername, secondName, department, level, startYear, subjects } =
    student;
  const sub = subjects.map((item) => {
    return { name: item.name, mark: getSubjectLastMark(item) };
  });
  const info = {
    name,
    sername,
    secondName,
    department,
    level,
    startYear,
    subjects: sub,
  };
};
