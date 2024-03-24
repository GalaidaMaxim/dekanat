import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export const SemesterSelector = ({ setSemester, semester, cource }) => {
  const semestersArr = [1, 2, 3, 4, 5, 6, 7, 8];

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
