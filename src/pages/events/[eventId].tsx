import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";
import { MdOutlineDateRange } from "react-icons/md";
import { Event } from "./";
import { Header } from "@/components";

interface EventDetailsProp extends Event {
  galleryImages: { url: string; _id: string }[];
}

interface EventDetailsApiResponse {
  event: EventDetailsProp;
}

interface EventIdsApiResponse {
  eventIds: { _id: string }[];
}

const EventDetails: FC<EventDetailsProp> = ({
  name,
  description,
  banner,
  galleryImages,
  startDate,
  endDate,
  code,
}) => {
  const [displayStartDate, setDisplayStartDate] = useState("");
  const [displayEndDate, setDisplayEndDate] = useState("");

  useEffect(() => {
    setDisplayStartDate(new Date(startDate).toLocaleString() ?? "");
    setDisplayEndDate(new Date(endDate).toLocaleString() ?? "");
  }, []);
  return (
    <section className="flex justify-center items-center">
      <div className="w-[90%] max-w-[1200px] my-3">
        <Header text={name} level={3} />
        <Header text={`CODE: ${code}`} level={1} />
        <Image
          src={banner?.url}
          alt="description"
          height="200"
          width="200"
          className="w-full h-auto max-h-[50vh] object-cover my-3"
        />
        <div className="flex gap-1 items-center my-2">
          <strong className="flex-1">Starts</strong>
          <MdOutlineDateRange />
          <span>{displayStartDate}</span>
        </div>
        <div className="flex gap-1 items-center my-2">
          <strong className="flex-1">Ends</strong>
          <MdOutlineDateRange />
          <span>{displayEndDate}</span>
        </div>
        <p>{description}</p>
        <h3 className="text-lg mt-4 lg:text-xl font-bold uppercase">Photos</h3>
        <div className="my-3 grid lg:grid-cols-3 gap-2 lg:gap-3 items-stretch">
          {galleryImages?.map((image) => (
            <Image
              src={image?.url}
              alt={name}
              height="200"
              width="200"
              className="w-full h-auto max-h-[50vh] object-cover my-3 border shadow-sm hover:scale-105 duration-300 rounded-md cursor-pointer"
              key={image?._id}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const baseUrl =
    process.env.ENVIRONMENT === "Development"
      ? process.env.SERVER_BASE_URL_DEVELOPMENT
      : process.env.SERVER_BASE_URL_PRODUCTION;

  const response = await axios.get<EventIdsApiResponse>(
    `${baseUrl}/event/eventIds`
  );

  const paths = response?.data?.eventIds?.map((eventId) => ({
    params: { eventId: eventId?._id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<EventDetailsProp> = async (
  context
) => {
  const baseUrl =
    process.env.ENVIRONMENT === "Development"
      ? process.env.SERVER_BASE_URL_DEVELOPMENT
      : process.env.SERVER_BASE_URL_PRODUCTION;

  const eventId = context?.params?.eventId as string;

  const response = await axios.get<EventDetailsApiResponse>(
    `${baseUrl}/event/details/${eventId}`
  );

  return {
    props: {
      ...response?.data?.event,
    },
  };
};

export default EventDetails;
