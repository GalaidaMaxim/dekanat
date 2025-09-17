import {
  Box,
  Button,
  Grid,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { PlanSelector } from "../componetns/PlanSelector";
import { LevelSelector } from "../componetns/LevelSelector";
import { StatistickCard } from "../componetns/StatistickCard";
import { inwokeMain } from "../serivce/inwokeMain";
import { enable, disable } from "../redux/slices";
import { useDispatch } from "react-redux";
import { BarChart } from "@mui/x-charts/BarChart";

const subjectUseCount = (subjects, students) => {
  if (!subjects || !students) {
    return [];
  }

  subjects = subjects.map((item) => {
    return {
      _id: item._id,
      name: item.name,
      code: item.code,
      DK: `${item.code} ${item.name}`,
      count: 0,
    };
  });
  for (let i = 0; i < subjects.length; i++) {
    students.forEach((student) => {
      if (student.subjects.some((s) => s._id === subjects[i]._id)) {
        subjects[i].count = subjects[i].count + 1;
      }
    });
  }
  return subjects;
};

export const StatistickEduPlan = () => {
  const navigate = useNavigate();
  const [level, setLevel] = useState("бакалавр");
  const [students, setStudents] = useState([]);
  const [planID, setPlanID] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [sort, setSort] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!planID) {
      return;
    }
    (async () => {
      dispatch(enable());
      const students = await inwokeMain({
        command: "getAllStudents",
        options: { params: { educationPlan: planID }, limit: 0 },
      });

      const subjects = await inwokeMain({
        command: "getSubjectsByEducationPlan",
        options: { educationPlan: planID },
      });

      setStudents(students.studentsArr);
      setSort(0);
      setSubjects(subjects);
      dispatch(disable());
    })();
  }, [planID, dispatch]);

  const studentsCount = students.length;
  const subjectsCount = subjects.length;

  let subjectsStatistick = subjectUseCount(
    subjects.filter(
      (item) => item.code.charAt(0) === "3" || item.code.charAt(0) === "4"
    ),
    students
  );
  console.log(subjectsStatistick);

  if (sort === 1) {
    subjectsStatistick = subjectsStatistick.sort((a, b) => a.count - b.count);
  } else if (sort === -1) {
    subjectsStatistick = subjectsStatistick.sort((a, b) => b.count - a.count);
  }
  return (
    <Box>
      <Button
        onClick={() => {
          navigate("/reports");
        }}
      >
        Назад
      </Button>
      <h1>Статистика навчальних планів</h1>

      <Box>
        <LevelSelector level={level} setLevel={setLevel} />
      </Box>
      <Box marginTop={2}>
        <PlanSelector planID={planID} setPlanID={setPlanID} level={level} />
      </Box>
      <Box marginTop={2}>
        <Grid justifyContent={"center"} container>
          <Grid size={3}>
            <StatistickCard
              title={"Кількість студентів"}
              value={studentsCount}
            />
          </Grid>
          <Grid size={3}>
            <StatistickCard
              title={"Кількість предметів"}
              value={subjectsCount}
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"row"}
        gap={2}
        marginTop={2}
        marginBottom={2}
      >
        <Button onClick={() => setSort(1)} variant="contained">
          Сортувати за зостанням
        </Button>
        <Button onClick={() => setSort(-1)} variant="contained">
          Сортувати за спаданням
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 800 }}>Назва предмету</TableCell>
            <TableCell sx={{ fontWeight: 800 }}>Кількість студентів</TableCell>
            <TableCell sx={{ fontWeight: 800 }}>Відсоткове значення</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subjectsStatistick.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.count}</TableCell>
              <TableCell>{`${Math.round(
                (item.count * 100) / studentsCount
              )}%`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};
//  `${Math.round((item.value * 100) / studentsCount)}%`
