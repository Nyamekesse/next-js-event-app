import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DataType } from "../../../shared/types";
type Props = {
  data: Array<DataType>;
};

const AllEvents = ({ data }: Props) => {
  return (
    <div className="events_page">
      {data.map((event, index) => (
        <Link className="card" key={index} href={`/events/${event.id}`}>
          <Image width={400} height={500} src={event.image} alt={event.title} />
          <h2>Events in {event.title}</h2>
        </Link>
      ))}
    </div>
  );
};

export default AllEvents;
