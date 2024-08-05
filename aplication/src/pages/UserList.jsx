import {
  Box,
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  IconButton,
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
  useEffect(() => {
    (async () => {
      dispatch(enable());
      const users = await inwokeMain({ command: "getAllUsers" });
      dispatch(disable());
      if (!users) {
        return;
      }
      setUsers(users);
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
              <TableCell>Дата входу</TableCell>
              <TableCell>Дата виходу</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow>
                <TableCell>{`${user.name} ${user.sername}`} </TableCell>
                <TableCell>{user.login} </TableCell>
                <TableCell>{dateToTime(user.lastLoginTime)}</TableCell>
                <TableCell>{dateToTime(user.lastLogoutTime)}</TableCell>
                <TableCell>
                  <IconButton>
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
