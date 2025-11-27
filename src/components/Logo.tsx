import clsx from "clsx";
import CompanyIcon from "../assets/icons/company.svg";
import LogoIcon from "../assets/icons/symbol.svg";

interface LogoProps extends React.ComponentProps<"div"> {
  className?: string;
}
export default function Logo({ className, ...props }: LogoProps) {
  return (
    <div className={clsx("flex gap-2", className)} {...props}>
      <LogoIcon className="fill-primary" />
      <CompanyIcon className="mt-2 fill-black-opacity-88" />
    </div>
  );
}
