import { TextField, Autocomplete } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { enable, disable } from "../redux/slices";
import { inwokeMain } from "../serivce/inwokeMain";

export const UserSelector = ({ setUser }) => {
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(enable());
      const users = await inwokeMain({
        command: "getAllUsers",
        options: { params: { premissions: "teacher" } },
      });
      setUsers(users);

      dispatch(disable());
    })();
  }, [dispatch]);

  useEffect(() => {
    if (!value) {
      return;
    }
    setUser((prev) => {
      if (prev.some((item) => item._id === value._id)) {
        return [...prev];
      }
      return [...prev, value];
    });
    setValue("");
  }, [value]);

  return (
    <Autocomplete
      fullWidth
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      getOptionKey={(option) => option._id}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      id="controllable-states-demo1"
      options={users}
      getOptionLabel={(option) =>
        `${option.sername || " "} ${option.name || " "}`
      }
      sx={{ width: 300 }}
      renderInput={(params) => {
        return <TextField fullWidth {...params} label="Екзаменотор" />;
      }}
    />
  );
};
