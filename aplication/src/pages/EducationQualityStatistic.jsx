import {
  Box,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LevelSelector } from "../componetns/LevelSelector";
import { useState, useEffect } from "react";
import { inwokeMain } from "../serivce/inwokeMain";
import { useDispatch } from "react-redux";
import { enable, disable } from "../redux/slices";
import { getExistingFinalMark } from "../serivce/getFinalMark";
import { LineChart } from "@mui/x-charts";
import { StatistickCard } from "../componetns/StatistickCard";
import { Fragment } from "react";

function roundTo(num, decimals = 2) {
  const factor = Math.pow(10, decimals);
  return Math.round((num + Number.EPSILON) * factor) / factor;
}

const calculateAVG = (arr) => {
  return roundTo(arr.reduce((acc, item) => acc + item.mark, 0) / arr.length);
};
const calculateMedian = (arr) => {
  return arr[Math.round(arr.length / 2)].mark;
};

const reworkStudent = (student) => {
  const subjectsResults = [];
  const result = {
    department: student.department,
    startYear: student.startYear,
  };
  student.subjects.forEach((subject) => {
    const mark = Number.parseInt(getExistingFinalMark(subject));
    if (mark) {
      subjectsResults.push(mark);
    }
  });
  result.arr = subjectsResults;
  result.mark = roundTo(
    subjectsResults.reduce((acc, item) => acc + item, 0) /
      subjectsResults.length
  );
  return result;
};

export const EducationQualityStatistic = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [years, setYears] = useState([]);
  const [students, setStudents] = useState([]);
  const [level, setLevel] = useState("");
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    if (!level) {
      return;
    }
    (async () => {
      dispatch(enable());
      const students = await inwokeMain({
        command: "getAllStudents",
        options: { params: { level }, limit: 0 },
      });
      const departments = await inwokeMain({ command: "getDeparments" });
      dispatch(disable());

      setDepartments(
        departments
          .filter((item) =>
            level === "молодший бакалавр"
              ? item.level === "молодший бакалавр"
              : item.level === "бакалавр"
          )
          .map((item) => ({ ...item, enable: false }))
      );
      const stup = students.studentsArr
        .map((item) => reworkStudent(item))
        .filter((item) => item.mark)
        .sort((a, b) => a.mark - b.mark);
      setStudents(stup);
      const years = stup.reduce((acc, item) => {
        if (!acc.includes(item.startYear)) {
          acc.push(item.startYear);
        }
        return acc;
      }, []);
      years.sort((a, b) => a - b);
      setYears(years.map((item) => ({ value: item, enable: true })));
    })();
  }, [level, dispatch]);

  const yearChangeHandler = (year) => {
    return ({ target }) => {
      setYears((prev) => {
        const newArr = [...prev];
        const index = newArr.findIndex((item) => item.value === year);
        newArr[index].enable = target.checked;
        return newArr;
      });
    };
  };
  const departmentHandler = (_id) => {
    return ({ target }) => {
      setDepartments((prev) => {
        const newArr = [...prev];
        const index = newArr.findIndex((item) => item._id === _id);
        newArr[index].enable = target.checked;
        return newArr;
      });
    };
  };

  const setYear = years.filter((year) => year.enable).map((year) => year.value);
  const total = setYear.map((item) =>
    calculateAVG(students.filter((stu) => stu.startYear === item))
  );
  const profile = departments
    .filter((dep) => dep.enable)
    .map((dep) => ({
      label: dep.name,
      data: setYear.map((item) =>
        calculateAVG(
          students.filter(
            (stu) => stu.startYear === item && stu.department._id === dep._id
          )
        )
      ),
    }));

  return (
    <Box>
      <Button
        onClick={() => {
          navigate("/reports");
        }}
      >
        Назад
      </Button>
      <h1>Статистика успішності</h1>
      <Box>
        <LevelSelector level={level} setLevel={setLevel} />
      </Box>
      <Box>
        <Box>
          <h2>Роки</h2>
          <FormGroup>
            <Box display={"flex"}>
              {years.map((item) => (
                <FormControlLabel
                  key={item.value}
                  control={
                    <Checkbox
                      checked={item.enable}
                      onChange={yearChangeHandler(item.value)}
                    />
                  }
                  label={item.value}
                />
              ))}
            </Box>
          </FormGroup>
        </Box>
        <Box>
          <h2>Профілізації</h2>
          <FormGroup>
            <Box display={"flex"} flexWrap={"wrap"}>
              {departments.map((item) => (
                <FormControlLabel
                  key={item._id}
                  control={
                    <Checkbox
                      checked={item.enable}
                      onChange={departmentHandler(item._id)}
                    />
                  }
                  label={item.name}
                />
              ))}
            </Box>
          </FormGroup>
        </Box>
        <Box>
          <LineChart
            xAxis={[
              {
                data: setYear,
                label: "Роки",
                tickValues: setYear,
                tickMinStep: 1,
              },
            ]}
            series={[{ data: total, label: "Загальна успішність" }, ...profile]}
            height={300}
          />
        </Box>
        {students.length && (
          <Box>
            <Grid container>
              <Grid size={3}>
                <h2>Загальна статистика</h2>
              </Grid>
              <Grid size={3}>
                <StatistickCard
                  title={"Середнє"}
                  value={roundTo(calculateAVG(students))}
                />
              </Grid>
              <Grid size={3}>
                <StatistickCard
                  title={"Медіана"}
                  value={calculateMedian(students)}
                />
              </Grid>
              <Grid size={3}>
                <StatistickCard
                  title={"Різниця"}
                  value={roundTo(
                    roundTo(calculateAVG(students)) - calculateMedian(students)
                  )}
                />
              </Grid>
              {departments
                .filter((dep) => dep.enable)
                .map((dep) => (
                  <Fragment key={dep._id}>
                    <Grid size={3}>
                      <h2>{dep.name}</h2>
                    </Grid>
                    <Grid size={3}>
                      <StatistickCard
                        title={"Середнє"}
                        value={roundTo(
                          calculateAVG(
                            students.filter(
                              (item) => item.department._id === dep._id
                            )
                          )
                        )}
                      />
                    </Grid>
                    <Grid size={3}>
                      <StatistickCard
                        title={"Медіана"}
                        value={calculateMedian(
                          students.filter(
                            (item) => item.department._id === dep._id
                          )
                        )}
                      />
                    </Grid>
                    <Grid size={3}>
                      <StatistickCard
                        title={"Різниця"}
                        value={roundTo(
                          roundTo(
                            calculateAVG(
                              students.filter(
                                (item) => item.department._id === dep._id
                              )
                            )
                          ) -
                            calculateMedian(
                              students.filter(
                                (item) => item.department._id === dep._id
                              )
                            )
                        )}
                      />
                    </Grid>
                  </Fragment>
                ))}
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  );
};
