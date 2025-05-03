import { FieldError } from "react-hook-form";
import { useTranslation } from "react-i18next";

type Props = {
  error: FieldError | undefined;
};
export default function HelperError({ error }: Props) {
  const { t } = useTranslation();
  let message = "";
  if (error) {
    if (typeof error.message === "string") {
      message = t(error!.message!, { ns: ["common"] });
    } else if (typeof error.message === "object") {
      const { key, params } = error.message as any;
      message = t(key, { ...params, ns: ["common"] }) as string;
    }
  }
  return (
    error && <span className="text-xs text-red-500">{error && message}</span>
  );
}
