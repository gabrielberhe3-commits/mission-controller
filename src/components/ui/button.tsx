import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-[rgba(200,163,106,0.3)] bg-[rgba(200,163,106,0.14)] text-[#f4e1bf] hover:bg-[rgba(200,163,106,0.2)]",
  secondary:
    "border border-white/12 bg-white/[0.04] text-[#dbe5ee] hover:bg-white/[0.08]",
  ghost: "border border-transparent text-[#c5cfdb] hover:border-white/8 hover:bg-white/[0.04] hover:text-white",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em]",
  md: "px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em]",
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
      className={`inline-flex items-center justify-center rounded-xl ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
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
      className={`inline-flex items-center justify-center rounded-xl ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
