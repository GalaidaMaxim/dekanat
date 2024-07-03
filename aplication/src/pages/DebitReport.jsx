import {
  Box,
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { DepartmentSelector } from "../componetns/DepartmentSelector";
import { LevelSelector } from "../componetns/LevelSelector";
import { useState } from "react";
import { CourseSelector } from "../componetns/CourseSelector";
import { SemesterSelector } from "../componetns/SemesterSelector";
import { useCource } from "../redux/selector";
import { useSemester } from "../redux/selector";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { enable, disable } from "../redux/slices";
import { PlanSelector } from "../componetns/PlanSelector";

export const DebitReport = () => {
  const [level, setLevel] = useState("");
  const [depID, setdepID] = useState("");
  const [planID, setPlanID] = useState("");
  const [debits, setDebits] = useState([]);

  const course = useCource();
  const semester = useSemester();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!depID || !level || !course || !planID) {
      return;
    }
    (async () => {
      dispatch(enable());
      const data = await window.mainApi.invokeMain("getStudentsByParams", {
        level,
        course,
        educationPlan: planID,
        department: depID,
        status: "навчається",
      });
      const students = JSON.parse(data);
      const arr = [];
      students.forEach((student) => {
        const subjects = student.subjects.filter(
          (subject) =>
            subject.semesters[semester - 1].include &&
            !subject.semesters[semester - 1].mark &&
            !subject.semesters[semester - 1].ignore
        );
        subjects.forEach((subject) => {
          arr.push({
            name: student.name + " " + student.sername,
            seubjectName: subject.name,
          });
        });
      });
      setDebits(arr);
      dispatch(disable());
    })();
  }, [depID, level, course, planID, semester, dispatch]);

  return (
    <Box>
      <h1>Звіт заборгованостей</h1>
      <Box>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <LevelSelector level={level} setLevel={setLevel} />
          </Grid>
          <Grid item xs={3}>
            <DepartmentSelector
              level={level}
              setLevel={setLevel}
              setdepID={setdepID}
              depID={depID}
              disabled={!level}
            />
          </Grid>
          <Grid item xs={3}>
            <CourseSelector />
          </Grid>

          <Grid item xs={6}>
            <PlanSelector
              planID={planID}
              setPlanID={setPlanID}
              level={level}
              disabled={!level}
            />
          </Grid>
          <Grid item xs={3}>
            <SemesterSelector />
          </Grid>
        </Grid>
      </Box>
      <Box marginTop={2}>
        <Table sx={{ maxWidth: "none", width: "auto" }}>
          <TableBody>
            <TableRow>
              <TableCell sx={{ minWidth: "300px", backgroundColor: "orange" }}>
                Студет
              </TableCell>
              <TableCell sx={{ minWidth: "300px", backgroundColor: "orange" }}>
                Предмет
              </TableCell>
            </TableRow>
            {debits.map((item, index) => (
              <TableRow key={index}>
                <TableCell sx={{ minWidth: "300px" }}>{item.name}</TableCell>
                <TableCell sx={{ minWidth: "300px" }}>
                  {item.seubjectName}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};
