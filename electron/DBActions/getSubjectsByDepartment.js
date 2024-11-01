const { createPlanForDepartment } = require("../service");
module.exports = async ({
  educationPlan,
  department,
  nameCollapce = false,
}) => {
  try {
    let subjects = await createPlanForDepartment({
      educationPlan,
      department,
    });

    if (nameCollapce) {
      subjects = subjects.map((subject) => {
        const codeSplit = subject.code.split(".");
        if (codeSplit.length === 3) {
          const baseSubject = subjects.find(
            (item) => item.code === codeSplit[0] + "." + codeSplit[1]
          );
          if (baseSubject) {
            subject.name = baseSubject.name + " " + subject.name;
          }
        }
        return subject;
      });
    }
    return subjects;
  } catch (err) {
    console.log(err);
    return null;
  }
};
