import {
  Box,
  Button,
  FormControl,
  Select,
  MenuItem,
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  TextField,
  Checkbox,
} from "@mui/material";

import { intToABC, intToNational } from "../serivce/formulas";
import { SemesterSelector } from "../componetns/SemesterSelector";
import { useLocation, useNavigate } from "react-router-dom";

export const StudentMarksEdit = ({
  student,
  semester,
  setStudent,
  id,
  subjects,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const markInputHandle = (name) => {
    return async (event) => {
      const mark = Number.parseInt(event.target.value);
      if (mark != event.target.value && event.target.value !== "") {
        console.log("not a number");
        return;
      }
      window.mainApi
        .invokeMain("updateStudent", {
          id,
          info: {
            subjects: student.subjects,
          },
        })
        .then((result) => {
          setStudent(JSON.parse(result));
          console.log(JSON.parse(result));
        });
    };
  };

  const markInputHandleUndef = (_id) => {
    return async (event) => {
      const obj = JSON.parse(JSON.stringify(student));
      obj.subjects.find((item) => item._id === _id).semesters[
        semester - 1
      ].mark = event.target.value;

      window.mainApi
        .invokeMain("updateStudent", {
          id,
          info: {
            subjects: obj.subjects,
          },
        })
        .then((result) => {
          setStudent(JSON.parse(result));
          console.log(JSON.parse(result));
        });
    };
  };

  const redeliveryHandle = (_id) => {
    return async (event) => {
      const obj = JSON.parse(JSON.stringify(student));
      obj.subjects.find((item) => item._id === _id).semesters[
        semester - 1
      ].reDelivery = !obj.subjects.find((item) => item._id === _id).semesters[
        semester - 1
      ].reDelivery;

      window.mainApi
        .invokeMain("updateStudent", {
          id,
          info: {
            subjects: obj.subjects,
          },
        })
        .then((result) => {
          setStudent(JSON.parse(result));
          console.log(JSON.parse(result));
        });
    };
  };

  const markChageHandle = (_id) => {
    return (event) => {
      setStudent((prev) => {
        const obj = JSON.parse(JSON.stringify(prev));
        obj.subjects.find((item) => item._id === _id).semesters[
          semester - 1
        ].mark = event.target.value;
        return obj;
      });
    };
  };

  const ignoreHandle = (_id) => {
    return async (event) => {
      const obj = JSON.parse(JSON.stringify(student));
      obj.subjects.find((item) => item._id === _id).semesters[
        semester - 1
      ].ignore = !obj.subjects.find((item) => item._id === _id).semesters[
        semester - 1
      ].ignore;

      window.mainApi
        .invokeMain("updateStudent", {
          id,
          info: {
            subjects: obj.subjects,
          },
        })
        .then((result) => {
          setStudent(JSON.parse(result));
          console.log(JSON.parse(result));
        });
    };
  };
  return (
    <>
      <h2>Предмети</h2>
      <Box width={"300px"}>
        <SemesterSelector />
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width={"300px"}>Назва</TableCell>
            <TableCell width={"50px"}>Оцінка</TableCell>
            <TableCell>ECTS</TableCell>
            <TableCell>Національна шкала</TableCell>
            <TableCell>Перездача</TableCell>
            <TableCell>Ігнорувати</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subjects.map((item, index) => (
            <TableRow key={item._id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                {item.semesters[semester - 1].assessmentType !== 1 ? (
                  <TextField
                    onChange={markChageHandle(item._id)}
                    value={
                      student.subjects.find((i) => i._id === item._id)
                        .semesters[semester - 1].mark || ""
                    }
                    size="small"
                    onBlur={markInputHandle()}
                  />
                ) : (
                  <Box width={"50px"}>
                    <FormControl fullWidth>
                      <Select
                        value={
                          student.subjects.find((i) => i._id === item._id)
                            .semesters[semester - 1].mark || ""
                        }
                        onChange={markInputHandleUndef(item._id)}
                      >
                        <MenuItem value={undefined}>...</MenuItem>
                        <MenuItem value={"Зараховано"}>Зараховано</MenuItem>
                        <MenuItem value={"Незараховано"}>Незараховано</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                )}
              </TableCell>
              <TableCell>
                {intToABC(
                  student.subjects.find((i) => i._id === item._id).semesters[
                    semester - 1
                  ].mark
                )}
              </TableCell>
              <TableCell>
                {intToNational(
                  student.subjects.find((i) => i._id === item._id).semesters[
                    semester - 1
                  ].mark
                )}
              </TableCell>
              <TableCell>
                <Checkbox
                  checked={
                    student.subjects.find((i) => i._id === item._id).semesters[
                      semester - 1
                    ].reDelivery
                  }
                  onChange={redeliveryHandle(item._id)}
                />
              </TableCell>
              <TableCell>
                <Checkbox
                  checked={
                    student.subjects.find((i) => i._id === item._id).semesters[
                      semester - 1
                    ].ignore
                  }
                  onChange={ignoreHandle(item._id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box paddingTop={10}>
        <h2>Операції</h2>
        <Box
          alignItems={"flex-start"}
          display={"flex"}
          flexDirection={"column"}
          gap={2}
        >
          <Button
            variant="contained"
            onClick={() => {
              navigate(`/edit_student/${student._id}`, {
                state: location.state,
              });
            }}
          >
            Редагувати
          </Button>
        </Box>
      </Box>
    </>
  );
};
