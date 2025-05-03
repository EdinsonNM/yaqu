import { FieldErrors, UseFormRegister } from "react-hook-form";

type TextFieldProps = {
  label: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<any>;
  name: string;
  errors?: FieldErrors;
};
const TextField = ({
  label,
  type,
  placeholder,
  register,
  name,
  errors,
}: TextFieldProps) => {
  return (
    <div>
      <label className="input input-bordered flex items-center gap-2">
        {label}
        <input
          type={type}
          className="grow w-full"
          placeholder={placeholder}
          {...register(name)}
        />
      </label>
      {errors![name] && (
        <p className="text-red-500 text-xs py-2">
          {errors![name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default TextField;
