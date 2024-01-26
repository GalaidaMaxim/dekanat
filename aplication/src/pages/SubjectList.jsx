import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableContainer,
  Paper,
} from "@mui/material";
import { useState, useEffect } from "react";
import { DepartmentSelector } from "../componetns/DepartmentSelector";
import { PlanSelector } from "../componetns/PlanSelector";
import { useDispatch } from "react-redux";
import { enable, disable } from "../redux/slices";
import { MyAcordion } from "../componetns/Acordion";
import { SubjectTable } from "../componetns/SubjectTable";

export const SubjectList = () => {
  const [depID, setdepID] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [level, setLevel] = useState("бакалавр");
  const [planID, setPlanID] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    if (!depID || !level || !planID) {
      return;
    }
    dispatch(enable());
    window.mainApi
      .invokeMain("getSubjecByDepartment", {
        department: depID.toString(),
        educationPlan: planID.toString(),
      })
      .then((result) => {
        setSubjects(JSON.parse(result));
      })
      .finally(() => {
        dispatch(disable());
      });
  }, [depID, planID, level, dispatch]);

  return (
    <Box>
      <h1>Індивідуальні плани</h1>
      <Box width={"300px"} marginTop={4}>
        <FormControl fullWidth>
          <InputLabel>ОС</InputLabel>
          <Select
            value={level}
            onChange={(event) => setLevel(event.target.value)}
            label="ОС"
          >
            <MenuItem value={"молодший бакалавр"}>молодший бакалавр</MenuItem>
            <MenuItem value={"бакалавр"}>бакалавр</MenuItem>
            <MenuItem value={"магістр"}>магістр</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box width={"300px"} marginTop={4}>
        <PlanSelector setPlanID={setPlanID} level={level} planID={planID} />
      </Box>
      <Box width={"300px"} marginTop={4}>
        <DepartmentSelector setdepID={setdepID} depID={depID} level={level} />
      </Box>

      <Box>
        <h3>I. ОБОВ’ЯЗКОВІ ОСВІТНІ КОМПОНЕНТИ</h3>
        <MyAcordion title={`I. ОБОВ’ЯЗКОВІ ОСВІТНІ КОМПОНЕНТИ `}>
          <TableContainer marginTop={2} component={Paper}>
            <SubjectTable subjects={subjects} filterChar="1" />
          </TableContainer>
        </MyAcordion>
      </Box>
      <Box>
        <h3>ІІ. ВИБІРКОВІ ОСВІТНІ КОМПОНЕНТИ</h3>
        <MyAcordion
          title={`ЦИКЛ ФАХОВОЇ, ПРОФЕСІЙНОЇ ПІДГОТОВКИ ЗА ПРОФІЛІЗАЦІЄЮ `}
        >
          <TableContainer marginTop={2} component={Paper}>
            <SubjectTable subjects={subjects} filterChar="2" />
          </TableContainer>
        </MyAcordion>
      </Box>
    </Box>
  );
};
