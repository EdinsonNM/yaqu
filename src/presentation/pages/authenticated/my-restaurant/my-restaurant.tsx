import { useEffect, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/presentation/components/ui/tabs";
import useRestaurantStore from "@presentation/store/restaurant-store";
import MyRestaurantInfo from "./info/my-restaurant-info";
import { MyRestaurantUsers } from "./users/my-restaurant-users";
import { MyRestaurantMenu } from "./menu/my-restaurant-menu";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { MyRestaurantMenuItems } from "./menu/my-restaurant-menu-items";
import MyRestaurantTablets from "./tablets/my-restaurant-tablets";

const MyRestaurant = () => {
  const [activeTab, setActiveTab] = useState("info");
  const { currentRestaurant } = useRestaurantStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard/mi-restaurante":
        setActiveTab("info");
        break;
      case "/dashboard/mi-restaurante/info":
        setActiveTab("info");
        break;
      case "/dashboard/mi-restaurante/users":
        setActiveTab("users");
        break;
      case "/dashboard/mi-restaurante/menu":
        setActiveTab("menu");
        break;
      case location.pathname.match(
        /^\/dashboard\/mi-restaurante\/menu\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
      )?.input:
        setActiveTab("menu");
        break;
      case "/dashboard/mi-restaurante/tables":
        setActiveTab("tables");
        break;
    }
  }, [location.pathname]);

  if (!currentRestaurant) {
    return <div>No hay restaurante seleccionado</div>;
  }
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Mi Restaurante:{" "}
        <span className="font-normal">{currentRestaurant.name}</span>
      </h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger
            value="info"
            onClick={() => navigate("/dashboard/mi-restaurante/info")}
          >
            Información
          </TabsTrigger>
          <TabsTrigger
            value="users"
            onClick={() => navigate("/dashboard/mi-restaurante/users")}
          >
            Usuarios
          </TabsTrigger>
          <TabsTrigger
            value="menu"
            onClick={() => navigate("/dashboard/mi-restaurante/menu")}
          >
            Carta
          </TabsTrigger>
          <TabsTrigger
            value="tables"
            onClick={() => navigate("/dashboard/mi-restaurante/tables")}
          >
            Mesas
          </TabsTrigger>
        </TabsList>

        {/* Sección de Información del Restaurante */}
        <TabsContent value="info">
          <Routes>
            <Route path="/" element={<MyRestaurantInfo />} index />
            <Route path="/info" element={<MyRestaurantInfo />} />
          </Routes>
        </TabsContent>

        {/* Sección de Usuarios */}
        <TabsContent value="users">
          <Routes>
            <Route path="/users" element={<MyRestaurantUsers />} index />
          </Routes>
        </TabsContent>

        {/* Sección de Carta/Menú */}
        <TabsContent value="menu">
          <Routes>
            <Route path="/menu" element={<MyRestaurantMenu />} />
            <Route path="/menu/:menuId" element={<MyRestaurantMenuItems />} />
          </Routes>
        </TabsContent>

        {/* Sección de Mesas */}
        <TabsContent value="tables">
          <Routes>
            <Route path="/tables" element={<MyRestaurantTablets />} index />
          </Routes>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyRestaurant;
