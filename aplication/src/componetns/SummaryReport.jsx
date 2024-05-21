import { calculateAvarage } from "../serivce/calculateAvarage";
import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableContainer,
} from "@mui/material";
import styled from "@emotion/styled";
import { Fragment } from "react";
import { intToABC, intToNational } from "../serivce/formulas";

const StyledTableCell = styled(TableCell)`
  border: 1px solid black;
`;

const GrayCell = styled(StyledTableCell)`
  border: 1px solid black;
  background-color: #c5c5c5;
`;

const OrangeCell = styled(StyledTableCell)`
  border: 1px solid black;
  background-color: orange;
`;

export const SummaryReport = ({ students, subjects, semester }) => {
  return (
    <>
      <h3>Відомість</h3>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <StyledTableCell sx={{ minWidth: "350px" }}></StyledTableCell>
              {students.map((item) => (
                <OrangeCell
                  key={item._id}
                  colSpan={3}
                  sx={{ minWidth: "300px" }}
                >{`${item.name} ${item.sername}`}</OrangeCell>
              ))}
            </TableRow>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              {students.map((item) => (
                <Fragment key={item._id}>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </Fragment>
              ))}
            </TableRow>
            {subjects.map((item) => (
              <TableRow key={item._id}>
                <StyledTableCell sx={{ padding: "5px" }}>
                  {item.name}
                </StyledTableCell>
                {students.map((student) => {
                  const subject = student.subjects.find(
                    (sub) => sub._id === item._id
                  );
                  if (subject) {
                    const value = subject.semesters[semester - 1].mark || "Н/А";
                    if (subject.semesters[semester - 1].assessmentType !== 1) {
                      return (
                        <Fragment key={student._id}>
                          <StyledTableCell>{intToABC(value)}</StyledTableCell>
                          <StyledTableCell>{value}</StyledTableCell>
                          <StyledTableCell>
                            {intToNational(value)}
                          </StyledTableCell>
                        </Fragment>
                      );
                    } else {
                      return (
                        <Fragment key={student._id}>
                          <StyledTableCell></StyledTableCell>
                          <StyledTableCell>{value}</StyledTableCell>
                          <StyledTableCell></StyledTableCell>
                        </Fragment>
                      );
                    }
                  } else {
                    return (
                      <Fragment key={student._id}>
                        <GrayCell></GrayCell>
                        <GrayCell></GrayCell>
                        <GrayCell></GrayCell>
                      </Fragment>
                    );
                  }
                })}
              </TableRow>
            ))}
            <TableRow>
              <StyledTableCell>Середній бал</StyledTableCell>
              {students.map((item) => {
                return (
                  <StyledTableCell key={item._id} colSpan={3}>
                    {calculateAvarage(item.subjects, semester)}
                  </StyledTableCell>
                );
              })}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
