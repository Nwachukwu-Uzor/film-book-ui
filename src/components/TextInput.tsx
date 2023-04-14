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
  // <div>
  <div className="relative mt-6">
    {/* <input
        type={type}
        className="peer w-full relative border px-2 py-2 rounded-md focus:border-amber-600 focus:border-2 border-gray-300 focus:outline-none"
        name={name}
        id={id}
        value={value}
        placeholder=""
        onChange={handleChange}
      />
      <label
        htmlFor={name}
        className={`absolute text-sm left-0 ml-1 px-1 top-[50%] -translate-y-[50%] peer-focus:top-0 bg-transparent peer-focus:bg-white duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-focus:text-black peer-placeholder-shown:text-gray-500 peer-focus:ml-1 peer-focus:-translate-y-[50%] peer-focus:px-1 peer-focus:text-sm`}
      >
        {label}
      </label>
    </div>
    {touched && isError ? (
      <p className="my-1 text-sm text-red-700">{error}</p>
    ) : null}
  </div> */}
    <div className="relative">
      <input
        id={id}
        className={`block rounded-md py-3 px-2 text-sm text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-400 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 peer w-full`}
        placeholder=" "
        value={value}
        onChange={handleChange}
        // disabled={disabled}
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
