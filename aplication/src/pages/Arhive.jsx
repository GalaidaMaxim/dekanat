import {
  Box,
  TableCell,
  TableRow,
  TableBody,
  Table,
  Button,
  TableHead,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { enable, disable, show } from "../redux/slices";
import { inwokeMain } from "../serivce/inwokeMain";

export const Arhive = () => {
  const years = [];
  for (let i = 2018; i < 2050; i++) {
    years.push(i);
  }
  const dispatch = useDispatch();
  const [student, setStudent] = useState(null);
  const [year, setYear] = useState(null);

  const archiveYear = async () => {
    if (!year) {
      return;
    }
    const folder = await inwokeMain({ command: "selectFolder" });
    await inwokeMain({
      command: "archiveYear",
      options: { pathFolder: folder, year },
    });
  };

  const readStudent = async () => {
    const path = await inwokeMain({ command: "openFileDialog" });
    const student = await inwokeMain({
      command: "readAchiveStudent",
      options: { path },
    });
    setStudent(student);
  };
  return (
    <Box>
      <Box>
        <h2>Архівування студентів</h2>
        <Box width={"300px"} marginBottom={2}>
          <FormControl fullWidth>
            <InputLabel>Рік</InputLabel>
            <Select
              label="Рік"
              value={year}
              onChange={({ target }) => setYear(target.value)}
            >
              {years.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <Button onClick={archiveYear} variant="contained">
            Архівувати студентів
          </Button>
        </Box>
      </Box>
      <h2>Робота з архівом</h2>
      <Button onClick={readStudent} variant="contained">
        Відкрити студента
      </Button>
      {student && (
        <Box>
          <h2>{`${student.sername} ${student.name} ${student.secondName}`}</h2>
          <h3>{student.department.fullName}</h3>
          <h3>{student.level}</h3>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Назва предмету</TableCell>
                <TableCell>Оцінка</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {student.subjects.map((item) => (
                <TableRow>
                  <TableCell width={"600px"}>{item.name}</TableCell>
                  <TableCell>{item.mark}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
    </Box>
  );
};
