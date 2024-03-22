import {
  Box,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableContainer,
} from "@mui/material";
import { DepartmentSelector } from "../componetns/DepartmentSelector";
import { LevelSelector } from "../componetns/LevelSelector";
import { CourseSelector } from "../componetns/CourseSelector";
import { SemesterSelector } from "../componetns/SemesterSelector";
import { PlanSelector } from "../componetns/PlanSelector";
import { useState, useEffect } from "react";
import { enable, disable } from "../redux/slices";
import { useDispatch } from "react-redux";
import styled from "@emotion/styled";
import { intToABC, intToNational } from "../serivce/formulas";

const StyledTableCell = styled(TableCell)`
  border: 1px solid black;
`;

export const CreateSummaryReport = () => {
  const [depID, setDepID] = useState("");
  const [level, setLevel] = useState("");
  const [semester, setSemester] = useState("");
  const [course, setCourse] = useState("");
  const [planID, setPlanID] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const dispatch = useDispatch();
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
        setStudents(students);
      })
      .finally(() => {
        dispatch(disable());
      });
  }, [depID, level, semester, course, planID]);
  console.log(students);
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
      <h3>Відомість</h3>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <StyledTableCell sx={{ minWidth: "350px" }}></StyledTableCell>
              {students.map((item) => (
                <StyledTableCell
                  colSpan={3}
                  sx={{ minWidth: "300px" }}
                >{`${item.name} ${item.sername}`}</StyledTableCell>
              ))}
            </TableRow>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              {students.map((item) => (
                <>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </>
              ))}
            </TableRow>
            {subjects.map((item) => (
              <TableRow>
                <StyledTableCell sx={{ padding: "5px" }}>
                  {item.name}
                </StyledTableCell>
                {students.map((student) => {
                  const subject = student.subjects.find(
                    (sub) => sub._id === item._id
                  );
                  if (subject) {
                    const value = subject.semesters[semester - 1].mark || "Н/А";
                    if (subject.semesters[semester - 1].assessmentType !== 1) {
                      return (
                        <>
                          <StyledTableCell>{intToABC(value)}</StyledTableCell>
                          <StyledTableCell>{value}</StyledTableCell>
                          <StyledTableCell>
                            {intToNational(value)}
                          </StyledTableCell>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <StyledTableCell></StyledTableCell>
                          <StyledTableCell>{value}</StyledTableCell>
                          <StyledTableCell></StyledTableCell>
                        </>
                      );
                    }
                  } else {
                    return (
                      <>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                      </>
                    );
                  }
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
