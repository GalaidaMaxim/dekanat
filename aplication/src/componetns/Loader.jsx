import { Box, CircularProgress } from "@mui/material";

export const Loader = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      position="absolute"
      top={0}
      left={0}
      width={"100%"}
      height={"100%"}
      sx={{
        backdropFilter: "blur(20px)",
        zIndex: 1000,
      }}
    >
      <CircularProgress />
    </Box>
  );
};
