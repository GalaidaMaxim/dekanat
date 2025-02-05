import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useRemoteType } from "../redux/selector";
import { useDispatch } from "react-redux";
import { setRemoteType } from "../redux/slices";

export const RemoteTypeSelector = () => {
  const deps = [
    { id: "ofline", name: "Денна" },
    { id: "online", name: "Заочна" },
  ];
  const facultet = useRemoteType();
  const dispatch = useDispatch();

  const handleDep = (event) => {
    dispatch(setRemoteType(event.target.value));
  };
  return (
    <FormControl fullWidth>
      <InputLabel>Форма навчання</InputLabel>
      <Select value={facultet} onChange={handleDep} label="Форма навчання">
        {deps.map((item) => (
          <MenuItem value={item.id} key={item.name}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
