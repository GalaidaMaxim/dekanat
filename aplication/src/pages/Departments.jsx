import { Button } from "@mui/material";
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
  }, []);
  return (
    <StyledButtonList>
      {deps.map((item) => (
        <Button
          variant="contained"
          key={item.name}
          onClick={() => navigate(`/students/${item._id}`)}
        >
          {item.name}
        </Button>
      ))}
    </StyledButtonList>
  );
};
