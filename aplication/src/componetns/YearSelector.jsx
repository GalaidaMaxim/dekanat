import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useYear } from "../redux/selector";
import { useDispatch } from "react-redux";
import { setYear } from "../redux/slices";

const years = [];
for (let i = 2022; i < 2050; i++) {
  years.push(`${i}-${i + 1}`);
}

export const YearSelector = () => {
  const year = useYear();
  const dispatch = useDispatch();
  return (
    <FormControl fullWidth>
      <InputLabel>Рік</InputLabel>
      <Select
        label="Рік"
        value={year}
        onChange={(event) => dispatch(setYear(event.target.value))}
      >
        {years.map((item) => (
          <MenuItem id={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
