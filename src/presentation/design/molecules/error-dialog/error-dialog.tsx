import { Button, Modal } from "flowbite-react";
import { useTranslation } from "react-i18next";
import { HiOutlineExclamationCircle } from "react-icons/hi";

type Props = {
  title?: string;
  isOpen: boolean;
  message: string;
  onClose: () => void;
};
export default function ErrorDialog({
  isOpen,
  message,
  onClose,
  title = "",
}: Props) {
  const { t } = useTranslation();
  return (
    <Modal show={isOpen} size="md" popup onClose={onClose}>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-500 dark:text-gray-200" />
          <h2 className="font-bold text-lg">{title}</h2>
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {t(message, { ns: "common" })}
          </h3>
        </div>{" "}
        <div className="flex justify-center gap-4">
          <Button color="failure" onClick={onClose}>
            {t("button.accept")}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
