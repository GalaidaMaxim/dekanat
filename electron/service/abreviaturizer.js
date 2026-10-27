module.exports = (line = "") => {
  const a = "qwe";
  a.charAt(0).toUpperCase;
  let arr = line.split(" ");
  arr = arr.map((item) => item.charAt(0).toUpperCase());
  return arr.join("");
};
