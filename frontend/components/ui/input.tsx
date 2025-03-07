import * as React from "react";

import { cn } from "@/lib/utils";
import { FormControl, FormField, FormItem, FormMessage } from "./form";
import { Label } from "./label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

const FormInput = (props: {
  [x: string]: any;
  name: any;
  control: any;
  label: any;
}) => {
  const { name, control, label, ...rest } = props;
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <Label>{label}</Label>
          <FormControl>
            <Input {...field} {...rest} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { Input, FormInput };
