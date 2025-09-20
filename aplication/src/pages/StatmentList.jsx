import {
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";
import { inwokeMain } from "../serivce/inwokeMain";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { enable, disable } from "../redux/slices";

export const StatmentList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(enable());
      const result = await inwokeMain({ command: "getStatmentsByParams" });
      console.log(result);

      dispatch(disable());
    })();
  }, []);
  return (
    <Box>
      <Button onClick={() => navigate("/documentCreation")}>Назад</Button>
      <h1>Відомості</h1>
    </Box>
  );
};
