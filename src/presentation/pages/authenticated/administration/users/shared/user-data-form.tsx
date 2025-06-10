import { RoleLabel, RoleName } from "@domain/authentication/enums/role.enum";
import { User } from "@domain/authentication/models/user";
import { Input } from "@presentation/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { MultiSelectRoles } from "./MultiSelectRoles";
import { Dialog, DialogFooter } from "@presentation/components/ui/dialog";
import { DialogHeader } from "@presentation/components/ui/dialog";
import { DialogContent } from "@presentation/components/ui/dialog";
import { DialogTitle } from "@presentation/components/ui/dialog";
import { Button } from "@presentation/components/ui/button";

type FormProps = {
  onSubmit: (data: Partial<User>) => void;
  form: UseFormReturn<Partial<User>>;
  isFieldEditable: (field: string) => boolean;
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

const UserDataForm = ({
  onSubmit,
  form,
  isFieldEditable,
  isOpen,
  onClose,
  title,
}: FormProps) => {
  const { handleSubmit, register, formState, setValue } = form;
  const { errors } = formState;

  // Determinar si estamos en modo edición (cuando los campos de contraseña no son editables)
  const isEditMode = !isFieldEditable("password");

  const onSelected = (selected: string[]) => {
    setValue("roles", selected, { shouldValidate: true });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form
          className="grid grid-cols-2 gap-4"
          onSubmit={handleSubmit(onSubmit)}
          id="user-form"
          name="user-form"
          autoComplete="off"
          noValidate
        >
          <div className="w-full">
            <label className="block text-sm font-medium mb-1">
              Nombre Completo
            </label>
            <Input
              id="fullName"
              placeholder="Ingrese el nombre completo"
              {...register("fullName")}
              color={errors.fullName ? "failure" : "gray"}
              disabled={!isFieldEditable("fullName")}
              className="w-full"
            />
          </div>

          {/* Solo mostrar el campo de email si es editable */}
          {isFieldEditable("email") && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Correo Electrónico
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Ingrese el correo electrónico"
                {...register("email")}
                color={errors.email ? "failure" : "gray"}
                disabled={!isFieldEditable("email")}
              />
            </div>
          )}

          {/* Solo mostrar campos de contraseña si no estamos en modo edición */}
          {!isEditMode && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Contraseña
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Ingrese la contraseña"
                  {...register("password")}
                  color={errors.password ? "failure" : "gray"}
                  disabled={!isFieldEditable("password")}
                  autoComplete="new-password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Confirmar Contraseña
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirme la contraseña"
                  {...register("confirmPassword")}
                  color={errors.confirmPassword ? "failure" : "gray"}
                  disabled={!isFieldEditable("confirmPassword")}
                  autoComplete="new-password"
                />
              </div>
            </>
          )}

          <div className={isEditMode ? "col-span-2" : "col-span-2"}>
            <label className="block text-sm font-medium mb-1">Roles</label>
            <div className="grid grid-cols-1 gap-4">
              <MultiSelectRoles
                options={Object.values(RoleName).map((role) => ({
                  label: RoleLabel[role],
                  value: role,
                }))}
                selected={form.getValues("roles") || []}
                setSelected={onSelected}
              />
            </div>
            {errors.roles && (
              <div className="mt-2 text-sm text-red-600">
                {errors.roles.message}
              </div>
            )}
          </div>
        </form>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" form="user-form">
            Guardar Cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserDataForm;
