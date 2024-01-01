import { Box, TextField, Grid } from "@mui/material";

export const CreateStudent = () => {
  return (
    <form>
      <Box>
        <Grid container columnSpacing={{ xs: 2 }}>
          <Grid item>
            <TextField label="Прізвище" />
          </Grid>
          <Grid item>
            <TextField label="ім'я" />
          </Grid>
          <Grid item>
            <TextField label="Побатькові" />
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};
