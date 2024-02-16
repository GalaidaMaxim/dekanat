import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export const CourseSelector = ({ setCource, course }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>Курс</InputLabel>
      <Select
        value={course}
        onChange={(event) => setCource(event.target.value)}
        label="курс"
      >
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
      </Select>
    </FormControl>
  );
};
