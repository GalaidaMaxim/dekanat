import { FormControlLabel, Switch } from "@mui/material";

export const ForeginerSelector = ({
  label = "Іноземець",
  foreigner,
  setForeigner,
}) => {
  return (
    <FormControlLabel
      label={label}
      value={foreigner}
      checked={foreigner}
      onChange={() => setForeigner((prev) => !prev)}
      control={<Switch />}
    />
  );
};
