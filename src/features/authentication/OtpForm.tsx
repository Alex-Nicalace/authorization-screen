import clsx from "clsx";
import { useEffect, useState } from "react";
import ArrowLeftIcon from "../../assets/icons/arrow-left-outlined.svg";
import Logo from "../../components/Logo";
import Button from "../../components/ui/Button";
import OtpInput from "../../components/ui/OtpInput";
import Title from "../../components/ui/Title";

type StepState = "typing" | "expired" | "valid";

const EXPIRE_TIME = 30; // секунд для демо таймера
const DEMO_CORRECT_OTP = "123456"; // мок-правильный код для demo flow

interface OtpFormProps extends Omit<React.ComponentProps<"form">, "onSubmit"> {
  onSuccess?: () => void;
  onClickBack?: () => void;
}

export default function OtpForm({
  className,
  onClickBack,
  onSuccess,
  ...props
}: OtpFormProps) {
  const [otp, setOtp] = useState("");
  const [stepState, setStepState] = useState<StepState>("typing");
  const [timeLeft, setTimeLeft] = useState(EXPIRE_TIME);

  // запускаем демо-таймер для истечения кода
  useEffect(() => {
    if (timeLeft <= 0 && stepState === "typing") {
      setStepState("expired");
      return;
    }

    let timer = 0;
    if (stepState === "typing") {
      timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    }

    return () => clearTimeout(timer);
  }, [timeLeft, stepState]);

  function handleGetNewOtp() {
    setStepState("typing");
    setOtp("");
    setTimeLeft(EXPIRE_TIME);
  }

  function handleOtpChange(value: string) {
    setOtp(value);
    if (stepState === "typing" && value === DEMO_CORRECT_OTP) {
      setStepState("valid");
    }
  }

  return (
    <form
      className={clsx("flex flex-col gap-6 rounded-md bg-white p-8", className)}
      {...props}
    >
      <div className="relative flex flex-col items-center gap-1 text-center text-pretty">
        <Button
          type="button"
          className="absolute top-0 left-0"
          onClick={onClickBack}
          mode="text"
        >
          <ArrowLeftIcon />
        </Button>
        <Logo className="py-5" />
        <Title level={3}>Two-Factor Authentication</Title>
        <p>Enter the 6-digit code from the Google Authenticator app</p>
        {stepState === "typing" && (
          <div className="absolute top-0 right-0">{timeLeft}</div>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <OtpInput length={6} value={otp} onChange={handleOtpChange} />
        {stepState === "expired" && (
          <Button
            type="button"
            mode="primary"
            size="large"
            onClick={handleGetNewOtp}
          >
            Get new
          </Button>
        )}
        {stepState === "valid" && (
          <Button type="button" mode="primary" size="large" onClick={onSuccess}>
            Continue
          </Button>
        )}
      </div>
    </form>
  );
}
