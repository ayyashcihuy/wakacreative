"use client";

interface HeroButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "solid" | "ghost";
  className?: string;
}

export default function HeroButton({
  label,
  onClick,
  variant = "solid",
  className = "",
}: HeroButtonProps) {
  const base =
    "px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider cursor-pointer transition-all duration-200 select-none";

  const styles =
    variant === "solid"
      ? "bg-accent text-accent-foreground hover:brightness-110 active:scale-95"
      : "border border-foreground/30 text-foreground hover:border-foreground/70 active:scale-95";

  return (
    <button onClick={onClick} className={`${base} ${styles} ${className}`}>
      {label}
    </button>
  );
}
