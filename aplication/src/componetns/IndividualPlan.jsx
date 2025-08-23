import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Box,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { enable, disable } from "../redux/slices";
import { inwokeMain } from "../serivce/inwokeMain";

const getSubjectLastMark = (subject) => {
  for (let i = subject.semesters.length - 1; i >= 0; i--) {
    if (subject.semesters[i].include) {
      return subject.semesters[i].mark;
    }
  }
  return "";
};

export const IndividualPlan = ({ student }) => {
  const dispatch = useDispatch();
  const onExport = async () => {
    dispatch(enable());
    try {
      const result = await inwokeMain({ command: "selectFolder" });
      await inwokeMain({
        command: "createIndividualPlan",
        options: {
          student,
          filePath: result,
        },
      });
    } catch (err) {
      console.log(err);
    }
    dispatch(disable());
  };

  return (
    <>
      <h2>Індивідуальний план</h2>
      <h3>Обов'язкові предмети</h3>
      <Table>
        <TableBody>
          {student.subjects
            .filter((item) => item.code.charAt(0) === "1")
            .map((subject) => (
              <TableRow>
                <TableCell sx={{ width: "100px" }}>{subject.code}</TableCell>
                <TableCell sx={{ width: "300px" }}>{subject.name}</TableCell>
                <TableCell sx={{ width: "100px" }}>
                  {getSubjectLastMark(subject)}
                </TableCell>
                <TableCell>{subject.credits}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <h3>Предмети профілізації</h3>
      <Table>
        <TableBody>
          {student.subjects
            .filter((item) => item.code.charAt(0) === "2")
            .map((subject) => (
              <TableRow>
                <TableCell sx={{ width: "100px" }}>{subject.code}</TableCell>
                <TableCell sx={{ width: "300px" }}>{subject.name}</TableCell>
                <TableCell sx={{ width: "100px" }}>
                  {getSubjectLastMark(subject)}
                </TableCell>
                <TableCell>{subject.credits}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <h3>Додаткові кваліфікації</h3>
      <Table>
        <TableBody>
          {student.subjects
            .filter((item) => item.code.charAt(0) === "3")
            .map((subject) => (
              <TableRow>
                <TableCell sx={{ width: "100px" }}>{subject.code}</TableCell>
                <TableCell sx={{ width: "300px" }}>{subject.name}</TableCell>
                <TableCell sx={{ width: "100px" }}>
                  {getSubjectLastMark(subject)}
                </TableCell>
                <TableCell>{subject.credits}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <h3>Вибіркові предмети</h3>
      <Table>
        <TableBody>
          {student.subjects
            .filter((item) => item.code.charAt(0) === "4")
            .map((subject) => (
              <TableRow>
                <TableCell sx={{ width: "100px" }}>{subject.code}</TableCell>
                <TableCell sx={{ width: "300px" }}>{subject.name}</TableCell>
                <TableCell sx={{ width: "100px" }}>
                  {getSubjectLastMark(subject)}
                </TableCell>
                <TableCell>{subject.credits}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Box>
        <h3>Загальна сумму кретитів</h3>
        <h3>
          {student.subjects.reduce((acc, item) => {
            return acc + item.credits;
          }, 0)}
        </h3>
      </Box>
      <Button onClick={onExport} variant="contained">
        Експортувати
      </Button>
    </>
  );
};
