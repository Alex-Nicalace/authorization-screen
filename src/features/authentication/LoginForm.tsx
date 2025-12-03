import clsx from "clsx";
import { useId, useState } from "react";
import { z } from "zod";
import { DEMO_OTP_VALID } from "../../api/authApi";
import LockIcon from "../../assets/icons/lock.svg";
import UserIcon from "../../assets/icons/user.svg";
import Logo from "../../components/Logo";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Title from "../../components/ui/Title";
import type { OtpToken } from "./OtpForm";
import { useAuth } from "./useAuth";

const initialFormState = {
  email: "",
  password: "",
};

const formDataSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof formDataSchema>;

interface LoginFormProps
  extends Omit<React.ComponentProps<"form">, "onSubmit"> {
  onSuccess?: (otpToken: OtpToken) => void;
}
export default function LoginForm({
  className,
  onSuccess,
  ...props
}: LoginFormProps) {
  const id = useId();
  const [userFormData, setFormData] = useState<Partial<FormData>>({});
  const [showErrors, setShowErrors] = useState(false);
  const {
    mutate: login,
    isPending: isLogging,
    isError,
    error,
    reset: resetError,
  } = useAuth();

  const formData = {
    ...initialFormState,
    ...userFormData,
  };

  const isFilledForm = Object.values(formData).every((val) => !!val);

  const validate = () => {
    const res = formDataSchema.safeParse(formData);
    if (res.success) {
      return undefined;
    }
    return z.treeifyError(res.error);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validate();

    if (errors) {
      setShowErrors(true);
      return;
    }

    login(formData, {
      onSuccess,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((l) => ({ ...l, [name]: value }));
    resetError();
  };

  const errors = showErrors ? validate() : undefined;

  return (
    <form
      className={clsx("flex flex-col gap-6 rounded-md bg-white p-8", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <Logo className="py-5" />
        <Title level={3}>Sign in to your account to continue</Title>
      </div>
      <div className="flex flex-col gap-4">
        <label className="sr-only" htmlFor={`email${id}`}>
          Input your email
        </label>
        <Input
          id={`email${id}`}
          type="email"
          placeholder="Email"
          startAdornment={<UserIcon />}
          dimension="large"
          name="email"
          value={formData.email}
          onChange={handleChange}
          status={errors?.properties?.email && "error"}
          helperText={errors?.properties?.email?.errors.join(", ")}
        />
        <label className="sr-only" htmlFor={`password${id}`}>
          Input your password
        </label>
        <Input
          id={`password${id}`}
          type="password"
          placeholder="Password"
          startAdornment={<LockIcon />}
          dimension="large"
          name="password"
          value={formData.password}
          onChange={handleChange}
          status={errors?.properties?.password && "error"}
          helperText={errors?.properties?.password?.errors.join(", ")}
        />
        {isError && (
          <p className="text-error">
            {`${error.message} `}
            <button
              type="button"
              className="cursor-pointer underline"
              onClick={() => {
                setFormData(DEMO_OTP_VALID);
                resetError();
              }}
            >
              correct data
            </button>
          </p>
        )}
        <Button
          mode="primary"
          size="large"
          disabled={!isFilledForm || !!errors || isLogging}
        >
          {isLogging ? "Processing..." : "Log in"}
        </Button>
      </div>
    </form>
  );
}
