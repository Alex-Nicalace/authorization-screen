import clsx from "clsx";
import SuccessIcon from "../../assets/icons/check-circle-filled.svg";
import ErrorIcon from "../../assets/icons/close-circle-filled.svg";
import WarningIcon from "../../assets/icons/exclamation-circle-filled.svg";
import type { Size, Status } from "../../types";

interface InputProps extends React.ComponentPropsWithRef<"input"> {
  startAdornment?: React.ReactNode;
  dimension?: Size;
  status?: Status;
  isStatusIcon?: boolean;
  helperText?: string;
}

type Component = "wrap" | "input" | "icon" | "root" | "helperText";

const STYLES_BASE: Partial<Record<Component, string>> = {
  wrap: clsx(
    "flex items-center gap-1 rounded-lg border transition-colors",
    "has-[input:disabled]:border-gray-light has-[input:disabled]:bg-black-opacity-4",
  ),
  input: clsx(
    "flex-1 text-black/88 outline-0 placeholder:text-black-opacity-25",
    "disabled:cursor-not-allowed",
  ),
  icon: clsx("transition-colors [&>svg]:h-full [&>svg]:w-full"),
  helperText: clsx("mx-4 mt-0.5 text-xs"),
};

const STYLES_STATUS: Record<Status, Partial<Record<Component, string>>> = {
  default: {
    root: clsx(""),
    wrap: clsx(
      "border-gray-light",
      "hover:not-focus-within:not-[:has(input:disabled)]:border-primary-light",
      "focus-within:border-primary-dark focus-within:shadow-[0_0_0_2px_rgba(5,145,255,0.1)]",
    ),
    icon: clsx("text-black-opacity-45"),
  },
  error: {
    root: clsx("text-error"),
    wrap: clsx(
      "border-error",
      "hover:not-focus-within:not-[:has(input:disabled)]:border-error-light hover:not-focus-within:not-[:has(input:disabled)]:[&>input+*]:text-error-light",
      "focus-within:shadow-[0_0_0_2px_rgba(255,38,6,0.06)]",
    ),
  },
  warning: {
    root: clsx("text-warning"),
    wrap: clsx(
      "border-warning",
      "hover:not-focus-within:not-[:has(input:disabled)]:border-warning-light hover:not-focus-within:not-[:has(input:disabled)]:[&>input+*]:text-warning-light",
      "focus-within:shadow-[0_0_0_2px_rgba(255,215,5,0.1)]",
    ),
  },
  success: {
    wrap: clsx(
      "border-gray-light text-success",
      "hover:not-focus-within:not-[:has(input:disabled)]:border-primary-light",
      "focus-within:border-primary-dark focus-within:shadow-[0_0_0_2px_rgba(5,145,255,0.1)]",
    ),
    icon: clsx(""),
  },
};

const STYLES_SIZE: Record<Size, Partial<Record<Component, string>>> = {
  small: {
    wrap: clsx("px-1.75"),
    input: clsx("text-sm/6"),
    icon: clsx("h-3.5 w-3.5"),
  },
  default: {
    wrap: clsx("px-2.75 py-0.75"),
    input: clsx("text-sm/6"),
    icon: clsx("h-3.5 w-3.5"),
  },
  large: {
    wrap: clsx("px-2.75 py-1.75"),
    input: clsx("text-base/normal"),
    icon: clsx("h-4 w-4"),
  },
};

function handleClickWrapper(e: React.MouseEvent<HTMLDivElement>) {
  e.currentTarget.querySelector("input")?.focus();
}

export default function Input({
  className,
  startAdornment,
  dimension = "default",
  status = "default",
  isStatusIcon = true,
  helperText,
  ...props
}: InputProps) {
  return (
    <div
      className={clsx(STYLES_STATUS[status].root)}
      onClick={handleClickWrapper}
    >
      <div
        className={clsx(
          STYLES_BASE.wrap,
          STYLES_SIZE[dimension].wrap,
          STYLES_STATUS[status].wrap,
          className,
        )}
      >
        {startAdornment && (
          <div
            className={clsx(
              STYLES_BASE.icon,
              STYLES_SIZE[dimension].icon,
              STYLES_STATUS[status].icon,
            )}
            aria-hidden="true"
          >
            {startAdornment}
          </div>
        )}
        <input
          {...props}
          className={clsx(STYLES_BASE.input, STYLES_SIZE[dimension].input)}
        />
        {status !== "default" && isStatusIcon && (
          <div
            className={clsx(STYLES_BASE.icon, STYLES_SIZE[dimension].icon)}
            aria-hidden="true"
          >
            {status === "error" && <ErrorIcon />}
            {status === "warning" && <WarningIcon />}
            {status === "success" && <SuccessIcon />}
          </div>
        )}
      </div>
      {helperText !== undefined && (
        <p
          className={clsx(
            STYLES_BASE.helperText,
            STYLES_SIZE[dimension].helperText,
            STYLES_STATUS[status].helperText,
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
