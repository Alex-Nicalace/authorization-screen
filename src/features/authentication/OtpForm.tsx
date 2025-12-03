import clsx from "clsx";
import { useEffect, useState } from "react";
import ArrowLeftIcon from "../../assets/icons/arrow-left-outlined.svg";
import Logo from "../../components/Logo";
import Button from "../../components/ui/Button";
import OtpInput from "../../components/ui/OtpInput";
import Title from "../../components/ui/Title";
import { useVerifyOtp } from "./useVerifyOtp";
import { useRegenerateOtp } from "./useRegenerateOtp";

type StepState = "typing" | "expired" | "valid" | "invalid";

export interface OtpToken {
  token: string;
  expiresAt: number;
}

const OTP_LENGTH = 6;

interface OtpFormProps extends Omit<React.ComponentProps<"form">, "onSubmit"> {
  otpToken: OtpToken;
  onSuccess?: () => void;
  onClickBack?: () => void;
}

export default function OtpForm({
  className,
  otpToken,
  onClickBack,
  onSuccess,
  ...props
}: OtpFormProps) {
  const [otp, setOtp] = useState("");
  const [stepState, setStepState] = useState<StepState>("typing");
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(otpToken.expiresAt));
  const { mutate: verifyOtp, isPending: isVerifying } = useVerifyOtp();
  const { mutateAsync: regenerateOtp, isPending: isRegenerating } =
    useRegenerateOtp();
  const { token } = otpToken;

  // запускаем демо-таймер для истечения кода
  useEffect(() => {
    let timer = 0;
    if (["typing", "invalid"].includes(stepState) && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    }

    return () => clearTimeout(timer);
  }, [timeLeft, stepState]);

  async function handleGetNewOtp() {
    const { expiresAt = 0 } = await regenerateOtp(token);
    setOtp("");
    setTimeLeft(getTimeLeft(expiresAt));
    setStepState("typing");
  }

  function handleOtpChange(value: string) {
    setOtp(value);
    if (value.length === OTP_LENGTH) {
      const code = Number(value);
      verifyOtp(
        { code, token },
        {
          onSuccess: (data) => {
            setStepState(data.success ? "valid" : data.reason || "typing");
          },
        },
      );
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
        {stepState !== "valid" && (
          <div className="absolute top-0 right-0">{timeLeft}</div>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <OtpInput
            length={OTP_LENGTH}
            value={otp}
            onChange={handleOtpChange}
            disabled={isVerifying || isRegenerating}
            status={
              stepState === "invalid" && otp.length === OTP_LENGTH
                ? "error"
                : "default"
            }
          />
          {stepState === "invalid" && (
            <p className="mt-1 text-sm leading-[1.5] text-error">
              Invalid code
            </p>
          )}
        </div>
        {stepState === "expired" && (
          <Button
            type="button"
            mode="primary"
            size="large"
            onClick={handleGetNewOtp}
            disabled={isRegenerating}
          >
            {isRegenerating ? "Processing..." : "Get new"}
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

function getTimeLeft(deadline: number) {
  return Math.floor((deadline - Date.now()) / 1000);
}
