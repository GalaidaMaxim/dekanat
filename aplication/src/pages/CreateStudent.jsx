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

  const [deps, setDeps] = useState([]);
  useEffect(() => {
    window.mainApi.invokeMain("getDeparments").then((result) => {
      if (!result) {
        return;
      }
      setDeps(result.map((item) => item._doc));
    });
  }, []);

  const handleDep = (event) => {
    setdepID(event.target.value);
    console.log(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const student = {
      name,
      secondName,
      sername,
      depID: depID.toString(),
    };
    const result = await window.mainApi.invokeMain("createStudent", student);
    console.log(result);
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
      <Box padding={1} width={300}>
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
        <Button type="submit" sx={{ marginTop: 2 }} variant="contained">
          Створити
        </Button>
      </Box>
    </form>
  );
};
