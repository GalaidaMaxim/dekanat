import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { enable, disable, enableAlertAction } from "../redux/slices";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { inwokeMain } from "../serivce/inwokeMain";

const StyledButton = styled(Button)`
  width: 400px;
`;
export const AdminActions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getStartYear = (cource) => {
    const data = new Date(Date.now());
    let year = data.getFullYear() - cource;
    if (data.getMonth() >= 8) {
      year += 1;
    }
    return year;
  };
  const updateYear = async () => {
    dispatch(enable());
    const allStudents = JSON.parse(
      await window.mainApi.invokeMain("getAllStudents")
    );
    for (let i = 0; i < allStudents.length; i++) {
      const year = getStartYear(allStudents[i].course);
      await window.mainApi.invokeMain("updateStudent", {
        id: allStudents[i]._id,
        info: {
          startYear: year,
        },
      });
    }

    dispatch(disable());
  };

  const toNextYear = async () => {
    // dispatch(enable());
    await window.mainApi.invokeMain("chageDBToNextYear");
    // dispatch(disable());
  };

  const updateStatus = async () => {
    dispatch(enable());
    const allStudents = JSON.parse(
      await window.mainApi.invokeMain("getAllStudents")
    );
    for (let i = 0; i < allStudents.length; i++) {
      await window.mainApi.invokeMain("updateStudent", {
        id: allStudents[i]._id,
        info: {
          status: allStudents[i].status,
        },
      });
    }

    dispatch(disable());
  };

  const blockSelectable = async () => {
    dispatch(enable());
    try {
      await inwokeMain({ command: "setOpenForSelect", options: false });
    } catch (err) {}
    dispatch(disable());
  };
  const eneableSelectable = async () => {
    console.log("press");
    dispatch(enable());
    try {
      await inwokeMain({ command: "setOpenForSelect", options: true });
    } catch (err) {}
    dispatch(disable());
  };
  return (
    <Box>
      <h2>Адміністрування системи</h2>
      <Box display={"flex"} flexWrap={"wrap"} gap={2}>
        <StyledButton onClick={updateYear} variant="contained">
          Оновити рік вступу всіх студентів
        </StyledButton>
        <StyledButton
          onClick={() => {
            dispatch(
              enableAlertAction({
                callback: toNextYear,
                title: "Перевести заклад на наступний рік",
                discription: "погодьте зі всіма працівниками",
              })
            );
          }}
          variant="contained"
        >
          Перевести заклад на наступний рік
        </StyledButton>
        <StyledButton onClick={() => navigate("/errors")} variant="contained">
          Error list
        </StyledButton>
        <StyledButton onClick={() => updateStatus()} variant="contained">
          Update status
        </StyledButton>
      </Box>
      <Box marginTop={4} display={"flex"} flexWrap={"wrap"} gap={2}>
        <StyledButton
          onClick={() => navigate("/create_user")}
          variant="contained"
        >
          Створити користувача
        </StyledButton>
        <StyledButton onClick={() => navigate("/userList")} variant="contained">
          Список коритувачів
        </StyledButton>
      </Box>
      <Box marginTop={4} display={"flex"} flexWrap={"wrap"} gap={2}>
        <StyledButton
          onClick={() => {
            eneableSelectable();
          }}
          variant="contained"
        >
          Розблокувати вибіркові предмети
        </StyledButton>
        <StyledButton
          onClick={() => {
            blockSelectable();
          }}
          variant="contained"
        >
          Заблокувати вибіркові предмети
        </StyledButton>
      </Box>
    </Box>
  );
};
