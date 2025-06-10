import { useState } from "react";
import { Button } from "@presentation/components/ui/button";
import { Edit, Plus, Trash, Eye } from "lucide-react";
import { columns } from "./columns";
import useModal from "@presentation/utils/hooks/use-modal";
import { DataTable } from "@presentation/components/molecules/table/DataTable";
import { TableActionsObject } from "@presentation/components/molecules/table/TableActions";
import { WaterUser } from "@domain/water-users/models/water-user.model";
import WaterUserFormNew from "../new/water-user-new";
import WaterUserFormEdit from "../edit/water-user-edit";
import DeleteWaterUserConfirmation from "../delete/water-user-delete";
import WaterUserDetail from "../detail/water-user-detail";

// Mock data for demonstration purposes
const mockWaterUsers: WaterUser[] = [
  new WaterUser({
    ildJuntaUsuario: "JU001",
    ildUsuario: "USR001",
    vNombres: "Juan Carlos",
    vApePaterno: "Pérez",
    vApeMaterno: "Gómez",
    vDni: "45678912",
    vDireccion: "Av. Los Alamos 123",
    vTelefono: "987654321",
    vEmail: "juan.perez@ejemplo.com",
    vCelular: "987654321",
    cEstado: "A",
    cTipoPersona: "N",
    dFechaRegistro: new Date("2023-01-15")
  }),
  new WaterUser({
    ildJuntaUsuario: "JU001",
    ildUsuario: "USR002",
    vNombres: "María Elena",
    vApePaterno: "Rodríguez",
    vApeMaterno: "López",
    vDni: "78945612",
    vDireccion: "Jr. Las Flores 456",
    vTelefono: "987654322",
    vEmail: "maria.rodriguez@ejemplo.com",
    vCelular: "987654322",
    cEstado: "A",
    cTipoPersona: "N",
    dFechaRegistro: new Date("2023-02-20")
  }),
  new WaterUser({
    ildJuntaUsuario: "JU001",
    ildUsuario: "USR003",
    vNombres: "Empresa Agrícola",
    vApePaterno: "S.A.C.",
    vRuc: "20123456789",
    vDireccion: "Carretera Central Km 25",
    vTelefono: "987654323",
    vEmail: "contacto@empresaagricola.com",
    cEstado: "A",
    cTipoPersona: "J",
    dFechaRegistro: new Date("2023-03-10")
  })
];

const WaterUsersList = () => {
  const modalNewWaterUser = useModal();
  const modalEditWaterUser = useModal();
  const modalDeleteWaterUser = useModal();
  const modalDetailWaterUser = useModal();
  const [selectedWaterUser, setSelectedWaterUser] = useState<WaterUser | undefined>();
  
  // In a real application, this would be replaced with an API call
  const [waterUsers] = useState<WaterUser[]>(mockWaterUsers);

  const refetchWaterUsers = async () => {
    // Here would be the API call to fetch water users
    // For now, we'll just simulate a delay
    setTimeout(() => {
      // Refresh logic would go here
    }, 500);
  };

  const actions: TableActionsObject<WaterUser> = {
    view: {
      label: "Ver detalles",
      icon: <Eye />,
      onClick: (waterUser: WaterUser) => {
        setSelectedWaterUser(waterUser);
        modalDetailWaterUser.openModal();
      },
    },
    edit: {
      label: "Editar",
      icon: <Edit />,
      onClick: (waterUser: WaterUser) => {
        setSelectedWaterUser(waterUser);
        modalEditWaterUser.openModal();
      },
    },
    delete: {
      label: "Eliminar",
      icon: <Trash />,
      onClick: (waterUser: WaterUser) => {
        setSelectedWaterUser(waterUser);
        modalDeleteWaterUser.openModal();
      },
    },
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Usuarios de Agua</h2>
        <Button onClick={() => modalNewWaterUser.openModal()}>
          <Plus className="mr-2 h-4 w-4" /> Agregar Usuario
        </Button>
      </div>

      <DataTable
        data={waterUsers}
        columns={columns(actions)}
        onAdd={() => modalNewWaterUser.openModal()}
      />

      {/* Water User forms for create/edit/delete operations */}
      {modalNewWaterUser.isOpen && (
        <WaterUserFormNew
          isOpen={modalNewWaterUser.isOpen}
          onClose={modalNewWaterUser.closeModal}
          fetchWaterUsers={refetchWaterUsers}
        />
      )}
      
      {modalEditWaterUser.isOpen && selectedWaterUser && (
        <WaterUserFormEdit
          isOpen={modalEditWaterUser.isOpen}
          onClose={modalEditWaterUser.closeModal}
          waterUser={selectedWaterUser}
          fetchWaterUsers={refetchWaterUsers}
        />
      )}
      
      {modalDeleteWaterUser.isOpen && selectedWaterUser && (
        <DeleteWaterUserConfirmation
          isOpen={modalDeleteWaterUser.isOpen}
          onClose={modalDeleteWaterUser.closeModal}
          waterUser={selectedWaterUser}
          refetch={refetchWaterUsers}
        />
      )}
      
      {modalDetailWaterUser.isOpen && selectedWaterUser && (
        <WaterUserDetail
          isOpen={modalDetailWaterUser.isOpen}
          onClose={modalDetailWaterUser.closeModal}
          waterUser={selectedWaterUser}
        />
      )}
    </div>
  );
};

export default WaterUsersList;
