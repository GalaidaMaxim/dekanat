import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useStatus } from "../redux/selector";
import { useDispatch } from "react-redux";
import { setStatus } from "../redux/slices";

export const StatusSelector = () => {
  const dispatch = useDispatch();
  const status = useStatus();
  return (
    <FormControl fullWidth>
      <InputLabel>Статус</InputLabel>
      <Select
        onChange={(event) => dispatch(setStatus(event.target.value))}
        label="Статус"
        value={status}
      >
        <MenuItem value={"Всі"}>Всі</MenuItem>
        <MenuItem value={"випустився"}>випустився</MenuItem>
        <MenuItem value={"навчається"}>навчається</MenuItem>
        <MenuItem value={"академічна відаустка"}>академічна відаустка</MenuItem>
        <MenuItem value={"невизначений"}>невизначений</MenuItem>
        <MenuItem value={"відрахований"}>відрахований</MenuItem>
      </Select>
    </FormControl>
  );
};
