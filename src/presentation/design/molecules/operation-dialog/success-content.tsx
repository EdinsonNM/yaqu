import Button from "@design/atoms/button/button";
import { Trans } from "react-i18next";
import { BiSolidMessageSquareCheck } from "react-icons/bi";

type Props = {
  title: string;
  message: string;
  onClose: () => void;
};
export default function SuccessContent({ title, message, onClose }: Props) {
  return (
    <div className="text-center flex flex-col items-center  justify-center  ">
      <BiSolidMessageSquareCheck className="text-green-500 text-7xl" />
      <h2 className="font-bold text-lg">{title}</h2>
      <h3 className="mb-5 text-lg font-normal text-gray-400 dark:text-gray-400 ">
        {message}
      </h3>
      <div className="flex justify-center gap-4">
        <Button variant="primary" onClick={onClose}>
          <Trans i18nKey="button.finish" ns="common" />
        </Button>
      </div>
    </div>
  );
}
