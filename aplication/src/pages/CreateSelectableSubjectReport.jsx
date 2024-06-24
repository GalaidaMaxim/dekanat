import {
  Box,
  Grid,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { LevelSelector } from "../componetns/LevelSelector";
import { CourseSelector } from "../componetns/CourseSelector";
import { Fragment, useEffect, useState } from "react";
import { PlanSelector } from "../componetns/PlanSelector";
import { SemesterSelector } from "../componetns/SemesterSelector";
import { useCource } from "../redux/selector";
import { createStudentShortName } from "../serivce/createStudentShortName";
import { enable, disable } from "../redux/slices";
import { useDispatch } from "react-redux";
import { useSemester } from "../redux/selector";

const RenderCell = ({ spec = true, firstItem = "", SecondItem = "" }) => {
  if (spec) {
    return (
      <>
        <TableCell sx={{ minWidth: "150px" }}>{firstItem}</TableCell>
        <TableCell sx={{ minWidth: "150px" }}>{SecondItem}</TableCell>
      </>
    );
  }
  return <TableCell>{firstItem}</TableCell>;
};

export const CreateSelectubleSubjectReport = () => {
  const [level, setLevel] = useState("");
  const [planID, setPlanID] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [maxHeight, setMaxHeight] = useState(0);
  const semester = useSemester();
  const dispatch = useDispatch();

  const course = useCource();
  const mhArr = [];
  for (let i = 0; i < maxHeight; i++) {
    mhArr.push(i);
  }

  const isSubjectIncludesInStudent = (id, student) => {
    return student.subjects.some((item) => item._id === id);
  };

  useEffect(() => {
    if (!planID || !course || !level) {
      return;
    }
    (async () => {
      dispatch(enable());
      let subjects = JSON.parse(
        await window.mainApi.invokeMain("getSubjectsByEducationPlan", {
          educationPlan: planID,
        })
      ).filter(
        (item) => item.code.charAt(0) === "3" || item.code.charAt(0) === "4"
      );
      const students = JSON.parse(
        await window.mainApi.invokeMain("getStudentsByCourse", {
          educationPlan: planID,
          course,
          level,
        })
      );
      subjects = subjects.map((item) => ({
        name: item.name,
        _id: item._id,
        spec: item.code.charAt(0) === "3" ? item.aditionalSpecialityName : "",
        students: [],
        specStudents: [],
      }));

      const specs = subjects.reduce((acc, item) => {
        if (!item.spec) {
          return acc;
        }
        if (acc.some((obj) => obj.name === item.spec)) {
          const index = acc.findIndex((obj) => obj.name === item.spec);
          acc[index].ids.push(item._id);
          return acc;
        }
        acc.push({
          name: item.spec,
          ids: [item._id],
        });
        return acc;
      }, []);
      students.forEach((student) => {
        subjects.forEach((subject) => {
          if (subject.spec) {
            const spec = specs.find((item) => item.name === subject.spec);
            if (
              spec.ids.every((item) =>
                isSubjectIncludesInStudent(item, student)
              )
            ) {
              subject.specStudents.push(
                `${createStudentShortName(student)} ${student.department.name}`
              );
            } else if (isSubjectIncludesInStudent(subject._id, student)) {
              subject.students.push(
                `${createStudentShortName(student)} ${student.department.name}`
              );
            }
          } else {
            if (isSubjectIncludesInStudent(subject._id, student)) {
              subject.students.push(
                `${createStudentShortName(student)} ${student.department.name}`
              );
            }
          }
        });
      });
      subjects = subjects.filter(
        (item) => item.students.length || item.specStudents.length
      );
      setMaxHeight(
        subjects.reduce((acc, item) => {
          if (item.students.length > acc) {
            acc = item.students.length;
          } else if (item.specStudents.length > acc) {
            acc = item.specStudents.length;
          }
          return acc;
        }, 0)
      );
      setSubjects(subjects);
      dispatch(disable());
    })();
  }, [planID, setSubjects, course, level, setMaxHeight]);
  console.log(subjects);
  return (
    <Box>
      <h2>Звіт по вибірковим предметам</h2>
      <Grid container rowSpacing={2} spacing={2}>
        <Grid item xs={6}>
          <LevelSelector level={level} setLevel={setLevel} />
        </Grid>
        <Grid item xs={6}>
          <CourseSelector />
        </Grid>
        <Grid item xs={6}>
          <PlanSelector
            level={level}
            planID={planID}
            setPlanID={setPlanID}
            disabled={!level}
          />
        </Grid>
        <Grid item xs={6}>
          <SemesterSelector />
        </Grid>
      </Grid>
      <Box padding={2} sx={{ overflowX: "scroll", maxWidth: "100%" }}>
        <Table sx={{ maxWidth: "none", width: "auto" }}>
          <TableBody>
            <TableRow>
              {subjects.map((subject) => (
                <TableCell
                  sx={{ minWidth: "200px", fontWeight: "800" }}
                  key={subject._id}
                  colSpan={subject.spec ? 2 : 1}
                >
                  {subject.name}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              {subjects.map((subject) => (
                <TableCell
                  sx={{ minWidth: "200px", fontSize: 10 }}
                  key={subject._id}
                  colSpan={subject.spec ? 2 : 1}
                >
                  {subject.spec}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              {subjects.map((subject) => (
                <RenderCell
                  key={subject._id}
                  sx={{ fontSize: 10 }}
                  spec={subject.spec}
                  firstItem="Предпет"
                  SecondItem="Спеціалізація"
                />
              ))}
            </TableRow>
            {mhArr.map((index) => (
              <TableRow key={index}>
                {subjects.map((subject) => (
                  <RenderCell
                    key={subject._id}
                    spec={subject.spec}
                    firstItem={
                      subject.students.length > index
                        ? subject.students[index]
                        : ""
                    }
                    SecondItem={
                      subject.specStudents.length > index
                        ? subject.specStudents[index]
                        : ""
                    }
                  />
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};
