import {
  Box,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const StudentInfo = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({});
  const [semester, setSemester] = useState(1);
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
  console.log(student);
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
        <Box>
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
      </Box>
    </Box>
  );
};
