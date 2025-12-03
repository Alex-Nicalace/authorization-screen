import { useMutation } from "@tanstack/react-query";
import { regenerateOtp } from "../../api/authApi";

export function useRegenerateOtp() {
  return useMutation({
    mutationFn: regenerateOtp,
  });
}
