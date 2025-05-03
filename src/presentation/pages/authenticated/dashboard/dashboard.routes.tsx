import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Loading } from "@presentation/components/atoms/loading/loading";

const DashboardRoutes = () => (
  <Suspense fallback={<Loading />}>
    <Routes>
      <Route path="/" element={<div>Bienvenido al Dashboard</div>} />
    </Routes>
  </Suspense>
);

export default DashboardRoutes;
