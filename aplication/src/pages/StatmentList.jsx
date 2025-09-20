import {
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const StatmentList = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Button onClick={() => navigate("/documentCreation")}>Назад</Button>
      <h1>Відомості</h1>
    </Box>
  );
};
