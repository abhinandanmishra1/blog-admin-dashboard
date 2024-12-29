import { getUser, login, registerUser } from "../api";
import { useMutation, useQuery } from "react-query";

import { useNavigate } from "react-router-dom";

export const useRegisterMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      navigate("/");
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useLoginMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      navigate("/");
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useGetUserQuery = () => {
  const token = localStorage.getItem("token");
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: !!token,
    retry: false,
  });
};
