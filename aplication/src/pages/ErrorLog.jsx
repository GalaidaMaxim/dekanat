import { Box, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { enable, disable } from "../redux/slices";

export const ErrorLog = () => {
  const [repeatErrors, setRepeatErrors] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(enable());
    (async () => {
      const data = await window.mainApi.invokeMain("getAllStudents");
      let students = JSON.parse(data);
      students = students.filter((student) =>
        student.subjects.some((item, index, arr) => {
          for (let i = 0; i < arr.length; i++) {
            if (i === index) {
              continue;
            }
            if (item._id === arr[i]._id) {
              return true;
            }
          }
          return false;
        })
      );
      students = students.map((student) => {
        student.subjects = student.subjects.filter((item, index, arr) => {
          for (let i = 0; i < arr.length; i++) {
            if (i === index) {
              continue;
            }
            if (item._id === arr[i]._id) {
              return true;
            }
          }
          return false;
        });
        return student;
      });
      dispatch(disable());
      setRepeatErrors(students);
    })();
  }, [setRepeatErrors, dispatch]);
  return (
    <Box>
      <h1>Error Log</h1>
      <Box>
        <h2>Repat subject errors</h2>
        {repeatErrors.length !== 0 && (
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Студент</TableCell>
                <TableCell>Предмет</TableCell>
              </TableRow>
              {repeatErrors.map((item) => (
                <TableRow>
                  <TableCell>{`${item.name} ${item.sername} ${item.department.name} ${item.level}`}</TableCell>
                  <TableCell>{item.subjects.map((sub) => sub.name)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Box>
    </Box>
  );
};
