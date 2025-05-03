import { Modal } from "flowbite-react";
import { ReactNode } from "react";
import ConfirmContent from "./confirm-content";
import ErrorContent from "./error-content";
import SuccessContent from "./success-content";
type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isPending: boolean;
  message: string;
  icon?: ReactNode;
  children?: ReactNode;

  titleError: string;
  messageError: string;

  titleSuccess: string;
  messageSuccess: string;

  isError?: boolean;
  isSuccess?: boolean;
};
export default function OperationDialog({
  title,
  message,
  isOpen,
  onClose,
  onSubmit,
  isPending,
  children,
  titleError,
  messageError,
  titleSuccess,
  messageSuccess,
  isError,
  isSuccess,
}: Props) {
  return (
    <Modal show={isOpen} size="md" onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
        {!isError && !isSuccess && (
          <ConfirmContent
            title={title}
            message={message}
            onClose={onClose}
            onSubmit={onSubmit}
            isPending={isPending}
          >
            {children}
          </ConfirmContent>
        )}
        {isError && (
          <ErrorContent
            title={titleError}
            message={messageError}
            onClose={onClose}
          />
        )}
        {isSuccess && (
          <SuccessContent
            title={titleSuccess}
            message={messageSuccess}
            onClose={onClose}
          />
        )}
      </Modal.Body>
    </Modal>
  );
}
