const { createPlanForDepartment } = require("../service");

module.exports = async (student) => {
  const { department, educationPlan } = student;
  const subject = await createPlanForDepartment({ department, educationPlan });
  const mandatorySubejct = subject.filter((item) => item.mandatory);
  student.subjects.push(...mandatorySubejct);
  await student.save();
  return student;
};
