import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
} from "@mui/material";
import { useState, useEffect } from "react";
import { DepartmentSelector } from "../componetns/DepartmentSelector";
import { useDispatch } from "react-redux";
import { enable, disable } from "../redux/slices";

export const SubjectList = () => {
  const [depID, setdepID] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [level, setLevel] = useState("бакалавр");
  const [kredits, setKredits] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!depID) {
      return;
    }
    dispatch(enable());
    window.mainApi
      .invokeMain("getSubjecByDepartment", {
        department: depID.toString(),
        level,
      })
      .then((result) => {
        setSubjects(JSON.parse(result));
      })
      .finally(() => {
        dispatch(disable());
      });
  }, [depID, level, dispatch]);

  useEffect(() => {
    if (subjects.length === 0) {
      return;
    }
    let sum = 0;
    for (let i = 0; i < subjects.length; i++) {
      sum += subjects[i].credits;
    }
    setKredits(sum);
  }, [subjects]);

  return (
    <Box>
      <h1>Індивідуальні плани</h1>
      <Box width={"300px"} marginTop={4}>
        <FormControl fullWidth>
          <InputLabel>ОС</InputLabel>
          <Select
            value={level}
            onChange={(event) => setLevel(event.target.value)}
            label="ОС"
          >
            <MenuItem value={"бакалавр"}>бакалавр</MenuItem>
            <MenuItem value={"магістр"}>магістр</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box width={"300px"} marginTop={4}>
        <DepartmentSelector setdepID={setdepID} depID={depID} />
      </Box>
      <Box>
        <TableContainer marginTop={2} component={Paper}>
          <h3>Обов'язкові предмети</h3>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={"500px"} sx={{ fontWeight: 600 }}>
                  Назва
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Кредити</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Семестри</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjects
                .filter((item) => item.mandatory && !item.special)
                .map((item) => {
                  return (
                    <TableRow key={item.name}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.credits}</TableCell>
                      <TableCell>
                        {item.semesters.map(
                          (sem, index) => sem.include && index + 1 + " "
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer marginTop={2} component={Paper}>
          <h3> ОСВІТНІ КОМПОНЕНТИ, ЩО ФОРМУЮТЬ СПЕЦІАЛЬНІ КОМПЕТЕНТНОСТІ</h3>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={"500px"} sx={{ fontWeight: 600 }}>
                  Назва
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Кредити</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Семестри</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjects
                .filter((item) => item.mandatory && item.special)
                .map((item) => {
                  return (
                    <TableRow key={item.name}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.credits}</TableCell>
                      <TableCell>
                        {item.semesters.map(
                          (sem, index) => sem.include && index + 1 + " "
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer marginTop={2} component={Paper}>
          <h3>Вибіркові</h3>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={"500px"} sx={{ fontWeight: 600 }}>
                  Назва
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Кредити</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Семестри</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjects
                .filter((item) => !item.mandatory)
                .map((item) => {
                  return (
                    <TableRow key={item.name}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.credits}</TableCell>
                      <TableCell>
                        {item.semesters.map(
                          (sem, index) => sem.include && index + 1 + " "
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        {kredits && (
          <h3>
            Кредити: <span>{kredits}</span>
          </h3>
        )}
      </Box>
    </Box>
  );
};
