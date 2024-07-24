export const getFinalMark = (subject) => {
  for (let i = subject.semesters.levngth - 1; i > 0; i--) {
    if (subject.semesters[i].include) {
      return subject.semesters[i].mark || "Н/A";
    }
  }
};
