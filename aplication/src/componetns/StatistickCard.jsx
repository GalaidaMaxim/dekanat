import { Box, Typography } from "@mui/material";

export const StatistickCard = ({ title, value, size = 40 }) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-around"}
      alignItems={"center"}
      flexDirection={"column"}
      border="1px solid black"
      sx={{ width: "150px", height: "160px" }}
    >
      <Typography sx={{ textAlign: "center", fontWeight: 500, fontSize: 24 }}>
        {title}
      </Typography>
      <Typography sx={{ textAlign: "center", fontWeight: 900, fontSize: size }}>
        {value}
      </Typography>
    </Box>
  );
};
