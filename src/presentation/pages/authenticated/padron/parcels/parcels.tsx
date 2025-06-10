import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@presentation/components/ui/tabs";
import ParcelsList from "./list/parcels-list";

const Parcels = () => {
  const [activeTab, setActiveTab] = useState("parcels");

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Gestión de Predios</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="parcels">Listado de Predios</TabsTrigger>
          <TabsTrigger value="directors">Directivos</TabsTrigger>
          <TabsTrigger value="electoral">Padrón Electoral</TabsTrigger>
        </TabsList>
        
        <TabsContent value="parcels" className="mt-4">
          <ParcelsList />
        </TabsContent>
        
        <TabsContent value="directors" className="mt-4">
          <div className="p-4 border rounded-md">
            <h2 className="text-xl font-semibold mb-4">Directivos</h2>
            <p className="text-gray-500">
              Esta sección está en desarrollo. Aquí se mostrarán los directivos asociados a los predios.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="electoral" className="mt-4">
          <div className="p-4 border rounded-md">
            <h2 className="text-xl font-semibold mb-4">Padrón Electoral</h2>
            <p className="text-gray-500">
              Esta sección está en desarrollo. Aquí se mostrará el padrón electoral relacionado con los predios.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Parcels;
