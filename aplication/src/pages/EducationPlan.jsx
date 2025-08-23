import { Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { inwokeMain } from "../serivce/inwokeMain";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { enable, disable } from "../redux/slices";

export const EducationPlan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const subjects = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(enable());
      try {
        let subjects = await inwokeMain({
          command: "getSubjectsByEducationPlan",
          options: { educationPlan: location.state.plan._id },
        });
        subjects = subjects.sort((a, b) => a.sortNumber - b.sortNumber);
        console.log(subjects);
      } catch (err) {
        console.log(err);
      }
      dispatch(disable());
    })();
  });

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
    </Box>
  );
};
