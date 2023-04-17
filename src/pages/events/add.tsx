import React, { useState, ChangeEvent, useEffect } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiFillFileImage, AiOutlineClose } from "react-icons/ai";

import { Container, Header, Button, TextInput } from "@/components";

const initialFieldValues = {
  name: "",
  description: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Event name is required")
    .min(5, "Event name should be at least 5 characters"),
  description: Yup.string()
    .required("Event description is required")
    .min(10, "Event description should be at least 10 characters"),
});

const Add = () => {
  const [banner, setBanner] = useState<File | null | undefined>(null);
  const [previewBanner, setPreviewBanner] = useState<string | null | undefined>(
    null
  );

  const [galleryImages, setGalleryImages] = useState<
    { id: string; file: File }[] | undefined | null
  >(null);

  const [previewGalleryImages, setPreviewGalleryImages] = useState<
    { id: string; url: string }[] | null
  >(null);

  const handleBannerChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (!file) {
      return;
    }
    setBanner(file);
  };

  const { values, handleSubmit, handleChange, touched, errors, isSubmitting } =
    useFormik({
      initialValues: initialFieldValues,
      validationSchema: validationSchema,
      onSubmit: async (value, { resetForm }) => {},
    });

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!banner) {
      setPreviewBanner(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(banner);
    setPreviewBanner(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [banner]);
  return (
    <Container>
      <Header text="Add Event" level={2} />
      <form
        className="my-2 flex flex-col gap-2 max-w-[500px] bg-white mx-auto p-3 shadow-md border-0.5 rounded-md"
        onSubmit={handleSubmit}
      >
        <p className="text-lg font-semibold">
          Please provide the information for the new event.
        </p>
        <TextInput
          value={values?.name}
          handleChange={handleChange}
          touched={Boolean(touched?.name)}
          isError={Boolean(errors?.name) ?? false}
          name="name"
          label="Name"
          error={errors?.name ?? ""}
          id="name"
          type="text"
        />
        <TextInput
          value={values?.description}
          handleChange={handleChange}
          touched={Boolean(touched?.description)}
          isError={Boolean(errors?.description) ?? false}
          name="description"
          label="Description"
          error={errors?.description ?? ""}
          id="email"
          type="text"
        />

        <div className="flex flex-col gap-2 lg:gap-4">
          <div className="my-2 flex gap-2 justify-between">
            <label
              htmlFor="avatar"
              className="flex flex-col gap-2 items-center w-fit lg:flex-row cursor-pointer"
            >
              <span className="font-bold">Select Banner: </span>
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
              onChange={handleBannerChange}
            />
          </div>
          {previewBanner ? (
            <div className="relative">
              <Image
                src={previewBanner}
                alt="avatar"
                height="300"
                width="300"
                className="w-full h-[200px] object-cover rounded-sm"
              />
              <AiOutlineClose className="absolute top-2 right-2" />
            </div>
          ) : null}
        </div>
        <div className="flex flex-col gap-2 lg:gap-4">
          <div className="my-2 flex gap-2 justify-between">
            <label
              htmlFor="avatar"
              className="flex flex-col gap-2 items-center w-fit lg:flex-row cursor-pointer"
            >
              <span className="font-bold">Select Gallery Images: </span>
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
              onChange={handleBannerChange}
            />
          </div>
          {previewBanner ? (
            <Image
              src={previewBanner}
              alt="avatar"
              height="300"
              width="300"
              className="w-full h-[200px] object-cover rounded-sm"
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
    </Container>
  );
};

export default Add;
