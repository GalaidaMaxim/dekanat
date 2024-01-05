import {
  Box,
  Checkbox,
  Select,
  TextField,
  FormControlLabel,
  FormControl,
  InputLabel,
  MenuItem,
  Switch,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Radio,
  RadioGroup,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";

const createSemesters = (include = false, assessmentType = 2) => {
  return { include, assessmentType };
};
export const CreateSubject = () => {
  const [semesters, setSemesters] = useState([
    createSemesters(),
    createSemesters(),
    createSemesters(),
    createSemesters(),
    createSemesters(),
    createSemesters(),
    createSemesters(),
    createSemesters(),
  ]);
  const [depID, setdepID] = useState("");
  const [creadits, setCredits] = useState(0);
  const [gos, setGos] = useState(false);
  const [mandatory, setMandatory] = useState(false);

  const [deps, setDeps] = useState([]);
  useEffect(() => {
    window.mainApi.invokeMain("getDeparments").then((result) => {
      if (!result) {
        return;
      }
      setDeps(JSON.parse(result));
    });
  }, []);

  const handleDep = (event) => {
    setdepID(event.target.value);
  };
  const radioChage = (index) => {
    return (event) => {
      setSemesters((prev) => {
        const newSem = [...prev];
        newSem[index].assessmentType = Number.parseInt(event.target.value);
        return newSem;
      });
    };
  };
  return (
    <Box>
      <h2>Додати предмет</h2>
      <TextField label="Назва" />
      <Box>
        <h3>Семестри</h3>
        <Table>
          <TableBody>
            <TableRow>
              {semesters.map((item, index) => (
                <TableCell key={index}>
                  <FormControlLabel
                    label={index + 1}
                    labelPlacement="top"
                    onChange={() => {
                      setSemesters((prev) => {
                        const arr = [...prev];
                        arr[index].include = !arr[index].include;
                        return arr;
                      });
                    }}
                    checked={semesters[index].include}
                    control={<Checkbox />}
                  />
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              {semesters.map((item, index) => (
                <TableCell key={index}>
                  <FormControl disabled={!item.include}>
                    <RadioGroup
                      onChange={radioChage(index)}
                      value={semesters[index].assessmentType}
                    >
                      <FormControlLabel
                        label="Н"
                        value={1}
                        control={<Radio />}
                      />
                      <FormControlLabel
                        label="Д"
                        value={2}
                        control={<Radio />}
                      />
                      <FormControlLabel
                        label="Е"
                        value={3}
                        control={<Radio />}
                      />
                    </RadioGroup>
                  </FormControl>
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </Box>

      <Box width={"300px"} marginTop={4}>
        <FormControl fullWidth>
          <InputLabel>відділення</InputLabel>
          <Select value={depID} onChange={handleDep} label="відділення">
            {deps.map((item) => (
              <MenuItem value={item.name} key={item.name}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box marginTop={2}>
        <TextField
          label="Кредити"
          type="number"
          value={creadits}
          onChange={(event) => setCredits(event.target.valueAsNumber)}
        />
      </Box>
      <Box marginTop={2}>
        <FormControlLabel
          label="Державний іспит"
          value={gos}
          onChange={() => setGos((prev) => !prev)}
          control={<Switch />}
        />
        <FormControlLabel
          label="Обов'язковий"
          value={mandatory}
          onChange={() => setMandatory((prev) => !prev)}
          control={<Switch />}
        />
      </Box>
      <Box marginTop={2}>
        <Button>Створити</Button>
      </Box>
    </Box>
  );
};
