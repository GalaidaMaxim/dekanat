import { Paper, Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";

const StyledButtonList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

export const Departments = () => {
  const [deps, setDeps] = useState([]);
  useEffect(() => {
    window.mainApi.invokeMain("getDeparments").then((result) => {
      if (!result) {
        return;
      }
      setDeps(result.map((item) => item._doc));
    });
  }, []);
  return (
    <StyledButtonList>
      {deps.map((item) => (
        <Button variant="contained" key={item.name}>
          {item.name}
        </Button>
      ))}
    </StyledButtonList>
  );
};
