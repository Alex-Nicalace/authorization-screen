import clsx from "clsx";
import { useRefs } from "../../hooks/useRefs";
import type { Status } from "../../types";
import Input from "./Input";

type Type = "number" | "text";

export interface OtpInputProps
  extends Omit<React.ComponentPropsWithRef<"div">, "onChange"> {
  length: number;
  type?: Type;
  status?: Status;
  disabled?: boolean;
  onChange?: (value: string) => void;
}
export default function OtpInput({
  length,
  className,
  type = "text",
  status = "default",
  disabled,
  onChange,
  ...props
}: OtpInputProps) {
  const [InputsRef, setInputsRef] = useRefs<HTMLInputElement>();

  const handleInput = (index: number) => () => {
    if (!InputsRef.current) return;

    let indexInput = index;
    let input = InputsRef.current.get(indexInput);
    const value = input?.value || "";

    for (let i = 0; i < value.length && indexInput < length; i++) {
      input = InputsRef.current?.get(indexInput);
      if (input) input.value = value[i];
      indexInput++;
    }

    if (input && input.value.length > 0) {
      const nextIndex = Math.min(indexInput, length - 1);
      const nextInput = InputsRef.current?.get(nextIndex);
      setFocus(nextInput);
    }

    if (onChange) {
      const total = [...InputsRef.current.values()].reduce(
        (acc, input) => acc + input.value,
        "",
      );
      onChange(total);
    }
  };

  const handleKeyDown =
    (index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      const currentInput = e.currentTarget;
      let step = 0;
      switch (e.key) {
        case "Backspace":
          if (currentInput.value.length > 0) return;
          step = -1;
          break;

        case "ArrowLeft":
          step = -1;
          break;

        case "ArrowRight":
          step = 1;
          break;

        default:
          return;
      }
      const nextIndex = Math.min(Math.max(index + step, 0), length - 1);
      const nextInput = InputsRef.current?.get(nextIndex);
      setFocus(nextInput);
    };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const input = e.currentTarget;
    setFocus(input);
  };

  const handleClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const input = e.currentTarget;
    setFocus(input);
  };

  return (
    <div
      {...props}
      className={clsx(className, "inline-flex gap-x-3 font-semibold")}
    >
      {Array.from({ length }).map((_, index) => (
        <Input
          className="[&]:px-1.5 [&]:py-3.5 [&>input]:text-center [&>input]:text-2xl/[133%]"
          key={index}
          type={type}
          inputMode={type === "text" ? "text" : "numeric"}
          size={1}
          ref={setInputsRef(index)}
          status={status}
          isStatusIcon={false}
          disabled={disabled}
          onInput={handleInput(index)}
          onKeyDown={handleKeyDown(index)}
          onFocus={handleFocus}
          onClick={handleClick}
        />
      ))}
    </div>
  );
}

function setFocus(input: HTMLInputElement | null | undefined) {
  if (input) {
    input.focus();
    setTimeout(() => input.select(), 0);
  }
}
