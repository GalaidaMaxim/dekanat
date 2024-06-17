export const createStudentShortName = (student) => {
  return `${student.sername} ${student.name.charAt(
    0
  )}. ${student.secondName.charAt(0)}.`;
};
