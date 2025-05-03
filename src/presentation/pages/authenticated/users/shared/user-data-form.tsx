import { User } from "@domain/authentication/models/user";
import { TextInput, Checkbox } from "flowbite-react";
import { Label } from "flowbite-react";
import { UseFormReturn } from "react-hook-form";

type FormProps = {
  onSubmit: (data: Partial<User>) => void;
  form: UseFormReturn<Partial<User>>;
  isFieldEditable: (field: string) => boolean;
};

const UserDataForm = ({ onSubmit, form, isFieldEditable }: FormProps) => {
  const { handleSubmit, register, formState } = form;
  const { errors } = formState;
  
  // Determinar si estamos en modo edición (cuando los campos de contraseña no son editables)
  const isEditMode = !isFieldEditable("password");

  return (
    <form
      className="grid grid-cols-2 gap-4"
      onSubmit={handleSubmit(onSubmit)}
      id="user-form"
      name="user-form"
      autoComplete="off"
      noValidate
    >
      <div>
        <Label htmlFor="fullName" value="Nombre Completo" />
        <TextInput
          id="fullName"
          placeholder="Ingrese el nombre completo"
          {...register("fullName")}
          color={errors.fullName ? "failure" : "gray"}
          helperText={errors.fullName?.message}
          disabled={!isFieldEditable("fullName")}
        />
      </div>
      
      {/* Solo mostrar el campo de email si es editable */}
      {isFieldEditable("email") && (
        <div>
          <Label htmlFor="email" value="Correo Electrónico" />
          <TextInput
            id="email"
            type="email"
            placeholder="Ingrese el correo electrónico"
            {...register("email")}
            color={errors.email ? "failure" : "gray"}
            helperText={errors.email?.message}
            disabled={!isFieldEditable("email")}
          />
        </div>
      )}
      
      {/* Solo mostrar campos de contraseña si no estamos en modo edición */}
      {!isEditMode && (
        <>
          <div>
            <Label htmlFor="password" value="Contraseña" />
            <TextInput
              id="password"
              type="password"
              placeholder="Ingrese la contraseña"
              {...register("password")}
              color={errors.password ? "failure" : "gray"}
              helperText={errors.password?.message}
              disabled={!isFieldEditable("password")}
              autoComplete="new-password"
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword" value="Confirmar Contraseña" />
            <TextInput
              id="confirmPassword"
              type="password"
              placeholder="Confirme la contraseña"
              {...register("confirmPassword")}
              color={errors.confirmPassword ? "failure" : "gray"}
              helperText={errors.confirmPassword?.message}
              disabled={!isFieldEditable("confirmPassword")}
              autoComplete="new-password"
            />
          </div>
        </>
      )}
      
      <div className={isEditMode ? "col-span-2" : "col-span-2"}>
        <Label value="Roles" />
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="role-admin"
              {...register("roles")}
              value="admin"
              disabled={!isFieldEditable("roles")}
            />
            <Label htmlFor="role-admin" value="Administrador" />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="role-docente"
              {...register("roles")}
              value="docente"
              disabled={!isFieldEditable("roles")}
            />
            <Label htmlFor="role-docente" value="Docente" />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="role-apoderado"
              {...register("roles")}
              value="apoderado"
              disabled={!isFieldEditable("roles")}
            />
            <Label htmlFor="role-apoderado" value="Apoderado" />
          </div>
        </div>
        {errors.roles && (
          <div className="mt-2 text-sm text-red-600">
            {errors.roles.message}
          </div>
        )}
      </div>
    </form>
  );
};

export default UserDataForm;
