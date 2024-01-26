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
import { useDispatch } from "react-redux";
import { show, enable, disable } from "../redux/slices";
import { DepartmentSelector } from "../componetns/DepartmentSelector";

const createSemesters = (include = false, assessmentType = 2) => {
  return { include, assessmentType };
};
export const EditSubject = () => {
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
  const [plans, setPlans] = useState([]);
  const [depID, setdepID] = useState("");
  const [code, setCode] = useState("");
  const [creadits, setCredits] = useState(0);
  const [gos, setGos] = useState(false);
  const [mandatory, setMandatory] = useState(false);
  const [aditionalSpecialityName, setditionalSpecialityName] = useState("");
  const [level, setLevel] = useState("бакалавр");
  const [name, setName] = useState("");
  const [special, setSpesial] = useState(false);
  const [asn, setASN] = useState(false);
  const [plansID, setPlansID] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(enable());
    window.mainApi
      .invokeMain("getEducationPlan")
      .then((result) => {
        if (!JSON.parse(result)) {
          return;
        }
        setPlans(JSON.parse(result).filter((item) => item.level === level));
      })
      .finally(() => {
        dispatch(disable());
      });
  }, [dispatch, level]);

  useEffect(() => {
    if (!special) {
      setdepID("");
    }
  }, [special]);

  const radioChage = (index) => {
    return (event) => {
      setSemesters((prev) => {
        const newSem = [...prev];
        newSem[index].assessmentType = Number.parseInt(event.target.value);
        return newSem;
      });
    };
  };
  const reset = () => {
    setName("");
    setCredits(0);
    setSemesters([
      createSemesters(),
      createSemesters(),
      createSemesters(),
      createSemesters(),
      createSemesters(),
      createSemesters(),
      createSemesters(),
      createSemesters(),
    ]);
  };
  const onSubmit = async () => {
    const subject = {
      name,
      semesters,
      department: depID.toString(),
      gos,
      mandatory,
      level,
      special,
      credits: creadits,
      code,
      educationPlan: plansID.toString(),
      aditionalSpecialityName,
    };

    if (!name || !code || !plansID) {
      dispatch(show({ title: "Переврте дані", type: "error" }));
      return;
    }
    dispatch(enable());
    const result = await window.mainApi.invokeMain("createSubject", subject);
    if (!JSON.parse(result)) {
      dispatch(disable());
      dispatch(show({ title: "Помилка додавання предмету", type: "error" }));
    }
    if (JSON.parse(result)) {
      reset();
      dispatch(disable());
      dispatch(show({ title: "Предмет успішно доданий", type: "success" }));
    }
    dispatch(disable());
  };
  return (
    <Box>
      <h2>Додати предмет</h2>
      <TextField
        value={name}
        label="Назва"
        onChange={(event) => setName(event.target.value)}
      />
      <TextField
        value={code}
        label="Код"
        onChange={(event) => setCode(event.target.value)}
      />
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
                      <FormControlLabel
                        label="П"
                        value={4}
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
        <DepartmentSelector
          setdepID={setdepID}
          depID={depID}
          level={level}
          disabled={!special}
        />
      </Box>

      <Box width={"300px"} marginTop={4}>
        <FormControl fullWidth>
          <InputLabel>Навчальний план</InputLabel>
          <Select
            value={plansID}
            onChange={(event) => setPlansID(event.target.value)}
            label="Навчальний план"
          >
            {plans.map((item) => (
              <MenuItem value={item._id} key={item.name}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box width={300} marginTop={4}>
        <TextField
          label="спеціалізація"
          fullWidth
          disabled={!asn}
          value={aditionalSpecialityName}
          onChange={(event) => setditionalSpecialityName(event.target.value)}
        />
      </Box>

      <Box width={"300px"} marginTop={2}>
        <FormControl fullWidth>
          <InputLabel>ОС</InputLabel>
          <Select
            value={level}
            onChange={(event) => setLevel(event.target.value)}
            label="ОС"
          >
            <MenuItem value={"молодший бакалавр"}>молодший бакалавр</MenuItem>
            <MenuItem value={"бакалавр"}>бакалавр</MenuItem>
            <MenuItem value={"магістр"}>магістр</MenuItem>
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
          checked={gos}
          onChange={() => setGos((prev) => !prev)}
          control={<Switch />}
        />
        <FormControlLabel
          label="Обов'язковий"
          value={mandatory}
          checked={mandatory}
          onChange={() => setMandatory((prev) => !prev)}
          control={<Switch />}
        />
        <FormControlLabel
          label="Спеціальний"
          value={special}
          checked={special}
          onChange={() => setSpesial((prev) => !prev)}
          control={<Switch />}
        />
        <FormControlLabel
          label="Предмет додаткової спеціалізації"
          value={asn}
          checked={asn}
          onChange={() => setASN((prev) => !prev)}
          control={<Switch />}
        />
      </Box>

      <Box marginTop={2}>
        <Button onClick={onSubmit}>Створити</Button>
      </Box>
    </Box>
  );
};
