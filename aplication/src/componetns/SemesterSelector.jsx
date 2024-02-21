import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState, useEffect } from "react";

export const SemesterSelector = ({ setSemester, semester, cource }) => {
  const [semestersArr, setSemestersArr] = useState([]);
  console.log(semestersArr);
  useEffect(() => {
    if (!cource) {
      return;
    }

    setSemestersArr([cource * 2 - 1, cource * 2]);
  }, [cource]);

  return (
    <FormControl fullWidth>
      <InputLabel>Семестр</InputLabel>
      <Select
        value={semester}
        onChange={(event) => setSemester(event.target.value)}
        label="курс"
      >
        {semestersArr.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
