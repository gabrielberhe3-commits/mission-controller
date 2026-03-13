import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[linear-gradient(135deg,#f4ddb4,#d59f61)] text-[#11151a] hover:brightness-105",
  secondary:
    "border border-white/12 bg-white/[0.04] text-[#dbe5ee] hover:bg-white/[0.08]",
  ghost: "text-[#d0b48b] hover:bg-[rgba(208,180,139,0.08)] hover:text-[#f2dfbf]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs font-semibold",
  md: "px-4 py-2 text-sm font-semibold",
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
      className={`rounded-full ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
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
      className={`inline-flex rounded-full ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
