import React, { FC } from "react";
import { GetStaticProps } from "next";
import axios from "axios";
import EventCard from "@/components/EventCard";

export interface Event {
  _id: string;
  name: string;
  description: string;
  banner: {
    url: string;
  };
  startDate: string;
  endDate: string;
  createdOn: string;
  approvalStatus: "Approved" | "Declined" | "Pending";
  code: string;
}

interface Props {
  events: [Event];
  totalCount: number;
  page: number;
  totalPages: number;
}

interface EventsListApiResponse extends Props {}

const index: FC<Props> = ({ events, totalCount, page, totalPages }) => {
  return (
    <section className="flex items-center justify-center">
      <div className="w-[80%] max-w-[1200px] py-4">
        <h1 className="text-xl lg:text-3xl font-bold my-2">Events</h1>
        <div className="grid md:grid-cols my-3 lg:grid-cols-3 gap-2 lg:gap-4">
          {events?.map((event) => (
            <EventCard {...event} key={event?._id} />
          ))}
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

  const response = await axios.get<EventsListApiResponse>(
    `${baseUrl}/event/events`
  );
  return {
    props: {
      events: response?.data?.events,
      totalCount: response?.data?.totalCount,
      page: response?.data?.page,
      totalPages: response?.data?.totalPages,
    },
  };
};

export default index;
