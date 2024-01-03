import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate, useLocation } from "react-router-dom";

export const AllStudentList = () => {
  const [students, setStudents] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.mainApi.invokeMain("getAllStudents").then((students) => {
      setStudents(JSON.parse(students));
      console.log(students);
    });
  }, []);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Прізвище</TableCell>
          <TableCell>Ім'я</TableCell>
          <TableCell>Курс</TableCell>
          <TableCell>Відділення</TableCell>
          <TableCell>Освітній ступінь</TableCell>
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
                  navigate(`/student_info/${item._id}`, {
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
  );
};
