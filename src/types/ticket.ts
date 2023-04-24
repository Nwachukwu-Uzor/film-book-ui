import { TicketType } from "../types";

export interface Ticket {
  _id: string;
  type: TicketType;
  price: number;
  createdAt: string;
}
