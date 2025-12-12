import clsx from "clsx";

type Variant = "primary" | "secondary" | "destructive";
type Size = "small" | "medium" | "large";
type Appearance = "solid" | "text";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  appearance?: Appearance;
}

const base =
  "inline-flex items-center justify-center rounded-md font-medium transition focus:outline-none";

const disabledStyles = "opacity-50 cursor-not-allowed";

const solidStyles: Record<Variant, string> = {
  primary: "bg-yellow-500 hover:bg-yellow-600",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  destructive: "bg-red-500 text-white hover:bg-red-600",
};

const textStyles: Record<Variant, string> = {
  primary: "text-yellow-500 hover:text-blue-800 ",
  secondary: "text-gray-600 hover:text-gray-800 ",
  destructive: "text-red-600 hover:text-red-800 ",
};

const sizes = {
  small: "px-2.5 py-1.5 text-sm",
  medium: "px-4 py-2 text-sm",
  large: "px-5 py-3 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "medium",
  appearance = "solid",
  className,
  disabled = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        base,
        appearance === "solid" ? solidStyles[variant] : textStyles[variant],
        sizes[size],
        !disabled && "cursor-pointer",
        disabled && disabledStyles,
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
