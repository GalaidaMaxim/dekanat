import { roundTo } from "./mathFunctions";

export const calculateAvarage = (subjectList, semester, contract) => {
  const angryResult = "Прездача";

  if (
    subjectList.some(
      (item) =>
        item.semesters[semester - 1].include &&
        !item.semesters[semester - 1].ignore &&
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
      item.semesters[semester - 1].assessmentType !== 1 &&
      !item.semesters[semester - 1].ignore
    ) {
      avarageCount++;
      average += Number.parseInt(item.semesters[semester - 1].mark);
      if (isNaN(average)) {
        console.log(item.name);
      }
    }
  });

  console.log(average, avarageCount);

  return roundTo(average / avarageCount, 2) + (contract ? " контракт" : "");
};

export const checkRedelivery = (subjects, semester) => {
  if (
    subjects
      .filter((sub) => sub.semesters[semester - 1].include)
      .some(
        (sub) =>
          sub.semesters[semester - 1].reDelivery ||
          (!sub.semesters[semester - 1].mark &&
            !sub.semesters[semester - 1].ignore)
      )
  ) {
    return true;
  }
  return false;
};

export const calculateWithRedelivery = (subjectList, semester, contract) => {
  if (checkRedelivery(subjectList, semester)) {
    return "-----";
  }
  return calculateAvarage(subjectList, semester, contract);
};
