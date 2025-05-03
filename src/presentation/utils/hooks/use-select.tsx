import { ChangeEvent, useEffect, useState } from "react";

export default function useSelect<T>(data: T[], selectBy: keyof T) {
  const [selected, setSelected] = useState<T>();

  const customOnChange = (value: string) => {
    const object = data.find((item) => item[selectBy] === value);
    setSelected(object);
  };
  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const object = data.find((item) => item[selectBy] === e.target.value);
    setSelected(object);
  };

  const setValue = (value: T) => {
    setSelected(value);
  };

  useEffect(() => {
    if (data && data.length > 0) setSelected(data[0]);
  }, [data]);
  return { value: selected, onChange, setValue, customOnChange };
}
