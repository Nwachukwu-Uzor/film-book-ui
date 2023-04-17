import React, { FC } from "react";

const levels = {
  1: "text-lg lg:text-xl",
  2: "text-lg lg:text-2xl",
  3: "text-xl lg:text-2xl",
  4: "text-xl lg:text-3xl",
};

interface Props {
  level?: 1 | 2 | 3 | 4;
  customClasses?: string;
  text: string;
}

export const Header: FC<Props> = ({ level, customClasses, text }) => {
  return (
    <h1
      className={`${
        level ? levels[level] : levels[1]
      } font-bold my-2 ${customClasses}`}
    >
      {text}
    </h1>
  );
};
