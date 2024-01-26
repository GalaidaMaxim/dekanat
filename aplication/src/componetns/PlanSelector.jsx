import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState, useEffect } from "react";

export const PlanSelector = ({
  setPlanID,
  planID,
  level,
  disabled = false,
}) => {
  const [deps, setDeps] = useState([]);
  useEffect(() => {
    window.mainApi.invokeMain("getEducationPlan").then((result) => {
      if (!result) {
        return;
      }
      setDeps(
        JSON.parse(result).filter((item) => {
          return item.level === level;
        })
      );
    });
  }, [level]);

  const handleDep = (event) => {
    setPlanID(event.target.value);
  };
  return (
    <FormControl fullWidth disabled={disabled}>
      <InputLabel>навчаьний план</InputLabel>
      <Select value={planID} onChange={handleDep} label="навчаьний план">
        {deps.map((item) => (
          <MenuItem value={item._id} key={item.name}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
