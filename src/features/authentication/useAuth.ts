import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/authApi";

export function useAuth() {
  return useMutation({
    mutationFn: login,
  });
}
