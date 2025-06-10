import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@presentation/components/ui/tabs";
import { useState } from "react";
import WaterUsersList from "./list/water-users-list";

const WaterUsers = () => {
  const [activeTab, setActiveTab] = useState("padron-usuarios");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Junta de Usuarios</h2>
      </div>

      <Tabs
        defaultValue="data"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="padron-usuarios">Padron deUsuarios</TabsTrigger>
          <TabsTrigger value="directivos">Directivos</TabsTrigger>
          <TabsTrigger value="padron-electoral">Padron electoral</TabsTrigger>
        </TabsList>
        <TabsContent value="padron-usuarios" className="mt-6">
          <WaterUsersList />
        </TabsContent>
        <TabsContent value="directivos" className="mt-6">
          directivos
        </TabsContent>
        <TabsContent value="padron-electoral" className="mt-6">
          padron electoral
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WaterUsers;
