import {
  Box,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { enable, disable, show } from "../redux/slices";
import { inwokeMain } from "../serivce/inwokeMain";

export const Arhive = () => {
  const dispatch = useDispatch();
  const [student, setStudent] = useState(null);

  const readStudent = async () => {
    const path = await inwokeMain({ command: "openFileDialog" });
    const student = await inwokeMain({
      command: "readAchiveStudent",
      options: { path },
    });
    setStudent(student);
  };
  return (
    <Box>
      <h2>Робота з архівом</h2>
      <Button onClick={readStudent} variant="contained">
        Відкрити студента
      </Button>
      {student && (
        <Box>
          <h2>{`${student.sername} ${student.secondName}`}</h2>
        </Box>
      )}
    </Box>
  );
};
