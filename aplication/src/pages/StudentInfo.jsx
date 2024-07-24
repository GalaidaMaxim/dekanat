import { Box, Button, Tabs, Tab } from "@mui/material";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSemester } from "../redux/selector";
import { StudentMarksEdit } from "../componetns/StudentMarksEdit";

export const StudentInfo = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({});
  const semester = useSemester();
  const [subjects, setSubjects] = useState([]);
  const [tabVal, setTabVal] = useState("Предмети");

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

  return (
    <Box>
      <Button
        onClick={() => {
          navigate(location.state.from);
        }}
      >
        Назад
      </Button>
      <Box>
        <Box>
          <Box display="flex" gap={3}>
            <h1>{student.sername}</h1>
            <h1>{student.name}</h1>
          </Box>
          <Box marginBottom={10}>
            <h1>{student.secondName}</h1>
          </Box>
        </Box>
        <Box display={"flex"} gap={10}>
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
          <Box>
            <p>рік вступу: </p>
            <h3>{student.startYear}</h3>
          </Box>
          <Box>
            <p>статус: </p>
            <h3>{student.status}</h3>
          </Box>
        </Box>
      </Box>
      <Box borderTop={1}>
        <Tabs
          value={tabVal}
          onChange={(event, newValue) => {
            setTabVal(newValue);
          }}
        >
          <Tab value={"Предмети"} label="Предмети" />
          <Tab value={"Індивідуальний план"} label="Індивідуальний план" />
        </Tabs>

        {tabVal === "Предмети" && (
          <StudentMarksEdit
            student={student}
            semester={semester}
            setStudent={setStudent}
            subjects={subjects}
            id={id}
          />
        )}
      </Box>
    </Box>
  );
};
