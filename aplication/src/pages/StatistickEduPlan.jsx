import { Box, Button, Grid } from "@mui/material";
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
      setSubjects(subjects);
      dispatch(disable());
    })();
  }, [planID, dispatch]);

  const studentsCount = students.length;
  const subjectsCount = subjects.length;

  const subjectsStatistick = subjectUseCount(
    subjects.filter(
      (item) => item.code.charAt(0) === "3" || item.code.charAt(0) === "4"
    ),
    students
  );
  console.log(subjectsStatistick);

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
        <BarChart
          layout="horizontal"
          dataset={subjectsStatistick}
          yAxis={[
            {
              dataKey: "DK",
              tickSize: 10,
              tickLabelStyle: {
                fontSize: 12,
              },
            },
          ]}
          series={[
            {
              dataKey: "count",
            },
          ]}
          barLabel={(item, context) => {
            return `${Math.round((item.value * 100) / studentsCount)}%`;
          }}
          height={subjectsStatistick.length * 60}
        />
      </Box>
    </Box>
  );
};
