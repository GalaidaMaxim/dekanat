import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState, useEffect } from "react";

export const DepartmentSelector = ({
  setdepID,
  depID,
  level,
  disabled = false,
}) => {
  const [deps, setDeps] = useState([]);
  useEffect(() => {
    window.mainApi.invokeMain("getDeparments").then((result) => {
      if (!result) {
        return;
      }
      setDeps(
        JSON.parse(result).filter((item) => {
          if (level === "молодший бакалавр") {
            return item.level === level;
          } else {
            return item.level === "бакалавр";
          }
        })
      );
    });
  }, [level]);

  const handleDep = (event) => {
    setdepID(event.target.value);
  };
  return (
    <FormControl fullWidth disabled={disabled || !level}>
      <InputLabel>профілізація</InputLabel>
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
