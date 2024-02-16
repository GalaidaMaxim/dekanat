import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Button,
} from "@mui/material";
import { show } from "../redux/slices";
import { useDispatch } from "react-redux";
import { PlanSelector } from "../componetns/PlanSelector";
import { enableAlertAction, enable, disable } from "../redux/slices";

export const CreateEducationPlan = () => {
  const [level, setLevel] = useState("бакалавр");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const [educationPlanes, setEducationPlanes] = useState([]);
  const [planID, setPlanID] = useState("");

  useEffect(() => {
    window.mainApi.invokeMain("getEducationPlan").then((result) => {
      if (!JSON.parse(result)) {
        dispatch(show({ title: "Помилка отримання планів" }));
        return;
      }
      setEducationPlanes(JSON.parse(result));
    });
  }, [dispatch]);
  const createPlan = async () => {
    if (!name) {
      return;
    }
    dispatch(enable());
    window.mainApi
      .invokeMain("createEducationPlan", { level, name, copyPlan: planID })
      .then((result) => {
        if (!JSON.parse(result)) {
          return;
        }
        setEducationPlanes((prev) => {
          const arr = [...prev];
          arr.push(JSON.parse(result));
          return arr;
        });
        setName("");
      })
      .finally(() => {
        dispatch(disable());
      });
  };
  const deleteEducationPlan = (id) => {
    return () => {
      window.mainApi
        .invokeMain("deleteEducationPlan", { planID: id })
        .then((result) => {
          const data = JSON.parse(result);
          if (!data) {
            return;
          }
          setEducationPlanes((prev) => {
            const arr = [...prev].filter((item) => item._id !== data._id);
            return arr;
          });
        })
        .finally(() => {
          dispatch(disable());
        });
    };
  };
  return (
    <Box>
      <h2>Навчальні плани</h2>
      <Table>
        <TableHead>
          <TableCell>Назва</TableCell>
          <TableCell>Освітній ступінь</TableCell>
          <TableCell></TableCell>
        </TableHead>
        <TableBody>
          {educationPlanes.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.level}</TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    dispatch(
                      enableAlertAction({
                        callback: deleteEducationPlan(item._id),
                        title: "Видалити навчальний план?",
                        discription:
                          "предмети, що були пов'язані з цим навчальним планом будуть видалені",
                      })
                    );
                  }}
                  color="error"
                  variant="outlined"
                >
                  Видалити
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box>
        <h3>Додати навчальний план</h3>
        <Box>
          <TextField
            fullWidth
            label="Назва плану"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Box>
        <Box marginBottom={2} width={300} marginTop={2}>
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
        <Box>
          <h3>Навчальний план для копіювання предметів</h3>
          <PlanSelector level={level} planID={planID} setPlanID={setPlanID} />
        </Box>
        <Button onClick={createPlan} variant={"contained"}>
          Додати план
        </Button>
      </Box>
    </Box>
  );
};
