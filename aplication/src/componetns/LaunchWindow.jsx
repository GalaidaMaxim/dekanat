import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const LaounchWindow = ({ setType }) => {
  const navigate = useNavigate();
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
    </Box>
  );
};
