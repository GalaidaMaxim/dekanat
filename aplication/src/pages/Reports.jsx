import { Box, Button } from "@mui/material";
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
        <Button variant="contained" onClick={() => navigate("/summary_report")}>
          Зведені відомості
        </Button>
        <Button
          onClick={() => {
            navigate("/selectableSubjectReport", {
              state: { from: location.pathname },
            });
          }}
          variant="contained"
        >
          Звіт вибіркових предметів
        </Button>
        <Button
          onClick={() => {
            navigate("/debitReport", {
              state: { from: location.pathname },
            });
          }}
          variant="contained"
        >
          Звіт заборгованностей
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate("/totalMarkReport")}
        >
          Тиблиця середніх балів
        </Button>
      </Box>
    </Box>
  );
};
