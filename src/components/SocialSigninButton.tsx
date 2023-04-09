import React, { MouseEvent, FC } from "react";
import Image from "next/image";

interface Props {
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
  title: string;
  imageUrl: string;
}

export const SocialSigninButton: FC<Props> = ({
  handleClick,
  title,
  imageUrl,
}) => {
  return (
    <button
      className="border-2 text-amber-700 border-amber-700 px-4 py-2 rounded-md hover:opacity-30 flex justify-center items-center gap-2 mx-auto my-3"
      onClick={handleClick}
    >
      <Image src={imageUrl} alt={title} height="15" width="15" />
      {title}
    </button>
  );
};
