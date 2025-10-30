import clsx from "clsx";
import type { InputHTMLAttributes } from "react";
import SuccessIcon from "../../assets/icons/check-circle-filled.svg";
import ErrorIcon from "../../assets/icons/close-circle-filled.svg";
import WarningIcon from "../../assets/icons/exclamation-circle-filled.svg";
import type { Size } from "../../types";

type Status = "default" | "error" | "warning" | "success";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  startAdornment?: React.ReactNode;
  dimension?: Size;
  status?: Status;
}

type Component = "wrap" | "input" | "icon";

const STYLES_BASE: Record<Component, string> = {
  wrap: clsx(
    "flex items-center gap-1 rounded-lg border transition-colors",
    "has-[input:disabled]:border-gray-light has-[input:disabled]:bg-black-opacity-4",
  ),
  input: clsx(
    "flex-1 text-black/88 outline-0 placeholder:text-black-opacity-25",
    "disabled:cursor-not-allowed",
  ),
  icon: clsx("transition-colors [&>svg]:h-full [&>svg]:w-full"),
};

const STYLES_STATUS: Record<Status, Partial<Record<Component, string>>> = {
  default: {
    wrap: clsx(
      "border-gray-light",
      "hover:not-focus-within:not-[:has(input:disabled)]:border-primary-light",
      "focus-within:border-primary-dark focus-within:shadow-[0_0_0_2px_rgba(5,145,255,0.1)]",
    ),
    icon: clsx("text-black-opacity-45"),
  },
  error: {
    wrap: clsx(
      "border-error text-error",
      "hover:not-focus-within:not-[:has(input:disabled)]:border-error-light hover:not-focus-within:not-[:has(input:disabled)]:[&>input+*]:text-error-light",
      "focus-within:shadow-[0_0_0_2px_rgba(255,38,6,0.06)]",
    ),
  },
  warning: {
    wrap: clsx(
      "border-warning text-warning",
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

const STYLES_SIZE: Record<Size, Record<Component, string>> = {
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

export default function Input({
  className,
  startAdornment,
  dimension = "default",
  status = "default",
  ...props
}: InputProps) {
  return (
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
      {status !== "default" && (
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
  );
}
