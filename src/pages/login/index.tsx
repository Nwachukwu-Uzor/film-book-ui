import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useState, ChangeEvent, useEffect, FC } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { AiFillFileImage } from "react-icons/ai";

import { environment, backendBaseUrl } from "@/config/";
import { Button, TextInput } from "@/components";
import { SocialSigninButton } from "@/components/socialSigninButton";

interface Props {
  baseUrl: string;
}

interface UserSigninationResponse {
  data: {
    message: string;
    token: string;
  };
}

const initialFieldValues = {
  password: "",
  email: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(5, "Username should be at least 5 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(5, "Password should be at least 5 characters"),
});

const Signin: FC<Props> = ({ baseUrl }) => {
  const router = useRouter();

  const handleGoogleSignin = () => {
    window.open(`${baseUrl}/auth/google/login`, "_self");
  };

  const handleFacebookSignin = () => {
    window.open(`${baseUrl}/auth/facebook`, "_self");
  };

  const { values, handleSubmit, handleChange, touched, errors, isSubmitting } =
    useFormik({
      initialValues: initialFieldValues,
      validationSchema: validationSchema,
      onSubmit: async (values, { resetForm }) => {
        try {
          const response = await axios.post<UserSigninationResponse>(
            `${baseUrl}/auth/signin`,
            values
          );

          router.push(`/`);
        } catch (error: any) {
          const message = error?.response?.data?.message ?? error?.message;
          Swal.fire({
            title: "Error",
            text: message,
          });
        }
      },
    });

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-[95%] max-w-[1500px]">
        <div className="relative hidden lg:block m-1">
          <Image
            src="/images/signup-bg.png"
            alt="signin Image"
            width="600"
            height="600"
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
            <div className="flex items-center gap-2">
              <SocialSigninButton
                title="Login with Google"
                handleClick={handleGoogleSignin}
                imageUrl="/images/google.png"
              />
              <SocialSigninButton
                title="Login with Facebook"
                handleClick={handleFacebookSignin}
                imageUrl="/images/facebook.png"
              />
            </div>
            <form className="my-2 flex flex-col gap-2" onSubmit={handleSubmit}>
              <TextInput
                value={values?.email}
                handleChange={handleChange}
                touched={Boolean(touched?.email)}
                isError={Boolean(errors?.email) ?? false}
                name="email"
                label="email"
                error={errors?.email ?? ""}
                id="email"
                type="text"
              />
              <TextInput
                value={values?.password}
                handleChange={handleChange}
                touched={Boolean(touched?.password)}
                isError={Boolean(errors?.password) ?? false}
                name="password"
                label="Password"
                error={errors?.password ?? ""}
                id="password"
                type="password"
              />
              {isSubmitting ? (
                <p className="">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 ..."
                    viewBox="0 0 24 24"
                  ></svg>
                  Submitting
                </p>
              ) : (
                <Button title="Sign in" type="submit" />
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const baseUrl =
    process.env.ENVIRONMENT === "Development"
      ? process.env.SERVER_BASE_URL_DEVELOPMENT
      : process.env.SERVER_BASE_URL_PRODUCTION;

  return {
    props: {
      baseUrl: baseUrl ?? "",
    },
  };
};

export default Signin;
