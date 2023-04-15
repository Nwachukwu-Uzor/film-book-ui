import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useState, ChangeEvent, useEffect, FC } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { AiFillFileImage } from "react-icons/ai";

import { Button, TextInput } from "@/components";
import { SocialSigninButton } from "@/components/SocialSigninButton";

interface Props {
  baseUrl: string;
}

interface UserRegisterationResponse {
  data: {
    message: string;
  };
}

const initialFieldValues = {
  username: "",
  password: "",
  email: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(5, "Username should be at least 5 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Please provide a valid email address"),
  password: Yup.string()
    .required("Password is required")
    .min(5, "Password should be at least 5 characters"),
});

const Register: FC<Props> = ({ baseUrl }) => {
  const router = useRouter();

  const [avatar, setAvatar] = useState<File | null | undefined>(null);
  const [preview, setPreview] = useState<string | null | undefined>(null);

  const handleGoogleSigup = () => {
    window.open(`${baseUrl}/auth/google/signup`, "_self");
  };

  const handleFacebookSignup = () => {
    window.open(`${baseUrl}/auth/facebook`, "_self");
  };

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (!file) {
      return;
    }
    console.log("here");
    setAvatar(file);
  };

  const { values, handleSubmit, handleChange, touched, errors, isSubmitting } =
    useFormik({
      initialValues: initialFieldValues,
      validationSchema: validationSchema,
      onSubmit: async (value, { resetForm }) => {
        if (!avatar) {
          Swal.fire({
            title: "Error",
            text: "Please provide an avatar image",
          });
        }
        try {
          const formData = new FormData();
          formData.append("email", value.email);
          formData.append("password", value.password);
          formData.append("username", value.username);

          const response = await axios.post<UserRegisterationResponse>(
            `${baseUrl}/auth/register`,
            formData
          );
          if (response.status === 201) {
            Swal.fire({
              title: "Registeration Successful",
              text: response?.data?.data?.message,
              didClose: () => {
                router.push(`/register/success?email=${value?.email}`);
              },
            });
            setAvatar(null);
            resetForm();
          }
        } catch (error: any) {
          const message = error?.response?.data?.message ?? error?.message;
          Swal.fire({
            title: "Error",
            text: message,
          });
        }
      },
    });

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!avatar) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(avatar);
    console.log(objectUrl);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [avatar]);

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
              Creating experiences worldwide
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
                title="Sign up with Google"
                handleClick={handleGoogleSigup}
                imageUrl="/images/google.png"
              />
              <SocialSigninButton
                title="Sign up with Facebook"
                handleClick={handleFacebookSignup}
                imageUrl="/images/facebook.png"
              />
            </div>
            <form className="my-2 flex flex-col gap-2" onSubmit={handleSubmit}>
              <TextInput
                value={values?.username}
                handleChange={handleChange}
                touched={Boolean(touched?.username)}
                isError={Boolean(errors?.username) ?? false}
                name="username"
                label="Username"
                error={errors?.username ?? ""}
                id="username"
                type="text"
              />
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
              <div className="my-2 flex justify-between">
                <label
                  htmlFor="avatar"
                  className="flex flex-col gap-2 items-center w-fit lg:flex-row cursor-pointer"
                >
                  <span className="font-bold">Select Avatar: </span>
                  <span className="h-[40px] w-[40px] bg-yellow-100 rounded-full flex items-center justify-center">
                    <AiFillFileImage className="text-yellow-500" />
                  </span>
                </label>
                <input
                  type="file"
                  accept=".jpg,.png,.jpeg"
                  hidden
                  name="avatar"
                  id="avatar"
                  onChange={handleAvatarChange}
                />
                {preview ? (
                  <Image
                    src={preview}
                    alt="avatar"
                    height="300"
                    width="300"
                    className="h-[50px] w-[50px] object-cover rounded-full"
                  />
                ) : null}
              </div>
              {isSubmitting ? (
                <p className="">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 ..."
                    viewBox="0 0 24 24"
                  ></svg>
                  Submitting
                </p>
              ) : (
                <Button title="Submit" type="submit" />
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

export default Register;
