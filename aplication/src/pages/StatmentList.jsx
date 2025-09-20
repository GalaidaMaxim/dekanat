import {
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Grid,
  Button,
  TableHead,
  IconButton,
} from "@mui/material";
import { inwokeMain } from "../serivce/inwokeMain";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { enable, disable } from "../redux/slices";
import { CourseSelector } from "../componetns/CourseSelector";
import { LevelSelector } from "../componetns/LevelSelector";
import { DepartmentSelector } from "../componetns/DepartmentSelector";
import { useCource } from "../redux/selector";
import CloseIcon from "@mui/icons-material/Close";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useLocation } from "react-router-dom";

export const StatmentList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [level, setLevel] = useState("");
  const [department, setDepartment] = useState("");
  const course = useCource();
  const [statmets, setStatments] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.state.level) {
      setLevel(location.state.level);
    }
    if (location.state.department) {
      setDepartment(location.state.department);
    }
  }, [location]);

  useEffect(() => {
    if (!department || !level || !course) {
      return;
    }
    (async () => {
      dispatch(enable());
      const result = await inwokeMain({
        command: "getStatmentsByParams",
        options: { params: { department, level, course }, limit: 0 },
      });
      setStatments(result.statments);
      dispatch(disable());
    })();
  }, [department, level, dispatch, course]);

  const onDelete = async (id) => {
    dispatch(enable());
    const result = await inwokeMain({
      command: "deleteStatment",
      options: { id },
    });

    if (result) {
      setStatments((prev) => [...prev].filter((item) => item._id !== id));
    }
    dispatch(disable());
  };

  const onEdit = async (id) => {
    navigate(`/statmentView/${id}`, { state: { department, level } });
  };

  return (
    <Box>
      <Button onClick={() => navigate("/documentCreation")}>Назад</Button>
      <h1>Відомості</h1>
      <Box>
        <Grid gap={2} container>
          <Grid size={3}>
            <LevelSelector setLevel={setLevel} level={level} />
          </Grid>
          <Grid size={3}>
            <DepartmentSelector
              level={level}
              depID={department}
              setdepID={setDepartment}
            />
          </Grid>
          <Grid size={3}>
            <CourseSelector />
          </Grid>
        </Grid>
      </Box>
      <Box marginTop={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "600",
                  width: "100px",
                }}
              >
                Номер
              </TableCell>
              <TableCell sx={{ fontWeight: "600" }}>Предмет</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>Профілізація</TableCell>
              <TableCell sx={{ fontWeight: "600" }}></TableCell>
              <TableCell sx={{ fontWeight: "600" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {statmets.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.code}</TableCell>
                <TableCell>{item.subject.name}</TableCell>
                <TableCell>{item.department.name}</TableCell>
                <TableCell>
                  <IconButton onClick={() => onEdit(item._id)} color="primary">
                    <RemoveRedEyeIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => onDelete(item._id)} color="error">
                    <CloseIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};
