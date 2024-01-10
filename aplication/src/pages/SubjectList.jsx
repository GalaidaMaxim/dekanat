import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { DepartmentSelector } from "../componetns/DepartmentSelector";

export const SubjectList = () => {
  const [depID, setdepID] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [level, setLevel] = useState("бакалавр");

  useEffect(() => {
    if (!depID) {
      return;
    }
    window.mainApi
      .invokeMain("getSubjecByDepartment", {
        department: depID.toString(),
        level,
      })
      .then((result) => {
        setSubjects(JSON.parse(result));
      });
  }, [depID, level]);
  console.log(subjects);
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
            <MenuItem value={"бакалавр"}>бакалавр</MenuItem>
            <MenuItem value={"магістр"}>магістр</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box width={"300px"} marginTop={4}>
        <DepartmentSelector setdepID={setdepID} depID={depID} />
      </Box>
    </Box>
  );
};
