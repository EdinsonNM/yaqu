import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@presentation/components/ui/dialog";
import { Parcel } from "../models/parcel.model";
import { User, MapPin, Calendar, FileText, Building2, CreditCard, Droplet } from "lucide-react";
import { Separator } from "@presentation/components/ui/separator";
import { Card, CardContent } from "@presentation/components/ui/card";

interface ParcelDetailProps {
  isOpen: boolean;
  onClose: () => void;
  parcel: Parcel;
}

const ParcelDetail = ({ isOpen, onClose, parcel }: ParcelDetailProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Detalle del Predio</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Información General</h3>
              <div className="space-y-2">
                <div className="flex items-start">
                  <FileText className="h-5 w-5 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Código:</p>
                    <p className="text-sm text-gray-500">{parcel.code}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Building2 className="h-5 w-5 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Nombre:</p>
                    <p className="text-sm text-gray-500">{parcel.name}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <User className="h-5 w-5 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Usuario:</p>
                    <p className="text-sm text-gray-500">{parcel.userName}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Área Total:</p>
                    <p className="text-sm text-gray-500">{parcel.area} ha</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CreditCard className="h-5 w-5 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Unidad Catastral:</p>
                    <p className="text-sm text-gray-500">{parcel.cadastralUnit || "No especificado"}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Estado:</p>
                    <p className="text-sm text-gray-500">
                      {parcel.status === "active" ? "Activo" : "Inactivo"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Estado Predio:</p>
                    <p className="text-sm text-gray-500">{parcel.participationStatus}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Información de Riego</h3>
              <div className="space-y-2">
                <div className="flex items-start">
                  <Droplet className="h-5 w-5 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Orden de Riego:</p>
                    <p className="text-sm text-gray-500">{parcel.irrigationOrder || "No especificado"}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FileText className="h-5 w-5 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Tipo de Licencia:</p>
                    <p className="text-sm text-gray-500">{parcel.licenseType || "No especificado"}</p>
                  </div>
                </div>
              </div>

              {parcel.location && (
                <>
                  <Separator className="my-4" />
                  <h3 className="text-lg font-semibold mb-4">Ubicación</h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm font-medium">Departamento:</p>
                        <p className="text-sm text-gray-500">{parcel.location.department}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Provincia:</p>
                        <p className="text-sm text-gray-500">{parcel.location.province}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Distrito:</p>
                        <p className="text-sm text-gray-500">{parcel.location.district}</p>
                      </div>
                      {parcel.location.sector && (
                        <div>
                          <p className="text-sm font-medium">Sector:</p>
                          <p className="text-sm text-gray-500">{parcel.location.sector}</p>
                        </div>
                      )}
                      {parcel.location.subSector && (
                        <div>
                          <p className="text-sm font-medium">Sub-Sector:</p>
                          <p className="text-sm text-gray-500">{parcel.location.subSector}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {parcel.waterSources && parcel.waterSources.length > 0 && (
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Fuentes de Agua</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Principal</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {parcel.waterSources.map((source, index) => (
                      <tr key={source.id || index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{source.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{source.sourceType}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{source.isMain ? "Sí" : "No"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {parcel.irrigationTypes && parcel.irrigationTypes.length > 0 && (
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Tipos de Riego</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtipo</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Área</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {parcel.irrigationTypes.map((type, index) => (
                      <tr key={type.id || index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{type.irrigationType}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{type.subType || "N/A"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{type.area ? `${type.area} ha` : "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ParcelDetail;
