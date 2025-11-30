import clsx from "clsx";
import ArrowLeftIcon from "../../assets/icons/arrow-left-outlined.svg";
import Logo from "../../components/Logo";
import Button from "../../components/ui/Button";
import OtpInput from "../../components/ui/OtpInput";
import Title from "../../components/ui/Title";

interface OtpFormProps extends Omit<React.ComponentProps<"form">, "onSubmit"> {
  onSuccess?: () => void;
  onClickBack?: () => void;
}

export default function OtpForm({
  className,
  onClickBack,
  ...props
}: OtpFormProps) {
  return (
    <form
      className={clsx("flex flex-col gap-6 rounded-md bg-white p-8", className)}
      {...props}
    >
      <div className="relative flex flex-col items-center gap-1 text-center text-pretty">
        <Button
          className="absolute top-0 left-0"
          onClick={onClickBack}
          mode="text"
        >
          <ArrowLeftIcon />
        </Button>
        <Logo className="py-5" />
        <Title level={3}>Two-Factor Authentication</Title>
        <p>Enter the 6-digit code from the Google Authenticator app</p>
      </div>
      <div className="flex flex-col gap-4">
        <OtpInput length={6} />
        <Button mode="primary" size="large">
          Get new
        </Button>
      </div>
    </form>
  );
}
