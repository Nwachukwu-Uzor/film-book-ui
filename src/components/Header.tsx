import React, { FC } from "react";

const levels = {
  1: "text-lg lg:text-xl",
  2: "text-lg lg:text-2xl",
  3: "text-xl lg:text-2xl",
  4: "text-xl lg:text-3xl",
};

const colors = {
  black: "text-black",
  red: "text-red-800",
  green: "text-green-800",
  white: "text-white",
  blue: "text-blue-800",
};

interface Props {
  level?: 1 | 2 | 3 | 4;
  customClasses?: string;
  text: string;
  color?: "red" | "green" | "black" | "white" | "blue";
}

export const Header: FC<Props> = ({ level, customClasses, text, color }) => {
  return (
    <h1
      className={`${level ? levels[level] : levels[1]} font-bold my-2 ${
        color ? colors[color] : colors["black"]
      } ${customClasses}`}
    >
      {text}
    </h1>
  );
};
