import { Button, Box, Paper } from "@mui/material";
import { useNavigate, Routes, Route } from "react-router-dom";
import { AllStudents } from "./pages/AllStudents";
import { Departments } from "./pages/Departments";
import { CreateStudent } from "./pages/CreateStudent";
import { NavLink } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <Box sx={{ display: "flex" }}>
        <Box borderRight={1} width={300} textAlign={"center"}>
          <Box borderBottom={1}>
            <h1>Деканат</h1>
          </Box>
          <Button onClick={() => navigate("/")}>Відділення</Button>
          <Button onClick={() => navigate("/create_student")}>
            Додати студента
          </Button>
        </Box>
        <Box padding={"20px"} width={"100%"}>
          <Paper elevation={3} width={"100%"}>
            <Box padding="20px" minHeight={"calc(100vh - 80px)"}>
              <Routes>
                <Route element={<Departments />} path="/" />
                <Route element={<AllStudents />} path="/students" />
                <Route element={<CreateStudent />} path="/create_student" />
              </Routes>
            </Box>
          </Paper>
        </Box>
      </Box>
    </div>
  );
}

export default App;
