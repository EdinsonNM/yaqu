import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@presentation/components/ui/alert-dialog";
import { WaterUser } from "@domain/water-users/models/water-user.model";

interface DeleteWaterUserConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  waterUser: WaterUser;
  refetch: () => Promise<void>;
}

const DeleteWaterUserConfirmation = ({
  isOpen,
  onClose,
  waterUser,
  refetch,
}: DeleteWaterUserConfirmationProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      // Here would be the API call to delete the water user
      console.log("Eliminando usuario de agua:", waterUser);
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Refresh the water users list
      await refetch();
      
      // Close the modal
      onClose();
    } catch (error) {
      console.error("Error al eliminar usuario de agua:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fullName = waterUser.cTipoPersona === "J" 
    ? waterUser.vNombres 
    : `${waterUser.vNombres} ${waterUser.vApePaterno} ${waterUser.vApeMaterno || ""}`.trim();

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Está seguro de eliminar este usuario?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se eliminará permanentemente el usuario{" "}
            <span className="font-medium">{fullName}</span>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-destructive hover:bg-destructive/90"
          >
            {isLoading ? "Eliminando..." : "Eliminar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteWaterUserConfirmation;
