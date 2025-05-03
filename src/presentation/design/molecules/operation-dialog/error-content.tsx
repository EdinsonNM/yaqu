import Button from "@design/atoms/button/button";
import { Trans } from "react-i18next";
import { HiOutlineExclamationCircle } from "react-icons/hi";

type Props = {
  title: string;
  message: string;
  onClose: () => void;
};
export default function ErrorContent({ title, message, onClose }: Props) {
  return (
    <>
      <div className="text-center">
        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-500 dark:text-gray-200" />
        <h2 className="font-bold text-lg">{title}</h2>
        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          {message}
        </h3>
      </div>
      <div className="flex justify-center gap-4">
        <Button color="failure" onClick={onClose}>
          <Trans i18nKey="button.accept" ns="common" />
        </Button>
      </div>
    </>
  );
}
