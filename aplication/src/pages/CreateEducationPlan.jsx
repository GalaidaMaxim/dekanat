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

export const CreateEducationPlan = () => {
  const [level, setLevel] = useState("бакалавр");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const [educationPlanes, setEducationPlanes] = useState([]);

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
    window.mainApi
      .invokeMain("createEducationPlan", { level, name })
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
      });
  };
  return (
    <Box>
      <h2>Навчальні плани</h2>
      <Table>
        <TableHead>
          <TableCell>Назва</TableCell>
          <TableCell>Освітній ступінь</TableCell>
        </TableHead>
        <TableBody>
          {educationPlanes.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.level}</TableCell>
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
        <Button onClick={createPlan} variant={"contained"}>
          Додати план
        </Button>
      </Box>
    </Box>
  );
};
