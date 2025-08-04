// components/Modal.tsx
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { y: "-20%", opacity: 0, scale: 0.9 },
  visible: { y: "0%", opacity: 1, scale: 1 },
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, header, footer }) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        // DaisyUI espera .modal.modal-open para mostrar la modal
        <motion.div
          className="modal modal-open fixed inset-0 bg-black bg-opacity-50"
          onClick={handleBackdropClick}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="modal-box relative max-w-lg w-11/12"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {header && <div className="mb-4">{header}</div>}

            <div className="">{children}</div>

            {footer && <div className="modal-action mt-4">{footer}</div>}

            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={onClose}
              type="button"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
