import {
  Box,
  TableCell,
  TableBody,
  TableHead,
  Table,
  TableRow,
} from "@mui/material";

export const ContingentTable = ({ title, students, course = [1, 2, 3, 4] }) => {
  return (
    <Box marginTop={2}>
      <h2>{`${title} ${students.length}`}</h2>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Курс</TableCell>
            <TableCell>Загалом</TableCell>
            <TableCell>Денна бюджет без іноземців</TableCell>
            <TableCell>Денна контракт без іноземців</TableCell>
            <TableCell>Заочна без іноземців</TableCell>
            <TableCell>Іноземці денна</TableCell>
            <TableCell>Іноземці заочна</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {course.map((course) => (
            <TableRow key={course}>
              <TableCell>{course}</TableCell>
              <TableCell>
                {students.filter((item) => item.course === course).length}
              </TableCell>
              <TableCell>
                {
                  students.filter(
                    (item) =>
                      item.course === course &&
                      item.remoteType === "ofline" &&
                      item.foreigner === false &&
                      item.contract === false
                  ).length
                }
              </TableCell>
              <TableCell>
                {
                  students.filter(
                    (item) =>
                      item.course === course &&
                      item.remoteType === "ofline" &&
                      item.foreigner === false &&
                      item.contract === true
                  ).length
                }
              </TableCell>
              <TableCell>
                {
                  students.filter(
                    (item) =>
                      item.course === course &&
                      item.remoteType === "online" &&
                      item.foreigner === false
                  ).length
                }
              </TableCell>
              <TableCell>
                {
                  students.filter(
                    (item) =>
                      item.course === course &&
                      item.remoteType === "ofline" &&
                      item.foreigner === true
                  ).length
                }
              </TableCell>
              <TableCell>
                {
                  students.filter(
                    (item) =>
                      item.course === course &&
                      item.remoteType === "online" &&
                      item.foreigner === true
                  ).length
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};
