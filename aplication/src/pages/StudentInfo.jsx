import { Box, Button } from "@mui/material";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const StudentInfo = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    window.mainApi.invokeMain("getStudentById", id).then((result) => {
      setStudent(JSON.parse(result));
    });
  }, []);
  return (
    <Box>
      <Button onClick={() => navigate(location.state.from)}>Назад</Button>
      <Box display="flex" gap={3}>
        <h1>{student.sername}</h1>
        <h1>{student.name}</h1>
      </Box>
      <Box>
        <h1>{student.secondName}</h1>
      </Box>
    </Box>
  );
};
