// Modal.tsx
import { motion, Variants } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants: { [key: string]: Variants } = {
  center: {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
  },
  top: {
    hidden: { y: "-100vh", opacity: 0 },
    visible: { y: "0", opacity: 1, transition: { duration: 0.5 } },
  },
  left: {
    hidden: { x: "-100vw", opacity: 0 },
    visible: { x: "0", opacity: 1, transition: { duration: 0.5 } },
  },
  right: {
    hidden: { x: "100vw", opacity: 0 },
    visible: { x: "0", opacity: 1, transition: { duration: 0.5 } },
  },
  bottom: {
    hidden: { y: "100vh", opacity: 0 },
    visible: { y: "0", opacity: 1, transition: { duration: 0.5 } },
  },
  responsiveBottom: {
    hidden: { y: "100vh", opacity: 0 },
    visible: { y: "0", opacity: 1, transition: { duration: 0.5 } },
  },
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  transitionFrom?: "center" | "top" | "left" | "right" | "bottom";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  disableBackdropClick?: boolean;
};

const sizeClasses = {
  xs: "sm:max-w-xs",
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  "2xl": "sm:max-w-2xl",
};

const Modal = ({
  isOpen,
  onClose,
  children,
  transitionFrom = "center",
  size = "lg",
  disableBackdropClick = false,
}: ModalProps) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 500); // Duración de la animación
  };

  return (
    isOpen && (
      <motion.div
        className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center`}
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={disableBackdropClick ? undefined : handleClose}
      >
        <motion.div
          className={`relative bg-base-100 rounded-lg shadow-lg p-6 w-full ${sizeClasses[size]} mx-4 sm:mx-0 `}
          variants={modalVariants[transitionFrom]}
          initial="hidden"
          animate={isClosing ? "hidden" : "visible"}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={handleClose}
          >
            <AiOutlineClose size={24} />
          </button>
          {children}
        </motion.div>
      </motion.div>
    )
  );
};

export default Modal;
