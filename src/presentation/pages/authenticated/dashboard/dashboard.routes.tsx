import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Loading } from "@presentation/components/atoms/loading/loading";
import { RestaurantList } from "../restaurant/list/restaurant-list";
import { DashboardDefault } from "../dashboard-superuser/dashboard-default";
import UserList from "../users/list/user-list";
import MyRestaurant from "../my-restaurant/my-restaurant";
import { DashboardAdmin } from "../dashboard-admin/dashboard-admin";

const DashboardRoutes = () => (
  <Suspense fallback={<Loading />}>
    <Routes>
      <Route path="/" element={<DashboardDefault />} />
      <Route path="/restaurantes" element={<RestaurantList />} />
      <Route path="/usuarios" element={<UserList />} />
      <Route path="/mi-restaurante/*" element={<MyRestaurant />} />
      <Route path="/dashboard-admin" element={<DashboardAdmin />} />
    </Routes>
  </Suspense>
);

export default DashboardRoutes;
