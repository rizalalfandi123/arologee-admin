import React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utlis";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, suffixIcon, type, prefixIcon, ...inputProps }, ref) => {
    return (
      <div className="relative">
        {prefixIcon && (
          <Slot className="absolute top-[10px] left-2 w-5 h-5 text-placeholder">
            {prefixIcon}
          </Slot>
        )}

        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-[#48484A] bg-[#2C2C2E] px-3 py-2 text-sm ring-offset-white placeholder:text-placeholder",
            "focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:outline-none",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "autofill:bg-[#2C2C2E!important]",
            { "pl-10": prefixIcon },
            { "pr-10": prefixIcon },
            className
          )}
          ref={ref}
          {...inputProps}
        />

        {suffixIcon && (
          <Slot className="absolute top-[8px] right-3 w-5 h-5 text-placeholder">
            {suffixIcon}
          </Slot>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
