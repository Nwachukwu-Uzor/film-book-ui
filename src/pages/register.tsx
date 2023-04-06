import React from "react";
import Image from "next/image";

import { environment, backendBaseUrl } from "@/config/";

const Register = () => {
  const handleGoogleSignin = () => {
    window.open(`${backendBaseUrl}/auth/google`, "_self");
  };
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-[95%] max-w-[1500px]">
        <div className="relative hidden lg:block m-1">
          <Image
            src="/images/signup-bg.png"
            alt="register Image"
            width="600"
            height="600"
            // fill={true}
            className="w-full h-screen object-cover border shadow-sm rounded-sm"
          />
          <div className="absolute left-0 right-0 bottom-8 flex flex-col items-center text-white gap-2 p-4">
            <h1 className="text-xl lg:text-3xl font-semibold">
              Creating experiences worldwide {environment}
            </h1>
            <p className="text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore
            </p>
          </div>
        </div>
        <div className="w-full h-min-screen flex items-center justify-center p-2">
          <div className="w-[80%] w-max-[350px] p-4 bg-white shadow-md border-0.5 border-gray-100 rounded-md">
            <h1 className="text-amber-700 text-lg lg:text-2xl font-semibold my-3">
              Create an account
            </h1>
            <button
              className="border-2 text-amber-700 border-amber-700 px-4 py-2 w-[70%] rounded-md hover:opacity-30 flex justify-center items-center gap-2 mx-auto my-3"
              onClick={handleGoogleSignin}
            >
              <Image src="/images/google.png" alt="" height="15" width="15" />
              Signup with Google
            </button>
            <form className="">
              <div className="flex flex-col gap-2">
                <label>Name: </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="border p-1 rounded-md focus:border-amber-600 focus:border-2 border-gray-300 focus:outline-none"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
