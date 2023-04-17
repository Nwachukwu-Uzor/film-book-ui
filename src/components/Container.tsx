import React, { ReactNode, FC } from "react";

interface Props {
  children?: ReactNode;
  width?: string;
  maxWidth?: string;
}

export const Container: FC<Props> = ({ children, width, maxWidth }) => {
  return (
    <section className="flex justify-center items-center">
      <div
        className={`${width ?? "w-[80%]"} ${maxWidth ?? "max-w-[1200px]"} py-4`}
      >
        {children}
      </div>
    </section>
  );
};
