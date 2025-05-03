export default function Loading() {
  return (
    <div className="fixed top-0 z-20 flex flex-col justify-center items-center h-full w-full bg-black bg-opacity-50">
      <span className="loading loading-infinity loading-lg"></span>
    </div>
  );
}
