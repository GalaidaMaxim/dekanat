export const getFinalMark = (subject) => {
  for (let i = subject.semesters.length - 1; i > 0; i--) {
    if (subject.semesters[i].include) {
      return subject.semesters[i].mark || "Н/A";
    }
  }
};

export const getExistingFinalMark = (subject) => {
  for (let i = subject.semesters.length - 1; i > 0; i--) {
    if (subject.semesters[i].include && subject.semesters[i].mark) {
      return subject.semesters[i].mark;
    }
  }
};
