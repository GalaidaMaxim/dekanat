import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState, useEffect } from "react";

export const DepartmentSelector = ({ setdepID, depID }) => {
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
  return (
    <FormControl fullWidth>
      <InputLabel>відділення</InputLabel>
      <Select value={depID} onChange={handleDep} label="відділення">
        {deps.map((item) => (
          <MenuItem value={item._id} key={item.name}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
