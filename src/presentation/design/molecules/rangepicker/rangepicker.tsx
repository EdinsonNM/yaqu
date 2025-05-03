import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "react-day-picker/style.css";
import { DateRangeProps, DateRange as Dr } from "react-date-range";
import { DateRange } from "@core/types/date.types";
import { useTranslation } from "react-i18next";
import { es, enUS } from "date-fns/locale";

type Props = {
  value?: DateRange;
  onSelectRange: (range: DateRange | undefined) => void;
};
export default function Rangepicker({
  onSelectRange,
  value,
  ...props
}: Props & DateRangeProps) {
  const { i18n } = useTranslation();
  const selectionRange = {
    startDate: value?.from || new Date(),
    endDate: value?.to || new Date(),
    key: "selection",
  };
  const handleSelect = (ranges: any) => {
    console.log(ranges);
    const value: DateRange = {
      from: ranges.selection.startDate,
      to: ranges.selection.endDate,
    };
    onSelectRange(value);
  };
  return (
    <Dr
      ranges={[selectionRange]}
      onChange={handleSelect}
      moveRangeOnFirstSelection
      retainEndDateOnFirstSelection
      {...props}
      locale={i18n.language === "es" ? es : enUS}
    />
  );
}
