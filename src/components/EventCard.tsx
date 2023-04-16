import React, { FC } from "react";
import { Event } from "@/pages/events";

const EventCard: FC<Event> = ({ name, description }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  );
};

export default EventCard;
