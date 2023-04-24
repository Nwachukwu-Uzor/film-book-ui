import React, { FC, MouseEvent, ReactNode } from "react";

interface ButtonProps {
  color?: "red" | "green" | "yellow" | "blue" | "black" | "white";
  text: string;
  handleClick?: (event?: MouseEvent) => void;
  type?: "button" | "submit" | "reset";
  full?: boolean;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
}

const buttonColors = {
  red: "bg-red-800 active:ring-red-800 active:ring-2 text-white",
  green: "bg-green-800 active:ring-green-800 active:ring-2 text-white",
  yellow: "bg-yellow-800 active:ring-yellow-800 active:ring-2 text-white",
  black: "bg-black active:ring-black active:ring-2 text-white",
  blue: "bg-blue-800 active:ring-blue-800 active:ring-2 text-white",
  white: "bg-white active:ring-white active:ring-2 text-black",
};

export const Button: FC<ButtonProps> = ({
  type,
  color,
  text,
  full,
  icon,
  iconPosition,
  handleClick,
}) => {
  return (
    <button
      className={`py-2 px-3 lg:px-4 flex items-center justify-center gap-1 lg:gap-2 rounded-md my-2 duration-150 ${
        full ? "w-full" : ""
      } ${color ? buttonColors[color] : buttonColors["black"]} ${
        icon ? (iconPosition === "end" ? "flex-row-reverse" : "") : ""
      }`}
      onClick={handleClick}
      type={type ?? "button"}
    >
      {icon}
      {text}
    </button>
  );
};
