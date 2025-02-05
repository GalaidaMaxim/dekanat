import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState, useEffect } from "react";
import { inwokeMain } from "../serivce/inwokeMain";
import { useFacultet } from "../redux/selector";
import { useDispatch } from "react-redux";
import { setFacultet } from "../redux/slices";

export const FacultetSelector = () => {
  const [deps, setDeps] = useState([]);
  const facultet = useFacultet();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const result = await inwokeMain({ command: "getFacultets" });
      if (result) {
        setDeps(result);
      }
    })();
  }, []);

  const handleDep = (event) => {
    dispatch(setFacultet(event.target.value));
  };
  return (
    <FormControl fullWidth>
      <InputLabel>Факультет</InputLabel>
      <Select value={facultet} onChange={handleDep} label="Факультет">
        {deps.map((item) => (
          <MenuItem value={item._id} key={item.name}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
