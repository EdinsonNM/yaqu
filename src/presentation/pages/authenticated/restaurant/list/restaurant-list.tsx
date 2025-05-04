import { useState } from "react";
import { useRestaurantsGetAll } from "@infra/restaurant/hooks/use-restaurants-get-all";
import { columns } from "./columns";
import { DataTable } from "../../../../components/molecules/table/DataTable";
import { RestaurantNew } from "../new/restaurant-new";
import useModal from "@presentation/utils/hooks/use-modal";
import { Edit, Trash } from "lucide-react";
import { TableActionsObject } from "../../../../components/molecules/table/TableActions";
import { Restaurant } from "@domain/restaurant/models/restaurant.model";
import { RestaurantEdit } from "../edit/restaurant-edit";

export function RestaurantList() {
  const { data: restaurants = [], refetch } = useRestaurantsGetAll();
  const [currentRestaurant, setCurrentRestaurant] = useState<Restaurant | null>(
    null
  );
  const modalNew = useModal();
  const modalEdit = useModal();
  const modalDelete = useModal();
  const handleAdd = () => {
    setCurrentRestaurant(null);
    modalNew.openModal();
  };

  const actions: TableActionsObject<Restaurant> = {
    edit: {
      label: "Editar",
      icon: <Edit />,
      onClick: (restaurant: Restaurant) => {
        setCurrentRestaurant(restaurant);
        modalEdit.openModal();
      },
    },
    delete: {
      label: "Eliminar",
      icon: <Trash />,
      onClick: (restaurant: Restaurant) => {
        setCurrentRestaurant(restaurant);
        modalDelete.openModal();
      },
    },
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Restaurantes</h1>
      <p className="mb-4 text-sm text-muted-foreground">
        En esta sección, puedes gestionar la lista de restaurantes. Puedes
        agregar nuevos restaurantes, editar la información existente o eliminar
        restaurantes de la lista.
      </p>
      <DataTable
        columns={columns(actions)}
        data={restaurants}
        onAdd={handleAdd}
      />

      {modalNew.isOpen && (
        <RestaurantNew onClose={modalNew.closeModal} refetch={refetch} />
      )}
      {modalEdit.isOpen && (
        <RestaurantEdit
          onClose={modalEdit.closeModal}
          refetch={refetch}
          restaurant={currentRestaurant!}
        />
      )}
    </div>
  );
}
