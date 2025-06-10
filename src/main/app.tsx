import { ToastContainer } from "react-toastify";
import { AppRoute } from "./app.route";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/presentation/components/ui/theme-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./config/tanstack.config";
import { Toaster } from "@/presentation/components/ui/sonner";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <AppRoute />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <ToastContainer position="bottom-center" theme="colored" />
        <Toaster />
      </ThemeProvider>
    </>
  );
}

export default App;
