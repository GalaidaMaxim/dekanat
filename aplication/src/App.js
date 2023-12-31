import { Button } from "@mui/material";
import { useNavigate, Routes, Route } from "react-router-dom";
import { AllStudents } from "./pages/AllStudents";

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <div>
        <Button>Всі студенти</Button>
      </div>
      <Routes>
        <Route element={<AllStudents />} path="/students" />
      </Routes>
    </div>
  );
}

export default App;
