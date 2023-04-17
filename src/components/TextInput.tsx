import { error } from "console";
import React, { ChangeEvent, FC } from "react";

interface Props {
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isError: boolean;
  touched: boolean;
  label: string;
  name: string;
  id?: string;
  error: string;
  type?: string;
}

export const TextInput: FC<Props> = ({
  value,
  handleChange,
  isError,
  touched,
  label,
  name,
  id,
  error,
  type = "text",
}) => (
  <div className="relative mt-6">
    <div className="relative">
      <input
        id={id}
        className={`block rounded-md py-3 px-2 text-sm text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-400 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 peer w-full`}
        placeholder=" "
        value={value}
        onChange={handleChange}
        type={type}
        name={name}
        autoComplete="off"
      />
      <label
        htmlFor={id}
        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-yellow-600 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3"
      >
        {label}
      </label>
      <p className="text-red-500 my-2 text-sm">{touched && error}</p>
    </div>
  </div>
);
