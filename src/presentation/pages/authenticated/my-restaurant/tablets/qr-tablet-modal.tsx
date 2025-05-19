import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@presentation/components/ui/dialog";
import { Button } from "@presentation/components/ui/button";
import { QRCodeSVG } from "qrcode.react";
import { Tablet } from "@domain/tablets/models/tablet.model";
import { FC } from "react";

interface QRTabletModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tablet: Tablet | null;
}

export const QRTabletModal: FC<QRTabletModalProps> = ({
  open,
  onOpenChange,
  tablet,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="flex flex-col items-center gap-4 max-w-xs">
      <DialogHeader>
        <DialogTitle>Código QR de la mesa</DialogTitle>
        <DialogDescription>
          Escanea este código para abrir la mesa en cartaviva.com
        </DialogDescription>
      </DialogHeader>
      {tablet && (
        <div className="flex flex-col items-center gap-2">
          <QRCodeSVG
            value={`https://cartaviva.com/mesa/${tablet.id}`}
            size={200}
            bgColor="#fff"
            fgColor="#000"
            includeMargin={true}
          />
          <span className="text-sm text-muted-foreground break-all text-center">
            https://cartaviva.com/mesa/{tablet.id}
          </span>
        </div>
      )}
      <DialogFooter>
        <Button onClick={() => onOpenChange(false)} aria-label="Cerrar QR">
          Cerrar
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
