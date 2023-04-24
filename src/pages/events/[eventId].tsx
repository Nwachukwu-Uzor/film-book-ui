import React, {
  FC,
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
} from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";
import { MdOutlineDateRange } from "react-icons/md";
import { FaTicketAlt } from "react-icons/fa";
import { MoonLoader } from "react-spinners";

import { Event } from "./";
import {
  Header,
  Modal,
  Button,
  FullScreenLoader,
  TextInput,
} from "@/components";
import { fetchTicketsForEvent } from "@/queries";
import { TicketsApiResponse } from "@/queries/types";
import { Ticket } from "@/types";

interface EventDetailsProp extends Event {
  galleryImages: { url: string; _id: string }[];
  baseUrl: string;
}

interface EventDetailsApiResponse {
  event: EventDetailsProp;
}

interface EventIdsApiResponse {
  eventIds: { _id: string }[];
}

interface TicketForBooking extends Ticket {
  quantity: number;
}

const EventDetails: FC<EventDetailsProp> = ({
  name,
  description,
  banner,
  galleryImages,
  startDate,
  endDate,
  code,
  baseUrl,
}) => {
  const router = useRouter();
  const eventId = router.query.eventId as string;
  const [tickets, setTickets] = useState<TicketForBooking[]>([]);
  const [selectedTicketId, setSelectTicketId] = useState("");

  const { data, isLoading, isError, error } = useQuery<
    TicketsApiResponse,
    Error
  >(
    ["fetchTicketsForEvent", eventId],
    () => fetchTicketsForEvent(eventId, baseUrl),
    {
      onSuccess: (data) => {
        setTickets(data?.tickets.map((ticket) => ({ ...ticket, quantity: 0 })));
      },
    }
  );

  const [displayStartDate, setDisplayStartDate] = useState("");
  const [displayEndDate, setDisplayEndDate] = useState("");
  const [openBookingModal, setOpenBookingModal] = useState(
    Boolean(router?.query?.book) ?? false
  );

  const handleToggleBookingModal = () => {
    setOpenBookingModal((currentState) => !currentState);
  };

  const handleTicketQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9]*\.?[0-9]*$/;
    const { name, value } = event.target;

    if (regex.test(value)) {
      // const updateTickets = tickets?.map((ticket) => {
      //   if(ticket?.type?.typeName === name) {
      //     return {...ticket, quantity: nu}
      //   }
      // });
      setTickets((tickets) =>
        tickets?.map((ticket) =>
          ticket?.type?.typeName === name
            ? { ...ticket, quantity: Number(value) }
            : ticket
        )
      );
    }
  };

  useEffect(() => {
    setDisplayStartDate(new Date(startDate).toLocaleString() ?? "");
    setDisplayEndDate(new Date(endDate).toLocaleString() ?? "");
  }, []);

  const renderTickets = useCallback(() => {
    return isError ? (
      <div className="bg-red-300 p-2 rounded-md">
        <Header text="Error occured while fetching tickets" color="red" />
        <p>{error?.message}</p>
      </div>
    ) : isLoading ? (
      <div className="bg-white min-h-[300vh] w-full flex items-center justify-center">
        <MoonLoader color="" />
      </div>
    ) : data?.tickets?.length === 0 ? (
      <p className="p-3">No Tickets found</p>
    ) : (
      <div className="w-full grid gap-1 p-2 bg-blue-50">
        <Header text={`Book ${name}`} />
        <p>Please select the tickets you want to buy</p>
        {tickets?.map((ticket) => (
          <div key={ticket._id} className="">
            <Header text={ticket?.type?.typeName} level={0.5} />
            <p>
              <strong>Price: </strong> &#8358; {ticket?.price}
            </p>
            {selectedTicketId === ticket._id ? (
              <TextInput
                label="Quantity"
                value={ticket?.quantity?.toString()}
                name={ticket?.type?.typeName}
                handleChange={handleTicketQuantityChange}
              />
            ) : null}
            <div>
              <Button
                text="Add Ticket"
                handleClick={() => {
                  console.log(ticket?._id);
                  setSelectTicketId(ticket?._id);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }, [tickets, data, selectedTicketId]);

  return (
    <>
      <section className="flex justify-center items-center">
        <div className="w-[90%] max-w-[1200px] my-3">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div>
              <Header text={name} level={3} />
              <Header text={`CODE: ${code}`} level={1} />
            </div>
            <div className="min-w-[150px]">
              <Button
                text="Book"
                color="blue"
                icon={<FaTicketAlt color="#fff" />}
                handleClick={handleToggleBookingModal}
                full={true}
              />
            </div>
          </div>
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
          <h3 className="text-lg mt-4 lg:text-xl font-bold uppercase">
            Photos
          </h3>
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
      <Modal open={openBookingModal} handleClose={handleToggleBookingModal}>
        <div className="bg-white rounded-md shadow-md w-full max-w-[700px] ov overflow-x-hidden">
          {renderTickets()}
        </div>
      </Modal>
      {isLoading ? <FullScreenLoader /> : null}
    </>
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
      ? (process.env.SERVER_BASE_URL_DEVELOPMENT as string)
      : (process.env.SERVER_BASE_URL_PRODUCTION as string);

  const eventId = context?.params?.eventId as string;

  const response = await axios.get<EventDetailsApiResponse>(
    `${baseUrl}/event/details/${eventId}`
  );

  return {
    props: {
      ...response?.data?.event,
      baseUrl: baseUrl,
    },
  };
};

export default EventDetails;
