import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const LaounchWindow = ({ setType }) => {
  const navigate = useNavigate();
  const [updated, setUpdated] = useState(true);
  const version = "0.0.1";
  useEffect(() => {
    window.mainApi.invokeMain("getVersion").then((data) => {
      const result = JSON.parse(data);
      if (!result || result.current !== version) {
        setUpdated(false);
        return;
      }
      setUpdated(true);
    });
  }, []);

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
      {updated && (
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
      )}
      {!updated && (
        <>
          <Box>
            <h2>Застаріла версія, оновіть додаток</h2>
          </Box>
        </>
      )}
    </Box>
  );
};
