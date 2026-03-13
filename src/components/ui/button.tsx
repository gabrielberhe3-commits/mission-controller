import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-white/12 bg-[#141414] text-white hover:bg-[#1a1a1a]",
  secondary:
    "border border-white/8 bg-[#0c0c0c] text-[#d8d8d8] hover:bg-[#121212]",
  ghost:
    "border border-transparent bg-transparent text-[#9f9f9f] hover:border-white/8 hover:bg-[#111] hover:text-white",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em]",
  md: "px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em]",
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
