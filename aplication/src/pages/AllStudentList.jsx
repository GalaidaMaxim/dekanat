import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
  TableContainer,
  Paper,
  Alert,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { enable, disable, show } from "../redux/slices";

export const AllStudentList = () => {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(enable());
    window.mainApi
      .invokeMain("getAllStudents")
      .then((students) => {
        if (!students) {
          dispatch(show({ text: "помилка завантаження", type: "warning" }));
          return;
        }
        setStudents(JSON.parse(students));
        dispatch(show({ text: "Завантажено", type: "warning" }));
      })
      .finally(() => {
        dispatch(disable());
      });
  }, []);

  return (
    <Box>
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
    </Box>
  );
};
