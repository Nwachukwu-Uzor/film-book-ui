import React, { FC } from "react";
import { GridLoader } from "react-spinners";

export const FullScreenLoader: FC = () => {
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 flex items-center justify-center z-30">
      <GridLoader color="#065f46" />
    </div>
  );
};
