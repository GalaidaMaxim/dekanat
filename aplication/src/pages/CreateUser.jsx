import {
  Box,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { enable, disable } from "../redux/slices";
export const CreateUser = () => {
  const [type, setType] = useState("user");
  const [name, setName] = useState("");
  const [sername, setSername] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const dispatch = useDispatch();

  const createUser = async () => {
    dispatch(enable());
    await window.mainApi.invokeMain("createUser", {
      name,
      sername,
      login,
      password,
      premissions: type,
    });
    dispatch(disable());
  };

  return (
    <Box>
      <h2>Створити користувача</h2>
      <Box>
        <Box width={"400px"} gap={2} display={"flex"} flexDirection={"column"}>
          <TextField
            value={name}
            onChange={({ target }) => setName(target.value)}
            label="Ім'я"
          />
          <TextField
            value={sername}
            onChange={({ target }) => setSername(target.value)}
            label="Прізвище"
          />
          <TextField
            value={login}
            onChange={({ target }) => setLogin(target.value)}
            label="Login"
          />
          <TextField
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Парль"
            type="password"
          />
          <TextField
            value={confirm}
            onChange={({ target }) => setConfirm(target.value)}
            disabled={!password}
            error={password !== confirm}
            label="Повторити пароль"
            type="password"
          />
          <FormControl fullWidth>
            <InputLabel>Тип</InputLabel>
            <Select
              value={type}
              onChange={({ target }) => {
                setType(target.value);
              }}
            >
              <MenuItem value={"user"}>Користувач</MenuItem>
              <MenuItem value={"admin"}>Адміністратор</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button
          sx={{ marginTop: 2 }}
          variant="contained"
          onClick={createUser}
          disabled={
            !name || !sername || !login || !password || password !== confirm
          }
        >
          Створити
        </Button>
      </Box>
    </Box>
  );
};
