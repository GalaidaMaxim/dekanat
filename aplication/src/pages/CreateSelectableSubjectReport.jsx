import { Box, Grid } from "@mui/material";
import { LevelSelector } from "../componetns/LevelSelector";
import { CourseSelector } from "../componetns/CourseSelector";
import { useEffect, useState } from "react";
import { PlanSelector } from "../componetns/PlanSelector";

export const CreateSelectubleSubjectReport = () => {
  const [level, setLevel] = useState("");
  const [planID, setPlanID] = useState("");
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    if (!planID) {
      return;
    }
    window.mainApi
      .invokeMain("getSubjectsByEducationPlan", { educationPlan: planID })
      .then((data) => {
        setSubjects(
          JSON.parse(data).filter(
            (item) => item.code.charAt(0) === "3" || item.code.charAt(0) === "4"
          )
        );
      });
  }, [planID, setSubjects]);
  console.log(subjects);
  return (
    <Box>
      <h2>Звіт по вибірковим предметам</h2>
      <Grid container rowSpacing={2} spacing={2}>
        <Grid item xs={6}>
          <LevelSelector level={level} setLevel={setLevel} />
        </Grid>
        <Grid item xs={6}>
          <CourseSelector />
        </Grid>
        <Grid item xs={6}>
          <PlanSelector
            level={level}
            planID={planID}
            setPlanID={setPlanID}
            disabled={!level}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
