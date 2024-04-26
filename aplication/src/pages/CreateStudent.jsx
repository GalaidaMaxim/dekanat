import {
  Box,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useState } from "react";
import { DepartmentSelector } from "../componetns/DepartmentSelector";
import { LevelSelector } from "../componetns/LevelSelector";
import { PlanSelector } from "../componetns/PlanSelector";

export const CreateStudent = () => {
  const [name, setName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [sername, setSername] = useState("");
  const [depID, setdepID] = useState("");
  const [level, setLevel] = useState("бакалавр");
  const [course, setCourse] = useState(1);
  const [planID, setPlanID] = useState("");
  const [foreigner, setForeigner] = useState(false);

  const reset = () => {
    setName("");
    setSecondName("");
    setdepID("");
    setSername("");
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(foreigner);
    const student = {
      name,
      secondName,
      sername,
      level,
      course,
      department: depID.toString(),
      educationPlan: planID.toString(),
      foreigner,
    };
    const result = await window.mainApi.invokeMain("createStudent", student);
    if (result) {
      reset();
    }
  };
  console.log(depID);
  return (
    <form onSubmit={onSubmit}>
      <h2>Додати студента</h2>
      <Box padding={1} borderTop={1}>
        <Grid container columnSpacing={{ xs: 2 }}>
          <Grid item>
            <TextField
              label="Прізвище"
              value={sername}
              onChange={(event) => setSername(event.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="ім'я"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Побатькові"
              value={secondName}
              onChange={(event) => setSecondName(event.target.value)}
            />
          </Grid>
        </Grid>
      </Box>
      <Box padding={1}>
        <Grid container columnSpacing={{ xs: 2 }} rowGap={2}>
          <Grid item xs={2}>
            <DepartmentSelector
              level={level}
              depID={depID}
              setdepID={setdepID}
            />
          </Grid>
          <Grid item xs={4}>
            <LevelSelector level={level} setLevel={setLevel} />
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel>Курс</InputLabel>
              <Select
                value={course}
                onChange={(event) => setCourse(event.target.value)}
                label="відділення"
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <PlanSelector setPlanID={setPlanID} planID={planID} level={level} />
          </Grid>
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
        <Button type="submit" sx={{ marginTop: 2 }} variant="contained">
          Створити
        </Button>
      </Box>
    </form>
  );
};
