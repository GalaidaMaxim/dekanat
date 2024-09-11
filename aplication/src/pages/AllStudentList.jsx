import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
  TableContainer,
  Paper,
  Box,
  Pagination,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { enable, disable, show } from "../redux/slices";
import { StatusSelector } from "../componetns/StatusSelector";
import { useStatus } from "../redux/selector";

export const AllStudentList = () => {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const status = useStatus();

  const [course, setCourse] = useState("Всі");
  const [level, setLevel] = useState("Всі");
  const [department, setDepartment] = useState("Всі");
  const [depList, setDepList] = useState([]);
  const [foreigner, setForeigner] = useState(false);
  const [page, setPage] = useState(1);
  const [countOpPages, setCountOfPages] = useState(1);

  useEffect(() => {
    dispatch(enable());
    const params = {};
    if (status !== "Всі") {
      params.status = status;
    }
    window.mainApi
      .invokeMain("getAllStudents", { page, params })
      .then((info) => {
        if (!info) {
          dispatch(show({ text: "помилка завантаження", type: "warning" }));
          return;
        }
        let { studentsArr, limit, totalStudents } = JSON.parse(info);
        if (!info) {
          return;
        }
        if (course !== "Всі") {
          studentsArr = studentsArr.filter((item) => item.course === course);
        }
        if (level !== "Всі") {
          studentsArr = studentsArr.filter((item) => item.level === level);
        }
        if (department !== "Всі") {
          studentsArr = studentsArr.filter(
            (item) => item.department.name === department
          );
        }

        studentsArr.sort((a, b) => a.sername.localeCompare(b.sername));
        setStudents(studentsArr.filter((item) => item.foreigner === foreigner));
        setCountOfPages(Math.ceil(totalStudents / limit) + 1);
      })
      .finally(() => {
        dispatch(disable());
      });
    window.mainApi.invokeMain("getDeparments").then((result) => {
      setDepList(JSON.parse(result));
    });
  }, [dispatch, course, level, department, foreigner, page, status]);
  const paginationHandle = (event, value) => {
    setPage(value);
  };

  return (
    <Box>
      <Grid container columnGap={3}>
        <Grid xs={1}>
          <FormControl fullWidth>
            <InputLabel>Курс</InputLabel>
            <Select
              value={course}
              onChange={(event) => setCourse(event.target.value)}
              label="відділення"
            >
              <MenuItem value={"Всі"}>Всі</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={2}>
          <FormControl fullWidth>
            <InputLabel>ОС</InputLabel>
            <Select
              value={level}
              onChange={(event) => setLevel(event.target.value)}
              label="ОС"
            >
              <MenuItem value={"Всі"}>Всі</MenuItem>
              <MenuItem value={"бакалавр"}>бакалавр</MenuItem>
              <MenuItem value={"магістр"}>магістр</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={2}>
          <FormControl fullWidth>
            <InputLabel>Відділення</InputLabel>
            <Select
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
              label="Відділення"
            >
              <MenuItem value={"Всі"}>Всі</MenuItem>
              {depList.map((item) => (
                <MenuItem value={item.name}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={2}>
          <StatusSelector />
        </Grid>
        <Box>
          <FormControlLabel
            label="Іноземець"
            value={foreigner}
            checked={foreigner}
            onChange={() => setForeigner((prev) => !prev)}
            control={<Switch />}
          />
        </Box>
      </Grid>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "600" }}>Прізвище</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>Ім'я</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>Курс</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>Відділення</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>Освітній ступінь</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.sername}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.course}</TableCell>
                <TableCell>{item.department.name}</TableCell>
                <TableCell>{item.level}</TableCell>
                <TableCell>
                  <Button
                    sx={{
                      padding: 0,
                      minWidth: 0,
                      borderRadius: "50%",
                      height: "30px",
                    }}
                    onClick={() =>
                      navigate(`/students_info/${item._id}`, {
                        state: { from: location.pathname },
                      })
                    }
                  >
                    <CiCirclePlus style={{ width: "100%", height: "100%" }} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box>
        <Pagination
          page={page}
          count={countOpPages}
          onChange={paginationHandle}
        />
      </Box>
    </Box>
  );
};
