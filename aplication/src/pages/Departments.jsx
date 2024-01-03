import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const StyledButtonList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

export const Departments = () => {
  const [deps, setDeps] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    window.mainApi.invokeMain("getDeparments").then((result) => {
      if (!result) {
        return;
      }

      setDeps(JSON.parse(result));
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
