import { Box, Button, TextField, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { enable, disable } from "../redux/slices";
import { inwokeMain } from "../serivce/inwokeMain";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

export const Notes = ({ student, setStudent }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const onAdd = async () => {
    if (!text) {
      return;
    }
    const arr = [...student.notes, text];
    dispatch(enable());

    const studentNew = await inwokeMain({
      command: "updateStudent",
      options: {
        id: student._id,
        info: {
          notes: arr,
        },
      },
    });
    setStudent(studentNew);
    setText("");
    dispatch(disable());
  };

  const onRemove = async (index) => {
    dispatch(enable());
    const arr = [...student.notes];
    console.log(arr, index);

    arr.splice(index, 1);
    console.log(arr);
    const studentNew = await inwokeMain({
      command: "updateStudent",
      options: {
        id: student._id,
        info: {
          notes: arr,
        },
      },
    });
    setStudent(studentNew);
    setText("");
    dispatch(disable());
  };

  return (
    <>
      <h2>Примітки</h2>
      <Box>
        <TextField
          fullWidth
          value={text}
          multiline
          onChange={({ target }) => setText(target.value)}
          rows={5}
        />
        <Box marginTop={2}>
          <Button onClick={onAdd} variant="contained">
            Додати
          </Button>
        </Box>
        <Box marginTop={2} display={"flex"} flexDirection="column" gap={3}>
          {student.notes.map((item, index) => (
            <Box
              paddingLeft={2}
              border="1px solid gray"
              borderRadius={3}
              minHeight="100px"
              position="relative"
              key={`${item}${index}`}
            >
              <IconButton
                onClick={() => onRemove(index)}
                sx={{ position: "absolute", top: 0, right: 0 }}
              >
                <CloseIcon />
              </IconButton>
              <p>{item}</p>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};
