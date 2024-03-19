import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Button,
  Box,
} from "@mui/material";

export const StudentSubjectList = ({
  subjects = [],
  callback,
  filterChar = "1",
  buttonText = "видалити",
  addAllButton,
}) => {
  const onAllAdd = () => {
    subjects.forEach(async (item) => {
      console.log(item);
      callback(item._id)();
    });
  };

  return (
    <Box>
      {addAllButton && (
        <Box textAlign={"right"}>
          <Button onClick={onAllAdd} variant="outlined">
            Додати всі предмети
          </Button>
        </Box>
      )}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width={"100px"}>Код предмету</TableCell>
            <TableCell width={"300px"}>Назва</TableCell>
            <TableCell width={"50px"}>Кредити</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subjects &&
            subjects
              .filter((item) => item.code.charAt(0) === filterChar)
              .map((item, index) => (
                <TableRow key={item.name + item.code}>
                  <TableCell>{item.code}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.credits}</TableCell>
                  <TableCell>
                    <Button onClick={callback(item._id)}>{buttonText}</Button>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </Box>
  );
};
