import { Box, Button, IconButton, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { inwokeMain } from "../serivce/inwokeMain";
import { useState } from "react";
import { enable, disable } from "../redux/slices";

export const ChangePasswordModal = ({ setUser, user }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const onSubmit = async () => {
    dispatch(enable());
    await inwokeMain({
      command: "changeUserPassword",
      options: { id: user._id, password },
    });
    setUser(null);
    dispatch(disable());
  };
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
        sx={{
          backgroundColor: "#ffffff",
          position: "relative",
          width: "500px",
        }}
      >
        <h2>Змінити пароль користувача</h2>
        <h2>{`${user.name} ${user.sername}`}</h2>

        <IconButton
          full
          sx={{ position: "absolute", top: "0px", right: "5px" }}
          onClick={() => setUser(null)}
        >
          <CloseIcon />
        </IconButton>
        <Box>
          <TextField
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            fullWidth
            label="Пароль"
          />
        </Box>
        <Box marginTop={2}>
          <TextField
            type="password"
            value={confirm}
            onChange={({ target }) => setConfirm(target.value)}
            fullWidth
            label="Підтвердити пароль"
          />
        </Box>
        <Box marginTop={2}>
          <Button
            disabled={!password || password !== confirm}
            variant="contained"
            onClick={onSubmit}
          >
            Підтердити
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
