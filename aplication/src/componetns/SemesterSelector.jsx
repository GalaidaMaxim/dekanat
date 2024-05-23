import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSemester } from "../redux/selector";
import { setSemester } from "../redux/slices";

export const SemesterSelector = () => {
  const semestersArr = [1, 2, 3, 4, 5, 6, 7, 8];
  const dispatch = useDispatch();
  const semester = useSemester();
  return (
    <FormControl fullWidth>
      <InputLabel>Семестр</InputLabel>
      <Select
        value={semester}
        onChange={(event) => dispatch(setSemester(event.target.value))}
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
