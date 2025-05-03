type Props = {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};
const sizes = {
  xs: "w-4",
  sm: "w-4 md:w-6",
  md: "w-6 md:w-10",
  lg: "w-12",
  xl: "w-10 md:w-16",
};
export default function SkeletonChart({ size = "md" }: Props) {
  return (
    <div className="flex flex-row gap-4 justify-center items-end w-full">
      <div className={`skeleton h-10 ${sizes[size]}`}></div>
      <div className={`skeleton h-32 ${sizes[size]}`}></div>
      <div className={`skeleton h-40 ${sizes[size]}`}></div>
      <div className={`skeleton h-20 ${sizes[size]}`}></div>
      <div className={`skeleton h-56 ${sizes[size]}`}></div>
      <div className={`skeleton h-40 ${sizes[size]}`}></div>
      <div className={`skeleton h-20 ${sizes[size]}`}></div>
      <div className={`skeleton h-40 ${sizes[size]}`}></div>
      <div className={`skeleton h-20 ${sizes[size]}`}></div>
      <div className={`skeleton h-10 ${sizes[size]}`}></div>
    </div>
  );
}
