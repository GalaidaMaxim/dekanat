import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

export const SubjectTable = ({
  subjects,
  filterChar = "1",
  mandatory = false,
}) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={{ fontWeight: 600 }}>Код</TableCell>
          <TableCell width={"500px"} sx={{ fontWeight: 600 }}>
            Назва
          </TableCell>
          <TableCell sx={{ fontWeight: 600 }}>Кредити</TableCell>
          <TableCell sx={{ fontWeight: 600 }}>Семестри</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {subjects
          .filter((item) => item.code.charAt(0) === filterChar)
          .map((item) => {
            return (
              <TableRow key={item.name}>
                <TableCell>{`${mandatory ? "ОК" : "ВК"} ${
                  item.code
                }`}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.credits}</TableCell>
                <TableCell>
                  {item.semesters.map(
                    (sem, index) => sem.include && index + 1 + " "
                  )}
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};
