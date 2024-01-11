export const intToABC = (num) => {
  if (num >= 90) {
    return "A";
  } else if (num >= 82) {
    return "B";
  } else if (num >= 74) {
    return "C";
  } else if (num >= 64) {
    return "D";
  } else if (num >= 60) {
    return "E";
  } else if (num >= 35) {
    return "FX";
  } else if (num >= 1) {
    return "F";
  } else {
    return "";
  }
};

export const intToNational = (num) => {
  if (num >= 90) {
    return "Відмінно";
  } else if (num >= 82) {
    return "Добре";
  } else if (num >= 74) {
    return "Добре";
  } else if (num >= 64) {
    return "Задовільно";
  } else if (num >= 60) {
    return "Задовільно";
  } else if (num >= 35) {
    return "Незадовільно";
  } else if (num >= 1) {
    return "Незадовільно";
  } else {
    return "";
  }
};
