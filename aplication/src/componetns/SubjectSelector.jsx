import { TextField, Autocomplete } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { enable, disable } from "../redux/slices";

export const SubjectSelector = ({
  educationPlan,
  department,
  setSubjectID,
  subjectID,
  semester,
}) => {
  const [subjects, setSubjects] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!educationPlan || !department || !semester) {
      return;
    }
    dispatch(enable());
    window.mainApi
      .invokeMain("getSubjecByDepartment", {
        educationPlan,
        department,
        nameCollapce: true,
      })
      .then((data) => {
        const subjects = JSON.parse(data);
        if (!subjects) {
          return;
        }
        const sb = subjects
          .filter((item) => item.semesters[semester - 1].include)
          .map((item) => {
            item.id = item._id;
            return item;
          });
        console.log(sb);
        setSubjects(sb);
      })
      .finally(() => {
        dispatch(disable());
      });
  }, [department, dispatch, educationPlan, semester]);
  useEffect(() => {
    if (!value || !department || !educationPlan) {
      return;
    }
    setSubjectID(value._id);
  }, [value, educationPlan, department, setSubjectID, subjects]);
  console.log(subjectID);
  return (
    <Autocomplete
      fullWidth
      disabled={educationPlan === ""}
      value={value}
      onChange={(event, newValue) => {
        console.log(newValue);
        setValue(newValue);
      }}
      getOptionKey={(option) => option._id}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      id="controllable-states-demo"
      options={subjects}
      getOptionLabel={(option) => `${option.code || " "} ${option.name || " "}`}
      sx={{ width: 300 }}
      renderInput={(params) => {
        return <TextField fullWidth {...params} label="Предмет" />;
      }}
    />
  );
};
