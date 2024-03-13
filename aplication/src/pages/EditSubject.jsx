import {
  Box,
  Checkbox,
  Select,
  TextField,
  FormControlLabel,
  FormControl,
  InputLabel,
  MenuItem,
  Switch,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Radio,
  RadioGroup,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { show, enable, disable } from "../redux/slices";
import { DepartmentSelector } from "../componetns/DepartmentSelector";
import { PlanSelector } from "../componetns/PlanSelector";
import { useLocation, useParams, useNavigate } from "react-router-dom";

const createSemesters = (include = false, assessmentType = 2) => {
  return { include, assessmentType };
};
export const EditSubject = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [semesters, setSemesters] = useState([
    createSemesters(),
    createSemesters(),
    createSemesters(),
    createSemesters(),
    createSemesters(),
    createSemesters(),
    createSemesters(),
    createSemesters(),
  ]);
  const [depID, setdepID] = useState("");
  const [code, setCode] = useState("");
  const [creadits, setCredits] = useState(0);
  const [gos, setGos] = useState(false);
  const [mandatory, setMandatory] = useState(false);
  const [aditionalSpecialityName, setditionalSpecialityName] = useState("");
  const [level, setLevel] = useState("бакалавр");
  const [name, setName] = useState("");
  const [special, setSpesial] = useState(false);
  const [asn, setASN] = useState(false);
  const [plansID, setPlansID] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    window.mainApi.invokeMain("getSubjectByID", { id }).then((data) => {
      const subject = JSON.parse(data);
      if (!subject) {
        return;
      }
      setName(subject.name);
      setCode(subject.code);
      setLevel(subject.level);
      setSemesters(subject.semesters);
      setPlansID(subject.educationPlan);
      setdepID(subject.department || "");
      setGos(subject.gos);
      setMandatory(subject.mandatory);
      setCredits(subject.credits);
      setSpesial(subject.special);
      setditionalSpecialityName(subject.aditionalSpecialityName);
      setASN(subject.aditionalSpecialityName);
    });
  }, [id]);

  useEffect(() => {
    if (!special) {
      setdepID("");
    }
  }, [special]);

  const radioChage = (index) => {
    return (event) => {
      setSemesters((prev) => {
        const newSem = [...prev];
        newSem[index].assessmentType = Number.parseInt(event.target.value);
        return newSem;
      });
    };
  };

  const deleteSubject = () => {
    window.mainApi
      .invokeMain("deleteSubject", {
        subjectId: id,
      })
      .then(() => {
        navigate(location.state.from, {
          state: { data: location.state.data },
        });
      });
  };

  const onSubmit = async () => {
    const subject = {
      id,
      name,
      semesters,
      department: depID.toString(),
      gos,
      mandatory,
      level,
      special,
      credits: creadits,
      code,
      educationPlan: plansID.toString(),
      aditionalSpecialityName,
    };

    dispatch(enable());
    const result = await window.mainApi.invokeMain("updateSubject", subject);
    if (!JSON.parse(result)) {
      dispatch(disable());
      dispatch(show({ title: "Помилка додавання предмету", type: "error" }));
    }
    if (JSON.parse(result)) {
      dispatch(disable());
      dispatch(show({ title: "Предмет успішно доданий", type: "success" }));
    }
    dispatch(disable());
    navigate(location.state.from, { state: { data: location.state.data } });
  };
  return (
    <Box>
      <Button
        onClick={() =>
          navigate(location.state.from, {
            state: { data: location.state.data },
          })
        }
      >
        Назад
      </Button>
      <h2>Додати предмет</h2>
      <TextField
        value={name}
        label="Назва"
        onChange={(event) => setName(event.target.value)}
      />
      <TextField
        value={code}
        label="Код"
        onChange={(event) => setCode(event.target.value)}
      />
      <Box>
        <h3>Семестри</h3>
        <Table>
          <TableBody>
            <TableRow>
              {semesters.map((item, index) => (
                <TableCell key={index}>
                  <FormControlLabel
                    label={index + 1}
                    labelPlacement="top"
                    onChange={() => {
                      setSemesters((prev) => {
                        const arr = [...prev];
                        arr[index].include = !arr[index].include;
                        return arr;
                      });
                    }}
                    checked={semesters[index].include}
                    control={<Checkbox />}
                  />
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              {semesters.map((item, index) => (
                <TableCell key={index}>
                  <FormControl disabled={!item.include}>
                    <RadioGroup
                      onChange={radioChage(index)}
                      value={semesters[index].assessmentType}
                    >
                      <FormControlLabel
                        label="Н"
                        value={1}
                        control={<Radio />}
                      />
                      <FormControlLabel
                        label="Д"
                        value={2}
                        control={<Radio />}
                      />
                      <FormControlLabel
                        label="Е"
                        value={3}
                        control={<Radio />}
                      />
                      <FormControlLabel
                        label="П"
                        value={4}
                        control={<Radio />}
                      />
                    </RadioGroup>
                  </FormControl>
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </Box>

      <Box width={"300px"} marginTop={4}>
        <DepartmentSelector
          setdepID={setdepID}
          depID={depID}
          level={level}
          disabled={!special}
        />
      </Box>

      <Box width={"300px"} marginTop={4}>
        <PlanSelector planID={plansID} setPlanID={setPlansID} level={level} />
      </Box>
      <Box width={300} marginTop={4}>
        <TextField
          label="спеціалізація"
          fullWidth
          disabled={!asn}
          value={aditionalSpecialityName}
          onChange={(event) => setditionalSpecialityName(event.target.value)}
        />
      </Box>

      <Box width={"300px"} marginTop={2}>
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
      <Box marginTop={2}>
        <TextField
          label="Кредити"
          type="number"
          value={creadits}
          onChange={(event) => setCredits(event.target.valueAsNumber)}
        />
      </Box>
      <Box marginTop={2}>
        <FormControlLabel
          label="Державний іспит"
          value={gos}
          checked={gos}
          onChange={() => setGos((prev) => !prev)}
          control={<Switch />}
        />
        <FormControlLabel
          label="Обов'язковий"
          value={mandatory}
          checked={mandatory}
          onChange={() => setMandatory((prev) => !prev)}
          control={<Switch />}
        />
        <FormControlLabel
          label="Спеціальний"
          value={special}
          checked={special}
          onChange={() => setSpesial((prev) => !prev)}
          control={<Switch />}
        />
        <FormControlLabel
          label="Предмет додаткової спеціалізації"
          value={asn}
          checked={asn}
          onChange={() => setASN((prev) => !prev)}
          control={<Switch />}
        />
      </Box>

      <Box marginTop={2}>
        <Button variant="contained" onClick={onSubmit}>
          Оновити предмет
        </Button>
      </Box>
      <Box marginTop={2}>
        <Button color="error" onClick={deleteSubject}>
          Видалити предмет
        </Button>
      </Box>
    </Box>
  );
};
