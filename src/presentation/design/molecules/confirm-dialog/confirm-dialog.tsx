import Button, { ButtonType } from "@design/atoms/button/button";
import { Modal } from "flowbite-react";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { HiOutlineExclamationCircle } from "react-icons/hi";
type Props = {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isPending: boolean;
  message: string;
  icon?: ReactNode;
  children?: ReactNode;
  confirmStyle?: ButtonType;
};
export default function ConfirmDialog({
  title,
  isOpen,
  onClose,
  onSubmit,
  isPending,
  icon,
  message,
  children,
  confirmStyle = "primary",
}: Props) {
  const { t } = useTranslation("common");
  return (
    <Modal show={isOpen} size="md" onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          {icon ? (
            icon
          ) : (
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-blue-500 dark:text-gray-200" />
          )}
          <h2 className="font-bold text-lg">{title}</h2>
          <h3 className="mb-5 text-lg font-normal text-gray-400 dark:text-gray-400 ">
            {message}
          </h3>
          {children}
          <div className="flex justify-center gap-4">
            <Button
              variant="primary"
              onClick={onClose}
              outline
              disabled={isPending}
            >
              {t("button.no")}
            </Button>
            <Button
              variant={confirmStyle}
              onClick={onSubmit}
              isProcessing={isPending}
              disabled={isPending}
            >
              {t("button.yes")}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
