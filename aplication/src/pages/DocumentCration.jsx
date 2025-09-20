import { Box, Button, Grid } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export const DocumentCreation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Box>
      <h1>Відомості</h1>
      <Box>
        <Grid gap={2} container>
          <Grid size={4}>
            <Button
              fullWidth
              onClick={() => {
                navigate("/create_statemnt_document", {
                  state: { from: location.pathname },
                });
              }}
              variant="contained"
            >
              Створення відомостей
            </Button>
          </Grid>

          <Grid size={4}>
            <Button
              fullWidth
              onClick={() => {
                navigate("/statmentList", {
                  state: { from: location.pathname },
                });
              }}
              variant="contained"
            >
              Список відомостей
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
