import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Loading } from "@presentation/components/atoms/loading/loading";
import WaterUsers from "./water-users/water-users";
import Parcels from "./parcels/parcels";

export const PadronRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="usuarios" element={<WaterUsers />} />
        <Route path="predios" element={<Parcels />} />
      </Routes>
    </Suspense>
  );
};
