import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Loading } from "@presentation/components/atoms/loading/loading";
import { RestaurantList } from "../restaurant/list/restaurant-list";
import { DashboardDefault } from "../dashboard-default/dashboard-default";

const DashboardRoutes = () => (
  <Suspense fallback={<Loading />}>
    <Routes>
      <Route path="/" element={<DashboardDefault />} />
      <Route path="/restaurantes" element={<RestaurantList />} />
    </Routes>
  </Suspense>
);

export default DashboardRoutes;
