import { forwardRef, useId } from "react";

export let Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return <input {...props} ref={ref} />;
});

export let Label = forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>((props, ref) => {
  return (
    <label
      {...props}
      ref={ref}
      className="input input-bordered flex items-center gap-2"
    />
  );
});

export let LabeledInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    label: React.ReactNode;
    id?: string;
  }
>(({ id, label, ...props }, ref) => {
  let uid = useId();
  id = id ?? uid;
  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <div className="mt-2">
        <Input {...props} ref={ref} id={id} />
      </div>
    </>
  );
});
