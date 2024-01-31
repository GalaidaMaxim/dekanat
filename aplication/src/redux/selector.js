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
