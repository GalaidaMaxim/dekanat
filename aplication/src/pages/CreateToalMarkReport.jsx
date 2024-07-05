import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
} from "@mui/material";
import { DepartmentSelector } from "../componetns/DepartmentSelector";
import { LevelSelector } from "../componetns/LevelSelector";
import { useState, useEffect } from "react";
import { SesioTypeSelector } from "../componetns/SesionTypeSelector";
import { getSemester } from "../serivce/getSemester";
import { calculateWithRedelivery } from "../serivce/calculateAvarage";
import { createStudentShortName } from "../serivce/createStudentShortName";
import { useDispatch } from "react-redux";
import { enable, disable } from "../redux/slices";
import { ForeignerSelector } from "../componetns/foreignerSelector";
import { useForeigner } from "../redux/selector";

export const CreateTotalMartReport = () => {
  const [level, setLevel] = useState("");
  const [depID, setdepID] = useState("");
  const [students, setStudens] = useState([]);
  const [sesionType, setSesionType] = useState(null);
  const dispatch = useDispatch();
  const foreigner = useForeigner();

  useEffect(() => {
    if (!depID || sesionType === null) {
      return;
    }
    const sesioTypeBool = "Літня" ? true : false;
    (async () => {
      dispatch(enable());
      let studentsRes = await window.mainApi.invokeMain(
        "getStudentByDepartment",
        depID
      );
      studentsRes = JSON.parse(studentsRes);
      if (!studentsRes) {
        return;
      }
      studentsRes = studentsRes.filter(
        (student) =>
          !student.contract &&
          student.foreigner === foreigner &&
          student.level === level
      );
      if (sesioTypeBool) {
        studentsRes = studentsRes.filter((student) => student.course !== 4);
      }
      studentsRes.sort((a, b) => a.course - b.course);

      setStudens(studentsRes);
      dispatch(disable());
    })();
  }, [depID, sesionType, dispatch, foreigner, level]);

  const createTotalMarkTable = async () => {
    const path = JSON.parse(await window.mainApi.invokeMain("selectFolder"));
    let studentsResult = students.filter((item) => !item.contract);
    studentsResult = studentsResult.map((student) => {
      return {
        name: createStudentShortName(student),
        course: student.course,
        mark: calculateWithRedelivery(
          student.subjects,
          getSemester(student, sesionType),
          student.contract
        ),
      };
    });
    await window.mainApi.invokeMain("createTotalMarksTable", {
      tableData: studentsResult,
      filePath: path,
      depId: depID,
      level,
    });
  };

  return (
    <Box>
      <h2>Таблиця середніх балів</h2>
      <Box display={"flex"} flexDirection={"column"} gap={2}>
        <LevelSelector setLevel={setLevel} level={level} />
        <DepartmentSelector level={level} depID={depID} setdepID={setdepID} />
        <SesioTypeSelector
          sesionType={sesionType}
          setSesionType={setSesionType}
        />
        <ForeignerSelector />
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Студент</TableCell>
              <TableCell>Курс</TableCell>
              <TableCell>Семестр</TableCell>
              <TableCell>Середній бал</TableCell>
            </TableRow>
            {students.map((student) => (
              <TableRow>
                <TableCell>{createStudentShortName(student)}</TableCell>
                <TableCell>{student.course}</TableCell>
                <TableCell>{getSemester(student, sesionType)}</TableCell>

                <TableCell>
                  {calculateWithRedelivery(
                    student.subjects,
                    getSemester(student, sesionType),
                    student.contract
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Button variant={"contained"} onClick={createTotalMarkTable}>
        Ескпорт в Excel
      </Button>
    </Box>
  );
};
