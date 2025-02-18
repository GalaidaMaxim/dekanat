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

export const useStatus = () => {
  return useSelector((state) => state.status.value);
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

export const useUserType = () => {
  return useSelector((state) => state.user.premissions);
};

export const useFacultet = () => {
  return useSelector((state) => state.facultet.value);
};

export const useRemoteType = () => {
  return useSelector((state) => state.remoteType.value);
};

export const useYear = () => {
  return useSelector((state) => state.year.value);
};
