import Button from "@design/atoms/button/button";
import { Trans } from "react-i18next";
import { HiOutlineExclamationCircle } from "react-icons/hi";

type Props = {
  title: string;
  message: string;
  children: React.ReactNode;
  onClose: () => void;
  onSubmit: () => void;
  isPending: boolean;
};
export default function ConfirmContent({
  title,
  message,
  children,
  onClose,
  onSubmit,
  isPending,
}: Props) {
  return (
    <div className="text-center">
      <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-blue-500 dark:text-gray-200" />
      <h2 className="font-bold text-lg">{title}</h2>
      <h3 className="mb-5 text-lg font-normal text-gray-400 dark:text-gray-400 ">
        {message}
      </h3>
      <div className="mb-5">{children}</div>
      <div className="flex justify-center gap-4">
        <Button
          variant="primary"
          onClick={onClose}
          outline
          disabled={isPending}
        >
          <Trans i18nKey="button.no" ns="common" />
        </Button>
        <Button
          variant="primary"
          onClick={onSubmit}
          isProcessing={isPending}
          disabled={isPending}
        >
          <Trans i18nKey="button.yes" ns="common" />
        </Button>
      </div>
    </div>
  );
}
