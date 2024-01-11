import {
  Box,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  TextField,
} from "@mui/material";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { intToABC, intToNational } from "../serivce/formulas";

export const StudentInfo = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({});
  const [semester, setSemester] = useState(1);
  const [subjects, setSubjects] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const arr = [];
  for (let i = 1; i <= 8; i++) {
    arr.push(i);
  }
  useEffect(() => {
    window.mainApi.invokeMain("getStudentById", id).then((result) => {
      setStudent(JSON.parse(result));
    });
  }, [id]);
  useEffect(() => {
    if (!student.subjects) {
      return;
    }

    const arr = student.subjects.filter(
      (item) => item.semesters[semester - 1].include
    );
    setSubjects(arr);
  }, [student, semester]);
  const mandatoryAdd = async () => {
    window.mainApi.invokeMain("addMandatorySubjects", id).then((result) => {
      setStudent(JSON.parse(result));
    });
  };

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

  const markChageHandle = (name) => {
    return (event) => {
      setStudent((prev) => {
        const obj = JSON.parse(JSON.stringify(prev));
        obj.subjects.find((item) => item.name === name).semesters[
          semester - 1
        ].mark = event.target.value;
        return obj;
      });
    };
  };

  return (
    <Box>
      <Button onClick={() => navigate(location.state.from)}>Назад</Button>
      <Box display="flex" gap={3}>
        <h1>{student.sername}</h1>
        <h1>{student.name}</h1>
      </Box>
      <Box marginBottom={10}>
        <h1>{student.secondName}</h1>
      </Box>
      <Box borderTop={1}>
        <h2>Предмети</h2>
        <Box width={"300px"}>
          <FormControl fullWidth>
            <InputLabel>Ceместер</InputLabel>
            <Select
              value={semester}
              onChange={(event) => setSemester(event.target.value)}
              label={"Ceместер"}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={"300px"}>Назва</TableCell>
              <TableCell width={"50px"}>Оцінка</TableCell>
              <TableCell>ECTS</TableCell>
              <TableCell>Нацыональна шкала</TableCell>
              <TableCell>Викладач</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjects.map((item, index) => (
              <TableRow>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <TextField
                    onChange={markChageHandle(item.name)}
                    value={
                      student.subjects.find((i) => i.name === item.name)
                        .semesters[semester - 1].mark || ""
                    }
                    size="small"
                    onBlur={markInputHandle()}
                  />
                </TableCell>
                <TableCell>
                  {intToABC(
                    student.subjects.find((i) => i.name === item.name)
                      .semesters[semester - 1].mark
                  )}
                </TableCell>
                <TableCell>
                  {intToNational(
                    student.subjects.find((i) => i.name === item.name)
                      .semesters[semester - 1].mark
                  )}
                </TableCell>
                <TableCell>
                  {intToNational(student.subjects[index].coach)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button onClick={mandatoryAdd}>Додати обов'язкові предмети</Button>
      </Box>
    </Box>
  );
};
