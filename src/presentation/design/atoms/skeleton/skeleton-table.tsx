export default function SkeletonTable() {
  return (
    <div className="flex flex-col gap-4 justify-center items-end w-full">
      <div className={`skeleton h-4 w-full`}></div>
      <div className={`skeleton h-4 w-full`}></div>
      <div className={`skeleton h-4 w-full`}></div>
      <div className={`skeleton h-4 w-full`}></div>
      <div className={`skeleton h-4 w-full`}></div>
      <div className={`skeleton h-4 w-full`}></div>
      <div className={`skeleton h-4 w-full`}></div>
      <div className={`skeleton h-4 w-full`}></div>
    </div>
  );
}
