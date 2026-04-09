import {
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Typography,
} from "@mui/material";
import { inwokeMain } from "../serivce/inwokeMain";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { enable, disable, show } from "../redux/slices";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { StudentList } from "../componetns/StudentList";

export const StatmentView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const [statment, setStatment] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    (async () => {
      dispatch(enable());
      const result = await inwokeMain({
        command: "getStatmentsByParams",
        options: { params: { _id: id } },
      });
      if (result) {
        setStatment(result.statments[0]);
      }
      dispatch(disable());
    })();
  }, [id, dispatch]);

  console.log(statment?.course);

  useEffect(() => {
    if (!statment) {
      return;
    }
    dispatch(enable());
    window.mainApi
      .invokeMain("getStudentsByParams", {
        level: statment.educationPlan.level,
        department: statment.department._id,
        educationPlan: statment.educationPlan._id,
        course: statment.course,
        status: "навчається",
      })
      .then((result) => {
        const data = JSON.parse(result);
        if (!data) {
          return;
        }

        const st = data
          .filter((item) =>
            item.subjects.some((sub) => sub._id === statment.subject._id)
          )
          .filter((item) => item.foreigner === statment.foreigner)
          .sort((a, b) => a.sername.localeCompare(b.sername));

        setStudents(st);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(disable());
      });
  }, [statment, dispatch]);

  const createSatement = () => {
    (async () => {
      try {
        const path = await inwokeMain({ command: "selectFolder" });
        if (!path) {
          return;
        }
        console.log(path);

        const result = await window.mainApi.invokeMain(
          "createStatmentDocument",
          {
            OS: statment.educationPlan.level,
            students,
            OOP: statment.department._id,
            c: statment.course,
            S: statment.semester,
            subject: statment.subject._id,
            filePath: path,
            teacher: statment.users
              .map(
                (item) =>
                  `${item?.sername} ${item.name?.charAt(
                    0
                  )}. ${item.secondName?.charAt(0)}.`
              )
              .join(", "),
            decan: statment.decan,
            facultet: statment.facultet._id,
            remoteType: statment.remoteType,
            number: statment.code,
            year: statment.year,
          }
        );
        console.log(result);

        dispatch(show({ title: "Відомість створено", type: "success" }));
      } catch (err) {
        console.log(err);
        dispatch(show({ title: "Помилка створення", type: "error" }));
      }
    })();
  };

  const createCSV = () => {
    (async () => {
      try {
        const path = await inwokeMain({ command: "selectFolder" });
        if (!path) {
          return;
        }

        const result = await window.mainApi.invokeMain("createStatmentCSV", {
          filePath: path,
          students,
          subjectID: statment.subject._id,
          semester: statment.semester,
        });
        if (!result) {
          return new Error();
        }
        dispatch(show({ title: "CSV файл створено", type: "success" }));
      } catch (err) {
        console.log(err);
        dispatch(show({ title: "Помилка створення", type: "error" }));
      }
    })();
  };

  const onNavigate = () => {
    navigate("/fill_statement", {
      state: {
        ...location.state,
        from: location.pathname,
        students,
        subjectID: statment.subject._id,
        semester: statment.semester,
      },
    });
  };

  const uploadCSV = () => {
    (async () => {
      try {
        const path = await inwokeMain({ command: "openFileDialog" });
        if (!path) {
          return;
        }

        const result = await inwokeMain({
          command: "uploadStatmentCSV",
          options: {
            path,
            subjectID: statment.subject._id,
            semester: statment.semester,
            level: statment.educationPlan.level,
            course: statment.course,
          },
        });

        if (!result) {
          return new Error();
        }
        setStudents(result);
        dispatch(show({ title: "CSV завантажено створено", type: "success" }));
      } catch (err) {
        console.log(err);
        dispatch(show({ title: "Помилка завантаження", type: "error" }));
      }
    })();
  };

  return (
    <Box>
      <Button
        onClick={() =>
          navigate("/statmentList", { state: { ...location.state } })
        }
      >
        Назад
      </Button>
      <h1>{statment?.subject.name}</h1>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Номер</TableCell>
            <TableCell>{statment?.code}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Факультет</TableCell>
            <TableCell>{statment?.facultet.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Освітній ступінь</TableCell>
            <TableCell>{statment?.educationPlan.level}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Профілізація</TableCell>
            <TableCell>{statment?.department.fullName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Курс</TableCell>
            <TableCell>{statment?.course}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Семестер</TableCell>
            <TableCell>{statment?.semester}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Рік</TableCell>
            <TableCell>{statment?.year}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Екзаменатор</TableCell>
            <TableCell>
              <Box display={"flex"} gap={2}>
                {statment?.users.map((item) => (
                  <Typography
                    key={item.id}
                    variant="span"
                  >{`${item.sername} ${item.name}`}</Typography>
                ))}
              </Box>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Іноземці</TableCell>
            <TableCell>{statment?.foreigner ? "так" : "ні"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Форма навчання</TableCell>
            <TableCell>
              {statment?.remoteType === "ofline" ? "Денна" : "Заочна"}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Box>
        {students.length !== 0 && (
          <StudentList
            stuents={students}
            subjectID={statment?.subject._id}
            semester={statment?.semester}
          />
        )}
      </Box>
      <Box marginTop={2}>
        <Button onClick={createSatement} variant="contained">
          Створити WORD документ
        </Button>
        <Button
          disabled={students.length === 0}
          variant="contained"
          sx={{ marginLeft: "30px" }}
          onClick={onNavigate}
        >
          Заповнити відомість
        </Button>
        <Button
          disabled={students.length === 0}
          variant="contained"
          sx={{ marginLeft: "30px" }}
          onClick={createCSV}
        >
          Створити СSV
        </Button>
        <Button
          disabled={students.length === 0}
          variant="contained"
          sx={{ marginLeft: "30px" }}
          onClick={uploadCSV}
        >
          Завантажити СSV
        </Button>
      </Box>
    </Box>
  );
};
