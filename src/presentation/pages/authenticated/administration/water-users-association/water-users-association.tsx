import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@presentation/components/ui/tabs";
import WaterUsersAssociationData from "./data/water-users-association-data";
import CommissionsList from "./commissions/list/commissions-list";

const WaterUsersAssociation = () => {
  const [activeTab, setActiveTab] = useState("data");

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
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="data">Datos de Junta</TabsTrigger>
          <TabsTrigger value="commissions">Comisiones</TabsTrigger>
        </TabsList>
        <TabsContent value="data" className="mt-6">
          <WaterUsersAssociationData />
        </TabsContent>
        <TabsContent value="commissions" className="mt-6">
          <CommissionsList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WaterUsersAssociation;
