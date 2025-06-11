import { useState } from "react";
import { Button } from "@presentation/components/ui/button";
import { Edit, Plus, Trash, Eye } from "lucide-react";
import { columns } from "./columns";
import useModal from "@presentation/utils/hooks/use-modal";
import { DataTable } from "@presentation/components/molecules/table/DataTable";
import { TableActionsObject } from "@presentation/components/molecules/table/TableActions";
import { Commission } from "@domain/administration/models/commission";
import CommissionFormNew from "../new/commission-new";
import CommissionFormEdit from "../edit/commission-edit";
import DeleteCommissionConfirmation from "../delete/commission-delete";
import CommissionDetail from "../detail/commission-detail";

// Mock data for demonstration purposes
const mockCommissions: Commission[] = [
  {
    id: "1",
    code: "COM-001",
    name: "Comisión de Regantes Valle Norte",
    description: "Comisión encargada de la zona norte del valle",
    location: "Valle Norte",
    coordinates: {
      lat: -9.189967,
      lng: -75.015152
    },
    contactPhone: "987654321",
    contactEmail: "comision.norte@ejemplo.com",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    code: "COM-002",
    name: "Comisión de Regantes Valle Sur",
    description: "Comisión encargada de la zona sur del valle",
    location: "Valle Sur",
    coordinates: {
      lat: -10.189967,
      lng: -76.015152
    },
    contactPhone: "987654322",
    contactEmail: "comision.sur@ejemplo.com",
    createdAt: new Date().toISOString(),
  },
];

const CommissionsList = () => {
  const modalNewCommission = useModal();
  const modalEditCommission = useModal();
  const modalDeleteCommission = useModal();
  const modalDetailCommission = useModal();
  const [selectedCommission, setSelectedCommission] = useState<Commission | undefined>();
  
  // In a real application, this would be replaced with an API call
  const [commissions] = useState<Commission[]>(mockCommissions);

  const refetchCommissions = async () => {
    // Here would be the API call to fetch commissions
    // For now, we'll just simulate a delay
    setTimeout(() => {
      // Refresh logic would go here
    }, 500);
  };

  const actions: TableActionsObject<Commission> = {
    view: {
      label: "Ver detalles",
      icon: <Eye />,
      onClick: (commission: Commission) => {
        setSelectedCommission(commission);
        modalDetailCommission.openModal();
      },
    },
    edit: {
      label: "Editar",
      icon: <Edit />,
      onClick: (commission: Commission) => {
        setSelectedCommission(commission);
        modalEditCommission.openModal();
      },
    },
    delete: {
      label: "Eliminar",
      icon: <Trash />,
      onClick: (commission: Commission) => {
        setSelectedCommission(commission);
        modalDeleteCommission.openModal();
      },
    },
  };

  const onShowDetails = (commission: Commission) => {
    setSelectedCommission(commission);
    modalDetailCommission.openModal();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Comisiones</h2>
        <Button onClick={() => modalNewCommission.openModal()}>
          <Plus className="mr-2 h-4 w-4" /> Agregar Comisión
        </Button>
      </div>

      <DataTable
        data={commissions}
        columns={columns(actions, onShowDetails)}
        onAdd={() => modalNewCommission.openModal()}
      />

      {/* Commission forms for create/edit/delete operations */}
      {modalNewCommission.isOpen && (
        <CommissionFormNew
          isOpen={modalNewCommission.isOpen}
          onClose={modalNewCommission.closeModal}
          fetchCommissions={refetchCommissions}
        />
      )}
      
      {modalEditCommission.isOpen && selectedCommission && (
        <CommissionFormEdit
          isOpen={modalEditCommission.isOpen}
          onClose={modalEditCommission.closeModal}
          commission={selectedCommission}
          fetchCommissions={refetchCommissions}
        />
      )}
      
      {modalDeleteCommission.isOpen && selectedCommission && (
        <DeleteCommissionConfirmation
          isOpen={modalDeleteCommission.isOpen}
          onClose={modalDeleteCommission.closeModal}
          commission={selectedCommission}
          refetch={refetchCommissions}
        />
      )}
      
      {modalDetailCommission.isOpen && selectedCommission && (
        <CommissionDetail
          isOpen={modalDetailCommission.isOpen}
          onClose={modalDetailCommission.closeModal}
          commission={selectedCommission}
        />
      )}
    </div>
  );
};

export default CommissionsList;
