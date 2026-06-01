import { createPortal } from "react-dom";
import { Box, Paper, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { UserSelector } from "./UserSelector";

export const StatmentTeachersModal = ({ statment, onClose }) => {
  const node = document.getElementById("portalDiv");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(statment.users);
  }, []);

  return createPortal(
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100vw"}
      height={"100vh"}
      sx={{ backgroundColor: "gray" }}
    >
      <Paper>
        <Box
          sx={{ backgroundColor: "white" }}
          width={"600px"}
          minHeight={"300px"}
          padding={2}
          borderRadius={10}
          textAlign={"center"}
        >
          <h2>Екзаменатори</h2>
          <UserSelector setUser={setUsers} />
          <Box alignItems={"center"} display={"flex"} gap={2}>
            {users.map((item) => (
              <Typography
                key={item.id}
                variant="span"
              >{`${item.sername} ${item.name}`}</Typography>
            ))}
            <Button>Видалити</Button>
          </Box>
          <Button onClick={onClose}>Закрити</Button>
        </Box>
      </Paper>
    </Box>,
    node
  );
};
