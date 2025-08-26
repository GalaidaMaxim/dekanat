import {
  Box,
  Button,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { inwokeMain } from "../serivce/inwokeMain";
import { useState, useEffect, Fragment } from "react";
import { useDispatch } from "react-redux";
import { enable, disable } from "../redux/slices";
import { EducationPlanMember } from "../componetns/EducationPlanMember";

export const EducationPlan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const dispatch = useDispatch();
  const [departments, setDepartments] = useState([]);
  const [addSpec, setAddSpec] = useState([]);

  const onEdit = (item) => {
    navigate(`/plans/${item._id}`, {
      state: { from: location.pathname, plan: location.state.plan },
    });
  };

  const editSortValue = async (s1ID, s2ID) => {
    const subjectNew = await inwokeMain({
      command: "changeSubjectSortNumber",
      options: { s1ID, s2ID },
    });
    if (!subjectNew) {
      return;
    }

    setSubjects((prev) => {
      const arr = [
        ...prev.filter((item) => item._id !== s1ID && item._id !== s2ID),
      ];

      return [...arr, ...subjectNew].map((item) => {
        item.internalCode = item.internalCode || item.code;
        return item;
      });
    });
  };
  useEffect(() => {
    (async () => {
      dispatch(enable());
      try {
        let subjects = await inwokeMain({
          command: "getSubjectsByEducationPlan",
          options: { educationPlan: location.state.plan._id },
        });
        subjects = subjects.map((item) => {
          item.internalCode = item.internalCode || item.code;
          return item;
        });
        setSubjects(subjects);
        const addSpec = subjects
          .filter((sub) => sub.code.charAt(0) === "3")
          .reduce((prev, item) => {
            if (!prev.includes(item.aditionalSpecialityName)) {
              prev.push(item.aditionalSpecialityName);
            }
            return prev;
          }, []);

        setAddSpec(addSpec);

        let departments = await inwokeMain({ command: "getDeparments" });
        const lvl =
          location.state.plan.level === "магістр"
            ? "бакалавр"
            : location.state.plan.level;
        departments = departments.filter((item) => item.level === lvl);
        setDepartments(departments);
      } catch (err) {
        console.log(err);
      }
      dispatch(disable());
    })();
  }, [dispatch, location]);

  return (
    <Box>
      <Button
        onClick={() => {
          navigate("/educationPlan");
        }}
      >
        Назад
      </Button>
      <h1>{location.state.plan.name}</h1>
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Код</TableCell>
              <TableCell>Внутрішній</TableCell>
              <TableCell>Назва</TableCell>
              <TableCell>Кредити</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center" colSpan={5}>
                Перша категорія
              </TableCell>
            </TableRow>
            {subjects
              .filter((sub) => sub.code.charAt(0) === "1")
              .sort((a, b) => a.sortNumber - b.sortNumber)
              .map((item, index, arr) => (
                <EducationPlanMember
                  key={item._id}
                  item={item}
                  index={index}
                  arr={arr}
                  editSortValue={editSortValue}
                  onEdit={onEdit}
                />
              ))}
            <TableRow>
              <TableCell align="center" colSpan={5}>
                Профільні
              </TableCell>
            </TableRow>
            {departments.map((item) => (
              <Fragment key={item._id}>
                <TableRow>
                  <TableCell align="center" colSpan={5}>
                    {item.name}
                  </TableCell>
                </TableRow>
                {subjects
                  .filter(
                    (sub) =>
                      sub.code.charAt(0) === "2" && sub.department === item._id
                  )
                  .sort((a, b) => a.sortNumber - b.sortNumber)
                  .map((item, index, arr) => (
                    <EducationPlanMember
                      key={item._id}
                      item={item}
                      index={index}
                      arr={arr}
                      editSortValue={editSortValue}
                      onEdit={onEdit}
                    />
                  ))}
              </Fragment>
            ))}
            <TableRow>
              <TableCell align="center" colSpan={5}>
                Додаткові спеціалізації
              </TableCell>
            </TableRow>
            {addSpec.map((item) => (
              <Fragment key={item}>
                <TableRow>
                  <TableCell align="center" colSpan={5}>
                    {item}
                  </TableCell>
                </TableRow>
                {subjects
                  .filter(
                    (sub) =>
                      sub.code.charAt(0) === "3" &&
                      sub.aditionalSpecialityName === item
                  )
                  .sort((a, b) => a.sortNumber - b.sortNumber)
                  .map((item, index, arr) => (
                    <EducationPlanMember
                      key={item._id}
                      item={item}
                      index={index}
                      arr={arr}
                      editSortValue={editSortValue}
                      onEdit={onEdit}
                    />
                  ))}
              </Fragment>
            ))}
            <TableRow>
              <TableCell align="center" colSpan={5}>
                Вибіркові предмети
              </TableCell>
            </TableRow>
            {subjects
              .filter((sub) => sub.code.charAt(0) === "4")
              .sort((a, b) => a.sortNumber - b.sortNumber)
              .map((item, index, arr) => (
                <EducationPlanMember
                  key={item._id}
                  item={item}
                  index={index}
                  arr={arr}
                  editSortValue={editSortValue}
                  onEdit={onEdit}
                />
              ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};
