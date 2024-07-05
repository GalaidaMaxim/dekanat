import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export const SesioTypeSelector = ({ sesionType, setSesionType }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>Тип сесії</InputLabel>
      <Select
        onChange={(event) => setSesionType(event.target.value)}
        label="Тип сесії"
        value={sesionType}
      >
        <MenuItem value={"Літня"}>Літня</MenuItem>
        <MenuItem value={"Зимова"}>Зимова</MenuItem>
      </Select>
    </FormControl>
  );
};
