import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import { CiCirclePlus } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";

export const SubjectTable = ({
  subjects,
  filterChar = "1",
  mandatory = false,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
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
          <TableCell sx={{ fontWeight: 600 }}>Редагувати</TableCell>
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
                <TableCell>
                  <Button
                    onClick={() =>
                      navigate(`/plans/${item._id}`, {
                        state: { from: location.pathname },
                      })
                    }
                    sx={{
                      padding: 0,
                      minWidth: 0,
                      borderRadius: "50%",
                      height: "30px",
                    }}
                  >
                    <CiCirclePlus style={{ width: "100%", height: "100%" }} />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};
