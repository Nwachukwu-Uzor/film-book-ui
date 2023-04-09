import { error } from "console";
import React, { ChangeEvent, FC } from "react";

interface Props {
  value: string;
  handleChange: (event: ChangeEvent) => void;
  isError: boolean;
  touched: boolean;
  label: string;
  name: string;
  id?: string;
  error: string;
  type?: string
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
  type="text"
}) => (
  <div>
    <div className="relative mt-6">
      <input
        type={type}
        className="peer w-full border placeholder:text-transparent px-2 py-2 rounded-md focus:border-amber-600 focus:border-2 border-gray-300 focus:outline-none"
        name={name}
        id={id}
        value={value}
        onChange={handleChange}
      />
      <label
        htmlFor={name}
        className="absolute text-sm left-0 ml-1 px-1 top-[50%] -translate-y-[50%] peer-focus:top-0 bg-transparent peer-focus:bg-white duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:ml-1 peer-focus:-translate-y-[50%] peer-focus:px-1 peer-focus:text-sm"
      >
        {label}
      </label>
    </div>
    {touched && isError ? (
      <p className="my-1 text-sm text-red-700">{error}</p>
    ) : null}
  </div>
);
