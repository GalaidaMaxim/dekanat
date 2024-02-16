import { Box, Button, FormControl, TextField } from "@mui/material";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { enable, disable, show, enableAlertAction } from "../redux/slices";
import { useDispatch } from "react-redux";
import { MyAcordion } from "../componetns/Acordion";
import { StudentSubjectList } from "../componetns/StudentSubjectList";

export const EditStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({});
  const [subjects, setSubjects] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    window.mainApi
      .invokeMain("getStudentById", id)
      .then((result) => {
        dispatch(enable());
        setStudent(JSON.parse(result));
      })
      .finally(() => {
        dispatch(disable());
      });
  }, [id, dispatch]);

  useEffect(() => {
    if (!student.department || !student.educationPlan) {
      return;
    }
    window.mainApi
      .invokeMain("getSubjecByDepartment", {
        department: student.department,
        educationPlan: student.educationPlan,
      })
      .then((result) => {
        dispatch(enable());
        const allSubjects = JSON.parse(result);
        console.log(allSubjects);
        setSubjects(
          allSubjects.filter((item) =>
            student.subjects.every((sub) => sub._id !== item._id)
          )
        );
      })
      .finally(() => {
        dispatch(disable());
      });
  }, [student.department, student.educationPlan, student.subjects, dispatch]);

  const chageHandle = (field) => {
    return (event) => {
      setStudent((prev) => {
        const newStudent = JSON.parse(JSON.stringify(prev));
        newStudent[field] = event.target.value;
        return newStudent;
      });
    };
  };

  const onSubmit = (field) => {
    return async () => {
      window.mainApi
        .invokeMain("updateStudent", {
          id,
          info: {
            [field]: student[field],
          },
        })
        .then((result) => {
          dispatch(show({ title: "Студент оновлений" }));
          setStudent(JSON.parse(result));
        });
    };
  };

  const addSubject = (subject) => {
    return async () => {
      const arr = student.subjects;
      arr.push(subjects.find((item) => item._id === subject));
      window.mainApi
        .invokeMain("updateStudent", {
          id,
          info: {
            subjects: arr,
          },
        })
        .then((result) => {
          dispatch(show({ title: "Студент оновлений" }));
          setStudent(JSON.parse(result));
        });
    };
  };

  const removeSubject = (subjectId) => {
    return async () => {
      const arr = student.subjects.filter((item) => item._id !== subjectId);
      window.mainApi
        .invokeMain("updateStudent", {
          id,
          info: {
            subjects: arr,
          },
        })
        .then((result) => {
          dispatch(show({ title: "Студент оновлений" }));
          setStudent(JSON.parse(result));
        });
    };
  };

  const removeStudent = () => {
    window.mainApi
      .invokeMain("deleteStudent", {
        id,
      })
      .then((result) => {
        dispatch(show({ title: "Студент видалений" }));
        setStudent(JSON.parse(result));
        navigate("/students");
      });
  };

  return (
    <Box>
      <Button
        onClick={() =>
          navigate(`/students_info/${student._id}`, { state: location.state })
        }
      >
        Назад
      </Button>
      <Box>
        <h1>Редагування студента</h1>
        <Box>
          <Box display="flex" gap={3}>
            <FormControl>
              <TextField
                onBlur={onSubmit("sername")}
                value={student.sername}
                onChange={chageHandle("sername")}
              />
            </FormControl>
            <FormControl>
              <TextField
                value={student.name}
                onChange={chageHandle("name")}
                onBlur={onSubmit("name")}
              />
            </FormControl>
          </Box>
          <Box marginTop={2} marginBottom={10}>
            <FormControl>
              <TextField
                value={student.secondName}
                onChange={chageHandle("secondName")}
                onBlur={onSubmit("secondName")}
              />
            </FormControl>
          </Box>
        </Box>
        <Box display={"flex"} gap={20}>
          <Box>
            <p>відділення: </p>
            <h3>{student.department && student.department.name}</h3>
          </Box>
          <Box>
            <p>освітній ступінь: </p>
            <h3>{student.level}</h3>
          </Box>
          <Box>
            <p>курс: </p>
            <h3>{student.course}</h3>
          </Box>
        </Box>
      </Box>

      <Box borderTop={1}>
        <h2>Предмети</h2>
        <MyAcordion title={"Індивідульний план студента"}>
          <Box>
            <h3>Обов'язкові предмети</h3>
            <StudentSubjectList
              subjects={student.subjects}
              callback={(id) => {
                return () => {
                  dispatch(
                    enableAlertAction({
                      callback: removeSubject(id),
                      title: "Видалити обов'язковий предмет?",
                      discription:
                        "цей предмет є обов'язковим для вивчення в рамках навчального плану",
                    })
                  );
                };
              }}
              filterChar="1"
            />
          </Box>
          <Box>
            <h3>ЦИКЛ ФАХОВОЇ, ПРОФЕСІЙНОЇ ПІДГОТОВКИ ЗА ПРОФІЛІЗАЦІЄЮ </h3>
            <StudentSubjectList
              subjects={student.subjects}
              callback={(id) => {
                return () => {
                  dispatch(
                    enableAlertAction({
                      callback: removeSubject(id),
                      title: "Видалити предмет?",
                      discription:
                        "це спричинить врату даних про оцінювання за цим предметом",
                    })
                  );
                };
              }}
              filterChar="2"
            />
          </Box>
          <Box>
            <h3>
              ОСВІТНІ КОМПОНЕНТИ ЗА ВИБОРОМ ЗДОБУВАЧА ОСВІТИ ОТРИМАННЯ
              ВИБІРКОВОЇ ПРОФЕСІЙНОЇ КВАЛІФІКАЦІЇ
            </h3>
            <StudentSubjectList
              subjects={student.subjects}
              callback={(id) => {
                return () => {
                  dispatch(
                    enableAlertAction({
                      callback: removeSubject(id),
                      title: "Видалити предмет?",
                      discription:
                        "це спричинить врату даних про оцінювання за цим предметом",
                    })
                  );
                };
              }}
              filterChar="3"
            />
          </Box>
          <Box>
            <h3>
              ОСВІТНІ КОМПОНЕНТИ ЗА ВИБОРОМ ЗДОБУВАЧА ОСВІТИ КАТАЛОГ ВИБІРКОВИХ
              ДИСЦИПЛІН
            </h3>
            <StudentSubjectList
              subjects={student.subjects}
              callback={(id) => {
                return () => {
                  dispatch(
                    enableAlertAction({
                      callback: removeSubject(id),
                      title: "Видалити предмет?",
                      discription:
                        "це спричинить врату даних про оцінювання за цим предметом",
                    })
                  );
                };
              }}
              filterChar="4"
            />
          </Box>
        </MyAcordion>

        <MyAcordion title={"Предмети навчального плану"}>
          <Box>
            <h3>Обов'язкові предмети</h3>
            <StudentSubjectList
              subjects={subjects}
              callback={addSubject}
              filterChar="1"
              buttonText="додати"
            />
          </Box>
          <Box>
            <h3>ЦИКЛ ФАХОВОЇ, ПРОФЕСІЙНОЇ ПІДГОТОВКИ ЗА ПРОФІЛІЗАЦІЄЮ </h3>
            <StudentSubjectList
              subjects={subjects}
              callback={addSubject}
              filterChar="2"
              buttonText="додати"
            />
          </Box>
          <Box>
            <h3>
              ОСВІТНІ КОМПОНЕНТИ ЗА ВИБОРОМ ЗДОБУВАЧА ОСВІТИ ОТРИМАННЯ
              ВИБІРКОВОЇ ПРОФЕСІЙНОЇ КВАЛІФІКАЦІЇ
            </h3>
            <StudentSubjectList
              subjects={subjects}
              callback={addSubject}
              filterChar="3"
              buttonText="додати"
            />
          </Box>
          <Box>
            <h3>
              ОСВІТНІ КОМПОНЕНТИ ЗА ВИБОРОМ ЗДОБУВАЧА ОСВІТИ КАТАЛОГ ВИБІРКОВИХ
              ДИСЦИПЛІН
            </h3>
            <StudentSubjectList
              subjects={subjects}
              callback={addSubject}
              filterChar="4"
              buttonText="додати"
            />
          </Box>
        </MyAcordion>
      </Box>
      <Box marginTop={4}>
        <Button
          onClick={() => {
            dispatch(
              enableAlertAction({
                callback: removeStudent,
                title: "Видалити студента?",
                discription: "це може спричинити втрату корисних даних!",
              })
            );
          }}
          variant="outlined"
          color="error"
        >
          Видалити студента
        </Button>
      </Box>
    </Box>
  );
};
