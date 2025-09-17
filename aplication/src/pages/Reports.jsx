import { Box, Button, Grid } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export const Reports = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Box>
      <h1>Звіти</h1>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"flex-start"}
        gap={3}
      >
        <Grid container spacing={2}>
          <Grid size={4}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => navigate("/summary_report")}
            >
              Зведені відомості
            </Button>
          </Grid>
          <Grid size={4}>
            <Button
              fullWidth
              onClick={() => {
                navigate("/selectableSubjectReport", {
                  state: { from: location.pathname },
                });
              }}
              variant="contained"
            >
              Звіт вибіркових предметів
            </Button>
          </Grid>
          <Grid size={4}>
            <Button
              fullWidth
              onClick={() => {
                navigate("/debitReport", {
                  state: { from: location.pathname },
                });
              }}
              variant="contained"
            >
              Звіт заборгованностей
            </Button>
          </Grid>
          <Grid size={4}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => navigate("/totalMarkReport")}
            >
              Тиблиця середніх балів
            </Button>
          </Grid>
          <Grid size={4}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => navigate("/contingent")}
            >
              Контингент
            </Button>
          </Grid>

          <Grid size={4}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => navigate("/statistickEduPlan")}
            >
              Статистика навчальних планів
            </Button>
          </Grid>
          <Grid size={4}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => navigate("/educationQualityStatistic")}
            >
              Статистика успішності
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
