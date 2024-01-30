const { createPlanForDepartment } = require("../service");
module.exports = async ({ educationPlan, department }) => {
  try {
    const subjects = await createPlanForDepartment({
      educationPlan,
      department,
    });
    return subjects;
  } catch (err) {
    console.log(err);
    return null;
  }
};
