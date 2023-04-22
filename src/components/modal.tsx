import React, { FC, ReactNode, MouseEvent } from "react";

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  children?: ReactNode;
}

export const Modal: FC<ModalProps> = ({ children, open, handleClose }) => {
  return (
    <>
      {open ? (
        <div className="fixed inset-0 z-30 flex items-center justify-center duration-200">
          <div
            className="absolute inset-0 bg-black/75 z-40"
            onClick={handleClose}
          ></div>
          <div
            className={`relative z-50 w-[90%] max-w-[500px] flex items-center justify-center h-fit`}
          >
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
};
