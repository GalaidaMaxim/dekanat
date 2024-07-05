export const getSemester = (student, sesionType = "Літня") => {
  sesionType = sesionType === "Літня" ? true : false;
  return sesionType ? student.course * 2 : student.course * 2 - 1;
};
