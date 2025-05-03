export type BadgeProps = {
  variant?:
    | "gray"
    | "red"
    | "yellow"
    | "green"
    | "blue"
    | "indigo"
    | "purple"
    | "pink";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  children: React.ReactNode;
};

const variantClasses = {
  gray: "dark:bg-gray-800 bg-gray-50 text-gray-600 dark:text-gray-400 ring-gray-500/10",
  red: "dark:bg-gray-800 bg-red-50 text-red-700 ring-red-600/10",
  yellow:
    "dark:bg-gray-800 bg-yellow-50 text-yellow-800 dark:text-yellow-600 ring-yellow-600/20",
  green:
    "dark:bg-gray-800 bg-green-50 text-green-700 dark:text-secondary ring-green-600/20",
  blue: "dark:bg-gray-800 bg-blue-50 text-blue-700 ring-blue-700/10",
  indigo: "dark:bg-gray-800 bg-indigo-50 text-indigo-700 ring-indigo-700/10",
  purple: "dark:bg-gray-800 bg-purple-50 text-purple-700 ring-purple-700/10",
  pink: "dark:bg-gray-800 bg-pink-50 text-pink-700 ring-pink-700/10",
};

export default function Badge({
  variant = "gray",
  size = "xs",
  children,
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-${size} font-medium ring-1 ring-inset ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}
