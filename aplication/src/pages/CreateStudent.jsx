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
  Checkbox,
} from "@mui/material";
import { useState } from "react";
import { DepartmentSelector } from "../componetns/DepartmentSelector";
import { LevelSelector } from "../componetns/LevelSelector";
import { PlanSelector } from "../componetns/PlanSelector";
import { RemoteTypeSelector } from "../componetns/RemoteTypeSelector";
import { useRemoteType } from "../redux/selector";

function formatDate(ts) {
  if (!ts) {
    return;
  }
  const date = new Date(ts);

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}

export const CreateStudent = () => {
  const [name, setName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [sername, setSername] = useState("");
  const [depID, setdepID] = useState("");
  const [level, setLevel] = useState("бакалавр");
  const [course, setCourse] = useState(1);
  const [planID, setPlanID] = useState("");
  const [foreigner, setForeigner] = useState(false);
  const [instrument, setInstrument] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [contract, setContract] = useState(false);

  const remoteType = useRemoteType();

  const reset = () => {
    setName("");
    setSecondName("");
    setdepID("");
    setSername("");
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(foreigner);
    const startYear = new Date(Date.now()).getFullYear();
    const student = {
      name,
      secondName,
      sername,
      level,
      course,
      department: depID.toString(),
      educationPlan: planID.toString(),
      foreigner,
      startYear,
      remoteType,
      instrument,
      phoneNumber,
      birthday,
      contract,
    };
    const result = await window.mainApi.invokeMain("createStudent", student);
    if (result) {
      reset();
    }
  };

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
          <Grid item size={3}>
            <LevelSelector level={level} setLevel={setLevel} />
          </Grid>
          <Grid item size={3}>
            <DepartmentSelector
              level={level}
              depID={depID}
              setdepID={setdepID}
            />
          </Grid>

          <Grid item size={3}>
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
          <Grid item size={4}>
            <RemoteTypeSelector />
          </Grid>
          <Grid item size={4}>
            <PlanSelector setPlanID={setPlanID} planID={planID} level={level} />
          </Grid>
        </Grid>
        <Box paddingTop={1}>
          <Grid container columnSpacing={{ xs: 2 }} rowGap={2}>
            <Grid item size={4}>
              <TextField
                fullWidth
                label="Інструмент"
                value={instrument}
                onChange={(event) => setInstrument(event.target.value)}
              />
            </Grid>
            <Grid item size={4}>
              <TextField
                fullWidth
                label="Телефон"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
            </Grid>
            <Grid item size={12}>
              <TextField
                type="date"
                label="Дата народження"
                value={formatDate(birthday)}
                onChange={(event) => setBirthday(event.target.valueAsNumber)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item size={12}>
              <FormControlLabel
                checked={contract}
                label={"контракт"}
                control={<Checkbox />}
                onChange={() => setContract((prev) => !prev)}
              />
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
        </Box>
        <Button
          disabled={!name || !sername || !secondName || !depID || !planID}
          type="submit"
          sx={{ marginTop: 2 }}
          variant="contained"
        >
          Створити
        </Button>
      </Box>
    </form>
  );
};
