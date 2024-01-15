import { Box, Button, FormControl, TextField } from "@mui/material";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { enable, disable, show } from "../redux/slices";
import { useDispatch } from "react-redux";

export const EditStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({});

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
  }, [id]);

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
    </Box>
  );
};
