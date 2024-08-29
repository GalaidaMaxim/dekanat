import {
  Box,
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  IconButton,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { enable, disable } from "../redux/slices";
import { useState, useEffect } from "react";
import { inwokeMain } from "../serivce/inwokeMain";
import { dateToTime } from "../serivce/dateToTime";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyIcon from "@mui/icons-material/Key";

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState([]);

  const chageEdit = (index) => {
    setEdit((prev) => {
      const arr = [...prev];
      arr[index] = !arr[index];
      return arr;
    });
  };

  const saveChages = async (id, { name, sername, login, premissions }) => {
    dispatch(enable());
    await inwokeMain({
      command: "editUser",
      options: {
        id,
        params: { name, sername, login, premissions },
      },
    });
    dispatch(disable());
  };

  useEffect(() => {
    (async () => {
      dispatch(enable());
      const users = await inwokeMain({ command: "getAllUsers" });
      dispatch(disable());
      if (!users) {
        return;
      }
      setUsers(users);
      setEdit(users.map((item) => false));
    })();
  }, [dispatch]);
  return (
    <Box>
      <h1>Адміністрування користувачів</h1>
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Користувач</TableCell>
              <TableCell>Логін</TableCell>
              <TableCell>Права</TableCell>
              <TableCell>Дата входу</TableCell>
              <TableCell>Дата виходу</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user._id}>
                <TableCell width={"200px"}>
                  <Box display={"flex"}>
                    {!edit[index] ? (
                      `${user.name} ${user.sername}`
                    ) : (
                      <>
                        <TextField
                          sx={{ width: "120px" }}
                          value={user.name}
                          onChange={(event) =>
                            setUsers((prev) => {
                              const arr = [...prev];
                              arr[index].name = event.target.value;
                              return arr;
                            })
                          }
                        />
                        <TextField
                          sx={{ width: "120px" }}
                          value={user.sername}
                          onChange={(event) =>
                            setUsers((prev) => {
                              const arr = [...prev];
                              arr[index].sername = event.target.value;
                              return arr;
                            })
                          }
                        />
                      </>
                    )}
                  </Box>
                </TableCell>
                <TableCell sx={{ width: "120px" }}>
                  {!edit[index] ? (
                    user.login
                  ) : (
                    <TextField
                      value={user.login}
                      onChange={(event) =>
                        setUsers((prev) => {
                          const arr = [...prev];
                          arr[index].login = event.target.value;
                          return arr;
                        })
                      }
                    />
                  )}{" "}
                </TableCell>
                <TableCell>
                  {!edit[index] ? (
                    user.premissions
                  ) : (
                    <Select
                      value={user.premissions}
                      onChange={(event) =>
                        setUsers((prev) => {
                          const arr = [...prev];
                          arr[index].premissions = event.target.value;
                          return arr;
                        })
                      }
                    >
                      <MenuItem value={"admin"}>admin</MenuItem>
                      <MenuItem value={"user"}>user</MenuItem>
                    </Select>
                  )}{" "}
                </TableCell>
                <TableCell>{dateToTime(user.lastLoginTime)}</TableCell>
                <TableCell>
                  {user.lastLoginTime === user.lastLogoutTime
                    ? "Активний"
                    : dateToTime(user.lastLogoutTime)}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      if (edit[index]) {
                        saveChages(user._id, user);
                      }
                      chageEdit(index);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton>
                    <KeyIcon />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};
