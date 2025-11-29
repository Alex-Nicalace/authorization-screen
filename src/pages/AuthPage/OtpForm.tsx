import clsx from "clsx";
import Logo from "../../components/Logo";
import Title from "../../components/ui/Title";
import OtpInput from "../../components/ui/OtpInput";
import Button from "../../components/ui/Button";

// type OtpFormProps = { }
export default function OtpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form
      className={clsx("flex flex-col gap-6 rounded-md bg-white p-8", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-1 text-center text-pretty">
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
