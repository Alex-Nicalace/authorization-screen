import clsx from "clsx";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

interface NativeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: never;
}

interface NativeLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

type Mode = "primary" | "default" | "dashed" | "text" | "link";

interface CommonProps {
  mode?: Mode;
}

type ButtonProps = (NativeButtonProps | NativeLinkProps) & CommonProps;

const BASE = clsx(
  "inline-block cursor-pointer rounded-md px-3.75 py-1.75 text-base/normal outline-0 transition-colors disabled:cursor-not-allowed",
);

const STYLES: Record<Mode, string> = {
  primary: clsx(
    BASE,
    "border border-primary bg-primary text-white shadow-button shadow-primary-shadow",
    "hover:border-primary-light hover:bg-primary-light",
    "active:border-primary-dark active:bg-primary-dark",
    "focus-visible:border-primary-light focus-visible:bg-primary-light",
    "disabled:border-gray-light disabled:bg-black-opacity-4 disabled:text-black-opacity-25 disabled:shadow-none",
  ),
  default: clsx(
    BASE,
    "border border-gray-light text-black-opacity-88 shadow-button",
    "hover:border-primary-light hover:text-primary-light",
    "active:border-primary-dark active:text-primary-dark",
    "focus-visible:border-primary-light focus-visible:text-primary-light",
    "disabled:border-gray-light disabled:bg-black-opacity-4 disabled:text-black-opacity-25 disabled:shadow-none",
  ),
  text: clsx(
    BASE,
    "text-black-opacity-88",
    "hover:not-disabled:bg-black-opacity-6",
    "active:not-disabled:bg-black-opacity-15",
    "focus-visible:bg-black-opacity-6",
    "disabled:text-black-opacity-25",
  ),
  link: clsx(
    BASE,
    "text-primary",
    "hover:text-primary-light",
    "active:text-primary-dark",
    "focus-visible:text-primary-light",
    "disabled:text-black-opacity-25",
  ),
  dashed: clsx(
    BASE,
    "border border-dashed border-gray-light text-black-opacity-88 shadow-button",
    "hover:border-primary-light hover:text-primary-light",
    "active:border-primary-dark active:text-primary-dark",
    "focus-visible:border-primary-light focus-visible:text-primary-light",
    "disabled:border-gray-light disabled:bg-black-opacity-4 disabled:text-black-opacity-25",
  ),
};

export default function Button({
  className,
  mode = "default",
  ...props
}: ButtonProps) {
  const styles = clsx(STYLES[mode], className);

  if (props.href !== undefined) {
    return <a {...props} className={styles} />;
  }

  return <button {...props} className={styles} />;
}
