const calculateAvarage = (subjectList, semester) => {
  const angryResult = "Прездача";
  if (
    subjectList.some(
      (item) =>
        item.semesters[semester - 1].include &&
        ((item.semesters[semester - 1].assessmentType === 1 &&
          (!item.semesters[semester - 1].mark ||
            item.semesters[semester - 1].mark === "Незараховано")) ||
          !item.semesters[semester - 1].mark)
    )
  ) {
    return angryResult;
  }
  let average = 0;
  let avarageCount = 0;
  subjectList.forEach((item) => {
    if (
      item.semesters[semester - 1].include &&
      item.semesters[semester - 1].assessmentType !== 1
    ) {
      avarageCount++;
      average += Number.parseInt(item.semesters[semester - 1].mark);
    }
  });
  console.log(avarageCount);
  return average / avarageCount;
};

module.exports = {
  calculateAvarage,
};
