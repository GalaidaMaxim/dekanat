import { useSelector } from "react-redux";

export const useLoading = () => {
  return useSelector((state) => state.loading.value);
};

export const useAlert = () => {
  return useSelector((state) => state.alert);
};

export const useAlertAction = () => {
  return useSelector((state) => state.alertAction);
};

export const useForeigner = () => {
  return useSelector((state) => state.foreigner.value);
};

export const useSemester = () => {
  return useSelector((state) => state.semester.value);
};

export const useCource = () => {
  return useSelector((state) => state.course.value);
};

export const useDBConnected = () => {
  return useSelector((state) => state.connection.dbConnected);
};

export const useUpdated = () => {
  return useSelector((state) => state.connection.updated);
};

export const useSetupReady = () => {
  return useSelector(
    (state) => state.connection.dbConnected && state.connection.updated
  );
};
