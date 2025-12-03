import { useState } from "react";
import { LoginForm, OtpForm } from "../features/authentication";
import type { OtpToken } from "../features/authentication/OtpForm";

type Step = "login" | "otp";

// interface AuthPageProps {}
export default function AuthPage(/*{ }: AuthPageProps*/) {
  const [step, setStep] = useState<Step>("login");
  const [otpToken, setOtpToken] = useState<OtpToken>({
    token: "",
    expiresAt: 0,
  });

  function handleSuccessLoginForm(otpToken: OtpToken) {
    setStep("otp");
    setOtpToken(otpToken);
  }

  function handleSuccessOtpForm() {
    console.log("logic continue");
  }

  return (
    <main className="page-container flex min-h-full items-center justify-center">
      {step === "login" && (
        <LoginForm className="max-w-110" onSuccess={handleSuccessLoginForm} />
      )}
      {step === "otp" && (
        <OtpForm
          otpToken={otpToken}
          className="max-w-110"
          onClickBack={() => setStep("login")}
          onSuccess={handleSuccessOtpForm}
        />
      )}
    </main>
  );
}
