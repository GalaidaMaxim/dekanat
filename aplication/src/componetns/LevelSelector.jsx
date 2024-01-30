import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export const LevelSelector = ({ level, setLevel }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>ОС</InputLabel>
      <Select
        value={level}
        onChange={(event) => setLevel(event.target.value)}
        label="ОС"
      >
        <MenuItem value={"молодший бакалавр"}>молодший бакалавр</MenuItem>
        <MenuItem value={"бакалавр"}>бакалавр</MenuItem>
        <MenuItem value={"магістр"}>магістр</MenuItem>
      </Select>
    </FormControl>
  );
};
