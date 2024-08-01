import { createPortal } from "react-dom";
import { Box, Paper, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { enable, disable, setDBConnected } from "../redux/slices";

export const MongouseDataDialog = ({ back }) => {
  const node = document.getElementById("portalDiv");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const dispatch = useDispatch();
  const connect = async () => {
    try {
      await window.mainApi.invokeMain("setMongouseConnectionData", {
        mongouseUser: user,
        mongousePassword: password,
      });
      dispatch(enable());
      const result = JSON.parse(
        await window.mainApi.invokeMain("connectMongouse")
      );
      if (result) {
        dispatch(setDBConnected(true));
      }
      back();
    } catch (err) {
      console.log(err);
    }
    dispatch(disable());
  };

  return createPortal(
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100vw"}
      height={"100vh"}
      sx={{ backgroundColor: "gray" }}
    >
      <Paper>
        <Box
          sx={{ backgroundColor: "white" }}
          width={"600px"}
          minHeight={"300px"}
          padding={2}
          borderRadius={10}
          textAlign={"center"}
        >
          <h2>Параметри підключення до бази даних</h2>
          <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
            <TextField
              value={user}
              onChange={({ target }) => {
                setUser(target.value);
              }}
              label="Користувач"
              fullWidth
            />
            <TextField
              value={password}
              onChange={({ target }) => {
                setPassword(target.value);
              }}
              label="Пароль"
              fullWidth
            />
            <Button onClick={connect} variant="contained">
              Підключити
            </Button>
            <Button onClick={back} variant="outlined">
              Назад
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>,
    node
  );
};
