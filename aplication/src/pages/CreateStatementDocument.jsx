import {
  Box,
  Button,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from "@mui/material";
import { LevelSelector } from "../componetns/LevelSelector";
import { useEffect, useState } from "react";
import { DepartmentSelector } from "../componetns/DepartmentSelector";
import { PlanSelector } from "../componetns/PlanSelector";
import { CourseSelector } from "../componetns/CourseSelector";
import { SubjectSelector } from "../componetns/SubjectSelector";
import { StudentList } from "../componetns/StudentList";

export const CreateStatemntDocument = () => {
  const [level, setLevel] = useState("");
  const [depID, setDepID] = useState("");
  const [planID, setPlanID] = useState("");
  const [cource, setCource] = useState("");
  const [subjectID, setSubjectID] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (!level || !depID || !cource || !subjectID || !planID) {
      return;
    }
    window.mainApi
      .invokeMain("getStudentsByParams", {
        level,
        department: depID,
        educationPlan: planID,
        cource,
      })
      .then((result) => {
        const data = JSON.parse(result);
        console.log(data);
        if (!data) {
          return;
        }
        setStudents(
          data.filter((item) =>
            item.subjects.some((sub) => sub._id === subjectID)
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [level, planID, depID, cource, subjectID]);

  return (
    <Box>
      <h1>Створення оціночних відомостей</h1>
      <Box>
        <Box>
          <LevelSelector level={level} setLevel={setLevel} />
        </Box>
        <Box marginTop={2}>
          <DepartmentSelector level={level} depID={depID} setdepID={setDepID} />
        </Box>
        <Box marginTop={2}>
          <PlanSelector level={level} planID={planID} setPlanID={setPlanID} />
        </Box>
        <Box marginTop={2}>
          <CourseSelector setCource={setCource} course={cource} />
        </Box>
        <Box marginTop={2}>
          <SubjectSelector
            subjectID={subjectID}
            setSubjectID={setSubjectID}
            educationPlan={planID}
            department={depID}
          />
        </Box>
        <Box>
          <StudentList stuents={students} />
        </Box>
      </Box>
    </Box>
  );
};
