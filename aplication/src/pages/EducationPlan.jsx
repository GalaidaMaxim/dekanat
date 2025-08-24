import {
  Box,
  Button,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  IconButton,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { inwokeMain } from "../serivce/inwokeMain";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { enable, disable } from "../redux/slices";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

export const EducationPlan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const dispatch = useDispatch();
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    (async () => {
      dispatch(enable());
      try {
        let subjects = await inwokeMain({
          command: "getSubjectsByEducationPlan",
          options: { educationPlan: location.state.plan._id },
        });
        subjects = subjects.map((item) => {
          item.internalCode = item.internalCode || item.code;
          return item;
        });
        setSubjects(subjects);
        let departments = await inwokeMain({ command: "getDeparments" });
        const lvl =
          location.state.plan.level === "магістр"
            ? "бакалавр"
            : location.state.plan.level;
        departments = departments.filter((item) => item.level === lvl);
        setDepartments(departments);
      } catch (err) {
        console.log(err);
      }
      dispatch(disable());
    })();
  }, [dispatch, location]);

  return (
    <Box>
      <Button
        onClick={() => {
          navigate("/educationPlan");
        }}
      >
        Назад
      </Button>
      <h1>{location.state.plan.name}</h1>
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Код</TableCell>
              <TableCell>Внутрішній</TableCell>
              <TableCell>Назва</TableCell>
              <TableCell>Кредити</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center" colSpan={5}>
                Перша категорія
              </TableCell>
            </TableRow>
            {subjects
              .filter((sub) => sub.code.charAt(0) === "1")
              .sort((a, b) => a.sortNumber - b.sortNumber)
              .map((item) => (
                <TableRow key={item._id}>
                  <TableCell width={"50px"}>{item.code}</TableCell>
                  <TableCell width={"50px"}>{item.internalCode}</TableCell>
                  <TableCell width={"400px"}>{item.name}</TableCell>
                  <TableCell>{item.credits}</TableCell>
                  <TableCell>
                    <IconButton>
                      <KeyboardArrowUpIcon />
                    </IconButton>
                    <IconButton>
                      <KeyboardArrowDownIcon />
                    </IconButton>
                    <IconButton color="primary">
                      <ModeEditOutlineIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            <TableRow>
              <TableCell align="center" colSpan={5}>
                Профільні
              </TableCell>
            </TableRow>
            {departments.map((item) => (
              <>
                <TableRow>
                  <TableCell align="center" colSpan={5}>
                    {item.name}
                  </TableCell>
                </TableRow>
                {subjects
                  .filter(
                    (sub) =>
                      sub.code.charAt(0) === "2" && sub.department === item._id
                  )
                  .sort((a, b) => a.sortNumber - b.sortNumber)
                  .map((item) => (
                    <TableRow key={item._id}>
                      <TableCell width={"50px"}>{item.code}</TableCell>
                      <TableCell width={"50px"}>{item.internalCode}</TableCell>
                      <TableCell width={"400px"}>{item.name}</TableCell>
                      <TableCell>{item.credits}</TableCell>
                      <TableCell>
                        <IconButton>
                          <KeyboardArrowUpIcon />
                        </IconButton>
                        <IconButton>
                          <KeyboardArrowDownIcon />
                        </IconButton>
                        <IconButton color="primary">
                          <ModeEditOutlineIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};
