import {
  Box,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";

export const CreateStudent = () => {
  const [name, setName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [sername, setSername] = useState("");
  const [depID, setdepID] = useState("");
  const [level, setLevel] = useState("бакалавр");
  const [course, setCourse] = useState(1);

  const [deps, setDeps] = useState([]);
  useEffect(() => {
    window.mainApi.invokeMain("getDeparments").then((result) => {
      if (!result) {
        return;
      }
      setDeps(result);
    });
  }, []);

  const handleDep = (event) => {
    setdepID(event.target.value);
  };
  const handleLevel = (event) => {
    setLevel(event.target.value);
    setCourse(1);
  };
  const reset = () => {
    setName("");
    setSecondName("");
    setdepID("");
    setSername("");
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const student = {
      name,
      secondName,
      sername,
      level,
      course,
      depID: depID.toString(),
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
        <Grid container columnSpacing={{ xs: 2 }}>
          <Grid item xs={2}>
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
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>ОС</InputLabel>
              <Select value={level} onChange={handleLevel} label="відділення">
                <MenuItem value={"бакалавр"}>бакалавр</MenuItem>
                <MenuItem value={"магістр"}>магістр</MenuItem>
              </Select>
            </FormControl>
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
        </Grid>
        <Button type="submit" sx={{ marginTop: 2 }} variant="contained">
          Створити
        </Button>
      </Box>
    </form>
  );
};
