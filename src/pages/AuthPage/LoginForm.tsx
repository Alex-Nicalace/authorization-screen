import clsx from "clsx";
import { useId, useState } from "react";
import { z } from "zod";
import LockIcon from "../../assets/icons/lock.svg";
import UserIcon from "../../assets/icons/user.svg";
import Logo from "../../components/Logo";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Title from "../../components/ui/Title";

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
  onSuccess?: () => void;
}
export default function LoginForm({
  className,
  onSuccess,
  ...props
}: LoginFormProps) {
  const id = useId();
  const [userFormData, setFormData] = useState<Partial<FormData>>({});
  const [showErrors, setShowErrors] = useState(false);

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

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validate();

    if (errors) {
      setShowErrors(true);
      return;
    }

    onSuccess?.();
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
          value={formData.email}
          onChange={(e) =>
            setFormData((l) => ({ ...l, email: e.target.value }))
          }
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
          value={formData.password}
          onChange={(e) =>
            setFormData((l) => ({ ...l, password: e.target.value }))
          }
          status={errors?.properties?.password && "error"}
          helperText={errors?.properties?.password?.errors.join(", ")}
        />
        <Button
          mode="primary"
          size="large"
          disabled={!isFilledForm || !!errors}
        >
          Log in
        </Button>
      </div>
    </form>
  );
}
