import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Loading } from "@presentation/components/atoms/loading/loading";
import { ChartAreaInteractive } from "./components/chart-area-interactive";
import { PadronRoutes } from "../padron/padron.routes";
import { AdministrationRoutes } from "../administration/administration.routes";

const DashboardRoutes = () => (
  <Suspense fallback={<Loading />}>
    <Routes>
      <Route path="/" element={<ChartAreaInteractive />} />
      <Route path="/administration/*" element={<AdministrationRoutes />} />
      <Route path="/padron/*" element={<PadronRoutes />} />
    </Routes>
  </Suspense>
);

export default DashboardRoutes;
