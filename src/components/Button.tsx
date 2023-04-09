import React, { MouseEvent, FC } from "react";

interface Props {
  title: string;
  type?: "button" | "submit" | "reset" | undefined;
  handleClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const Button: FC<Props> = ({ title, handleClick, type = "button" }) => {
  return (
    <button
      className="px-3 py-2 bg-yellow-500 text-white rounded-md active:ring-2 active:ring-yellow-500 active:opacity-75 hover:opacity-75 cursor-pointer"
      onClick={handleClick}
      type={type}
    >
      {title}
    </button>
  );
};
