import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from "@mui/material";

export const StudentList = ({ stuents }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>№</TableCell>
          <TableCell>Ім'я</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {stuents.map((item, index) => (
          <TableRow key={item._id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{`${item.sername} ${item.name} ${item.secondName}`}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
