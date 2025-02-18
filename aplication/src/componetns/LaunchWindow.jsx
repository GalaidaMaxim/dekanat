import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { disable, enable, setUpdated, show, setUser } from "../redux/slices";
import { useDBConnected, useUpdated } from "../redux/selector";

export const LaounchWindow = ({ setType }) => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const dbConnected = useDBConnected();
  const updated = useUpdated();
  const dispatch = useDispatch();
  const version = "1.0.0";
  useEffect(() => {
    if (!dbConnected) {
      return;
    }
    dispatch(enable());
    window.mainApi
      .invokeMain("getVersion")
      .then((data) => {
        const result = JSON.parse(data);
        if (!result || result.current !== version) {
          dispatch(setUpdated(false));
          return;
        }
        dispatch(setUpdated(true));
      })
      .finally(() => {
        dispatch(disable());
      });
  }, [dbConnected, dispatch]);

  const loginUser = async () => {
    dispatch(enable());
    const user = JSON.parse(
      await window.mainApi.invokeMain("loginUser", { login, password })
    );
    console.log(user);
    if (!user) {
      dispatch(
        show({
          text: "Перевірте дані",
          title: "Помилка входу",
          type: "warning",
        })
      );
    } else {
      dispatch(setUser(user));
      navigate("/");
    }
    dispatch(disable());
  };

  return (
    <Box
      position={"fixed"}
      top={0}
      left={0}
      zIndex={1000}
      sx={{ backgroundColor: "#FFFFFF", width: "100vw", height: "100vh" }}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      {!dbConnected ? (
        <Box textAlign={"center"}>
          Відсутнє підключення до бази даник. Виконайте початкове налаштування
          або перевірте з'єднання з мережеєю
        </Box>
      ) : updated ? (
        <>
          <h1>Стартовий екран</h1>
          <Box marginTop={4} textAlign={"center"}>
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <Box
                display={"flex"}
                flexDirection="column"
                justifyContent={"center"}
                gap={2}
              >
                <Box display={"flex"} gap={2}>
                  <TextField
                    value={login}
                    onChange={({ target }) => setLogin(target.value)}
                    label="Логін"
                  />
                  <TextField
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    label="Пароль"
                    type="password"
                  />
                </Box>
                <Box>
                  <Button
                    onClick={loginUser}
                    disabled={!password || !login}
                    variant="contained"
                    type="submit"
                  >
                    Увійти
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </>
      ) : (
        <>
          <Box>
            <h2>Застаріла версія, оновіть додаток</h2>
          </Box>
        </>
      )}
    </Box>
  );
};
