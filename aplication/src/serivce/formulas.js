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

export const intToNational = (num, level = "бакалавр") => {
  if (level === "бакалавр" || level === "магістр") {
    if (num >= 90) {
      return "Відмінно";
    } else if (num >= 82) {
      return "Добре";
    } else if (num >= 90) {
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
  } else if (level === "молодший бакалавр") {
    if (num > 99) {
      return "12";
    } else if (num >= 95) {
      return "11";
    } else if (num >= 90) {
      return "10";
    } else if (num >= 86) {
      return "9";
    } else if (num >= 82) {
      return "8";
    } else if (num >= 74) {
      return "7";
    } else if (num >= 69) {
      return "6";
    } else if (num >= 64) {
      return "5";
    } else if (num >= 60) {
      return "4";
    } else if (num >= 47) {
      return "3";
    } else if (num >= 35) {
      return "2";
    } else if (num >= 1) {
      return "1";
    } else {
      return "";
    }
  }
};
