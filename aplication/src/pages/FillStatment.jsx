import {
  Box,
  Button,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Table,
  TextField,
  MenuItem,
  FormControl,
  Select,
  Checkbox,
} from "@mui/material";
import { IoReturnDownBackOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const FillStatment = () => {
  const location = useLocation();
  const naviage = useNavigate();
  const { subjectID, semester } = location.state;
  const [students, setStudents] = useState([]);

  const subject = location.state.students[0].subjects.find(
    (item) => item._id === subjectID
  );

  useEffect(() => {
    setStudents(location.state.students);
  }, [location.state.students]);

  const markInputHandle = (index) => {
    return async (event) => {
      const mark = Number.parseInt(event.target.value);
      if (mark != event.target.value && event.target.value !== "") {
        console.log("not a number");
        return;
      }
      window.mainApi
        .invokeMain("updateStudent", {
          id: students[index]._id,
          info: {
            subjects: students[index].subjects,
          },
        })
        .then((result) => {
          setStudents((prev) => {
            const arr = JSON.parse(JSON.stringify(prev));
            arr[index] = JSON.parse(result);
            return arr;
          });
          console.log(JSON.parse(result));
        });
    };
  };

  const markChageHandle = (index, name) => {
    return (event) => {
      setStudents((prev) => {
        const obj = JSON.parse(JSON.stringify(prev));
        obj[index].subjects.find((item) => item._id === name).semesters[
          semester - 1
        ].mark = event.target.value;
        return obj;
      });
    };
  };

  const markInputHandleUndef = (index, name) => {
    return async (event) => {
      students[index].subjects.find((item) => item.name === name).semesters[
        semester - 1
      ].mark = event.target.value;
      console.log(event.target.value);

      window.mainApi
        .invokeMain("updateStudent", {
          id: students[index]._id,
          info: {
            subjects: students[index].subjects,
          },
        })
        .then((result) => {
          setStudents((prev) => {
            const arr = JSON.parse(JSON.stringify(prev));
            arr[index] = JSON.parse(result);
            return arr;
          });
          console.log(JSON.parse(result));
        });
    };
  };

  const redeliveryHandle = (_id, index) => {
    return async (event) => {
      const obj = JSON.parse(JSON.stringify(students[index]));
      obj.subjects.find((item) => item._id === _id).semesters[
        semester - 1
      ].reDelivery = !obj.subjects.find((item) => item._id === _id).semesters[
        semester - 1
      ].reDelivery;

      window.mainApi
        .invokeMain("updateStudent", {
          id: students[index]._id,
          info: {
            subjects: obj.subjects,
          },
        })
        .then((result) => {
          setStudents((prev) => {
            const arr = JSON.parse(JSON.stringify(prev));
            arr[index] = JSON.parse(result);
            return arr;
          });
          console.log(JSON.parse(result));
        });
    };
  };

  return (
    <Box>
      <Button
        onClick={() => naviage(location.state.from, { state: location.state })}
      >
        <IoReturnDownBackOutline />
      </Button>
      <h1>Заповнення відомості</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Студент</TableCell>
            <TableCell>Оцінка</TableCell>
            <TableCell>Перездача</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student, index) => (
            <TableRow key={student._id}>
              <TableCell>{`${student.sername} ${student.name}`}</TableCell>
              <TableCell>
                {subject.semesters[semester - 1].assessmentType !== 1 ? (
                  <TextField
                    onChange={markChageHandle(index, subject._id)}
                    value={
                      student.subjects.find((i) => i._id === subject._id)
                        .semesters[semester - 1].mark || ""
                    }
                    size="small"
                    onBlur={markInputHandle(index)}
                  />
                ) : (
                  <Box width={"50px"}>
                    <FormControl fullWidth>
                      <Select
                        value={
                          student.subjects.find((i) => i.name === subject.name)
                            .semesters[semester - 1].mark || ""
                        }
                        onChange={markInputHandleUndef(index, subject.name)}
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
                <Checkbox
                  checked={
                    student.subjects.find((i) => i._id === subjectID).semesters[
                      semester - 1
                    ].reDelivery
                  }
                  onChange={redeliveryHandle(subjectID, index)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};
