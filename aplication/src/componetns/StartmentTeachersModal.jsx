import { createPortal } from "react-dom";
import { Box, Paper, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { UserSelector } from "./UserSelector";
import { inwokeMain } from "../serivce/inwokeMain";

export const StatmentTeachersModal = ({ statment, onClose, setStatment }) => {
  const node = document.getElementById("portalDiv");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(statment.users);
  }, [setUsers, statment.users]);

  const onDelete = (id) => {
    setUsers((prev) => {
      return prev.filter((item) => item._id !== id);
    });
  };

  const saveAndClose = async () => {
    try {
      const result = await inwokeMain({
        command: "updateStatment",
        options: {
          id: statment._id,
          info: { users: users.map((item) => item._id) },
        },
      });
      setStatment(result);
      onClose();
    } catch (err) {
      console.log(err);
    }
  };
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
        <Box>
          <Box
            sx={{ backgroundColor: "white" }}
            width={"600px"}
            minHeight={"300px"}
            padding={2}
            borderRadius={10}
            textAlign={"center"}
            display={"flex"}
            justifyContent={"space-between"}
            flexDirection={"column"}
          >
            <Box>
              <h2>Екзаменатори</h2>
              <UserSelector setUser={setUsers} />
              <Box
                alignItems={"flex-start"}
                display={"flex"}
                flexDirection={"column"}
                gap={2}
              >
                {users.map((item) => (
                  <Box key={item._id}>
                    <Typography variant="span">{`${item.sername} ${item.name}`}</Typography>
                    <Button onClick={() => onDelete(item._id)}>Видалити</Button>
                  </Box>
                ))}
              </Box>
            </Box>
            <Button onClick={saveAndClose}>Закрити</Button>
          </Box>
        </Box>
      </Paper>
    </Box>,
    node,
  );
};
