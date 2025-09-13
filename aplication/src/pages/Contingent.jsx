import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { enable, disable, show } from "../redux/slices";
import { inwokeMain } from "../serivce/inwokeMain";
import { ContingentTable } from "../componetns/ContingentTable";

export const Contingent = () => {
  const [students, setStudents] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      dispatch(enable());
      const students = await inwokeMain({
        command: "getAllStudents",
        options: { params: { status: "навчається" }, limit: 0 },
      });

      dispatch(disable());
      setStudents(students.studentsArr);
    })();
  }, [dispatch]);
  return (
    <Box>
      <h1>Звіт контингенту</h1>
      <ContingentTable
        title="бакалавр"
        students={students.filter((item) => item.level === "бакалавр")}
        course={[1, 2, 3, 4]}
      />
      <ContingentTable
        title="магістр"
        students={students.filter((item) => item.level === "магістр")}
        course={[1, 2]}
      />
    </Box>
  );
};
