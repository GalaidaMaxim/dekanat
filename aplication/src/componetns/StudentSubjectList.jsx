import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Button,
} from "@mui/material";

export const StudentSubjectList = ({
  subjects = [],
  callback,
  filterChar = "1",
  buttonText = "видалити",
}) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
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
              <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.credits}</TableCell>
                <TableCell>
                  <Button onClick={callback(item._id)}>{buttonText}</Button>
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
};
