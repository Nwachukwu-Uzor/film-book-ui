import axios from "axios";
import { Ticket, Event } from "@/types";

export interface TicketsApiResponse {
  tickets: Ticket[];
  event: Partial<Event>;
}

export const fetchTicketsForEvent = async (eventId: string | undefined, baseUrl: string) => {
  if (!eventId) {
    throw new Error("Please provide a valid event id");
  }
  // const baseUrl =
  //   process.env.ENVIRONMENT === "Development"
  //     ? process.env.SERVER_BASE_URL_DEVELOPMENT
  //     : process.env.SERVER_BASE_URL_PRODUCTION;

  console.log(baseUrl);

  const token = localStorage.getItem("filmhouse-token");

  const response = await axios.get<TicketsApiResponse>(
    `${baseUrl}/ticket/${eventId}/tickets`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response?.data;
};
