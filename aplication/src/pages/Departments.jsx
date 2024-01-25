import { Button, Box } from "@mui/material";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { enable, disable } from "../redux/slices";
import { show } from "../redux/slices";

const StyledButtonList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

export const Departments = () => {
  const dispatch = useDispatch();
  const [deps, setDeps] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(enable());
    window.mainApi
      .invokeMain("getDeparments")
      .then((result) => {
        if (!JSON.parse(result)) {
          dispatch(show({ title: "помилка завантаження", type: "warning" }));
          return;
        }

        setDeps(JSON.parse(result));
      })
      .finally(() => {
        dispatch(disable());
      });
  }, [dispatch]);
  return (
    <Box>
      <Box>
        <h2>Коледж</h2>
        <StyledButtonList>
          {deps
            .filter((item) => item.level === "молодший бакалавр")
            .map((item) => (
              <Button
                variant="contained"
                key={item.name}
                onClick={() =>
                  navigate(`/students/${item._id}/молодший бакалавр`)
                }
              >
                {item.name}
              </Button>
            ))}
        </StyledButtonList>
      </Box>
      <Box>
        <h2>Бакалавр</h2>
        <StyledButtonList>
          {deps
            .filter((item) => item.level === "бакалавр")
            .map((item) => (
              <Button
                variant="contained"
                key={item.name}
                onClick={() => navigate(`/students/${item._id}/бакалавр`)}
              >
                {item.name}
              </Button>
            ))}
        </StyledButtonList>
      </Box>
      <Box>
        <h2>Магістр</h2>
        <StyledButtonList>
          {deps
            .filter((item) => item.level === "бакалавр")
            .map((item) => (
              <Button
                variant="contained"
                key={item.name}
                onClick={() => navigate(`/students/${item._id}/магістр`)}
              >
                {item.name}
              </Button>
            ))}
        </StyledButtonList>
      </Box>
    </Box>
  );
};
