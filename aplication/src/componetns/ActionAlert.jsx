import { Box, Button } from "@mui/material";
import { confirmAlertAction, cancelAlertAction } from "../redux/slices";
import { useDispatch } from "react-redux";
import { useAlertAction } from "../redux/selector";

export const ActionAlert = () => {
  const dispatch = useDispatch();
  const alertAction = useAlertAction();
  return (
    <Box
      position={"fixed"}
      zIndex={1001}
      top={0}
      left={0}
      width={"100vw"}
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ backdropFilter: "blur(10px);" }}
    >
      <Box
        boxShadow={"5px 5px 30px black"}
        padding={5}
        borderRadius={5}
        sx={{ backgroundColor: "#ffffff" }}
      >
        <h2>{alertAction.title}</h2>
        <p>{alertAction.discription}</p>
        <Box display={"flex"} justifyContent={"right"} gap={2}>
          <Button
            onClick={() => {
              dispatch(confirmAlertAction());
            }}
          >
            Так
          </Button>
          <Button
            onClick={() => {
              dispatch(cancelAlertAction());
            }}
          >
            Ні
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
