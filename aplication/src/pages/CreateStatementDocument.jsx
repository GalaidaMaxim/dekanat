import { Box, Button, IconButton, TextField } from "@mui/material";
import { LevelSelector } from "../componetns/LevelSelector";
import { useEffect, useState } from "react";
import { DepartmentSelector } from "../componetns/DepartmentSelector";
import { PlanSelector } from "../componetns/PlanSelector";
import { CourseSelector } from "../componetns/CourseSelector";
import { SubjectSelector } from "../componetns/SubjectSelector";
import { StudentList } from "../componetns/StudentList";
import { SemesterSelector } from "../componetns/SemesterSelector";
import { ForeginerSelector } from "../componetns/ForeginerSelectror";
import { useDispatch } from "react-redux";
import { show } from "../redux/slices";
import { useRemoteType, useSemester } from "../redux/selector";
import { useCource } from "../redux/selector";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { enable, disable } from "../redux/slices";
import { FacultetSelector } from "../componetns/FacultetSelector";
import { useFacultet } from "../redux/selector";
import { RemoteTypeSelector } from "../componetns/RemoteTypeSelector";
import { YearSelector } from "../componetns/YearSelector";
import { useYear } from "../redux/selector";
import { inwokeMain } from "../serivce/inwokeMain";
import { UserSelector } from "../componetns/UserSelector";
import CloseIcon from "@mui/icons-material/Close";

export const CreateStatemntDocument = () => {
  const [level, setLevel] = useState("");
  const [depID, setDepID] = useState("");
  const [planID, setPlanID] = useState("");
  const cource = useCource();
  const [subjectID, setSubjectID] = useState(null);
  const [students, setStudents] = useState([]);
  const [number, setNumber] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const year = useYear();

  const [filePath, setFilePath] = useState("");
  const [examenator, setExamenator] = useState("");
  const [foreginer, setForeginer] = useState(false);
  const dispatch = useDispatch();
  const semester = useSemester();
  const navigate = useNavigate();
  const location = useLocation();
  const facultet = useFacultet();
  const remoteType = useRemoteType();

  const onNavigate = () => {
    navigate("/fill_statement", {
      state: {
        from: location.pathname,
        students,
        subjectID,
        semester,
      },
    });
  };

  useEffect(() => {
    if (!level || !depID || !cource || !subjectID || !planID) {
      return;
    }
    dispatch(enable());
    window.mainApi
      .invokeMain("getStudentsByParams", {
        level,
        department: depID,
        educationPlan: planID,
        course: cource,
        status: "навчається",
      })
      .then((result) => {
        const data = JSON.parse(result);
        console.log(data);
        if (!data) {
          return;
        }
        console.log(subjectID);
        const st = data
          .filter((item) => item.subjects.some((sub) => sub._id === subjectID))
          .filter((item) => item.foreigner === foreginer)
          .sort((a, b) => a.sername.localeCompare(b.sername));
        setStudents(st);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(disable());
      });
  }, [level, planID, depID, cource, subjectID, dispatch, foreginer]);

  const createSatement = async () => {
    dispatch(enable());
    const statment = await inwokeMain({
      command: "createStatment",
      options: {
        data: {
          department: depID,
          educationPlan: planID,
          course: cource,
          semester,
          subject: subjectID,
          facultet,
          remoteType,
          code: number,
          users: selectedUsers.map((item) => item._id),
          foreigner: foreginer,
          level,
          year,
        },
      },
    });

    dispatch(disable());
  };

  const removeUser = (id) => {
    setSelectedUsers((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <Box>
      <h1>Створення оціночних відомостей</h1>
      <Box>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Box width={"47%"}>
            <LevelSelector level={level} setLevel={setLevel} />
          </Box>
          <Box width={"47%"}>
            <DepartmentSelector
              level={level}
              depID={depID}
              setdepID={setDepID}
              disabled={!level}
            />
          </Box>
        </Box>
        <Box marginTop={2} display={"flex"} justifyContent={"space-between"}>
          <Box width={"47%"}>
            <PlanSelector
              level={level}
              planID={planID}
              setPlanID={setPlanID}
              disabled={!depID}
            />
          </Box>
          <Box width={"47%"}>
            <CourseSelector />
          </Box>
        </Box>

        <Box marginTop={2} display={"flex"} justifyContent={"space-between"}>
          <Box width={"47%"}>
            <SemesterSelector />
          </Box>
          <Box width={"47%"}>
            <SubjectSelector
              subjectID={subjectID}
              setSubjectID={setSubjectID}
              educationPlan={planID}
              department={depID}
              semester={semester}
            />
          </Box>
        </Box>

        <Box marginTop={2} display={"flex"} justifyContent={"space-between"}>
          <Box width={"47%"}>
            <FacultetSelector />
          </Box>
          <Box width={"47%"}>
            <RemoteTypeSelector />
          </Box>
        </Box>

        <Box marginTop={2} display={"flex"} justifyContent={"space-between"}>
          <Box width={"47%"}>
            <TextField
              fullWidth
              label={"Номер"}
              value={number}
              onChange={({ target }) => setNumber(target.value)}
            />
          </Box>
          <Box width={"47%"}>
            <YearSelector />
          </Box>
        </Box>
        {/* 
        <Box display={"flex"} justifyContent={"space-between"} mt={2}>
          <Box width={"47%"}>
            <TextField
              fullWidth
              label={"декан"}
              value={decan}
              onChange={(event) => setDecan(event.target.value)}
            />
          </Box>
        </Box> */}
        {selectedUsers.length !== 0 && (
          <Box display={"flex"} gap={2} marginTop={2}>
            {selectedUsers.map((item) => (
              <Box
                display={"inline-flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                paddingLeft={2}
                paddingRight={2}
                key={item._id}
                borderRadius={"20px"}
                sx={{ backgroundColor: "#bdbdbd" }}
              >
                <Box>{`${item.sername} ${item.name}`}</Box>
                <IconButton onClick={() => removeUser(item._id)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
        <Box marginTop={2}>
          <Box width={"47%"}>
            <UserSelector setUser={setSelectedUsers} />
          </Box>
        </Box>

        <Box>
          <ForeginerSelector
            label="Обрати іноземців"
            setForeigner={setForeginer}
            foreigner={foreginer}
          />
        </Box>
        <Box>{students.length !== 0 && <StudentList stuents={students} />}</Box>
        <Box marginTop={2}>
          <Button
            disabled={
              students.length === 0 ||
              !semester ||
              !users.lenth === 0 ||
              !year ||
              !number
            }
            onClick={createSatement}
            variant="contained"
          >
            Створити відомість
          </Button>
          <Button
            disabled={students.length === 0 || !semester}
            variant="contained"
            sx={{ marginLeft: "30px" }}
            onClick={onNavigate}
          >
            Заповнити відомість
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
