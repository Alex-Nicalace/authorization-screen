import clsx from "clsx";
import type { InputHTMLAttributes } from "react";
import type { Size } from "../../types";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  startAdornment?: React.ReactNode;
  dimension?: Size;
}

type Component = "wrap" | "input" | "icon";

const STYLES_BASE: Record<Component, string> = {
  wrap: clsx(
    "flex items-center gap-1 rounded-lg border border-gray-light transition-colors",
    "hover:not-focus-within:not-[:has(input:disabled)]:border-primary-light",
    "focus-within:border-primary-dark",
    "has-[input:disabled]:bg-black-opacity-4",
  ),
  input: clsx(
    "flex-1 text-black/88 outline-0 placeholder:text-black-opacity-25",
    "disabled:cursor-not-allowed",
  ),
  icon: clsx("text-black-opacity-45 [&>svg]:h-full [&>svg]:w-full"),
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
  ...props
}: InputProps) {
  return (
    <div
      className={clsx(STYLES_BASE.wrap, STYLES_SIZE[dimension].wrap, className)}
    >
      {startAdornment && (
        <div
          className={clsx(STYLES_BASE.icon, STYLES_SIZE[dimension].icon)}
          aria-hidden="true"
        >
          {startAdornment}
        </div>
      )}
      <input
        {...props}
        className={clsx(STYLES_BASE.input, STYLES_SIZE[dimension].input)}
      />
    </div>
  );
}
