import {
  Box,
  Table,
  TableCell,
  TableRow,
  TableBody,
  Button,
} from "@mui/material";
import { DepartmentSelector } from "../componetns/DepartmentSelector";
import { LevelSelector } from "../componetns/LevelSelector";
import { CourseSelector } from "../componetns/CourseSelector";
import { SemesterSelector } from "../componetns/SemesterSelector";
import { PlanSelector } from "../componetns/PlanSelector";
import { useState, useEffect, Fragment } from "react";
import { enable, disable } from "../redux/slices";
import { useDispatch } from "react-redux";
import { SummaryReport } from "../componetns/SummaryReport";
import { ForeignerSelector } from "../componetns/foreignerSelector";
import { useForeigner } from "../redux/selector";

export const CreateSummaryReport = () => {
  const [depID, setDepID] = useState("");
  const [level, setLevel] = useState("");
  const [semester, setSemester] = useState("");
  const [course, setCourse] = useState("");
  const [planID, setPlanID] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const dispatch = useDispatch();
  const foreigner = useForeigner();
  useEffect(() => {
    if (!depID || !level || !semester || !planID || !course) {
      return;
    }
    dispatch(enable());
    window.mainApi
      .invokeMain("getSubjecByDepartment", {
        educationPlan: planID,
        department: depID,
        nameCollapce: true,
      })
      .then((data) => {
        const subjects = JSON.parse(data);
        if (!subjects) {
          return;
        }
        setSubjects(
          subjects.filter((item) => item.semesters[semester - 1].include)
        );
      })
      .finally(() => {
        dispatch(disable());
      });
    window.mainApi
      .invokeMain("getStudentsByParams", {
        educationPlan: planID,
        department: depID,
        level,
        course,
      })
      .then((data) => {
        const students = JSON.parse(data);
        if (!students) {
          return;
        }
        setStudents(students.filter((item) => item.foreigner === foreigner));
      })
      .finally(() => {
        dispatch(disable());
      });
  }, [depID, level, semester, course, planID, dispatch, foreigner]);

  const createExelTable = async () => {
    const path = JSON.parse(await window.mainApi.invokeMain("selectFolder"));
    const result = await window.mainApi.invokeMain("createSummaryReportTable", {
      semester,
      subjects,
      students,
      path,
    });
  };

  return (
    <Box>
      <h2>Зведені відомості</h2>
      <p>Заповніть поля для створення</p>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell width={"200px"}>
              <LevelSelector setLevel={setLevel} level={level} />
            </TableCell>
            <TableCell width={"200px"}>
              <DepartmentSelector
                level={level}
                setdepID={setDepID}
                depID={depID}
              />
            </TableCell>
            <TableCell width={"100px"}>
              <CourseSelector setCource={setCourse} course={course} />
            </TableCell>
            <TableCell width={"100px"}>
              <SemesterSelector semester={semester} setSemester={setSemester} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4} width={"100px"}>
              <PlanSelector
                level={level}
                planID={planID}
                setPlanID={setPlanID}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Box>
        <ForeignerSelector />
      </Box>
      {semester && subjects.length !== 0 && students && (
        <>
          <SummaryReport
            semester={semester}
            subjects={subjects}
            students={students}
          />
          <Box mt={2}>
            <Button onClick={createExelTable} variant="contained">
              Створити Exel таблицю
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};
