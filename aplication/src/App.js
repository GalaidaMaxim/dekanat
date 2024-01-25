import { Button, Box, Paper } from "@mui/material";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import { Departments } from "./pages/Departments";
import { CreateStudent } from "./pages/CreateStudent";
import { StudentList } from "./pages/StudentList";
import { AllStudentList } from "./pages/AllStudentList";
import { StudentInfo } from "./pages/StudentInfo";
import { CreateSubject } from "./pages/CreateSybject";
import { SubjectList } from "./pages/SubjectList";
import { useAlert, useLoading } from "./redux/selector";
import { Loader } from "./componetns/Loader";
import { AlertMy } from "./componetns/alert";
import { CreateEducationPlan } from "./pages/CreateEducationPlan";
import { NavLink } from "react-router-dom";
import { EditStudent } from "./pages/EditStudent";

function App() {
  const navigate = useNavigate();
  const loading = useLoading();
  const alert = useAlert();
  const location = useLocation();

  return (
    <div className="App">
      {alert.enable && <AlertMy />}
      <Box sx={{ display: "flex" }}>
        <Box
          className="noPrint"
          borderRight={1}
          width={300}
          textAlign={"center"}
        >
          <Box borderBottom={1}>
            <h1>Деканат</h1>
          </Box>
          <Box padding={1} display={"flex"} flexDirection={"column"} gap={1}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate("/students")}
            >
              Всі студенти
            </Button>
            <Button fullWidth variant="outlined" onClick={() => navigate("/")}>
              Відділення
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate("/create_student")}
            >
              Додати студента
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate("/create_subject")}
            >
              Додати предмет
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate("/plans")}
            >
              Індивідуальні плани
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate("/educationPlan")}
            >
              Навчальні плани
            </Button>
          </Box>
        </Box>
        <Box position={"relative"} padding={"20px"} width={"100%"}>
          {loading && <Loader />}
          <Paper elevation={3} width={"100%"}>
            <Box padding="20px" minHeight={"calc(100vh - 80px)"}>
              <Routes>
                <Route element={<Departments />} path="/" />
                <Route element={<StudentInfo />} path="/students_info/:id" />
                <Route element={<StudentList />} path="/students/:id" />
                <Route element={<AllStudentList />} path="/students" />
                <Route element={<CreateStudent />} path="/create_student" />
                <Route element={<CreateSubject />} path="/create_subject" />
                <Route element={<SubjectList />} path="/plans" />
                <Route element={<EditStudent />} path="/edit_student/:id" />
                <Route
                  element={<CreateEducationPlan />}
                  path="/educationPlan"
                />
              </Routes>
            </Box>
          </Paper>
        </Box>
      </Box>
    </div>
  );
}

export default App;
