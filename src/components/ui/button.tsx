import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-transparent bg-[var(--button-primary-bg)] text-[var(--button-primary-text)] hover:bg-[var(--button-primary-hover)]",
  secondary:
    "border border-[var(--border)] bg-[var(--button-secondary-bg)] text-[var(--button-secondary-text)] hover:bg-[var(--button-secondary-hover)]",
  ghost:
    "border border-transparent bg-transparent text-[var(--button-ghost-text)] hover:border-[var(--border)] hover:bg-[var(--button-ghost-hover-bg)] hover:text-[var(--button-ghost-hover-text)]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-7 px-2.5 text-[10px] font-semibold uppercase tracking-[0.14em]",
  md: "h-9 px-3.5 text-[10px] font-semibold uppercase tracking-[0.14em]",
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
      className={`inline-flex items-center justify-center rounded-[9px] ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
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
      className={`inline-flex items-center justify-center rounded-[9px] ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
