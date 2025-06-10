import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Loading } from "@presentation/components/atoms/loading/loading";
import UserList from "./users/list/user-list";
import WaterUsersAssociation from "./water-users-association/water-users-association";

export const AdministrationRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/users" element={<UserList />} />
        <Route path="junta" element={<WaterUsersAssociation />} />
      </Routes>
    </Suspense>
  );
};
