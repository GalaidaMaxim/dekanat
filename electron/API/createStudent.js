module.exports = async (event, student) => {
  console.log(student);
  return { message: "OK from server" };
};
