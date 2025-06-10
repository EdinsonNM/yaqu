import { useState } from "react";
import { Button } from "@presentation/components/ui/button";
import { Edit, Plus, Trash, Eye } from "lucide-react";
import { columns } from "./columns";
import useModal from "@presentation/utils/hooks/use-modal";
import { DataTable } from "@presentation/components/molecules/table/DataTable";
import { TableActionsObject } from "@presentation/components/molecules/table/TableActions";
import { Parcel, ParcelModel } from "../models/parcel.model";

// Mock data for demonstration purposes
const mockParcels: Parcel[] = [
  new ParcelModel({
    id: "P001",
    name: "CCT.ANU.CHATO G-1",
    code: "CCT.ANU.CHATO G-1",
    userId: "USR001",
    userName: "RUIZ FLORES, JULIO",
    status: "active",
    participationStatus: "No Parcionado",
    area: 0.18,
    cadastralUnit: "123456",
    irrigationOrder: "Medio y Bajo Piura",
    licenseType: "UC Ant.",
    hasLicense: true,
    coordinates: {
      utm: "UTM WGS84 Zona 17Sur",
      zone: "17Sur"
    },
    location: {
      department: "PIURA",
      province: "PIURA",
      district: "CURA MORI",
      sector: "Catacaos",
      subSector: "Puyuntala",
      irrigationBlock: "PUYUNTALA",
      irrigationCommittee: "NARIHUALÁ"
    },
    waterSources: [
      {
        id: "WS001",
        parcelId: "P001",
        name: "R-03-ALBERTO",
        sourceType: "Canal",
        isMain: true
      }
    ],
    irrigationTypes: [
      {
        id: "IT001",
        parcelId: "P001",
        irrigationType: "Puyuntala",
        subType: "Medio y Bajo Piura"
      }
    ]
  }),
  new ParcelModel({
    id: "P002",
    name: "FEDREGAL_GR",
    code: "FEDREGAL_GR",
    userId: "USR002",
    userName: "VILCHERREZ, JOSE",
    status: "active",
    participationStatus: "No Parcionado",
    area: 0.25,
    irrigationOrder: "Medio y Bajo Piura"
  }),
  new ParcelModel({
    id: "P003",
    name: "SAN PEDRO",
    code: "SAN PEDRO",
    userId: "USR003",
    userName: "RAMOS CASTIL",
    status: "active",
    participationStatus: "No Parcionado",
    area: 0.15
  })
];

const ParcelsList = () => {
  const modalNewParcel = useModal();
  const modalEditParcel = useModal();
  const modalDeleteParcel = useModal();
  const modalDetailParcel = useModal();
  const [selectedParcel, setSelectedParcel] = useState<Parcel | undefined>();
  
  // In a real application, this would be replaced with an API call
  const [parcels] = useState<Parcel[]>(mockParcels);

  const refetchParcels = async () => {
    // Here would be the API call to fetch parcels
    // For now, we'll just simulate a delay
    setTimeout(() => {
      // Refresh logic would go here
    }, 500);
  };

  const actions: TableActionsObject<Parcel> = {
    view: {
      label: "Ver detalles",
      icon: <Eye />,
      onClick: (parcel: Parcel) => {
        setSelectedParcel(parcel);
        modalDetailParcel.openModal();
      },
    },
    edit: {
      label: "Editar",
      icon: <Edit />,
      onClick: (parcel: Parcel) => {
        setSelectedParcel(parcel);
        modalEditParcel.openModal();
      },
    },
    delete: {
      label: "Eliminar",
      icon: <Trash />,
      onClick: (parcel: Parcel) => {
        setSelectedParcel(parcel);
        modalDeleteParcel.openModal();
      },
    },
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Predios</h2>
        <Button onClick={() => modalNewParcel.openModal()}>
          <Plus className="mr-2 h-4 w-4" /> Nuevo Predio
        </Button>
      </div>

      <DataTable
        data={parcels}
        columns={columns(actions)}
        onAdd={() => modalNewParcel.openModal()}
      />

      {/* Parcel forms for create/edit/delete operations will be added here */}
    </div>
  );
};

export default ParcelsList;
