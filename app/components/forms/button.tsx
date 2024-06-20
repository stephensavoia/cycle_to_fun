import { forwardRef } from "react";

export let Button = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      className="btn btn-primary btn-account w-full"
    />
  );
});
