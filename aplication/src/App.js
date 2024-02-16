import { Button, Box, Paper } from "@mui/material";
import { useNavigate, Routes, Route } from "react-router-dom";
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
import { EditSubject } from "./pages/EditSubject";
import { useState } from "react";
import { LaounchWindow } from "./componetns/LaunchWindow";
import { ActionAlert } from "./componetns/ActionAlert";
import { useAlertAction } from "./redux/selector";
import { DocumentCreation } from "./pages/DocumentCration";
import { CreateStatemntDocument } from "./pages/CreateStatementDocument";

import { EditStudent } from "./pages/EditStudent";

function App() {
  const navigate = useNavigate();
  const loading = useLoading();
  const alert = useAlert();
  const alertAction = useAlertAction();
  const [type, setType] = useState(null);
  return (
    <div className="App">
      {alert.enable && <AlertMy />}
      {alertAction.enable && <ActionAlert />}
      <Box sx={{ display: "flex" }}>
        {!type && <LaounchWindow setType={setType} />}
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
            {type === "Developer" && (
              <>
                {" "}
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => navigate("/students")}
                >
                  Всі студенти
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => navigate("/documentCreation")}
                >
                  Документи
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => navigate("/")}
                >
                  Відділення
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => navigate("/create_student")}
                >
                  Додати студента
                </Button>
              </>
            )}
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
            <Button fullWidth variant="outlined" onClick={() => setType(null)}>
              На стартовий екран
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
                <Route element={<StudentList />} path="/students/:id/:level" />
                <Route element={<AllStudentList />} path="/students" />
                <Route element={<CreateStudent />} path="/create_student" />
                <Route element={<CreateSubject />} path="/create_subject" />
                <Route element={<SubjectList />} path="/plans" />
                <Route element={<EditStudent />} path="/edit_student/:id" />
                <Route
                  element={<CreateEducationPlan />}
                  path="/educationPlan"
                />
                <Route
                  element={<DocumentCreation />}
                  path="/documentCreation"
                />
                <Route element={<EditSubject />} path="/plans/:id" />
                <Route
                  element={<CreateStatemntDocument />}
                  path="/create_statemnt_document"
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
