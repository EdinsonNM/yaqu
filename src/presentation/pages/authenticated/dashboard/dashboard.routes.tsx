import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { LoadingPage } from "@presentation/components/loading-page/loading-page";

const ChartAreaInteractive = lazy(() => import("./components/chart-area-interactive").then(module => ({ default: module.ChartAreaInteractive })));
const PadronRoutes = lazy(() => import("../padron/padron.routes").then(module => ({ default: module.PadronRoutes })));
const AdministrationRoutes = lazy(() => import("../administration/administration.routes").then(module => ({ default: module.AdministrationRoutes })));

const DashboardRoutes = () => (
  <Suspense fallback={<LoadingPage />}>
    <Routes>
      <Route path="/" element={<ChartAreaInteractive />} />
      <Route path="/administration/*" element={<AdministrationRoutes />} />
      <Route path="/padron/*" element={<PadronRoutes />} />
    </Routes>
  </Suspense>
);

export default DashboardRoutes;
