import { Box, Alert, AlertTitle } from "@mui/material";
import { useAlert } from "../redux/selector";
import { hide } from "../redux/slices";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export const AlertMy = () => {
  const alert = useAlert();
  console.log(alert);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      console.log("hide");
      dispatch(hide());
    }, 3000);
  }, [dispatch]);
  return (
    <Box zIndex={4000} position={"Fixed"} top={0} right={50}>
      <Alert severity={alert.type}>
        {alert.title && <AlertTitle>{alert.title}</AlertTitle>}
        {alert.text}
      </Alert>
    </Box>
  );
};
