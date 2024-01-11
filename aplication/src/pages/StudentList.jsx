import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
  Box,
} from "@mui/material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import styled from "@emotion/styled";

export const StudentList = () => {
  const { id } = useParams();
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.mainApi.invokeMain("getStudentByDepartment", id).then((students) => {
      setStudents(JSON.parse(students));
    });
  }, []);

  return (
    <Box>
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
                  onClick={() =>
                    navigate(`/students_info/${item._id}`, {
                      state: { from: location.pathname },
                    })
                  }
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
  );
};
