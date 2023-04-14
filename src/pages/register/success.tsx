import React from "react";
import { MdMarkEmailRead } from "react-icons/md";
import { useRouter } from "next/router";

const Success = () => {
  const { query } = useRouter();

  const { email } = query;
  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="w-[80%] max-w-[500px] py-4 px-2 rounded-md shadow-md border border-gray-200 text-center bg-green-50">
        <div className="flex justify-center items-center h-[50px] w-[50px] bg-white rounded-full m-auto">
          <MdMarkEmailRead className="text-xl lg:text-3xl text-green-800" />
        </div>
        <h1 className="font-bold text-xl lg:text-2xl">
          Registering Successful
        </h1>
        <p className="my-3">
          A confirmation mail has been sent{" "}
          <span className="font-semibold italic">{email}</span>, please click it to
          confirm your mail.
        </p>
      </div>
    </section>
  );
};

export default Success;
