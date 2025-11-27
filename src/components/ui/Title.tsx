import clsx from "clsx";
import { createElement } from "react";

type Level = 1 | 2 | 3 | 4 | 5 | 6;

const LEVELS: Record<Level, string> = {
  1: clsx("text-4xl"),
  2: clsx("text-3xl"),
  3: clsx("text-2xl leading-8"),
  4: clsx("text-xl"),
  5: clsx("text-lg"),
  6: clsx("text-base"),
};

interface TitleProps extends React.HtmlHTMLAttributes<HTMLHeadingElement> {
  level?: Level;
}
export default function Title({
  level = 1,
  children,
  className,
  ...props
}: TitleProps) {
  return createElement(
    `h${level}`,
    {
      ...props,
      className: clsx(
        LEVELS[level],
        "font-semibold text-black-opacity-88",
        className,
      ),
    },
    children,
  );
}
