import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-center text-sm font-black uppercase leading-tight transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        conversion:
          "bg-primary text-primary-foreground shadow-[0_8px_28px_var(--button-glow)] hover:-translate-y-0.5 hover:bg-primary/90",
        outline:
          "border border-border bg-secondary text-secondary-foreground hover:border-primary hover:text-primary",
      },
    },
    defaultVariants: { variant: "conversion" },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

function Button({ className, variant, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant }), className)} {...props} />;
}

export { Button, buttonVariants };