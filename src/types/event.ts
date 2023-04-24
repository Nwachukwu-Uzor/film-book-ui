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
  galleryImages?: { _id: string; url: string }[];
}
