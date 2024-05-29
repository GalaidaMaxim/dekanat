export const roundTo = (number, roundCount = 2) => {
  if (typeof number !== "number") {
    return number;
  }
  number *= Math.pow(10, roundCount);
  number = Math.floor(number);
  number /= Math.pow(10, roundCount);
  return number;
};
