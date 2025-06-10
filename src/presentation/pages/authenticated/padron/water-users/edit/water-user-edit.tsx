import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@presentation/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@presentation/components/ui/form";
import { Input } from "@presentation/components/ui/input";
import { Button } from "@presentation/components/ui/button";
import { Textarea } from "@presentation/components/ui/textarea";
import { WaterUser } from "@domain/water-users/models/water-user.model";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@presentation/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@presentation/components/ui/tabs";

interface WaterUserFormEditProps {
  isOpen: boolean;
  onClose: () => void;
  waterUser: WaterUser;
  fetchWaterUsers: () => Promise<void>;
}

const formSchema = z.object({
  tipoPersona: z.string().min(1, "Seleccione un tipo de persona"),
  nombres: z.string().min(1, "El nombre es requerido").optional().or(z.literal('')),
  apePaterno: z.string().min(1, "El apellido paterno es requerido").optional().or(z.literal('')),
  apeMaterno: z.string().optional(),
  razonSocial: z.string().min(1, "La razón social es requerida").optional().or(z.literal('')),
  dni: z.string().optional(),
  ruc: z.string().optional(),
  direccion: z.string().optional(),
  telefono: z.string().optional(),
  celular: z.string().optional(),
  email: z.string().email("Email inválido").optional().or(z.literal('')),
  fax: z.string().optional(),
  sexo: z.string().optional(),
  observaciones: z.string().optional(),
  representanteLegal: z.string().optional(),
  estado: z.string().min(1, "Seleccione un estado"),
});

const WaterUserFormEdit = ({
  isOpen,
  onClose,
  waterUser,
  fetchWaterUsers,
}: WaterUserFormEditProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(waterUser.cTipoPersona === "N" ? "natural" : "juridica");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipoPersona: waterUser.cTipoPersona || "N",
      nombres: waterUser.cTipoPersona === "N" ? waterUser.vNombres : "",
      apePaterno: waterUser.vApePaterno || "",
      apeMaterno: waterUser.vApeMaterno || "",
      razonSocial: waterUser.cTipoPersona === "J" ? waterUser.vNombres : "",
      dni: waterUser.vDni || "",
      ruc: waterUser.vRuc || "",
      direccion: waterUser.vDireccion || "",
      telefono: waterUser.vTelefono || "",
      celular: waterUser.vCelular || "",
      email: waterUser.vEmail || "",
      fax: waterUser.vFax || "",
      sexo: waterUser.cSexo || "",
      observaciones: waterUser.tObservaciones || "",
      representanteLegal: waterUser.vRepresentanteLegal || "",
      estado: waterUser.cEstado || "A",
    },
  });

  // Update form when waterUser changes
  useEffect(() => {
    if (waterUser) {
      form.reset({
        tipoPersona: waterUser.cTipoPersona || "N",
        nombres: waterUser.cTipoPersona === "N" ? waterUser.vNombres : "",
        apePaterno: waterUser.vApePaterno || "",
        apeMaterno: waterUser.vApeMaterno || "",
        razonSocial: waterUser.cTipoPersona === "J" ? waterUser.vNombres : "",
        dni: waterUser.vDni || "",
        ruc: waterUser.vRuc || "",
        direccion: waterUser.vDireccion || "",
        telefono: waterUser.vTelefono || "",
        celular: waterUser.vCelular || "",
        email: waterUser.vEmail || "",
        fax: waterUser.vFax || "",
        sexo: waterUser.cSexo || "",
        observaciones: waterUser.tObservaciones || "",
        representanteLegal: waterUser.vRepresentanteLegal || "",
        estado: waterUser.cEstado || "A",
      });
      setActiveTab(waterUser.cTipoPersona === "N" ? "natural" : "juridica");
    }
  }, [waterUser, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // Update water user object
      const updatedWaterUser = new WaterUser({
        ...waterUser,
        vNombres: values.tipoPersona === "N" ? values.nombres : values.razonSocial,
        vApePaterno: values.tipoPersona === "N" ? values.apePaterno : "",
        vApeMaterno: values.tipoPersona === "N" ? values.apeMaterno : "",
        vDni: values.dni,
        vRuc: values.ruc,
        vDireccion: values.direccion,
        vTelefono: values.telefono,
        vCelular: values.celular,
        vEmail: values.email,
        vFax: values.fax,
        cSexo: values.sexo,
        tObservaciones: values.observaciones,
        vRepresentanteLegal: values.representanteLegal,
        cEstado: values.estado,
        cTipoPersona: values.tipoPersona,
      });

      // Here would be the API call to update the water user
      console.log("Usuario de agua actualizado:", updatedWaterUser);
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Refresh the water users list
      await fetchWaterUsers();
      
      // Close the modal
      onClose();
    } catch (error) {
      console.error("Error al actualizar usuario de agua:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    form.setValue("tipoPersona", value === "natural" ? "N" : "J");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Usuario de Agua</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="natural">Persona Natural</TabsTrigger>
                <TabsTrigger value="juridica">Persona Jurídica</TabsTrigger>
              </TabsList>
              
              <TabsContent value="natural" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="nombres"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombres</FormLabel>
                        <FormControl>
                          <Input placeholder="Nombres" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="apePaterno"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellido Paterno</FormLabel>
                        <FormControl>
                          <Input placeholder="Apellido Paterno" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="apeMaterno"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellido Materno</FormLabel>
                        <FormControl>
                          <Input placeholder="Apellido Materno" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="dni"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>DNI</FormLabel>
                        <FormControl>
                          <Input placeholder="DNI" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="sexo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sexo</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="M">Masculino</SelectItem>
                          <SelectItem value="F">Femenino</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="juridica" className="space-y-4 mt-4">
                <FormField
                  control={form.control}
                  name="razonSocial"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Razón Social</FormLabel>
                      <FormControl>
                        <Input placeholder="Razón Social" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="ruc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RUC</FormLabel>
                      <FormControl>
                        <Input placeholder="RUC" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="representanteLegal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Representante Legal</FormLabel>
                      <FormControl>
                        <Input placeholder="Representante Legal" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Información de Contacto</h3>
              
              <FormField
                control={form.control}
                name="direccion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección</FormLabel>
                    <FormControl>
                      <Input placeholder="Dirección" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="telefono"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <Input placeholder="Teléfono" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="celular"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Celular</FormLabel>
                      <FormControl>
                        <Input placeholder="Celular" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="fax"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fax</FormLabel>
                      <FormControl>
                        <Input placeholder="Fax" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="observaciones"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observaciones</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Observaciones"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="estado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un estado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="A">Activo</SelectItem>
                      <SelectItem value="I">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button variant="outline" type="button" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Guardando..." : "Guardar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default WaterUserFormEdit;
