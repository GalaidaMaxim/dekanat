import {
  Box,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState, useEffect } from "react";

export const CreateStudent = () => {
  const [deps, setDeps] = useState([]);
  const [depID, setdepID] = useState("");
  const handleDep = (event) => {
    setdepID(event.target.value);
    console.log(event.target.value);
  };
  console.log(depID);
  useEffect(() => {
    window.mainApi.invokeMain("getDeparments").then((result) => {
      if (!result) {
        return;
      }
      setDeps(result.map((item) => item._doc));
    });
  }, []);
  return (
    <form>
      <h2>Додати студента</h2>
      <Box padding={1} borderTop={1}>
        <Grid container columnSpacing={{ xs: 2 }}>
          <Grid item>
            <TextField label="Прізвище" />
          </Grid>
          <Grid item>
            <TextField label="ім'я" />
          </Grid>
          <Grid item>
            <TextField label="Побатькові" />
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
      </Box>
    </form>
  );
};
