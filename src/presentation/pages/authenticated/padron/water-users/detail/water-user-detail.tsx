import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@presentation/components/ui/sheet";
import { WaterUser } from "@domain/water-users/models/water-user.model";
import { Label } from "@presentation/components/ui/label";
import { User, Phone, Mail, Info, MapPin, Calendar, FileText, Building2, CreditCard } from "lucide-react";
import dayjs from "dayjs";

interface WaterUserDetailProps {
  isOpen: boolean;
  onClose: () => void;
  waterUser: WaterUser | null;
}

const WaterUserDetail = ({
  isOpen,
  onClose,
  waterUser,
}: WaterUserDetailProps) => {
  if (!waterUser) return null;

  const fullName = `${waterUser.vNombres} ${waterUser.vApePaterno} ${waterUser.vApeMaterno || ""}`.trim();
  const isPersonaNatural = waterUser.cTipoPersona === "N";

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md overflow-y-auto px-6">
        <SheetHeader className="pb-6">
          <SheetTitle className="text-xl">{fullName}</SheetTitle>
          <SheetDescription className="text-md">
            ID: <span className="font-medium">{waterUser.ildUsuario}</span>
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <User className="h-5 w-5 text-primary" />
              <Label className="text-base font-medium">Información Personal</Label>
            </div>
            <div className="grid grid-cols-1 gap-2 px-2">
              {isPersonaNatural ? (
                <>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Nombres</span>
                    <span className="text-sm">{waterUser.vNombres || "-"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Apellido Paterno</span>
                    <span className="text-sm">{waterUser.vApePaterno || "-"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Apellido Materno</span>
                    <span className="text-sm">{waterUser.vApeMaterno || "-"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">DNI</span>
                    <span className="text-sm">{waterUser.vDni || "-"}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Razón Social</span>
                    <span className="text-sm">{fullName}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">RUC</span>
                    <span className="text-sm">{waterUser.vRuc || "-"}</span>
                  </div>
                  {waterUser.vRepresentanteLegal && (
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Representante Legal</span>
                      <span className="text-sm">{waterUser.vRepresentanteLegal}</span>
                    </div>
                  )}
                </>
              )}
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Tipo de Persona</span>
                <span className="text-sm">{waterUser.cTipoPersona === "N" ? "Natural" : waterUser.cTipoPersona === "J" ? "Jurídica" : waterUser.cTipoPersona || "-"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Estado</span>
                <span className="text-sm">{waterUser.cEstado === "A" ? "Activo" : waterUser.cEstado === "I" ? "Inactivo" : waterUser.cEstado || "-"}</span>
              </div>
            </div>
          </div>

          {waterUser.vDireccion && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-5 w-5 text-primary" />
                <Label className="text-base font-medium">Dirección</Label>
              </div>
              <p className="text-sm text-muted-foreground px-2">
                {waterUser.vDireccion}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <Phone className="h-5 w-5 text-primary" />
              <Label className="text-base font-medium">Contacto</Label>
            </div>
            <div className="grid grid-cols-1 gap-2 px-2">
              {waterUser.vTelefono && (
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Teléfono</span>
                  <span className="text-sm">{waterUser.vTelefono}</span>
                </div>
              )}
              {waterUser.vCelular && (
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Celular</span>
                  <span className="text-sm">{waterUser.vCelular}</span>
                </div>
              )}
              {waterUser.vEmail && (
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Email</span>
                  <span className="text-sm">{waterUser.vEmail}</span>
                </div>
              )}
              {waterUser.vFax && (
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Fax</span>
                  <span className="text-sm">{waterUser.vFax}</span>
                </div>
              )}
            </div>
          </div>

          {waterUser.tObservaciones && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-5 w-5 text-primary" />
                <Label className="text-base font-medium">Observaciones</Label>
              </div>
              <p className="text-sm text-muted-foreground px-2">
                {waterUser.tObservaciones}
              </p>
            </div>
          )}

          <div className="space-y-2 border-t pt-4 mt-6">
            <Label className="text-xs text-muted-foreground">
              Fecha de registro
            </Label>
            <p className="text-sm font-medium">
              {waterUser.dFechaRegistro ? dayjs(waterUser.dFechaRegistro).format("DD/MM/YYYY") : "-"}
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default WaterUserDetail;
