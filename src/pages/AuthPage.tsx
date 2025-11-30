import { useState } from "react";
import { LoginForm, OtpForm } from "../features/authentication";

type Step = "login" | "otp";

// interface AuthPageProps {}
export default function AuthPage(/*{ }: AuthPageProps*/) {
  const [step, setStep] = useState<Step>("login");

  const handleSuccessLoginForm = () => {
    console.log("otp");

    setStep("otp");
  };

  return (
    <main className="page-container flex min-h-full items-center justify-center">
      {step === "login" && (
        <LoginForm className="max-w-110" onSuccess={handleSuccessLoginForm} />
      )}
      {step === "otp" && (
        <OtpForm className="max-w-110" onClickBack={() => setStep("login")} />
      )}
    </main>
  );
}
