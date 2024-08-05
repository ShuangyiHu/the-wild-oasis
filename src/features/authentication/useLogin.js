import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      //save user data to cache
      queryClient.setQueryData(["user"], user.user);
      navigate("/", { replace: true });
      console.log("user from useLogin", user);
    },
    onError: (err) => {
      console.log("ERROR❗️", err);
      toast.error("Email or password provided are incorrect.");
    },
  });
  return { login, isLoading };
}
