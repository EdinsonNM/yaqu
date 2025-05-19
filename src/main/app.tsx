import { ToastContainer } from "react-toastify";
import { AppRoute } from "./app.route";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/presentation/components/ui/theme-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./config/tanstack.config";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <AppRoute />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <ToastContainer position="bottom-center" theme="colored" />
      </ThemeProvider>
    </>
  );
}

export default App;
