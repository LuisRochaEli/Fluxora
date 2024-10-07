import { useState } from "react";

export const useModal = (initialValue = false): IModal => {
  const [isOpen, setIsOpen] = useState(initialValue);
  const openModal = () => setIsOpen(true);
  const closeModal = () =>
    new Promise((resolve) => {
      setIsOpen(false);
      setTimeout(() => {
        resolve(1); // Resuelve la promesa cuando el modal se cierra
      }, 300);
    });

  return { isOpen, openModal, closeModal };
};
