import {
  Box,
  Button,
  FormControl,
  TextField,
  Table,
  MenuItem,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { enable, disable, show } from "../redux/slices";
import { useDispatch } from "react-redux";
import { MyAcordion } from "../componetns/Acordion";

export const EditStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({});
  const [subjects, setSubjects] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    window.mainApi
      .invokeMain("getStudentById", id)
      .then((result) => {
        dispatch(enable());
        setStudent(JSON.parse(result));
      })
      .finally(() => {
        dispatch(disable());
      });
  }, [id, dispatch]);

  useEffect(() => {
    if (!student.department || !student.level) {
      return;
    }
    window.mainApi
      .invokeMain("getSubjecByDepartment", {
        department: student.department,
        level: student.level,
      })
      .then((result) => {
        dispatch(enable());
        const allSubjects = JSON.parse(result);
        setSubjects(
          allSubjects.filter(
            (item) =>
              !item.mandatory &&
              student.subjects.every((sub) => sub._id !== item._id)
          )
        );
      })
      .finally(() => {
        dispatch(disable());
      });
  }, [student.department, student.level, dispatch, student.subjects]);
  console.log(subjects);
  const chageHandle = (field) => {
    return (event) => {
      setStudent((prev) => {
        const newStudent = JSON.parse(JSON.stringify(prev));
        newStudent[field] = event.target.value;
        console.log(event.target.value);
        return newStudent;
      });
    };
  };

  const onSubmit = (field) => {
    return async () => {
      window.mainApi
        .invokeMain("updateStudent", {
          id,
          info: {
            [field]: student[field],
          },
        })
        .then((result) => {
          dispatch(show({ title: "Студент оновлений" }));
          setStudent(JSON.parse(result));
        });
    };
  };

  const addSubject = (subject) => {
    return async () => {
      const arr = student.subjects;
      arr.push(subject);
      window.mainApi
        .invokeMain("updateStudent", {
          id,
          info: {
            subjects: arr,
          },
        })
        .then((result) => {
          dispatch(show({ title: "Студент оновлений" }));
          setStudent(JSON.parse(result));
        });
    };
  };

  const removeSubject = (subjectId) => {
    return async () => {
      const arr = student.subjects.filter((item) => item._id !== subjectId);
      window.mainApi
        .invokeMain("updateStudent", {
          id,
          info: {
            subjects: arr,
          },
        })
        .then((result) => {
          dispatch(show({ title: "Студент оновлений" }));
          setStudent(JSON.parse(result));
        });
    };
  };

  return (
    <Box>
      <Button
        onClick={() =>
          navigate(`/students_info/${student._id}`, { state: location.state })
        }
      >
        Назад
      </Button>
      <Box>
        <h1>Редагування студента</h1>
        <Box>
          <Box display="flex" gap={3}>
            <FormControl>
              <TextField
                onBlur={onSubmit("sername")}
                value={student.sername}
                onChange={chageHandle("sername")}
              />
            </FormControl>
            <FormControl>
              <TextField
                value={student.name}
                onChange={chageHandle("name")}
                onBlur={onSubmit("name")}
              />
            </FormControl>
          </Box>
          <Box marginTop={2} marginBottom={10}>
            <FormControl>
              <TextField
                value={student.secondName}
                onChange={chageHandle("secondName")}
                onBlur={onSubmit("secondName")}
              />
            </FormControl>
          </Box>
        </Box>
        <Box display={"flex"} gap={20}>
          <Box>
            <p>відділення: </p>
            <h3>{student.department && student.department.name}</h3>
          </Box>
          <Box>
            <p>освітній ступінь: </p>
            <h3>{student.level}</h3>
          </Box>
          <Box>
            <p>курс: </p>
            <h3>{student.course}</h3>
          </Box>
        </Box>
      </Box>

      <Box borderTop={1}>
        <h2>Предмети</h2>
        <MyAcordion title={"Індивідульний план студента"}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={"300px"}>Назва</TableCell>
                <TableCell width={"50px"}>Кредити</TableCell>
                <TableCell>Викладач</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {student.subjects &&
                student.subjects.map((item, index) => (
                  <TableRow key={item.name}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{student.subjects[index].credits}</TableCell>
                    <TableCell>
                      {student.subjects[index].coach || "невідомо"}
                    </TableCell>
                    <TableCell>
                      {!student.subjects[index].mandatory && (
                        <Button
                          onClick={removeSubject(student.subjects[index]._id)}
                        >
                          Видалити
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </MyAcordion>

        <MyAcordion title={"Вибіркові предмети"}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={"300px"}>Назва</TableCell>
                <TableCell>Кредити</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjects &&
                subjects.map((item, index) => (
                  <TableRow key={item.name}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.credits}</TableCell>
                    <TableCell>
                      <Button onClick={addSubject(item)}>Додати предмет</Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </MyAcordion>
      </Box>
    </Box>
  );
};
