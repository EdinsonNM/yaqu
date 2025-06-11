import { Loader } from "lucide-react";

export const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="animate-spin" />
    </div>
  );
};