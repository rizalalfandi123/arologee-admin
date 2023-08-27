import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utlis";

const badgeVariants = cva("rounded-full px-3 py-[6px] w-fit", {
  variants: {
    color: {
      success: "border border-success bg-[#1D5E2E]",
      warning: "border border-warning bg-[#89530A]",
      error: "border border-primary bg-[#A5170F]",
    },
  },
  defaultVariants: {
    color: "success",
  },
});

export interface BadgeProps
  extends Omit<React.ComponentProps<"div">, "color">,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, color, asChild = false, ...buttonProps }, ref) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        {...buttonProps}
        className={cn(badgeVariants({ className, color }))}
        ref={ref}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
