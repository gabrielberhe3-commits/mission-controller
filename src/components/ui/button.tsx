import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "border border-white/14 bg-white text-black hover:bg-[#d8d8d8]",
  secondary: "border border-white/10 bg-[#111] text-white hover:bg-[#171717]",
  ghost:
    "border border-transparent bg-transparent text-[#929292] hover:border-white/8 hover:bg-[#101010] hover:text-white",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-[10px] font-semibold uppercase tracking-[0.16em]",
  md: "h-10 px-4 text-[11px] font-semibold uppercase tracking-[0.16em]",
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
      className={`inline-flex items-center justify-center rounded-[10px] ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
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
      className={`inline-flex items-center justify-center rounded-[10px] ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
