import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from "@mui/material";

export const StudentList = ({ stuents, subjectID, semester }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>№</TableCell>
          <TableCell>Ім'я</TableCell>
          {subjectID && <TableCell>Оцінка</TableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {stuents.map((item, index) => (
          <TableRow key={item._id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{`${item.sername} ${item.name} ${item.secondName}`}</TableCell>
            {subjectID && (
              <TableCell>
                {
                  item.subjects.find((sub) => sub._id === subjectID).semesters[
                    semester - 1
                  ].mark
                }
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
