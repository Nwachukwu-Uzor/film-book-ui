import React, { useState, useEffect, FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Event } from "@/pages/events";
import { MdOutlineDateRange } from "react-icons/md";

const MAXIMUM_DESCRIPTION_CHARACTERS_TO_SHOW = 50;

const EventCard: FC<Event> = ({
  name,
  description,
  banner,
  _id,
  startDate,
  endDate,
}) => {
  const [displayStartDate, setDisplayStartDate] = useState("");
  const [displayEndDate, setDisplayEndDate] = useState("");

  useEffect(() => {
    setDisplayStartDate(new Date(startDate).toLocaleString() ?? "");
    setDisplayEndDate(new Date(endDate).toLocaleString() ?? "");
  }, []);

  return (
    <div className="overflow-hidden bg-white shadow-md border border-gray-100 rounded-md hover:scale-105 duration-300 ease-linear cursor-pointer">
      <Image
        src={banner?.url}
        alt="description"
        height="200"
        width="200"
        className="w-full h-[100px] lg:h-[200px] object-cover"
      />
      <div className="px-2 py-3">
        <h2 className="text-lg lg:text-xl font-semibold my-2">{name}</h2>
        <p>
          {description.substring(0, MAXIMUM_DESCRIPTION_CHARACTERS_TO_SHOW)}
          {description.length > MAXIMUM_DESCRIPTION_CHARACTERS_TO_SHOW
            ? "..."
            : ""}
        </p>
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
        <div className="mt-4 flex items-center justify-center gap-2 lg:gap-4">
          <Link
            href={`/events/${encodeURIComponent(_id)}`}
            className="p-2 lg:px-4 border-2 border-amber-900 hover:bg-amber-900 text-amber-900 font-semibold hover:text-white duration-300 rounded-md"
          >
            Details
          </Link>
          <Link
            href={`/book/${encodeURIComponent(_id)}`}
            className="p-2 lg:px-4 border-2 border-amber-900 hover:bg-amber-900 text-amber-900 font-semibold hover:text-white duration-300 rounded-md"
          >
            Book
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
