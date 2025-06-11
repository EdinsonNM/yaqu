import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import WaterUsers from "./water-users/water-users";
import Parcels from "./parcels/parcels";
import { LoadingPage } from "@presentation/components/loading-page/loading-page";

export const PadronRoutes = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route path="usuarios" element={<WaterUsers />} />
        <Route path="predios" element={<Parcels />} />
      </Routes>
    </Suspense>
  );
};
