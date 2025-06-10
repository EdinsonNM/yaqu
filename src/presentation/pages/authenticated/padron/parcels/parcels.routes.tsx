import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Loading } from "@presentation/components/atoms/loading/loading";
import Parcels from "./parcels";

export const ParcelsRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Parcels />} />
      </Routes>
    </Suspense>
  );
};

export default ParcelsRoutes;
