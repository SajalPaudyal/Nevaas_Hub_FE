import React, { useEffect } from "react";
import { CircleX } from "lucide-react";

export interface ModalPropTypes {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalPropTypes> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-start justify-center p-4 sm:p-6 pt-24">
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-red-400 transition-colors"
        >
          <CircleX className="h-5 w-5 cursor-pointer" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
