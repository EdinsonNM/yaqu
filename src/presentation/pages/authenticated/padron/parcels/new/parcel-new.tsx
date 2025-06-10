import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@presentation/components/ui/dialog";
import { Button } from "@presentation/components/ui/button";
import { Input } from "@presentation/components/ui/input";
import { Label } from "@presentation/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@presentation/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@presentation/components/ui/select";
import { Checkbox } from "@presentation/components/ui/checkbox";

interface ParcelFormNewProps {
  isOpen: boolean;
  onClose: () => void;
  fetchParcels: () => Promise<void>;
}

const ParcelFormNew = ({ isOpen, onClose, fetchParcels }: ParcelFormNewProps) => {
  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    userId: "",
    userName: "",
    area: 0,
    cadastralUnit: "",
    status: "active",
    participationStatus: "No Parcionado",
    irrigationOrder: "",
    licenseType: "",
    hasLicense: false,
    location: {
      department: "",
      province: "",
      district: "",
      sector: "",
      subSector: "",
      irrigationBlock: "",
      irrigationCommittee: ""
    },
    waterSources: [] as { name: string; sourceType: string; isMain: boolean }[],
    irrigationTypes: [] as { irrigationType: string; subType: string; area?: number }[]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLocationChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      location: {
        ...formData.location,
        [field]: value
      }
    });
  };

  const handleAddWaterSource = () => {
    setFormData({
      ...formData,
      waterSources: [
        ...formData.waterSources,
        { name: "", sourceType: "Canal", isMain: false }
      ]
    });
  };

  const handleWaterSourceChange = (index: number, field: string, value: any) => {
    const updatedSources = [...formData.waterSources];
    updatedSources[index] = { ...updatedSources[index], [field]: value };
    setFormData({
      ...formData,
      waterSources: updatedSources
    });
  };

  const handleRemoveWaterSource = (index: number) => {
    const updatedSources = formData.waterSources.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      waterSources: updatedSources
    });
  };

  const handleAddIrrigationType = () => {
    setFormData({
      ...formData,
      irrigationTypes: [
        ...formData.irrigationTypes,
        { irrigationType: "", subType: "", area: undefined }
      ]
    });
  };

  const handleIrrigationTypeChange = (index: number, field: string, value: any) => {
    const updatedTypes = [...formData.irrigationTypes];
    updatedTypes[index] = { ...updatedTypes[index], [field]: value };
    setFormData({
      ...formData,
      irrigationTypes: updatedTypes
    });
  };

  const handleRemoveIrrigationType = (index: number) => {
    const updatedTypes = formData.irrigationTypes.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      irrigationTypes: updatedTypes
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the data to your API
    console.log("Form submitted:", formData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Refresh the parcels list
    await fetchParcels();
    
    // Close the modal
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nuevo Predio</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="general">Datos Predio</TabsTrigger>
              <TabsTrigger value="organization">Organización</TabsTrigger>
              <TabsTrigger value="observations">Observaciones</TabsTrigger>
              <TabsTrigger value="irrigation">Tipos de Riego</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="userName">Usuario</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="userName"
                      name="userName"
                      value={formData.userName}
                      onChange={handleInputChange}
                      placeholder="Seleccione un usuario"
                      className="flex-1"
                    />
                    <Button type="button" variant="outline">Seleccionar</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Predio</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nombre del predio"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cadastralUnit">Unidad Catastral</Label>
                  <Input
                    id="cadastralUnit"
                    name="cadastralUnit"
                    value={formData.cadastralUnit}
                    onChange={handleInputChange}
                    placeholder="Unidad catastral"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area">Área Total</Label>
                  <Input
                    id="area"
                    name="area"
                    type="number"
                    step="0.01"
                    value={formData.area || ""}
                    onChange={handleInputChange}
                    placeholder="Área en hectáreas"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="participationStatus">Estado Predio</Label>
                  <Select 
                    value={formData.participationStatus} 
                    onValueChange={(value) => setFormData({...formData, participationStatus: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="No Parcionado">No Parcionado</SelectItem>
                      <SelectItem value="Parcionado">Parcionado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Estado</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => setFormData({...formData, status: value as 'active' | 'inactive'})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Activo</SelectItem>
                      <SelectItem value="inactive">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="irrigationOrder">Orden de Riego</Label>
                  <Select 
                    value={formData.irrigationOrder} 
                    onValueChange={(value) => setFormData({...formData, irrigationOrder: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un orden de riego" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Medio y Bajo Piura">Medio y Bajo Piura</SelectItem>
                      <SelectItem value="Alto Piura">Alto Piura</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="licenseType">Tipo de Licencia</Label>
                  <Select 
                    value={formData.licenseType} 
                    onValueChange={(value) => setFormData({...formData, licenseType: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un tipo de licencia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UC Ant.">UC Ant.</SelectItem>
                      <SelectItem value="SIN LICENCIA">SIN LICENCIA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="organization" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Departamento</Label>
                  <Select 
                    value={formData.location.department} 
                    onValueChange={(value) => handleLocationChange('department', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PIURA">PIURA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="province">Provincia</Label>
                  <Select 
                    value={formData.location.province} 
                    onValueChange={(value) => handleLocationChange('province', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione una provincia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PIURA">PIURA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="district">Distrito</Label>
                  <Select 
                    value={formData.location.district} 
                    onValueChange={(value) => handleLocationChange('district', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un distrito" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CURA MORI">CURA MORI</SelectItem>
                      <SelectItem value="CATACAOS">CATACAOS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sector">Sector de Riego</Label>
                  <Select 
                    value={formData.location.sector} 
                    onValueChange={(value) => handleLocationChange('sector', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Catacaos">Catacaos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subSector">Sub-Sector de Riego</Label>
                  <Select 
                    value={formData.location.subSector} 
                    onValueChange={(value) => handleLocationChange('subSector', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un sub-sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Puyuntala">Puyuntala</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="irrigationCommittee">Comisión de Regantes</Label>
                  <Select 
                    value={formData.location.irrigationCommittee} 
                    onValueChange={(value) => handleLocationChange('irrigationCommittee', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione una comisión" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NARIHUALÁ">NARIHUALÁ</SelectItem>
                      <SelectItem value="PUYUNTALA">PUYUNTALA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="irrigationBlock">Bloque de Riego</Label>
                  <Select 
                    value={formData.location.irrigationBlock} 
                    onValueChange={(value) => handleLocationChange('irrigationBlock', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un bloque" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PUYUNTALA">PUYUNTALA</SelectItem>
                      <SelectItem value="NARIHUALÁ">NARIHUALÁ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="observations" className="space-y-4 mt-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Fuentes de Riego que Abastecen el Predio</h3>
                
                {formData.waterSources.map((source, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-md">
                    <div className="space-y-2">
                      <Label htmlFor={`sourceName-${index}`}>Nombre</Label>
                      <Input
                        id={`sourceName-${index}`}
                        value={source.name}
                        onChange={(e) => handleWaterSourceChange(index, 'name', e.target.value)}
                        placeholder="Nombre de la fuente"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`sourceType-${index}`}>Tipo</Label>
                      <Select 
                        value={source.sourceType} 
                        onValueChange={(value) => handleWaterSourceChange(index, 'sourceType', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Canal">Canal</SelectItem>
                          <SelectItem value="Pozo">Pozo</SelectItem>
                          <SelectItem value="Río">Río</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center space-x-2 pt-6">
                      <Checkbox 
                        id={`isMain-${index}`}
                        checked={source.isMain}
                        onCheckedChange={(checked) => handleWaterSourceChange(index, 'isMain', checked)}
                      />
                      <Label htmlFor={`isMain-${index}`}>Abastecimiento Principal</Label>
                      
                      <Button 
                        type="button" 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleRemoveWaterSource(index)}
                        className="ml-auto"
                      >
                        Quitar
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Button type="button" variant="outline" onClick={handleAddWaterSource}>
                  Agregar Fuente/Canal
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="irrigation" className="space-y-4 mt-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Tipos de Riego</h3>
                
                {formData.irrigationTypes.map((type, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-md">
                    <div className="space-y-2">
                      <Label htmlFor={`irrigationType-${index}`}>Tipo de Riego</Label>
                      <Select 
                        value={type.irrigationType} 
                        onValueChange={(value) => handleIrrigationTypeChange(index, 'irrigationType', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Puyuntala">Puyuntala</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`subType-${index}`}>Subtipo de Riego</Label>
                      <Select 
                        value={type.subType} 
                        onValueChange={(value) => handleIrrigationTypeChange(index, 'subType', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un subtipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Medio y Bajo Piura">Medio y Bajo Piura</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`area-${index}`}>Área</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id={`area-${index}`}
                          type="number"
                          step="0.01"
                          value={type.area || ""}
                          onChange={(e) => handleIrrigationTypeChange(index, 'area', parseFloat(e.target.value))}
                          placeholder="Área"
                        />
                        <Button 
                          type="button" 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleRemoveIrrigationType(index)}
                        >
                          Quitar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button type="button" variant="outline" onClick={handleAddIrrigationType}>
                  Agregar Tipo de Riego
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-2 mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Guardar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ParcelFormNew;
