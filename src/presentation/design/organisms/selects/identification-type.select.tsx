import { IdentificationTypes } from "@domain/business/enums/identification-types.enum";
import { Select, SelectProps } from "flowbite-react";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { Trans } from "react-i18next";

interface Props {
  exclude?: IdentificationTypes[]; // Lista de valores a excluir
  register?: UseFormRegisterReturn;
}

const IdentificationTypeSelect: React.FC<Props & SelectProps> = ({
  exclude = [],
  register,
  ...rest
}) => {
  // Filtrar los valores del enum
  const filteredEntries = Object.entries(IdentificationTypes).filter(
    ([, value]) => !exclude.includes(value as IdentificationTypes)
  );

  return (
    <Select
      {...rest}
      {...register}
      onChange={(e) => {
        register?.onChange(e);
        rest.onChange?.(e);
      }}
    >
      {filteredEntries.map(([key, value]) => (
        <option key={key} value={value}>
          <Trans i18nKey={`identificationTypes.${key}`} ns="common" />
        </option>
      ))}
    </Select>
  );
};

export default IdentificationTypeSelect;
