import Button from "@design/atoms/button/button";
import { Modal } from "flowbite-react";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { BiSolidMessageSquareCheck } from "react-icons/bi";
type Props = {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isPending: boolean;
  message: string;
  icon?: ReactNode;
  children?: ReactNode;
};
export default function SuccessDialog({
  title,
  isOpen,
  onClose,
  onSubmit,
  isPending,
  icon,
  message,
  children,
}: Props) {
  const { t } = useTranslation("common");
  return (
    <Modal show={isOpen} size="md" onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center flex flex-col items-center  justify-center  ">
          {icon ? (
            icon
          ) : (
            <BiSolidMessageSquareCheck className="text-green-500 text-7xl" />
          )}
          <h2 className="font-bold text-lg">{title}</h2>
          <h3 className="mb-5 text-lg font-normal text-gray-400 dark:text-gray-400 ">
            {message}
          </h3>
          {children}
          <div className="flex justify-center gap-4">
            <Button
              variant="primary"
              onClick={onSubmit}
              isProcessing={isPending}
              disabled={isPending}
            >
              {t("button.finish")}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
