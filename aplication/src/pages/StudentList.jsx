import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Grid,
} from "@mui/material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useCource } from "../redux/selector";
import { CourseSelector } from "../componetns/CourseSelector";
import { useForeigner } from "../redux/selector";
import { ForeignerSelector } from "../componetns/foreignerSelector";

export const StudentList = () => {
  const { id, level } = useParams();
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [department, setDepartment] = useState({});
  const course = useCource();
  const foreigner = useForeigner();

  useEffect(() => {
    window.mainApi.invokeMain("getStudentByDepartment", id).then((result) => {
      let students = JSON.parse(result);
      if (!students) {
        return;
      }
      if (course !== "Всі") {
        students = students.filter((item) => item.course === course);
      }
      if (level !== "Всі") {
        students = students.filter((item) => item.level === level);
      }

      students.sort((a, b) => a.sername.localeCompare(b.sername));
      setStudents(students.filter((item) => item.foreigner === foreigner));
    });
    window.mainApi.invokeMain("getDeparments", { id }).then((result) => {
      console.log(id);
      setDepartment(JSON.parse(result));
    });
  }, [id, course, level, foreigner]);

  return (
    <Box>
      <h1>
        {department.name} {level}
      </h1>
      <Grid container columnGap={3}>
        <Grid xs={1}>
          <CourseSelector enableAll />
        </Grid>
        <Grid xs={2}>
          <Box>
            <ForeignerSelector />
          </Box>
        </Grid>
      </Grid>
      <Box marginTop={10}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Прізвище</TableCell>
              <TableCell>Ім'я</TableCell>
              <TableCell>Курс</TableCell>
              <TableCell>Освітній ступінь</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.sername}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.course}</TableCell>
                <TableCell>{item.level}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      navigate(`/students_info/${item._id}`, {
                        state: { from: location.pathname },
                      });
                    }}
                    sx={{
                      padding: 0,
                      minWidth: 0,
                      borderRadius: "50%",
                      height: "30px",
                    }}
                  >
                    <CiCirclePlus style={{ width: "100%", height: "100%" }} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};
