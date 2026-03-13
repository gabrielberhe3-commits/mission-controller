import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-[rgba(178,144,97,0.3)] bg-[rgba(178,144,97,0.12)] text-[#efd8b0] hover:bg-[rgba(178,144,97,0.18)]",
  secondary:
    "border border-white/10 bg-white/[0.04] text-[#d6dee7] hover:bg-white/[0.07]",
  ghost:
    "border border-transparent bg-transparent text-[#b9c4cf] hover:border-white/8 hover:bg-white/[0.04] hover:text-white",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em]",
  md: "px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em]",
};

type SharedProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

export function Button({
  children,
  variant = "secondary",
  size = "md",
  className = "",
  ...props
}: SharedProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-[12px] ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  href,
  variant = "secondary",
  size = "md",
  className = "",
}: SharedProps & { href: string }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-[12px] ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
