import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { LoadingPage } from "@presentation/components/loading-page/loading-page";

const UserList = lazy(() => import("./users/list/user-list").then(module => ({ default: module.default })));
const WaterUsersAssociation = lazy(() => import("./water-users-association/water-users-association").then(module => ({ default: module.default })));

export const AdministrationRoutes = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route path="/users" element={<UserList />} />
        <Route path="junta" element={<WaterUsersAssociation />} />
      </Routes>
    </Suspense>
  );
};
