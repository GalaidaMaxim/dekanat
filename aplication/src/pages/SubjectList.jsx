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
import { useLocation } from "react-router-dom";

export const SubjectList = () => {
  const [depID, setdepID] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [level, setLevel] = useState("бакалавр");
  const [planID, setPlanID] = useState("");
  const [qualifications, setQualifications] = useState([]);
  const location = useLocation();

  const dispatch = useDispatch();
  useEffect(() => {
    if (
      location.state &&
      location.state.data &&
      (!depID || !level || !planID)
    ) {
      console.log(location.state.data);
      setdepID(location.state.data.depID);
      setLevel(location.state.data.level);
      setPlanID(location.state.data.planID);
    }
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
  }, [depID, planID, level, dispatch, location]);

  useEffect(() => {
    if (subjects.length === 0) {
      return;
    }
    const arr = subjects
      .filter((item) => item.aditionalSpecialityName)
      .map((item) => item.aditionalSpecialityName)
      .reduce((result, item) => {
        if (!result.includes(item)) {
          result.push(item);
        }
        return result;
      }, []);
    setQualifications(arr);
  }, [subjects]);

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
            <SubjectTable
              subjects={subjects}
              filterChar="1"
              from={{ depID, level, planID }}
            />
          </TableContainer>
        </MyAcordion>
      </Box>
      <Box>
        <h3>ІІ. ВИБІРКОВІ ОСВІТНІ КОМПОНЕНТИ</h3>
        <MyAcordion
          title={`ЦИКЛ ФАХОВОЇ, ПРОФЕСІЙНОЇ ПІДГОТОВКИ ЗА ПРОФІЛІЗАЦІЄЮ `}
        >
          <TableContainer marginTop={2} component={Paper}>
            <SubjectTable
              subjects={subjects}
              filterChar="2"
              from={{ depID, level, planID }}
            />
          </TableContainer>
        </MyAcordion>

        <MyAcordion
          title={`ІІІ. ОСВІТНІ КОМПОНЕНТИ ЗА ВИБОРОМ ЗДОБУВАЧА ОСВІТИ ОТРИМАННЯ ВИБІРКОВОЇ ПРОФЕСІЙНОЇ КВАЛІФІКАЦІЇ`}
        >
          {qualifications.map((item) => (
            <Box key={item}>
              <h3>{item}</h3>
              <TableContainer marginTop={2} component={Paper}>
                <SubjectTable
                  subjects={subjects.filter(
                    (sub) => sub.aditionalSpecialityName === item
                  )}
                  filterChar="3"
                  from={{ depID, level, planID }}
                />
              </TableContainer>
            </Box>
          ))}
        </MyAcordion>
        <MyAcordion
          title={`ІV. ОСВІТНІ КОМПОНЕНТИ ЗА ВИБОРОМ ЗДОБУВАЧА ОСВІТИ
КАТАЛОГ ВИБІРКОВИХ ДИСЦИПЛІН `}
        >
          <TableContainer marginTop={2} component={Paper}>
            <SubjectTable
              subjects={subjects}
              filterChar="4"
              from={{ depID, level, planID }}
            />
          </TableContainer>
        </MyAcordion>
      </Box>
    </Box>
  );
};
