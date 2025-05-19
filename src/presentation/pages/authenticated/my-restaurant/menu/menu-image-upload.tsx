import { useMenuUploadImage } from "@infra/menu/hooks/use-menu-upload-image";
import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/presentation/components/ui/dialog";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { Menu } from "@domain/menu/models/menu.model";
import { toast } from "react-toastify";

type MenuImageUploadProps = {
  isOpen: boolean;
  onClose: () => void;
  menu: Menu;
  refetch: () => void;
};
export const MenuImageUpload = ({
  isOpen,
  onClose,
  menu,
  refetch,
}: MenuImageUploadProps) => {
  const { mutate: uploadMenuImage, isPending } = useMenuUploadImage();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    menu.imageUrl || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast.error("Por favor selecciona una imagen primero");
      return;
    }

    uploadMenuImage(
      { id: menu.id!, file: selectedFile },
      {
        onSuccess: () => {
          toast.success("Imagen subida correctamente");
          onClose();
          setSelectedFile(null);
          setPreviewUrl(null);
          refetch();
        },
        onError: (error) => {
          toast.error(error.message || "Error al subir la imagen");
        },
      }
    );
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button variant="outline">Subir imagen del menú</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Subir imagen del menú</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer"
            onClick={triggerFileInput}
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Vista previa"
                className="max-h-64 object-contain"
              />
            ) : (
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Haz clic para seleccionar una imagen
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  PNG, JPG, GIF hasta 5MB
                </p>
              </div>
            )}
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button
              onClick={handleUpload}
              disabled={isPending || !selectedFile}
            >
              {isPending ? "Subiendo..." : "Subir imagen"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
