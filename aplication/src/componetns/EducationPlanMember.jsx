import { TableCell, TableRow, IconButton } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

export const EducationPlanMember = ({
  item,
  arr,
  index,
  editSortValue,
  onEdit,
}) => {
  return (
    <TableRow key={item._id}>
      <TableCell width={"50px"}>{item.code}</TableCell>
      <TableCell width={"50px"}>{item.internalCode}</TableCell>
      <TableCell width={"400px"}>{item.name}</TableCell>
      <TableCell>{item.credits}</TableCell>
      <TableCell>
        <IconButton
          disabled={index === 0}
          onClick={() => editSortValue(item._id, arr[index - 1]._id)}
        >
          <KeyboardArrowUpIcon />
        </IconButton>
        <IconButton
          disabled={index + 1 === arr.length}
          onClick={() => editSortValue(item._id, arr[index + 1]._id)}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
        <IconButton onClick={() => onEdit(item)} color="primary">
          <ModeEditOutlineIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
