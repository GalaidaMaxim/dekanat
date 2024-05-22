import { FormControlLabel, Switch } from "@mui/material";
import { useDispatch } from "react-redux";
import { useForeigner } from "../redux/selector";
import { setForeigner } from "../redux/slices";

export const ForeignerSelector = () => {
  const dispatch = useDispatch();
  const foreigner = useForeigner();
  console.log(foreigner);
  return (
    <FormControlLabel
      label="Іноземець"
      value={foreigner}
      checked={foreigner}
      onChange={() => dispatch(setForeigner(!foreigner))}
      control={<Switch />}
    />
  );
};
