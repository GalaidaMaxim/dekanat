import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch } from "react-redux";
import { useCource } from "../redux/selector";
import { setCourse } from "../redux/slices";

export const CourseSelector = ({ enableAll = false }) => {
  const dispatch = useDispatch();
  const course = useCource();

  if (!enableAll && course === "Всі") {
    dispatch(setCourse(1));
  }

  return (
    <FormControl fullWidth>
      <InputLabel>Курс</InputLabel>
      <Select
        value={course}
        onChange={(event) => dispatch(setCourse(event.target.value))}
        label="курс"
      >
        {enableAll && <MenuItem value={"Всі"}>Всі</MenuItem>}
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
      </Select>
    </FormControl>
  );
};
