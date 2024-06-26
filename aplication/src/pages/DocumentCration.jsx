import { Box, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export const DocumentCreation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Box>
      <h1>Створення нормативних довументів</h1>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"flex-start"}
        gap={3}
      >
        <Button
          onClick={() => {
            navigate("/create_statemnt_document", {
              state: { from: location.pathname },
            });
          }}
          variant="contained"
        >
          Створення оцінювальних відомостей
        </Button>
      </Box>
    </Box>
  );
};
