import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { disable, enable, setUpdated } from "../redux/slices";
import { useDBConnected, useUpdated } from "../redux/selector";

export const LaounchWindow = ({ setType }) => {
  const navigate = useNavigate();
  const dbConnected = useDBConnected();
  const updated = useUpdated();
  const dispatch = useDispatch();
  const version = "0.0.2";
  useEffect(() => {
    if (!dbConnected) {
      return;
    }
    dispatch(enable());
    window.mainApi.invokeMain("getVersion").then((data) => {
      const result = JSON.parse(data);
      if (!result || result.current !== version) {
        dispatch(setUpdated(false));
        return;
      }
      dispatch(setUpdated(true));
    });
    dispatch(disable());
  }, [dbConnected, dispatch]);

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
          <Box textAlign={"center"}>
            <p>увійти як: </p>
            <Box display={"flex"} justifyContent={"center"} gap={2}>
              <Button
                onClick={() => {
                  setType("User");
                  navigate("/plans");
                }}
                variant="contained"
              >
                Користувач
              </Button>
              <Button onClick={() => setType("Developer")} variant="outlined">
                Розробник
              </Button>
            </Box>
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
